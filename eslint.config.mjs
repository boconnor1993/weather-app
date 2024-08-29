import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";
import eslintPluginPrettier from "eslint-plugin-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
});

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  ...compat.extends("airbnb-base"),
  ...compat.extends("prettier"),
  {
    languageOptions: {
      globals: {
        document: "readonly", // Add browser global for document
        window: "readonly",   // Add window global
        alert: "readonly",    // Add alert global
      },
    },
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      "prettier/prettier": "error",
      "arrow-body-style": ["error", "always"],
      "no-alert": "off", // Disable no-alert rule if you want to allow alert usage
    },
  },
];
