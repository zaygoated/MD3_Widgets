const fs = require('fs');
const path = require('path');

const widgetsDir = path.join(__dirname, 'src', 'widgets');

// Updates W04, W05, W06
['W04_WeatherSmall.js', 'W05_WeatherMedium.js', 'W06_WeatherLarge.js'].forEach(file => {
  const filePath = path.join(widgetsDir, file);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/<FlexWidget\n\s+style={{/, '<FlexWidget\n      clickAction="REFRESH_WEATHER"\n      style={{');
  fs.writeFileSync(filePath, content);
});

// Updates Clocks W07-W11
['W07_ClockDigital.js', 'W08_ClockAnalog.js', 'W09_ClockAnalogLarge.js', 'W10_ClockDate.js', 'W11_ClockWorld.js'].forEach(file => {
  const filePath = path.join(widgetsDir, file);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/<FlexWidget\n\s+style={{/, '<FlexWidget\n      clickAction="OPEN_CLOCK_APP"\n      style={{');
  fs.writeFileSync(filePath, content);
});

console.log("Updated Weather and Clocks with clickActions!");
