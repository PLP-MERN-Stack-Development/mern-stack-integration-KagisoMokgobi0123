module.exports = {
  presets: [
    "@babel/preset-env", // Transpile modern JS
    "@babel/preset-react", // Transpile JSX
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties", // Optional: class fields
    "@babel/plugin-transform-runtime", // Optional: async/await and helpers
  ],
};
