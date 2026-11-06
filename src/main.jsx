import { PreferencesProvider } from './Preferences';
import './styles/index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import MotionProvider from './components/MotionProvider';
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MotionProvider>
      <PreferencesProvider>
        <App />
      </PreferencesProvider>
    </MotionProvider>
  </React.StrictMode>,
);
