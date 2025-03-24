import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  input: './sw.js', // The file you made in step #1
  output: {
    file: 'public/sw.js', // Output one bundled file to /public
    format: 'es', // Use ES module output
  },
  plugins: [
    resolve(), // So Rollup can resolve imports from node_modules
    commonjs(), // So Rollup can convert any CommonJS modules to ES
  ],
};
