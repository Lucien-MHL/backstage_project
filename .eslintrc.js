module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  eslintIgnore: [
    '/dist',
    '/node_modules',
    '*.html',
    '*.json',
    'webpack.config.js',
    '.eslintrc.js'
  ],
  extends: ['plugin:react/recommended', 'airbnb'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    semi: ['off'], // 不使用分號
    'import/extensions': ['off'], // import 檔案時是否加上副檔名
    'react/destructuring-assignment': ['off'], // 是否使用解構
    'react/prop-types': ['off'], // 除非公司規定，否則建議關掉
    radix: ['off'],
    'max-len': ['off'], // 關閉最大長度限制
    'import/prefer-default-export': ['off'], // 檔案只有一個 export 時是否用 export default
    'linebreak-style': ['error', 'windows'], // 換行規則
    'operator-linebreak': [2, 'after'], //可加可不加
    'jsx-quotes': ['error', 'prefer-single'], // React JSX 語法
    'no-param-reassign': ['error', { props: false }], // 變數命名是否可以重複，但盡量別用
    // 參考資料請見 https://eslint.org/docs/latest/rules/no-param-reassign
    'comma-dangle': ['error', 'never'] // 物件的最後一個屬性是否加逗號，此設定為不加逗號
  }
}
