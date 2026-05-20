import React from 'react';
import { FlexWidget, TextWidget, SvgWidget } from 'react-native-android-widget';

export function HabitGridWidget({ habits, theme }) {
  const currentTheme = theme || {
    surface: '#1C1B1F',
    primary: '#D0BCFF',
    onSurface: '#E6E1E5',
    onSurfaceVariant: '#CAC4D0',
    primaryContainer: '#4F378B',
    surfaceVariant: '#49454F',
  };

  const defaultHabits = habits || [
    { name: 'Water', history: [true, true, true, false, false, false, false], color: '#85E3FF' },
    { name: 'Read', history: [true, false, true, true, false, false, false], color: '#FFB4AB' },
    { name: 'Gym', history: [false, true, false, true, false, true, false], color: '#D0BCFF' }
  ];

  // Render a consolidated SVG representing the habit tracking grid
  // Grid Dimensions: width 150, height 100
  // Headers M T W T F S S at y=15
  // Row 1: Water at y=40
  // Row 2: Read at y=65
  // Row 3: Gym at y=90
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const startX = 45;
  const stepX = 14;

  let habitsGridSvg = `
    <svg viewBox="0 0 150 100" width="150" height="100">
      <!-- Days headers -->
      ${days.map((day, idx) => `
        <text x="${startX + idx * stepX}" y="15" fill="${currentTheme.onSurfaceVariant}" font-family="Google Sans" font-size="8" text-anchor="middle" font-weight="bold">${day}</text>
      `).join('')}

      <!-- Habit 1: Water -->
      <!-- Droplet Icon -->
      <path d="M15 40 C15 35, 20 28, 20 28 C20 28, 25 35, 25 40 A 5 5 0 0 1 15 40 Z" fill="${defaultHabits[0].color}" />
      ${defaultHabits[0].history.map((checked, idx) => {
        const cx = startX + idx * stepX;
        const cy = 38;
        return checked
          ? `<circle cx="${cx}" cy="${cy}" r="4.5" fill="${defaultHabits[0].color}" />`
          : `<circle cx="${cx}" cy="${cy}" r="4" fill="none" stroke="${currentTheme.surfaceVariant}" stroke-width="1.5" />`;
      }).join('')}

      <!-- Habit 2: Read -->
      <!-- Book Icon -->
      <path d="M14 60 H20 V68 H14 Z M20 60 H26 V68 H20 Z" fill="${defaultHabits[1].color}" />
      ${defaultHabits[1].history.map((checked, idx) => {
        const cx = startX + idx * stepX;
        const cy = 63;
        return checked
          ? `<circle cx="${cx}" cy="${cy}" r="4.5" fill="${defaultHabits[1].color}" />`
          : `<circle cx="${cx}" cy="${cy}" r="4" fill="none" stroke="${currentTheme.surfaceVariant}" stroke-width="1.5" />`;
      }).join('')}

      <!-- Habit 3: Gym -->
      <!-- Dumbbell Icon -->
      <path d="M13 87 H27 V89 H13 Z M17 84 H19 V92 H17 Z M21 84 H23 V92 H21 Z" fill="${defaultHabits[2].color}" />
      ${defaultHabits[2].history.map((checked, idx) => {
        const cx = startX + idx * stepX;
        const cy = 88;
        return checked
          ? `<circle cx="${cx}" cy="${cy}" r="4.5" fill="${defaultHabits[2].color}" />`
          : `<circle cx="${cx}" cy="${cy}" r="4" fill="none" stroke="${currentTheme.surfaceVariant}" stroke-width="1.5" />`;
      }).join('')}
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
      <TextWidget
        text="HABIT TRACKER"
        style={{
          fontSize: 10,
          fontWeight: 'bold',
          color: currentTheme.primary,
          fontFamily: 'Google Sans',
          letterSpacing: 1.2,
          marginBottom: 4,
        }}
      />
      <SvgWidget
        svg={habitsGridSvg}
        style={{
          width: 140,
          height: 100,
          flex: 1,
        }}
      />
    </FlexWidget>
  );
}
