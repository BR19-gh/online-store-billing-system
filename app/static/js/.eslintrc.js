module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['standard'],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        semi: [2, 'always'],
        eqeqeq: [2, 'smart'],
        quotes: ['error', 'double'],
    },
}
