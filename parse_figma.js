const fs = require('fs');

const token = 'figd_TTKodYVDJsIe0opc_f_rr4S1dluMRABzBJL1n07N';
const fileKey = 'XdDTr1pIR4ctDXIT0Asytf';

async function fetchFigma() {
  console.log("Fetching Figma file...");
  try {
    const res = await fetch(`https://api.figma.com/v1/files/${fileKey}`, {
      headers: { 'X-Figma-Token': token }
    });
    
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const data = await res.json();
    const widgets = [];
    
    function traverse(node) {
      // Look for things that look like a Widget (e.g. they have cornerRadius and padding)
      if (node.cornerRadius && node.cornerRadius > 0 && node.name.length < 30) {
        widgets.push({
           name: node.name,
           type: node.type,
           cornerRadius: node.cornerRadius || 0,
           padding: {
               top: node.paddingTop || 0,
               bottom: node.paddingBottom || 0,
               left: node.paddingLeft || 0,
               right: node.paddingRight || 0,
           }
        });
      }
      if (node.children) {
        node.children.forEach(traverse);
      }
    }
    
    traverse(data.document);
    
    // Filter out simple backgrounds, focus on typical widget names
    const filtered = widgets.filter(w => 
      w.name.includes('Widget') || 
      w.name.match(/W\d+/) || 
      w.name.includes('Clock') ||
      w.name.includes('Music') ||
      w.name.includes('Weather') ||
      (w.padding.top > 0)
    );
    
    console.log(`Found ${filtered.length} potential widgets.`);
    // Keep unique names
    const unique = [];
    const seen = new Set();
    for (const w of filtered) {
        if (!seen.has(w.name)) {
            seen.add(w.name);
            unique.push(w);
        }
    }
    
    unique.slice(0, 30).forEach(w => {
      console.log(`- ${w.name}: Radii=${w.cornerRadius}, Padding=T${w.padding.top} B${w.padding.bottom} L${w.padding.left} R${w.padding.right}`);
    });
    
  } catch (err) {
    console.error("Error fetching Figma:", err.message);
  }
}

fetchFigma();
