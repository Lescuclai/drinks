import 'expo-env';

export default ({ config }) => ({
    ...config,
    name: "Drink",
    slug: "Drink",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
        supportsTablet: true,
    },
    android: {
        adaptiveIcon: {
            foregroundImage: "./assets/images/adaptive-icon.png",
            backgroundColor: "#ffffff",
        },
    },
    web: {
        bundler: "metro",
        output: "static",
        favicon: "./assets/images/favicon.png",
    },
    plugins: [
        "expo-router",
        [
            "expo-splash-screen",
            {
                image: "./assets/images/splash-icon.png",
                imageWidth: 200,
                resizeMode: "contain",
                backgroundColor: "#ffffff",
            },
        ],
    ],
    experiments: {
        typedRoutes: true,
    },
    extra: {
        REACT_APP_API_KEY: process.env.REACT_APP_API_KEY,
        REACT_APP_AUTH_DOMAIN: process.env.REACT_APP_AUTH_DOMAIN,
        REACT_APP_PROJECT_ID: process.env.REACT_APP_PROJECT_ID,
        REACT_APP_STORAGE_BUCKET: process.env.REACT_APP_STORAGE_BUCKET,
        REACT_APP_MESSAGING_SENDER_ID: process.env.REACT_APP_MESSAGING_SENDER_ID,
        REACT_APP_APP_ID: process.env.REACT_APP_APP_ID,
        REACT_APP_MEASUREMENT_ID: process.env.REACT_APP_MEASUREMENT_ID,
    },
});