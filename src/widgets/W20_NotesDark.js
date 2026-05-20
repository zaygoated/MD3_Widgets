import React from 'react';
import { FlexWidget, TextWidget, SvgWidget } from 'react-native-android-widget';

export function NotesDarkWidget({ tasks, theme }) {
  const currentTheme = theme || {
    surface: '#1C1B1F',
    primary: '#D0BCFF',
    onSurface: '#E6E1E5',
    onSurfaceVariant: '#CAC4D0',
    primaryContainer: '#4F378B',
    surfaceVariant: '#49454F',
  };

  const defaultTasks = tasks || [
    { title: 'Buy milk & eggs', checked: true },
    { title: 'Prepare presentation', checked: false },
    { title: 'Clean the kitchen', checked: false }
  ];

  const getCheckSvg = (checked) => {
    if (checked) {
      return `
        <svg viewBox="0 0 100 100" width="18" height="18">
          <rect x="10" y="10" width="80" height="80" rx="15" fill="${currentTheme.primary}" />
          <path d="M30 50 L45 65 L70 35" fill="none" stroke="${currentTheme.surface}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      `;
    }
    return `
      <svg viewBox="0 0 100 100" width="18" height="18">
        <rect x="10" y="10" width="80" height="80" rx="15" fill="none" stroke="${currentTheme.onSurfaceVariant}" stroke-width="8" />
      </svg>
    `;
  };

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
        text="NOTES & TASKS"
        style={{
          fontSize: 10,
          fontWeight: 'bold',
          color: currentTheme.primary,
          fontFamily: 'Google Sans',
          letterSpacing: 1.2,
          marginBottom: 10,
        }}
      />

      <FlexWidget style={{ flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        {defaultTasks.map((task, idx) => (
          <FlexWidget
            key={idx}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 6,
            }}
          >
            <SvgWidget svg={getCheckSvg(task.checked)} style={{ width: 18, height: 18 }} />
            <TextWidget
              text={task.title}
              style={{
                fontSize: 13,
                color: task.checked ? currentTheme.onSurfaceVariant : currentTheme.onSurface,
                fontFamily: 'Google Sans',
                marginLeft: 10,
                flex: 1,
              }}
            />
          </FlexWidget>
        ))}
      </FlexWidget>
    </FlexWidget>
  );
}
