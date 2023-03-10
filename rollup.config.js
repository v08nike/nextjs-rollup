import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import terser from '@rollup/plugin-terser';
import path from "path";

import pkg from "./package.json";

const extensions = [".js", ".jsx", ".ts", ".tsx", ".json"];
const babelConfig = path.resolve(__dirname, "babel.config.js");

export default {
  input: "pages/index.js",
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      exports: 'named',
      sourcemap: false,
    },
    // {
    //     file: 'dist/index.es.js',
    //     format: 'es',
    //     exports: 'named',
    // },
  ],
  plugins: [
    babel({
      extensions,
      babelrc: false,
      babelHelpers: "bundled",
      configFile: babelConfig,
      exclude: "node_modules/**",
    }),
    resolve({ extensions }),
    commonjs({ extensions }),
    terser()
  ],
  external: [
    "next/app",
    "effector-react/ssr",
    ...Object.keys(Object.assign({}, pkg.dependencies, pkg.peerDependencies)),
  ],
};
