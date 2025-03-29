const Ajv = require('ajv');
const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

function validateManifest() {
  const manifestSchema = require('./manifest.schema.json');
  const manifest = require('./src/manifest.json');
  const ajv = new Ajv({});
  const validate = ajv.compile(manifestSchema);
  const valid = validate(manifest);
  if (!valid) {
    console.error(validate.errors);
    process.exit(1);
  }
}

async function buildJS() {
  await esbuild.build({
    // supports other types like js or ts
    entryPoints: ['src/index.ts'],
    outfile: 'dist/banner-ptl/driver.js',
    bundle: true,
    sourcemap: false,
    // plugins: [NodeModulesPolyfillPlugin()], // include this if you need some node support
    minify: false, // TODO: might want to use true for production build?
    format: 'cjs', // needs to be CJS for now
    target: ['es2020'], // don't go over es2020 because quickjs doesn't support it
  });
}

function arrangeOutputs() {
  const manifestPath = path.join(__dirname, 'src', 'manifest.json');
  const manifestFilesPath = path.join(__dirname, 'dist', 'banner-ptl');
  if (!fs.existsSync(manifestFilesPath)) fs.mkdirSync(manifestFilesPath, { recursive: true });
  fs.copyFileSync(manifestPath, path.join(manifestFilesPath, 'manifest.json'));
}

async function main() {
  validateManifest();

  await buildJS();

  arrangeOutputs();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
