import globals from "globals";
import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";


export default [
  js.configs.recommended,
  { ignores: ["*.config.*"] },
  {
    plugins: {
      '@stylistic': stylistic
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      ecmaVersion: "latest",
      sourceType: "module",   
    },

    rules: {
      "@stylistic/max-len": [1, 120, 2, { "ignoreComments": true }],
      "no-unused-vars": "warn",
      "no-console": "off",
      "@stylistic/comma-dangle": ["warn", "only-multiline"],
      "@stylistic/semi": ["warn", "always"],
      "@stylistic/quotes": [2, "single",
        {
          allowTemplateLiterals: true,
          avoidEscape: true,
        },
      ],
      "camelcase": ["error", {"properties": "always"}],
      "dot-notation": "warn",
      "@stylistic/space-before-function-paren": "off",
      "@stylistic/indent": ["warn", 2],
      "@stylistic/padded-blocks": "off",
      "@stylistic/no-trailing-spaces": "warn",
      "@stylistic/array-bracket-spacing": "warn",
      "@stylistic/no-multi-spaces": ["error", { "ignoreEOLComments": true }],
      "no-var": "error",
    },
  },
];
