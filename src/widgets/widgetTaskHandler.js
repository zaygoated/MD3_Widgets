import React from 'react';
import { requestWidgetUpdate } from 'react-native-android-widget';
import { defaultDarkTheme } from '../theme/tokens';
import { getWidgetState, setWidgetState } from './widgetState';
import axios from 'axios';

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

// Mock Playlist
const PLAYLIST = [
  { track: 'Starlight', artist: 'Muse' },
  { track: 'After Hours', artist: 'The Weeknd' },
  { track: 'Blinding Lights', artist: 'The Weeknd' },
  { track: 'Birds of a Feather', artist: 'Billie Eilish' },
  { track: 'Houdini', artist: 'Eminem' }
];

export async function widgetTaskHandler(props) {
  const { widgetAction, widgetInfo, renderWidget } = props;
  if (!widgetInfo) return;
  const { widgetName } = widgetInfo;

  const currentTheme = defaultDarkTheme;
  const state = await getWidgetState();

  // Date and Time Calculations
  const date = new Date();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const dayNumber = date.getDate().toString();
  const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
  const monthName = date.toLocaleDateString('en-US', { month: 'short' });
  const dateString = `${dayName}, ${dayNumber} ${monthName}`;

  const renderSelectedWidget = () => {
    switch (widgetName) {
      case 'MusicPlayerLarge':
        renderWidget(
          <MusicPlayerLargeWidget
            trackName={state.music_track}
            artistName={state.music_artist}
            isPlaying={state.music_playing}
            progressPercent={state.music_progress}
            theme={currentTheme}
          />
        );
        break;
      case 'MusicPlayerMedium':
        renderWidget(
          <MusicPlayerMediumWidget
            trackName={state.music_track}
            artistName={state.music_artist}
            isPlaying={state.music_playing}
            progressPercent={state.music_progress}
            theme={currentTheme}
          />
        );
        break;
      case 'MusicPlayerMini':
        renderWidget(
          <MusicPlayerMiniWidget
            trackName={state.music_track}
            isPlaying={state.music_playing}
            theme={currentTheme}
          />
        );
        break;
      case 'WeatherSmall':
        renderWidget(
          <WeatherSmallWidget
            temp={state.weather_temp}
            condition={state.weather_condition}
            city={state.weather_city}
            theme={currentTheme}
          />
        );
        break;
      case 'WeatherMedium':
        renderWidget(
          <WeatherMediumWidget
            temp={state.weather_temp}
            feelsLike={state.weather_feels_like}
            humidity={state.weather_humidity}
            condition={state.weather_condition}
            city={state.weather_city}
            theme={currentTheme}
          />
        );
        break;
      case 'WeatherLarge':
        renderWidget(
          <WeatherLargeWidget
            temp={state.weather_temp}
            condition={state.weather_condition}
            city={state.weather_city}
            hourly={JSON.parse(state.weather_hourly || '[]')}
            theme={currentTheme}
          />
        );
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
        renderWidget(
          <ShortcutsWidget
            wifiEnabled={state.quick_settings_wifi}
            bluetoothEnabled={state.quick_settings_bluetooth}
            locationEnabled={state.quick_settings_dnd}
            theme={currentTheme}
          />
        );
        break;
      case 'NewsLight':
        renderWidget(<NewsLightWidget theme={currentTheme} />);
        break;
      case 'NewsDark':
        renderWidget(<NewsDarkWidget theme={currentTheme} />);
        break;
      case 'Battery':
        renderWidget(<BatteryWidget level={state.step_count % 100} theme={currentTheme} />);
        break;
      case 'QuickSettings':
        renderWidget(
          <QuickSettingsWidget
            wifiEnabled={state.quick_settings_wifi}
            bluetoothEnabled={state.quick_settings_bluetooth}
            dndEnabled={state.quick_settings_dnd}
            alarmEnabled={state.quick_settings_alarm}
            theme={currentTheme}
          />
        );
        break;
      case 'NotesDark':
        renderWidget(<NotesDarkWidget tasks={JSON.parse(state.todo_list || '[]')} theme={currentTheme} />);
        break;
      case 'NotesLight':
        renderWidget(<NotesLightWidget tasks={JSON.parse(state.todo_list || '[]')} theme={currentTheme} />);
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
  };

  switch (widgetAction) {
    case 'WIDGET_ADDED':
    case 'WIDGET_UPDATE':
    case 'WIDGET_RESIZED':
      renderSelectedWidget();
      break;

    case 'WIDGET_CLICK':
      const clickAction = props.clickAction;
      console.log(`Widget ${widgetName} clicked, action: ${clickAction}`);

      // 1. Music Playback Event Controls
      if (clickAction === 'TOGGLE_PLAY') {
        const nextPlaying = !state.music_playing;
        await setWidgetState('music_playing', nextPlaying);
        
        // Update progress dynamically on tap
        if (nextPlaying) {
          const interval = setInterval(async () => {
             const freshState = await getWidgetState();
             if (!freshState.music_playing) {
                clearInterval(interval);
                return;
             }
             let nextProgress = freshState.music_progress + 5;
             if (nextProgress > 100) nextProgress = 0;
             await setWidgetState('music_progress', nextProgress);
             requestWidgetUpdate({ widgetName });
          }, 3000);
        }
      } else if (clickAction === 'NEXT_TRACK') {
        const currentIndex = PLAYLIST.findIndex(s => s.track === state.music_track);
        const nextIndex = (currentIndex + 1) % PLAYLIST.length;
        await setWidgetState('music_track', PLAYLIST[nextIndex].track);
        await setWidgetState('music_artist', PLAYLIST[nextIndex].artist);
        await setWidgetState('music_progress', 0);
      } else if (clickAction === 'PREV_TRACK') {
        const currentIndex = PLAYLIST.findIndex(s => s.track === state.music_track);
        let prevIndex = currentIndex - 1;
        if (prevIndex < 0) prevIndex = PLAYLIST.length - 1;
        await setWidgetState('music_track', PLAYLIST[prevIndex].track);
        await setWidgetState('music_artist', PLAYLIST[prevIndex].artist);
        await setWidgetState('music_progress', 0);
      }

      // 2. Weather Live Refresh (Open-Meteo API integration)
      else if (clickAction === 'REFRESH_WEATHER') {
        try {
          console.log("Fetching live weather from Open-Meteo...");
          // New York default coordinates
          const res = await axios.get('https://api.open-meteo.com/v1/forecast?latitude=40.7128&longitude=-74.0060&current_weather=true&hourly=temperature_2m,weathercode');
          if (res.data && res.data.current_weather) {
             const tempC = res.data.current_weather.temperature;
             const temp = Math.round(tempC);
             const code = res.data.current_weather.weathercode;
             
             let condition = 'Partly Cloudy';
             if (code === 0) condition = 'Sunny';
             else if (code >= 1 && code <= 3) condition = 'Partly Cloudy';
             else if (code >= 45 && code <= 48) condition = 'Foggy';
             else if (code >= 51 && code <= 67) condition = 'Rainy';
             else if (code >= 71 && code <= 77) condition = 'Snowy';
             else if (code >= 80 && code <= 82) condition = 'Showers';
             else if (code >= 95) condition = 'Thunderstorm';

             await setWidgetState('weather_temp', temp);
             await setWidgetState('weather_condition', condition);
             await setWidgetState('weather_feels_like', temp + 1);
             await setWidgetState('weather_humidity', 60);
          }
        } catch (err) {
           console.error("Open-Meteo request failed, using local fallback state", err.message);
        }
      }

      // 3. Quick Settings toggles
      else if (clickAction === 'TOGGLE_WIFI') {
         await setWidgetState('quick_settings_wifi', !state.quick_settings_wifi);
      } else if (clickAction === 'TOGGLE_BT') {
         await setWidgetState('quick_settings_bluetooth', !state.quick_settings_bluetooth);
      } else if (clickAction === 'TOGGLE_DND') {
         await setWidgetState('quick_settings_dnd', !state.quick_settings_dnd);
      } else if (clickAction === 'TOGGLE_FLASHLIGHT') {
         await setWidgetState('quick_settings_alarm', !state.quick_settings_alarm);
      } else if (clickAction === 'TOGGLE_TODO') {
         const todoId = props.clickActionData?.id; // <--- FIX APPLIED HERE
         const todos = JSON.parse(state.todo_list || '[]');
         const updatedTodos = todos.map(todo => {
             if (todo.id === todoId) {
                 return { ...todo, completed: !todo.completed };
             }
             return todo;
         });
         await setWidgetState('todo_list', updatedTodos);
      }

      // Re-fetch state and render the updated widget layout immediately
      const updatedState = await getWidgetState();
      switch (widgetName) {
        case 'MusicPlayerLarge':
          renderWidget(
            <MusicPlayerLargeWidget
              trackName={updatedState.music_track}
              artistName={updatedState.music_artist}
              isPlaying={updatedState.music_playing}
              progressPercent={updatedState.music_progress}
              theme={currentTheme}
            />
          );
          break;
        case 'MusicPlayerMedium':
          renderWidget(
            <MusicPlayerMediumWidget
              trackName={updatedState.music_track}
              artistName={updatedState.music_artist}
              isPlaying={updatedState.music_playing}
              progressPercent={updatedState.music_progress}
              theme={currentTheme}
            />
          );
          break;
        case 'MusicPlayerMini':
          renderWidget(
            <MusicPlayerMiniWidget
              trackName={updatedState.music_track}
              isPlaying={updatedState.music_playing}
              theme={currentTheme}
            />
          );
          break;
        case 'WeatherSmall':
          renderWidget(
            <WeatherSmallWidget
              temp={updatedState.weather_temp}
              condition={updatedState.weather_condition}
              city={updatedState.weather_city}
              theme={currentTheme}
            />
          );
          break;
        case 'WeatherMedium':
          renderWidget(
            <WeatherMediumWidget
              temp={updatedState.weather_temp}
              feelsLike={updatedState.weather_feels_like}
              humidity={updatedState.weather_humidity}
              condition={updatedState.weather_condition}
              city={updatedState.weather_city}
              theme={currentTheme}
            />
          );
          break;
        case 'WeatherLarge':
          renderWidget(
            <WeatherLargeWidget
              temp={updatedState.weather_temp}
              condition={updatedState.weather_condition}
              city={updatedState.weather_city}
              hourly={JSON.parse(updatedState.weather_hourly || '[]')}
              theme={currentTheme}
            />
          );
          break;
        case 'Shortcuts':
          renderWidget(
            <ShortcutsWidget
              wifiEnabled={updatedState.quick_settings_wifi}
              bluetoothEnabled={updatedState.quick_settings_bluetooth}
              locationEnabled={updatedState.quick_settings_dnd}
              theme={currentTheme}
            />
          );
          break;
        case 'QuickSettings':
          renderWidget(
            <QuickSettingsWidget
              wifiEnabled={updatedState.quick_settings_wifi}
              bluetoothEnabled={updatedState.quick_settings_bluetooth}
              dndEnabled={updatedState.quick_settings_dnd}
              alarmEnabled={updatedState.quick_settings_alarm}
              theme={currentTheme}
            />
          );
          break;
        case 'NotesDark':
          renderWidget(<NotesDarkWidget tasks={JSON.parse(updatedState.todo_list || '[]')} theme={currentTheme} />);
          break;
        case 'NotesLight':
          renderWidget(<NotesLightWidget tasks={JSON.parse(updatedState.todo_list || '[]')} theme={currentTheme} />);
          break;
        default:
          renderSelectedWidget();
      }
      break;

    case 'WIDGET_DELETED':
      console.log(`Widget ${widgetName} deleted from home screen.`);
      break;
  }
}
