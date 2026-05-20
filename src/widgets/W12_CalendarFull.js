import React from 'react';
import { FlexWidget, TextWidget } from 'react-native-android-widget';

export function CalendarFullWidget({ events, theme }) {
  const currentTheme = theme || {
    surface: '#1C1B1F',
    primary: '#D0BCFF',
    onSurface: '#E6E1E5',
    onSurfaceVariant: '#CAC4D0',
    primaryContainer: '#4F378B',
    onPrimaryContainer: '#EADDFF',
  };

  const defaultEvents = events || [
    { title: 'Design Review', time: '10:00 AM - 11:30 AM', color: '#D0BCFF' },
    { title: 'Lunch with Sarah', time: '1:00 PM - 2:00 PM', color: '#85E3FF' },
    { title: 'Project Sync', time: '4:30 PM - 5:00 PM', color: '#FFB4AB' }
  ];

  return (
    <FlexWidget
      style={{
        width: 'match_parent',
        height: 'match_parent',
        backgroundColor: currentTheme.surface,
        borderRadius: 24,
        padding: 16,
        flexDirection: 'column',
      }}
    >
      <TextWidget
        text="TODAY'S SCHEDULE"
        style={{
          fontSize: 11,
          fontWeight: 'bold',
          color: currentTheme.primary,
          fontFamily: 'Google Sans',
          letterSpacing: 1.5,
          marginBottom: 10,
        }}
      />

      <FlexWidget style={{ flexDirection: 'column', flex: 1 }}>
        {defaultEvents.map((evt, idx) => (
          <FlexWidget
            key={idx}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: idx < defaultEvents.length - 1 ? 10 : 0,
            }}
          >
            {/* Colored Tag */}
            <FlexWidget
              style={{
                width: 4,
                height: 32,
                backgroundColor: evt.color,
                borderRadius: 2,
              }}
            />
            {/* Event Details */}
            <FlexWidget
              style={{
                flexDirection: 'column',
                marginLeft: 10,
                flex: 1,
              }}
            >
              <TextWidget
                text={evt.title}
                style={{
                  fontSize: 13,
                  fontWeight: 'bold',
                  color: currentTheme.onSurface,
                  fontFamily: 'Google Sans',
                }}
              />
              <TextWidget
                text={evt.time}
                style={{
                  fontSize: 10,
                  color: currentTheme.onSurfaceVariant,
                  fontFamily: 'Google Sans',
                  marginTop: 1,
                }}
              />
            </FlexWidget>
          </FlexWidget>
        ))}
      </FlexWidget>
    </FlexWidget>
  );
}
