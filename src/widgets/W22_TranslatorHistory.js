import React from 'react';
import { FlexWidget, TextWidget, SvgWidget } from 'react-native-android-widget';

export function TranslatorHistoryWidget({ history, theme }) {
  const currentTheme = theme || {
    surface: '#1C1B1F',
    primary: '#D0BCFF',
    onSurface: '#E6E1E5',
    onSurfaceVariant: '#CAC4D0',
    primaryContainer: '#4F378B',
    surfaceVariant: '#49454F',
    onPrimaryContainer: '#EADDFF',
  };

  const defaultHistory = history || [
    { from: 'Good morning', to: 'Bonjour', lang: 'EN ➔ FR' },
    { from: 'How are you?', to: '¿Cómo estás?', lang: 'EN ➔ ES' },
    { from: 'Thank you very much', to: 'Grazie mille', lang: 'EN ➔ IT' }
  ];

  const translateIconSvg = `
    <svg viewBox="0 0 100 100" width="24" height="24">
      <path d="M25 25 H75 V75 H25 Z" fill="none" stroke="${currentTheme.primary}" stroke-width="6" />
      <path d="M35 45 H65 M50 35 V45 M40 55 C40 45 60 45 60 65" fill="none" stroke="${currentTheme.primary}" stroke-width="6" stroke-linecap="round" />
    </svg>
  `;

  return (
    <FlexWidget
      style={{
        width: 'match_parent',
        height: 'match_parent',
        backgroundColor: currentTheme.surface,
        borderRadius: 28,
        padding: 14,
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <FlexWidget style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
        <SvgWidget svg={translateIconSvg} style={{ width: 24, height: 24 }} />
        <TextWidget
          text="TRANSLATION HISTORY"
          style={{
            fontSize: 10,
            fontWeight: 'bold',
            color: currentTheme.primary,
            fontFamily: 'Google Sans',
            letterSpacing: 1.2,
            marginLeft: 8,
          }}
        />
      </FlexWidget>

      {/* History Items */}
      <FlexWidget style={{ flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        {defaultHistory.map((item, idx) => (
          <FlexWidget
            key={idx}
            style={{
              backgroundColor: currentTheme.surfaceVariant,
              borderRadius: 14,
              padding: 8,
              flexDirection: 'column',
              marginBottom: idx < defaultHistory.length - 1 ? 6 : 0,
            }}
          >
            <FlexWidget style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <TextWidget
                text={item.from}
                style={{
                  fontSize: 11,
                  color: currentTheme.onSurfaceVariant,
                  fontFamily: 'Google Sans',
                }}
              />
              <TextWidget
                text={item.lang}
                style={{
                  fontSize: 8,
                  fontWeight: 'bold',
                  color: currentTheme.primary,
                  fontFamily: 'Google Sans',
                }}
              />
            </FlexWidget>
            <TextWidget
              text={item.to}
              style={{
                fontSize: 13,
                fontWeight: 'bold',
                color: currentTheme.onSurface,
                fontFamily: 'Google Sans',
                marginTop: 2,
              }}
            />
          </FlexWidget>
        ))}
      </FlexWidget>
    </FlexWidget>
  );
}
