import React from 'react';
import { defaultDarkTheme } from '../theme/tokens';

// Import All 32 Widgets
import { MusicPlayerLargeWidget } from './W01_MusicPlayerLarge';
import { MusicPlayerMediumWidget } from './W02_MusicPlayerMedium';
import { MusicPlayerMiniWidget } from './W03_MusicPlayerMini';
import { WeatherSmallWidget } from './W04_WeatherSmall';
import { WeatherMediumWidget } from './W05_WeatherMedium';
import { WeatherLargeWidget } from './W06_WeatherLarge';
import { ClockDigitalWidget } from './W07_ClockDigital';
import { ClockAnalogWidget } from './W08_ClockAnalog';
import { ClockAnalogLargeWidget } from './W09_ClockAnalogLarge';
import { ClockDateWidget } from './W10_ClockDate';
import { ClockWorldWidget } from './W11_ClockWorld';
import { CalendarFullWidget } from './W12_CalendarFull';
import { CalendarMiniWidget } from './W13_CalendarMini';
import { MapsSearchWidget } from './W14_MapsSearch';
import { ShortcutsWidget } from './W15_Shortcuts';
import { NewsLightWidget } from './W16_NewsLight';
import { NewsDarkWidget } from './W17_NewsDark';
import { BatteryWidget } from './W18_Battery';
import { QuickSettingsWidget } from './W19_QuickSettings';
import { NotesDarkWidget } from './W20_NotesDark';
import { NotesLightWidget } from './W21_NotesLight';
import { TranslatorHistoryWidget } from './W22_TranslatorHistory';
import { GamingWidget } from './W23_Gaming';
import { StorageRingWidget } from './W24_StorageRing';
import { CPUMonitorWidget } from './W25_CPUMonitor';
import { PomodoroWidget } from './W26_Pomodoro';
import { HabitGridWidget } from './W27_HabitGrid';
import { VoiceMemoWidget } from './W28_VoiceMemo';
import { StepCounterWidget } from './W29_StepCounter';
import { HeartRateWidget } from './W30_HeartRate';
import { NetworkSpeedWidget } from './W31_NetworkSpeed';
import { SleepTrackerWidget } from './W32_SleepTracker';

export async function widgetTaskHandler(props) {
  const { widgetAction, widgetInfo, renderWidget } = props;
  if (!widgetInfo) return;
  const { widgetName } = widgetInfo;

  const currentTheme = defaultDarkTheme;

  // For time widgets, fetch current time
  const date = new Date();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const dayNumber = date.getDate().toString();
  const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
  const monthName = date.toLocaleDateString('en-US', { month: 'short' });
  const dateString = `${dayName}, ${dayNumber} ${monthName}`;

  switch (widgetAction) {
    case 'WIDGET_ADDED':
    case 'WIDGET_UPDATE':
    case 'WIDGET_RESIZED':
      switch (widgetName) {
        case 'MusicPlayerLarge':
          renderWidget(<MusicPlayerLargeWidget theme={currentTheme} />);
          break;
        case 'MusicPlayerMedium':
          renderWidget(<MusicPlayerMediumWidget theme={currentTheme} />);
          break;
        case 'MusicPlayerMini':
          renderWidget(<MusicPlayerMiniWidget theme={currentTheme} />);
          break;
        case 'WeatherSmall':
          renderWidget(<WeatherSmallWidget theme={currentTheme} />);
          break;
        case 'WeatherMedium':
          renderWidget(<WeatherMediumWidget theme={currentTheme} />);
          break;
        case 'WeatherLarge':
          renderWidget(<WeatherLargeWidget theme={currentTheme} />);
          break;
        case 'ClockDigital':
          renderWidget(<ClockDigitalWidget hours={hours} minutes={minutes} dateString={dateString} theme={currentTheme} />);
          break;
        case 'ClockAnalog':
          renderWidget(<ClockAnalogWidget hours={parseInt(hours)} minutes={parseInt(minutes)} theme={currentTheme} />);
          break;
        case 'ClockAnalogLarge':
          renderWidget(<ClockAnalogLargeWidget hours={parseInt(hours)} minutes={parseInt(minutes)} dateString={dateString} theme={currentTheme} />);
          break;
        case 'ClockDate':
          renderWidget(<ClockDateWidget dayNumber={dayNumber} dayName={dayName} monthName={monthName} theme={currentTheme} />);
          break;
        case 'ClockWorld':
          renderWidget(<ClockWorldWidget theme={currentTheme} />);
          break;
        case 'CalendarFull':
          renderWidget(<CalendarFullWidget theme={currentTheme} />);
          break;
        case 'CalendarMini':
          renderWidget(<CalendarMiniWidget theme={currentTheme} />);
          break;
        case 'MapsSearch':
          renderWidget(<MapsSearchWidget theme={currentTheme} />);
          break;
        case 'Shortcuts':
          renderWidget(<ShortcutsWidget theme={currentTheme} />);
          break;
        case 'NewsLight':
          renderWidget(<NewsLightWidget theme={currentTheme} />);
          break;
        case 'NewsDark':
          renderWidget(<NewsDarkWidget theme={currentTheme} />);
          break;
        case 'Battery':
          renderWidget(<BatteryWidget theme={currentTheme} />);
          break;
        case 'QuickSettings':
          renderWidget(<QuickSettingsWidget theme={currentTheme} />);
          break;
        case 'NotesDark':
          renderWidget(<NotesDarkWidget theme={currentTheme} />);
          break;
        case 'NotesLight':
          renderWidget(<NotesLightWidget theme={currentTheme} />);
          break;
        case 'TranslatorHistory':
          renderWidget(<TranslatorHistoryWidget theme={currentTheme} />);
          break;
        case 'Gaming':
          renderWidget(<GamingWidget theme={currentTheme} />);
          break;
        case 'StorageRing':
          renderWidget(<StorageRingWidget theme={currentTheme} />);
          break;
        case 'CPUMonitor':
          renderWidget(<CPUMonitorWidget theme={currentTheme} />);
          break;
        case 'Pomodoro':
          renderWidget(<PomodoroWidget theme={currentTheme} />);
          break;
        case 'HabitGrid':
          renderWidget(<HabitGridWidget theme={currentTheme} />);
          break;
        case 'VoiceMemo':
          renderWidget(<VoiceMemoWidget theme={currentTheme} />);
          break;
        case 'StepCounter':
          renderWidget(<StepCounterWidget theme={currentTheme} />);
          break;
        case 'HeartRate':
          renderWidget(<HeartRateWidget theme={currentTheme} />);
          break;
        case 'NetworkSpeed':
          renderWidget(<NetworkSpeedWidget theme={currentTheme} />);
          break;
        case 'SleepTracker':
          renderWidget(<SleepTrackerWidget theme={currentTheme} />);
          break;
        default:
          console.warn(`Unknown widget: ${widgetName}`);
      }
      break;

    case 'WIDGET_CLICK':
      console.log(`Widget ${widgetName} clicked, action: ${props.clickAction}`);
      break;

    case 'WIDGET_DELETED':
      console.log(`Widget ${widgetName} deleted from home screen.`);
      break;
  }
}
