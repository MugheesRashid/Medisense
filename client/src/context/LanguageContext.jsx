import React, { createContext, useState, useContext, useEffect } from 'react';

// Import translations
import enTranslations from '../assets/languages/eu.landing.json';
import urTranslations from '../assets/languages/ur.landing.json';
import koTranslations from '../assets/languages/ko.landing.json';

const translations = {
  en: enTranslations,
  ur: urTranslations,
  ko: koTranslations
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Check localStorage first, then browser language, default to 'en'
    const saved = localStorage.getItem('medisense-language');
    if (saved && translations[saved]) return saved;
    
    const browserLang = navigator.language.split('-')[0];
    if (translations[browserLang]) return browserLang;
    
    return 'en';
  });

  const [direction, setDirection] = useState('ltr');

  useEffect(() => {
    // Save to localStorage
    localStorage.setItem('medisense-language', language);
    
    // Set document direction based on language
    const newDirection = language === 'ur' ? 'rtl' : 'ltr';
    setDirection(newDirection);
    
    // Update HTML attributes
    document.documentElement.lang = language;
    document.documentElement.dir = newDirection;
    
    // Update body class for CSS styling
    document.body.classList.remove('rtl', 'ltr');
    document.body.classList.add(newDirection);
    document.body.setAttribute('data-language', language);
    
  }, [language]);

  const t = (key, params = {}) => {
    // Navigate through translation object using dot notation
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k];
      } else {
        // Fallback to English if translation missing
        let fallbackValue = translations.en;
        for (const fk of keys) {
          if (fallbackValue && fallbackValue[fk] !== undefined) {
            fallbackValue = fallbackValue[fk];
          } else {
            return key; // Return key itself if no translation found
          }
        }
        value = fallbackValue;
        break;
      }
    }
    
    // Handle parameters in strings (e.g., "Used by {count}+ people")
    if (typeof value === 'string' && params) {
      return value.replace(/\{(\w+)\}/g, (match, param) => params[param] || match);
    }
    
    return value || key;
  };

  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, direction, t, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for easy access
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};