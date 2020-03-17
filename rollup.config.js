import {terser} from 'rollup-plugin-terser';
import {preserveShebangs} from 'rollup-plugin-preserve-shebangs';
import commonjs from '@rollup/plugin-commonjs';
import copy from "rollup-plugin-copy";

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
    commonjs(),
    copy({
      targets: [{
        src: [
          "package.json",
          "package-lock.json",
          "LICENSE",
          "README"
        ],
        dest: 'dist/'
      }]
    })
  ]
}
