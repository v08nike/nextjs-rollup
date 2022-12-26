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
      format: "cjs",
      exports: "named",
      file: 'dist/bundle.min.js',
    }
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
