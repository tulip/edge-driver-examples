const Ajv = require('ajv');
const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

function validateManifest() {
  const manifestSchema = require('@tulip/edge-driver-sdk/manifest.schema.json');
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
    outfile: 'dist/example/driver.js',
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
  const manifestFilesPath = path.join(__dirname, 'dist', 'example');

  // Create directory if it doesn't exist
  if (!fs.existsSync(manifestFilesPath)) {
    fs.mkdirSync(manifestFilesPath, { recursive: true });
  }

  // Get the edge-driver-sdk version.
  const sdkPackagePath = path.join(
    __dirname,
    'node_modules',
    '@tulip',
    'edge-driver-sdk',
    'package.json',
  );
  const sdkPackageContent = fs.readFileSync(sdkPackagePath, 'utf8');
  const sdkPackage = JSON.parse(sdkPackageContent);
  const edgeDriverSdkVersion = sdkPackage.version;
  if (!edgeDriverSdkVersion) {
    throw new Error('@tulip/edge-driver-sdk version not found in package.json');
  }

  // Read current manifest file, delete $schema, and add version.
  const manifestContent = fs.readFileSync(manifestPath, 'utf8');
  const manifest = JSON.parse(manifestContent);
  delete manifest['$schema'];
  manifest.edgeDriverSdkVersion = edgeDriverSdkVersion;

  // Save the new manifest.
  fs.writeFileSync(
    path.join(manifestFilesPath, 'manifest.json'),
    JSON.stringify(manifest, null, 2),
  );

  console.log(
    `Successfully copied manifest hydrated with edgeDriverSdkVersion: ${edgeDriverSdkVersion}`,
  );
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
