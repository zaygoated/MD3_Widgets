import { registerRootComponent } from 'expo';
import { registerWidgetTaskHandler } from 'react-native-android-widget';
import App from './App';
import { widgetTaskHandler } from './src/widgets/widgetTaskHandler';

// Register the background widget task handler natively
registerWidgetTaskHandler(widgetTaskHandler);

// Register the main App component safely using Expo's helper
registerRootComponent(App);
