const esbuild = require('esbuild');

async function build() {
  try {
    const context = await esbuild.context({
      entryPoints: ['src/yapr.css'],
      bundle: true,
      logLevel: 'info',
    });

    // Watch mode
    await context.watch();
    console.log('👀 Watching for changes in src/...');

    // Regular builds
    await esbuild.build({
      entryPoints: ['src/yapr.css'],
      outfile: 'dist/yapr.css',
      minify: false,
      bundle: true,
      logLevel: 'info',
    });

    await esbuild.build({
      entryPoints: ['src/yapr.css'],
      outfile: 'dist/yapr.min.css',
      minify: true,
      bundle: true,
      logLevel: 'info',
    });

  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

build();
