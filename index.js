/**
 * @format
 */

import { AppRegistry } from "react-native";
// @see https://reactnavigation.org/docs/getting-started/#installing-dependencies-into-a-bare-react-native-project
import "react-native-gesture-handler";

import App from "./App";
import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => App);
