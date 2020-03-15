import {terser} from 'rollup-plugin-terser';
import {preserveShebangs} from 'rollup-plugin-preserve-shebangs';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'build/index.js',
  output: {
    file: 'dist/cli.js',
    format: 'cjs',
    plugins: [
      terser()
    ]
  },
  plugins: [
    preserveShebangs(),
    commonjs()
  ]
}
