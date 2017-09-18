module.exports = {
    "extends": "airbnb",
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "react/prop-types": 0,
        "import/no-extraneous-dependencies": ["error", { "devDependencies": false, "optionalDependencies": false, "peerDependencies": false }],
    },
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
};