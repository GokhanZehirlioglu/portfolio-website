const fs = require('fs');

// First, let's check what exact bytes the em-dash pattern is
const buf = fs.readFileSync('src/pages/ProjektOPNsensePart2.tsx');
const content = buf.toString('utf8');

// Find the title tag
const titleMatch = content.match(/<title>(.*?)<\/title>/);
if (titleMatch) {
  console.log('Current title:', titleMatch[1]);
  
  // Check for the mojibake pattern
  const titleBuf = Buffer.from(titleMatch[1], 'utf8');
  console.log('Title hex:', titleBuf.toString('hex'));
}

// The â€" pattern in UTF-8 is: C3 A2 (â) + C2 80 (control) + E2 80 94 (—)
// OR it could be the literal string "â€"" stored as UTF-8
// Let's try to find and replace the actual byte patterns

const files = [
  'src/pages/ProjektOPNsensePart1.tsx',
  'src/pages/ProjektOPNsensePart2.tsx',
  'src/pages/ProjektOPNsensePart3.tsx',
  'src/pages/ProjektOPNsensePart4.tsx',
  'src/pages/ProjektOPNsensePart5.tsx',
  'src/pages/ProjektOPNsensePart6.tsx',
  'src/data/portfolio.ts'
];

// The mojibake for — (U+2014 em-dash) when UTF-8 bytes are misread as Windows-1252:
// UTF-8 of —: E2 80 94
// When these bytes are interpreted as Windows-1252 characters:
// E2 = â, 80 = €, 94 = " → "â€""
// Then re-encoded as UTF-8: C3 A2 (â) + E2 82 AC (€) + E2 80 9C (") 
// But from the view tool it shows â€" so let's try the exact string replacement

for (const f of files) {
  let text = fs.readFileSync(f, 'utf8');
  let changed = false;

  // Try direct string replacement of the visible mojibake
  const replacements = [
    ['â€"', '—'],   // em-dash
    ['â€"', '–'],   // en-dash  
    ['â€œ', '"'],   // left double quote
    ['â€\x9D', '"'],   // right double quote
    ['â€™', "'"],   // right single quote
    ['â†'', '→'],   // right arrow
    ['Ã¼', 'ü'],
    ['Ã¤', 'ä'],
    ['Ã¶', 'ö'],
    ['Ã–', 'Ö'],
    ['Ãœ', 'Ü'],
    ['ÃŸ', 'ß'],
    ['Ã©', 'é'],
    ['Ã„', 'Ä'],
  ];

  for (const [from, to] of replacements) {
    if (text.includes(from)) {
      text = text.split(from).join(to);
      changed = true;
      console.log(`  [${f}] Replaced "${from}" -> "${to}"`);
    }
  }

  if (changed) {
    fs.writeFileSync(f, text, 'utf8');
    console.log('FIXED: ' + f);
  } else {
    console.log('CLEAN: ' + f);
  }
}

console.log('--- ALL DONE ---');
