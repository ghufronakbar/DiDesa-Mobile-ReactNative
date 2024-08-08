import "ts-node/register";
import { ExpoConfig } from "expo/config";

const config: ExpoConfig = {
  name: "DiDesa",
  slug: "DiDesa",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/images/logo.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  ios: {
    bundleIdentifier: "com.didesa",
    supportsTablet: true,
    infoPlist: {
      NSFaceIDUsageDescription:
        "This app uses Face ID to authenticate the user.",
    },
  },
  android: {
    package: "com.didesa",
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  plugins: [
    [
      "expo-local-authentication",
      {
        faceIDPermission: "Allow $(PRODUCT_NAME) to use Face ID.",
      },
    ],
  ],
  extra: {
    eas: {
      projectId: "2073be0f-3741-4494-a6fe-f7c3ffb52bba",
    },
  },  
};

export default config;
