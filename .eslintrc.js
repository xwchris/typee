module.exports = {
    "extends": "airbnb",
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "import/no-extraneous-dependencies": ["error", { "devDependencies": true }],
        "react/prop-types": [0],
    },
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
};