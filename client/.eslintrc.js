process.chdir(__dirname);
 
module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    allowImportExportEverywhere: true,
    codeFrame: false
  },
  extends: [
    'airbnb-standard',
  ],
  rules: {
    'comma-dangle': [
      'error', 
      'always-multiline'
    ],
    'class-methods-use-this': 'off',
    'linebreak-style': 'off',
    'no-console': 'off',
    'no-plusplus': 'off',
    'no-restricted-syntax': [
        'error',
        {
          'selector': 'CallExpression[callee.object.name="console"][callee.property.name!=/^(log|warn|error|info|trace)$/]',
          'message': 'Unexpected property on console object was called'
        }
    ],
    'no-void': 'off',
    'import/prefer-default-export': 'off',
    strict: [
      'error', 
      'global'
    ],
  },
  globals: {
    fetch: false
  }
};