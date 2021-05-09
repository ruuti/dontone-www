module.exports = {
  "env": {
    "commonjs": true,
    "es2021": true,
    "node": true
  },
  "extends": "eslint:all",
  "ignorePatterns": [
    "node_modules/",
    ".docs/",
    "dist/"
  ],
  "parserOptions": {
    "ecmaVersion": 12
  },
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "no-magic-numbers": ["off"],
    "object-curly-newline": [
      "error",
      {
        "ObjectExpression": "always",
        "ObjectPattern": {
          "minProperties": 1,
          "multiline": true
        }
      }
    ],
    "one-var": ["off"],
    "quotes": [
      "error",
      "double"
    ],
    "require-unicode-regexp": ["off"],
    "semi": [
      "error",
      "always"
    ],
    "strict": ["off"]
  }
};
