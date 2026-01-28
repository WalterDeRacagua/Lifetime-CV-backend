/* eslint-disable */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'prettier',
  ],
  ignorePatterns: ['.eslintrc.js', 'jest.config.js', 'dist/', 'node_modules/'],
  rules: {
    // TypeScript specific rules
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'error', // Obliga a poner tipo de retorno
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': ['error', { fixToUnknown: true }], // Prohíbe 'any'
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: false },
    ],

    // Import rules
    'import/no-unresolved': 'error',
    'import/namespace': 'off',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',   // Node.js modules (fs, path, etc.)
          'external',  // npm packages (express, typeorm, etc.)
          'internal',  // Nuestro código (@config, @services, etc.)
          ['parent', 'sibling', 'index'],
          'type',
        ],
        pathGroups: [
          {
            pattern: '@config/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@entities/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@services/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@controllers/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@middlewares/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@routes/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@utils/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@validators/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@types/**',
            group: 'internal',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        'newlines-between': 'never',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],

    // Prettier
    'prettier/prettier': ['error', { trailingComma: 'all' }],
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
      node: {
        moduleDirectory: ['node_modules', 'src/'],
        extensions: ['.ts', '.js', '.json'],
      },
    },
  },
};