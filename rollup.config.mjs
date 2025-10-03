import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import replace from '@rollup/plugin-replace';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'src/lib/sdk-entry.tsx',
  output: {
    file: 'dist/flint-form.js',
    format: 'umd',
    name: 'FlintForm',
    globals: {},
    sourcemap: false,
    compact: true,
    strict: true,
    freeze: true,
    esModule: false,
    intro: '/* Flint Form SDK v1.0.0 | MIT License | https://flintform.com */'
  },
  external: [],
  treeshake: {
    moduleSideEffects: false,
    propertyReadSideEffects: false,
    unknownGlobalSideEffects: false
  },
  plugins: [
    replace({
      'use client': '',
      '"use client";': '',
      "'use client';": '',
      delimiters: ['', ''],
      preventAssignment: true
    }),
    resolve({
      browser: true,
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      preferBuiltins: false,
      dedupe: ['react', 'react-dom']
    }),
    commonjs({
      include: /node_modules/,
      transformMixedEsModules: true,
      ignoreDynamicRequires: true
    }),
    typescript({
      tsconfig: './tsconfig.sdk.json',
      declaration: true,
      declarationDir: './dist',
      removeComments: true
    }),
    // Bundle Tailwind CSS - inject into JS
    postcss({
      extensions: ['.css'],
      inject: (cssVariableName) => {
        return `
          (function() {
            if (typeof document !== 'undefined') {
              var style = document.createElement('style');
              style.id = 'flint-form-styles';
              style.textContent = ${cssVariableName};
              if (!document.getElementById('flint-form-styles')) {
                document.head.appendChild(style);
              }
            }
          })();
        `;
      },
      minimize: true,
      config: {
        path: './postcss.config.js'
      }
    }),
    babel({
      babelHelpers: 'bundled',
      presets: [
        ['@babel/preset-react', { 
          runtime: 'automatic',
          development: false
        }],
        '@babel/preset-typescript'
      ],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      exclude: 'node_modules/**',
      compact: true,
      minified: true
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      preventAssignment: true
    }),
    terser({
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.debug'],
        passes: 2,
        unsafe: true,
        unsafe_math: true,
        unsafe_methods: true
      },
      mangle: {
        properties: {
          regex: /^_/
        }
      },
      format: {
        comments: false,
        preamble: '/* Flint Form SDK v1.0.0 */'
      }
    })
  ]
};