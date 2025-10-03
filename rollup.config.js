import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import replace from '@rollup/plugin-replace';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';

// Plugin to remove "use client" directives during build
const removeUseClient = () => ({
  name: 'remove-use-client',
  transform(code, id) {
    if (id.includes('node_modules')) return null;
    if (code.includes('"use client"') || code.includes("'use client'")) {
      return {
        code: code.replace(/['"]use client['"];?\s*/g, ''),
        map: null
      };
    }
    return null;
  }
});

const commonPlugins = [
  removeUseClient(),
  resolve({
    browser: true,
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  }),
  commonjs(),
  babel({
    babelHelpers: 'bundled',
    presets: [
      ['@babel/preset-react', { runtime: 'automatic' }],
      '@babel/preset-typescript'
    ],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    exclude: 'node_modules/**'
  }),
  replace({
    'process.env.NODE_ENV': JSON.stringify('production'),
    preventAssignment: true
  })
];

export default [
  // Standalone UMD build (React bundled inside) - MAIN BUILD
  {
    input: 'src/lib/sdk-entry.tsx',
    output: {
      file: 'dist/dynamic-form-sdk.js',
      format: 'umd',
      name: 'DynamicFormSDK',
      sourcemap: true
    },
    plugins: [
      ...commonPlugins,
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
        exclude: ['**/*.test.tsx', '**/*.test.ts', 'src/app/**/*']
      }),
      postcss({
        extract: false,
        inject: false,
        minimize: true,
        modules: false
      }),
      terser()
    ]
  }
];
