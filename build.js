const esbuild = require('esbuild');

const buildOptions = {
    entryPoints: ['src/yapr.css'],
    bundle: true,
    logLevel: 'info',
    watch: true,  // Auto-build on file changes
};

// Formatted version (for development)
esbuild.build({
    ...buildOptions,
    outfile: 'dist/yapr.css',
    minify: false,
}).catch(() => process.exit(1));

// Minified version (for production)
esbuild.build({
    ...buildOptions,
    outfile: 'dist/yapr.min.css',
    minify: true,
}).catch(() => process.exit(1));

console.log('👀 Watching for changes in src/...');
