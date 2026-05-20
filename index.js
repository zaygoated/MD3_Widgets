import { registerWidgetTaskHandler } from 'react-native-android-widget';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { widgetTaskHandler } from './src/widgets/widgetTaskHandler';

// Register the background widget task handler
registerWidgetTaskHandler(widgetTaskHandler);

// Register the main App component
AppRegistry.registerComponent(appName, () => App);
