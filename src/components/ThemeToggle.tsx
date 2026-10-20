'use client';

import { Row, ToggleButton, useTheme } from '@once-ui-system/core';
import type React from 'react';
import { useEffect, useState } from 'react';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('light');

  useEffect(() => {
    setMounted(true);
    setCurrentTheme(
      document.documentElement.getAttribute('data-theme') || 'light'
    );
  }, []);

  useEffect(() => {
    setCurrentTheme(
      document.documentElement.getAttribute('data-theme') || 'light'
    );
  }, [theme]);

  const icon = currentTheme === 'dark' ? 'light' : 'dark';
  const nextTheme = currentTheme === 'light' ? 'dark' : 'light';

  return (
    <ToggleButton
      prefixIcon={icon}
      onClick={() => setTheme(nextTheme)}
      aria-label={`Switch to ${nextTheme} mode`}
    />
  );
};
