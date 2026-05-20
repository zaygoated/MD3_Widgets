import React from 'react';
import { FlexWidget, SvgWidget } from 'react-native-android-widget';

export function ShortcutsWidget({ wifiEnabled, bluetoothEnabled, locationEnabled, theme }) {
  const currentTheme = theme || {
    surface: '#1C1B1F',
    primary: '#D0BCFF',
    onSurface: '#E6E1E5',
    onSurfaceVariant: '#CAC4D0',
    primaryContainer: '#4F378B',
    onPrimaryContainer: '#EADDFF',
    surfaceVariant: '#49454F',
  };

  const isWifiOn = wifiEnabled !== undefined ? wifiEnabled : true;
  const isBtOn = bluetoothEnabled !== undefined ? bluetoothEnabled : false;
  const isLocOn = locationEnabled !== undefined ? locationEnabled : false;

  const wifiSvg = `
    <svg viewBox="0 0 100 100" width="32" height="32">
      <path d="M50 80 A 6 6 0 1 1 50 79 Z" fill="${isWifiOn ? currentTheme.onPrimaryContainer : currentTheme.onSurface}" />
      <path d="M30 60 A 28 28 0 0 1 70 60" fill="none" stroke="${isWifiOn ? currentTheme.onPrimaryContainer : currentTheme.onSurface}" stroke-width="6" stroke-linecap="round" />
      <path d="M15 45 A 50 50 0 0 1 85 45" fill="none" stroke="${isWifiOn ? currentTheme.onPrimaryContainer : currentTheme.onSurface}" stroke-width="6" stroke-linecap="round" />
    </svg>
  `;

  const bluetoothSvg = `
    <svg viewBox="0 0 100 100" width="32" height="32">
      <path d="M50 15 v70 L70 65 L30 35 L70 35 L30 65 Z" fill="none" stroke="${isBtOn ? currentTheme.onPrimaryContainer : currentTheme.onSurface}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round" />
    </svg>
  `;

  const locationSvg = `
    <svg viewBox="0 0 100 100" width="32" height="32">
      <path d="M50 15 A 25 25 0 0 1 75 40 C 75 60 50 85 50 85 C 50 85 25 60 25 40 A 25 25 0 0 1 50 15 Z" fill="none" stroke="${isLocOn ? currentTheme.onPrimaryContainer : currentTheme.onSurface}" stroke-width="6" />
      <circle cx="50" cy="40" r="8" fill="${isLocOn ? currentTheme.onPrimaryContainer : currentTheme.onSurface}" />
    </svg>
  `;

  const batteryIconSvg = `
    <svg viewBox="0 0 100 100" width="32" height="32">
      <rect x="25" y="20" width="50" height="60" rx="10" fill="none" stroke="${currentTheme.onSurface}" stroke-width="6" />
      <rect x="40" y="10" width="20" height="10" rx="2" fill="${currentTheme.onSurface}" />
      <rect x="33" y="28" width="34" height="44" rx="4" fill="${currentTheme.primary}" />
    </svg>
  `;

  return (
    <FlexWidget
      clickAction="OPEN_APP"
      style={{
        width: 'match_parent',
        height: 'match_parent',
        backgroundColor: currentTheme.surface,
        borderRadius: 24,
        padding: 12,
        justifyContent: 'space-between',
      }}
    >
      <FlexWidget style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
        {/* Wifi */}
        <FlexWidget
          clickAction="TOGGLE_WIFI"
          style={{
            flex: 1,
            height: 'match_parent',
            backgroundColor: isWifiOn ? currentTheme.primaryContainer : currentTheme.surfaceVariant,
            borderRadius: 16,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 4,
          }}
        >
          <SvgWidget svg={wifiSvg} style={{ width: 32, height: 32 }} />
        </FlexWidget>

        {/* Bluetooth */}
        <FlexWidget
          clickAction="TOGGLE_BT"
          style={{
            flex: 1,
            height: 'match_parent',
            backgroundColor: isBtOn ? currentTheme.primaryContainer : currentTheme.surfaceVariant,
            borderRadius: 16,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 4,
          }}
        >
          <SvgWidget svg={bluetoothSvg} style={{ width: 32, height: 32 }} />
        </FlexWidget>
      </FlexWidget>

      <FlexWidget style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
        {/* Location */}
        <FlexWidget
          clickAction="TOGGLE_LOCATION"
          style={{
            flex: 1,
            height: 'match_parent',
            backgroundColor: isLocOn ? currentTheme.primaryContainer : currentTheme.surfaceVariant,
            borderRadius: 16,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 4,
          }}
        >
          <SvgWidget svg={locationSvg} style={{ width: 32, height: 32 }} />
        </FlexWidget>

        {/* Battery */}
        <FlexWidget
          clickAction="OPEN_BATTERY_SETTINGS"
          style={{
            flex: 1,
            height: 'match_parent',
            backgroundColor: currentTheme.surfaceVariant,
            borderRadius: 16,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 4,
          }}
        >
          <SvgWidget svg={batteryIconSvg} style={{ width: 32, height: 32 }} />
        </FlexWidget>
      </FlexWidget>
    </FlexWidget>
  );
}
