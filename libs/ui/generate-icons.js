const fs = require('fs');
const path = require('path');

// 1. Caminhos das pastas do Angular
const iconsFolder = path.resolve(__dirname, './public/assets/icons');
const outputFile = path.resolve(__dirname, './src/theme/icons.css');

try {
  const files = fs.readdirSync(iconsFolder);
  let cssContent = `/* Generated Automatically - Do not edit manually */\n\n`;

  files.forEach((file) => {
    if (file.endsWith('.svg')) {
      const iconName = path.parse(file).name;
      //  Generates the utility class in the format expected by Tailwind v4
      cssContent += `@utility ${iconName} {\n  &::after {\n    -webkit-mask-image: url('/assets/icons/${file}');\n    mask-image: url('/assets/icons/${file}');\n  }\n}\n\n`;
    }
  });

  fs.writeFileSync(outputFile, cssContent);
  console.log('✅ [Tailwind v4] Icon classes generated successfully!');
} catch (err) {
  console.warn('⚠️ Error reading icons folder:', err.message);
}
