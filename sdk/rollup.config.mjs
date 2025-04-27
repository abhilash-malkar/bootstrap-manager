import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/index.js', // Entry point of your SDK
  output: [
    {
      file: 'dist/bootstrap-sdk.esm.js', // ES Module format
      format: 'esm',
      sourcemap: true,
    },
    {
      file: 'dist/bootstrap-sdk.umd.js', // UMD format (works everywhere)
      format: 'umd',
      name: 'BootstrapManager', // Global variable name for UMD build
      sourcemap: true,
    },
    {
      file: 'dist/bootstrap-sdk.umd.min.js', // Minified UMD format
      format: 'umd',
      name: 'BootstrapManager',
      plugins: [terser()], // Apply minification
      sourcemap: true,
    },
  ],
  plugins: [
    resolve(), // Helps Rollup find external modules
    commonjs(), // Converts CommonJS modules to ES6
  ],
}; 