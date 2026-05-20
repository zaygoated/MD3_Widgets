import React from 'react';
import { FlexWidget, TextWidget, SvgWidget } from 'react-native-android-widget';

export function QuickSettingsWidget({ wifiOn, bluetoothOn, flashlightOn, dndOn, theme }) {
  const currentTheme = theme || {
    surface: '#1C1B1F',
    primary: '#D0BCFF',
    onPrimary: '#381E72',
    onSurface: '#E6E1E5',
    onSurfaceVariant: '#CAC4D0',
    primaryContainer: '#4F378B',
    onPrimaryContainer: '#EADDFF',
    surfaceVariant: '#49454F',
  };

  const isWifi = wifiOn !== undefined ? wifiOn : true;
  const isBT = bluetoothOn !== undefined ? bluetoothOn : false;
  const isFlash = flashlightOn !== undefined ? flashlightOn : false;
  const isDnd = dndOn !== undefined ? dndOn : true;

  const getTileBg = (active) => (active ? currentTheme.primary : currentTheme.surfaceVariant);
  const getTileTextColor = (active) => (active ? currentTheme.onPrimary : currentTheme.onSurface);
  const getTileSubColor = (active) => (active ? currentTheme.onPrimary : currentTheme.onSurfaceVariant);

  const wifiIcon = `
    <svg viewBox="0 0 100 100" width="20" height="20">
      <path d="M50 80 A 6 6 0 1 1 50 79 Z" fill="currentColor" />
      <path d="M30 60 A 28 28 0 0 1 70 60" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" />
      <path d="M15 45 A 50 50 0 0 1 85 45" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" />
    </svg>
  `;

  const btIcon = `
    <svg viewBox="0 0 100 100" width="20" height="20">
      <path d="M50 15 v70 L70 65 L30 35 L70 35 L30 65 Z" fill="none" stroke="currentColor" stroke-width="6" stroke-linejoin="round" stroke-linecap="round" />
    </svg>
  `;

  const flashIcon = `
    <svg viewBox="0 0 100 100" width="20" height="20">
      <path d="M40 15 H65 L45 50 H65 L35 85 L45 50 H30 Z" fill="currentColor" />
    </svg>
  `;

  const dndIcon = `
    <svg viewBox="0 0 100 100" width="20" height="20">
      <path d="M30 30 A 25 25 0 0 1 75 40 A 30 30 0 1 0 40 75 A 25 25 0 0 1 30 30 Z" fill="currentColor" />
    </svg>
  `;

  return (
    <FlexWidget
      style={{
        width: 'match_parent',
        height: 'match_parent',
        backgroundColor: currentTheme.surface,
        borderRadius: 24,
        padding: 12,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Row 1 */}
      <FlexWidget style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, marginBottom: 6 }}>
        {/* Wifi tile */}
        <FlexWidget
          clickAction="TOGGLE_WIFI"
          style={{
            flex: 1,
            height: 'match_parent',
            backgroundColor: getTileBg(isWifi),
            borderRadius: 16,
            paddingLeft: 10,
            paddingRight: 10,
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 6,
          }}
        >
          <SvgWidget svg={wifiIcon.replace('currentColor', getTileTextColor(isWifi))} style={{ width: 20, height: 20 }} />
          <FlexWidget style={{ flexDirection: 'column', marginLeft: 8 }}>
            <TextWidget text="Internet" style={{ fontSize: 11, fontWeight: 'bold', color: getTileTextColor(isWifi), fontFamily: 'Google Sans' }} />
            <TextWidget text={isWifi ? "Connected" : "Off"} style={{ fontSize: 9, color: getTileSubColor(isWifi), fontFamily: 'Google Sans' }} />
          </FlexWidget>
        </FlexWidget>

        {/* Bluetooth tile */}
        <FlexWidget
          clickAction="TOGGLE_BT"
          style={{
            flex: 1,
            height: 'match_parent',
            backgroundColor: getTileBg(isBT),
            borderRadius: 16,
            paddingLeft: 10,
            paddingRight: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <SvgWidget svg={btIcon.replace('currentColor', getTileTextColor(isBT))} style={{ width: 20, height: 20 }} />
          <FlexWidget style={{ flexDirection: 'column', marginLeft: 8 }}>
            <TextWidget text="Bluetooth" style={{ fontSize: 11, fontWeight: 'bold', color: getTileTextColor(isBT), fontFamily: 'Google Sans' }} />
            <TextWidget text={isBT ? "On" : "Off"} style={{ fontSize: 9, color: getTileSubColor(isBT), fontFamily: 'Google Sans' }} />
          </FlexWidget>
        </FlexWidget>
      </FlexWidget>

      {/* Row 2 */}
      <FlexWidget style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
        {/* Flashlight tile */}
        <FlexWidget
          clickAction="TOGGLE_FLASHLIGHT"
          style={{
            flex: 1,
            height: 'match_parent',
            backgroundColor: getTileBg(isFlash),
            borderRadius: 16,
            paddingLeft: 10,
            paddingRight: 10,
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 6,
          }}
        >
          <SvgWidget svg={flashIcon.replace('currentColor', getTileTextColor(isFlash))} style={{ width: 20, height: 20 }} />
          <FlexWidget style={{ flexDirection: 'column', marginLeft: 8 }}>
            <TextWidget text="Flashlight" style={{ fontSize: 11, fontWeight: 'bold', color: getTileTextColor(isFlash), fontFamily: 'Google Sans' }} />
            <TextWidget text={isFlash ? "On" : "Off"} style={{ fontSize: 9, color: getTileSubColor(isFlash), fontFamily: 'Google Sans' }} />
          </FlexWidget>
        </FlexWidget>

        {/* DND tile */}
        <FlexWidget
          clickAction="TOGGLE_DND"
          style={{
            flex: 1,
            height: 'match_parent',
            backgroundColor: getTileBg(isDnd),
            borderRadius: 16,
            paddingLeft: 10,
            paddingRight: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <SvgWidget svg={dndIcon.replace('currentColor', getTileTextColor(isDnd))} style={{ width: 20, height: 20 }} />
          <FlexWidget style={{ flexDirection: 'column', marginLeft: 8 }}>
            <TextWidget text="DND" style={{ fontSize: 11, fontWeight: 'bold', color: getTileTextColor(isDnd), fontFamily: 'Google Sans' }} />
            <TextWidget text={isDnd ? "On" : "Off"} style={{ fontSize: 9, color: getTileSubColor(isDnd), fontFamily: 'Google Sans' }} />
          </FlexWidget>
        </FlexWidget>
      </FlexWidget>
    </FlexWidget>
  );
}
