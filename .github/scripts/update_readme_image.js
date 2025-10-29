// .github/scripts/update_readme_image.js
const fs = require('fs');
const path = require('path');

const repoRoot = process.cwd();
const readmePath = path.join(repoRoot, 'README.md');
const animeDir = path.join(repoRoot, 'assets', 'anime');

function getRandomAnime() {
  const files = fs.readdirSync(animeDir).filter(f => /\.(gif|png|jpg|jpeg)$/i.test(f));
  if (files.length === 0) {
    console.error('No anime images found in assets/anime');
    process.exit(1);
  }
  const idx = Math.floor(Math.random() * files.length);
  return files[idx];
}

function updateReadme(imageFile) {
  let readme = fs.readFileSync(readmePath, 'utf8');

  // We'll replace any existing /assets/anime/... path with the chosen one.
  const newRelPath = `assets/anime/${imageFile}`;
  // Replace first occurrence of assets/anime/...
  readme = readme.replace(/assets\/anime\/[^\s)"]+/i, newRelPath);

  fs.writeFileSync(readmePath, readme, 'utf8');
  console.log('Updated README to:', newRelPath);
}

const chosen = getRandomAnime();
updateReadme(chosen);
