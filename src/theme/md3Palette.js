export function hexToRgb(hex) {
  const cleanHex = hex.replace(/^#/, '');
  const num = parseInt(cleanHex, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

export function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

export function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n => {
    const kVal = k(n);
    const colorVal = l - a * Math.max(Math.min(kVal - 3, 9 - kVal, 1), -1);
    return Math.round(255 * colorVal).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

export function generateTonalPalette(hex, saturationModifier = 1.0) {
  const rgb = hexToRgb(hex);
  const { h, s } = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const targetSat = Math.min(100, Math.max(0, s * saturationModifier));

  const tones = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100];
  const palette = {};

  tones.forEach(tone => {
    if (tone === 0) {
      palette[0] = '#000000';
    } else if (tone === 100) {
      palette[100] = '#FFFFFF';
    } else {
      palette[tone] = hslToHex(h, targetSat, tone);
    }
  });

  return palette;
}

export function generateMD3Palette(sourceHex) {
  const rgb = hexToRgb(sourceHex);
  const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b);

  // MD3 shifts:
  // Secondary: Hue shifted by 60deg (or similar), saturation reduced (e.g., multiplier 0.3)
  // Tertiary: Hue shifted by 120deg, saturation slightly reduced
  // Neutral: Saturation very low (multiplier 0.08)
  // Neutral Variant: Saturation low (multiplier 0.16)
  
  const primaryHex = sourceHex;
  const secondaryHex = hslToHex((h + 60) % 360, Math.max(10, s * 0.4), l);
  const tertiaryHex = hslToHex((h + 120) % 360, Math.max(15, s * 0.5), l);
  const neutralHex = hslToHex(h, Math.max(4, s * 0.08), l);
  const neutralVariantHex = hslToHex(h, Math.max(8, s * 0.16), l);

  return {
    primary: generateTonalPalette(primaryHex, 1.0),
    secondary: generateTonalPalette(secondaryHex, 1.0),
    tertiary: generateTonalPalette(tertiaryHex, 1.0),
    neutral: generateTonalPalette(neutralHex, 1.0),
    neutralVariant: generateTonalPalette(neutralVariantHex, 1.0)
  };
}
