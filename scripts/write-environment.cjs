const fs = require('node:fs');
const path = require('node:path');

const root = process.cwd();
const mode = process.argv.includes('--prod') ? 'prod' : 'dev';
const envFile = path.join(root, '.env.local');

function readDotEnv(filePath) {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  return fs.readFileSync(filePath, 'utf8')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .reduce((acc, line) => {
      const separatorIndex = line.indexOf('=');
      if (separatorIndex === -1) {
        return acc;
      }

      const key = line.slice(0, separatorIndex).trim();
      const value = line.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, '');
      acc[key] = value;
      return acc;
    }, {});
}

const localEnv = readDotEnv(envFile);
const tmdbApiKey = process.env.TMDB_API_KEY || localEnv.TMDB_API_KEY;

if (!tmdbApiKey) {
  const sourceHint = mode === 'prod'
    ? 'Set the TMDB_API_KEY environment variable, GitHub Actions secret, or GitHub Actions variable.'
    : 'Create a .env.local file with TMDB_API_KEY=your_key.';

  console.error(`Missing TMDB_API_KEY. ${sourceHint}`);
  process.exit(1);
}

const outputFile = mode === 'prod' ? 'environment.prod.generated.ts' : 'environment.local.ts';
const outputPath = path.join(root, 'src', 'environments', outputFile);
const fileContent = `export const environment = {\n  production: ${mode === 'prod'},\n  theMovieDBApi: ${JSON.stringify(tmdbApiKey)}\n};\n`;

fs.writeFileSync(outputPath, fileContent);
console.log(`Generated ${path.relative(root, outputPath)} from TMDB_API_KEY.`);
