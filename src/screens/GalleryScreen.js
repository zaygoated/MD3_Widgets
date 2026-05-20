import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';
import { requestWidgetUpdate } from 'react-native-android-widget';

// Preset seed colors for custom MD3 tonal palette generator
const PRESET_SEEDS = [
  { name: 'Purple', hex: '#6750A4' },
  { name: 'Blue', hex: '#3F51B5' },
  { name: 'Teal', hex: '#009688' },
  { name: 'Green', hex: '#4CAF50' },
  { name: 'Orange', hex: '#FF9800' },
  { name: 'Red', hex: '#F44336' },
  { name: 'Pink', hex: '#E91E63' },
];

const WIDGETS_LIST = [
  // Clocks
  { id: 'W07', name: 'ClockDigital', label: 'Digital Clock', size: '2x1', category: 'Clocks', desc: 'Sleek digital clock with active date pill' },
  { id: 'W08', name: 'ClockAnalog', label: 'Analog Clock', size: '1x1', category: 'Clocks', desc: 'Minimalist analog dial clock' },
  { id: 'W09', name: 'ClockAnalogLarge', label: 'Analog Clock Large', size: '2x2', category: 'Clocks', desc: 'Detailed analog dial clock with date' },
  { id: 'W10', name: 'ClockDate', label: 'Date Display', size: '2x1', category: 'Clocks', desc: 'Typography-focused date badge' },
  { id: 'W11', name: 'ClockWorld', label: 'World Clock', size: '3x1', category: 'Clocks', desc: 'Triple timezone monitor (NY, LDN, TYO)' },
  
  // Music
  { id: 'W01', name: 'MusicPlayerLarge', label: 'Music Player Large', size: '4x1', category: 'Music', desc: 'Full media player with squiggly progress wave' },
  { id: 'W02', name: 'MusicPlayerMedium', label: 'Music Player Medium', size: '2x2', category: 'Music', desc: 'Square album art player' },
  { id: 'W03', name: 'MusicPlayerMini', label: 'Music Player Mini', size: '2x1', category: 'Music', desc: 'Compact controller pill' },

  // Weather
  { id: 'W04', name: 'WeatherSmall', label: 'Weather Small', size: '1x1', category: 'Weather', desc: 'Compact temp & condition badge' },
  { id: 'W05', name: 'WeatherMedium', label: 'Weather Medium', size: '2x1', category: 'Weather', desc: 'Horizontal weather card' },
  { id: 'W06', name: 'WeatherLarge', label: 'Weather Large', size: '2x2', category: 'Weather', desc: 'Full forecast card with 4h strip' },

  // Utilities
  { id: 'W12', name: 'CalendarFull', label: 'Calendar List', size: '3x2', category: 'Utilities', desc: 'Dynamic schedule item list' },
  { id: 'W13', name: 'CalendarMini', label: 'Calendar Mini', size: '2x1', category: 'Utilities', desc: 'Next event summary pill' },
  { id: 'W14', name: 'MapsSearch', label: 'Google Maps Search', size: '4x1', category: 'Utilities', desc: 'Material You search bar with Mic' },
  { id: 'W15', name: 'Shortcuts', label: 'Action Grid', size: '2x2', category: 'Utilities', desc: 'Quick launcher shortcut panels' },
  { id: 'W18', name: 'Battery', label: 'Battery Ring', size: '1x1', category: 'Utilities', desc: 'Circular charge level indicator' },
  { id: 'W19', name: 'QuickSettings', label: 'Quick Toggles', size: '3x2', category: 'Utilities', desc: 'DND, Bluetooth, WiFi tile switches' },
  { id: 'W20', name: 'NotesDark', label: 'Notes Dark', size: '2x2', category: 'Utilities', desc: 'To-do checklist in dark theme' },
  { id: 'W21', name: 'NotesLight', label: 'Notes Light', size: '2x2', category: 'Utilities', desc: 'To-do checklist in light theme' },
  { id: 'W24', name: 'StorageRing', label: 'Storage Ring', size: '1x1', category: 'Utilities', desc: 'Segmented disk usage donut chart' },

  // Health
  { id: 'W29', name: 'StepCounter', label: 'Step Counter', size: '1x1', category: 'Health', desc: 'Fitness activity target completion' },
  { id: 'W30', name: 'HeartRate', label: 'Heart Rate Monitor', size: '2x1', category: 'Health', desc: 'Realtime pulse wave monitor' },
  { id: 'W32', name: 'SleepTracker', label: 'Sleep Tracker', size: '2x2', category: 'Health', desc: 'Sleep cycle stepped chart stages' },

  // Advanced Utilities
  { id: 'W25', name: 'CPUMonitor', label: 'CPU Monitor', size: '2x2', category: 'Advanced', desc: 'System resource usage monitor' },
  { id: 'W26', name: 'Pomodoro', label: 'Pomodoro Timer', size: '1x1', category: 'Advanced', desc: 'Focus sessions task count-down' },
  { id: 'W27', name: 'HabitGrid', label: 'Habit Tracker', size: '2x2', category: 'Advanced', desc: '7-day habit completion matrix' },
  { id: 'W28', name: 'VoiceMemo', label: 'Voice Memo Bar', size: '4x1', category: 'Advanced', desc: 'Instant audio record bar with waveform' },
  { id: 'W31', name: 'NetworkSpeed', label: 'Network Speed', size: '2x1', category: 'Advanced', desc: 'Download/Upload rate dial' },

  // News & Others
  { id: 'W16', name: 'NewsLight', label: 'News Light', size: '2x2', category: 'News', desc: 'RSS-fed card in light theme' },
  { id: 'W17', name: 'NewsDark', label: 'News Dark', size: '2x2', category: 'News', desc: 'RSS-fed card in dark theme' },
  { id: 'W22', name: 'TranslatorHistory', label: 'Translator History', size: '2x3', category: 'News', desc: 'Translation phrase records' },
  { id: 'W23', name: 'Gaming', label: 'Gaming status', size: '2x1', category: 'News', desc: 'Friend status active monitor' },
];

const CATEGORIES = ['All', 'Clocks', 'Music', 'Weather', 'Utilities', 'Health', 'Advanced', 'News'];

export function GalleryScreen() {
  const { theme, isDark, seedColor, setIsDark, setSeedColor } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [statusMessage, setStatusMessage] = useState('');

  const filteredWidgets = WIDGETS_LIST.filter(
    (w) => selectedCategory === 'All' || w.category === selectedCategory
  );

  const handleTriggerUpdate = async (widgetName) => {
    try {
      await requestWidgetUpdate({ widgetName });
      setStatusMessage(`Triggered update for ${widgetName}!`);
      setTimeout(() => setStatusMessage(''), 2500);
    } catch (e) {
      console.warn(e);
      setStatusMessage(`Update request sent (if widget exists on home screen)`);
      setTimeout(() => setStatusMessage(''), 2500);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.onSurface }]}>Material You Widgets</Text>
        <Text style={[styles.headerSub, { color: theme.onSurfaceVariant }]}>
          Dynamic MD3 Tonal Palette Gallery
        </Text>
      </View>

      {/* Control Panel */}
      <View style={[styles.panel, { backgroundColor: theme.surfaceVariant, borderColor: theme.outline }]}>
        <View style={styles.controlRow}>
          <Text style={[styles.controlText, { color: theme.onSurface }]}>Dark Theme</Text>
          <Switch
            value={isDark}
            onValueChange={setIsDark}
            thumbColor={theme.primary}
            trackColor={{ false: theme.outlineVariant, true: theme.primaryContainer }}
          />
        </View>

        <Text style={[styles.sectionLabel, { color: theme.onSurfaceVariant }]}>Seed Color Palette</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.colorsContainer}>
          {PRESET_SEEDS.map((preset) => {
            const isSelected = seedColor.toLowerCase() === preset.hex.toLowerCase();
            return (
              <TouchableOpacity
                key={preset.hex}
                style={[
                  styles.colorBadge,
                  { backgroundColor: preset.hex },
                  isSelected && { borderColor: theme.onSurface, borderWidth: 3 },
                ]}
                onPress={() => setSeedColor(preset.hex)}
              >
                {isSelected && (
                  <View style={[styles.selectedIndicator, { backgroundColor: theme.onSurface }]} />
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Status Toast Banner */}
      {statusMessage ? (
        <View style={[styles.toast, { backgroundColor: theme.primaryContainer }]}>
          <Text style={[styles.toastText, { color: theme.onPrimaryContainer }]}>{statusMessage}</Text>
        </View>
      ) : null}

      {/* Category Selection Tab Row */}
      <View style={styles.categoriesRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                onPress={() => setSelectedCategory(cat)}
                style={[
                  styles.categoryTab,
                  isSelected && { backgroundColor: theme.primaryContainer },
                ]}
              >
                <Text
                  style={[
                    styles.categoryTabText,
                    { color: isSelected ? theme.onPrimaryContainer : theme.onSurfaceVariant },
                    isSelected && { fontWeight: 'bold' },
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Grid of Widget Cards */}
      <ScrollView contentContainerStyle={styles.widgetsGrid}>
        {filteredWidgets.map((widget) => (
          <View
            key={widget.id}
            style={[styles.widgetCard, { backgroundColor: theme.surface, borderColor: theme.outlineVariant }]}
          >
            <View style={styles.cardHeader}>
              <View>
                <Text style={[styles.widgetId, { color: theme.primary }]}>{widget.id}</Text>
                <Text style={[styles.widgetLabel, { color: theme.onSurface }]}>{widget.label}</Text>
              </View>
              <View style={[styles.sizeBadge, { backgroundColor: theme.primaryContainer }]}>
                <Text style={[styles.sizeText, { color: theme.onPrimaryContainer }]}>{widget.size}</Text>
              </View>
            </View>

            <Text style={[styles.widgetDesc, { color: theme.onSurfaceVariant }]}>{widget.desc}</Text>

            <TouchableOpacity
              onPress={() => handleTriggerUpdate(widget.name)}
              style={[styles.actionBtn, { backgroundColor: theme.primary }]}
            >
              <Text style={[styles.actionBtnText, { color: theme.onPrimary }]}>Update Widget</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  headerSub: {
    fontSize: 14,
    fontFamily: 'Google Sans',
    marginTop: 4,
  },
  panel: {
    marginHorizontal: 20,
    marginTop: 8,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  controlText: {
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'Google Sans',
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'Google Sans',
    marginBottom: 8,
    letterSpacing: 1.0,
  },
  colorsContainer: {
    flexDirection: 'row',
  },
  colorBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  toast: {
    marginHorizontal: 20,
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  toastText: {
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'Google Sans',
  },
  categoriesRow: {
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 4,
  },
  categoryTabText: {
    fontSize: 13,
    fontFamily: 'Google Sans',
  },
  widgetsGrid: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  widgetCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  widgetId: {
    fontSize: 10,
    fontWeight: 'bold',
    fontFamily: 'Google Sans',
    letterSpacing: 1.0,
  },
  widgetLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    marginTop: 2,
  },
  sizeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  sizeText: {
    fontSize: 10,
    fontWeight: 'bold',
    fontFamily: 'Google Sans',
  },
  widgetDesc: {
    fontSize: 13,
    fontFamily: 'Google Sans',
    marginTop: 8,
    lineHeight: 18,
  },
  actionBtn: {
    marginTop: 14,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
  },
  actionBtnText: {
    fontSize: 13,
    fontWeight: 'bold',
    fontFamily: 'Google Sans',
  },
});
