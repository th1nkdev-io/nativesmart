export default [
  {
    ignores: ["dist/**", "build/**", "coverage/**", "node_modules/**"]
  },
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module"
    },
    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-unused-vars": "off"
    }
  }
];
