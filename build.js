const esbuild = require('esbuild');

esbuild.build({
    entryPoints: ['src/yapr.css'],
    outfile: 'dist/yapr.min.css',
    minify: true,
    bundle: true,
    logLevel: 'info'
}).catch(() => process.exit(1));
