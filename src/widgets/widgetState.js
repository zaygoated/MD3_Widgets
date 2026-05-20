import AsyncStorage from '@react-native-async-storage/async-storage';

const DEFAULT_STATE = {
  music_playing: false,
  music_track: 'Starlight',
  music_artist: 'Muse',
  music_progress: 45,
  weather_temp: 22,
  weather_condition: 'Partly Cloudy',
  weather_feels_like: 24,
  weather_humidity: 65,
  weather_city: 'New York',
  weather_hourly: JSON.stringify([
    { time: '12 PM', temp: 22, condition: 'Sunny' },
    { time: '3 PM', temp: 24, condition: 'Sunny' },
    { time: '6 PM', temp: 21, condition: 'Partly Cloudy' },
    { time: '9 PM', temp: 18, condition: 'Cloudy' }
  ]),
  quick_settings_wifi: true,
  quick_settings_bluetooth: false,
  quick_settings_dnd: false,
  quick_settings_alarm: true,
  todo_list: JSON.stringify([
    { id: 1, text: 'Buy fresh groceries', completed: false },
    { id: 2, text: 'Design MD3 Widgets', completed: true },
    { id: 3, text: 'Push codebase to GitHub', completed: false },
    { id: 4, text: 'Schedule EAS production build', completed: false }
  ]),
  habit_grid: JSON.stringify({
    'Drink Water': [true, true, false, true, true, false, true],
    'Exercise': [true, false, false, true, false, true, true],
    'Read Book': [false, true, true, false, true, true, false]
  }),
  pomodoro_seconds: 1500,
  pomodoro_active: false,
  step_count: 5420,
  heart_rate: 72,
  storage_free: 75, // percentage
  cpu_load: 34,
  ram_load: 58,
  network_download: 45.2,
  network_upload: 12.8,
  sleep_hours: 7,
  sleep_minutes: 45,
  sleep_score: 84
};

export async function getWidgetState() {
  try {
    const keys = Object.keys(DEFAULT_STATE);
    const pairs = await AsyncStorage.multiGet(keys);
    const state = {};
    pairs.forEach(([key, val]) => {
      if (val === null) {
        state[key] = DEFAULT_STATE[key];
      } else {
        // Parse numbers and booleans
        if (val === 'true') state[key] = true;
        else if (val === 'false') state[key] = false;
        else if (!isNaN(val) && val.trim() !== '') state[key] = Number(val);
        else state[key] = val;
      }
    });
    return state;
  } catch (e) {
    console.error('Failed to get widget state:', e);
    return DEFAULT_STATE;
  }
}

export async function setWidgetState(key, value) {
  try {
    const valStr = typeof value === 'object' ? JSON.stringify(value) : String(value);
    await AsyncStorage.setItem(key, valStr);
  } catch (e) {
    console.error(`Failed to set widget state for ${key}:`, e);
  }
}

export async function resetWidgetState() {
  try {
    const pairs = Object.entries(DEFAULT_STATE).map(([key, val]) => [
      key,
      typeof val === 'object' ? JSON.stringify(val) : String(val)
    ]);
    await AsyncStorage.multiSet(pairs);
  } catch (e) {
    console.error('Failed to reset widget state:', e);
  }
}
