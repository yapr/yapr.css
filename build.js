const esbuild = require('esbuild');

const outputs = [false, true].map((minify) => ({
  entryPoints: ['src/yapr.css'],
  outfile: minify ? 'dist/yapr.min.css' : 'dist/yapr.css',
  bundle: true,
  minify,
  logLevel: 'info',
}));

async function build() {
  if (!process.argv.includes('--watch')) {
    await Promise.all(outputs.map((options) => esbuild.build(options)));
    return;
  }
  const contexts = await Promise.all(outputs.map((options) => esbuild.context(options)));
  await Promise.all(contexts.map((context) => context.watch()));
}

build().catch((error) => {
  console.error('Build failed:', error);
  process.exitCode = 1;
});
