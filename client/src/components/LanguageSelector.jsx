import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const LanguageSelector = ({ compact = false, variant = 'dropdown' }) => {
  const { language, changeLanguage } = useLanguage();
  
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ur', name: 'اردو', flag: '🇵🇰' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
  ];

  const handleLanguageChange = (e) => {
    changeLanguage(e.target.value);
  };

  if (variant === 'dropdown') {
    return (
      <div className="relative group">
        <select
          value={language}
          onChange={handleLanguageChange}
          className={`appearance-none bg-transparent border-none focus:ring-0 focus:outline-none cursor-pointer pr-6 ${
            compact ? 'text-sm py-1' : 'py-2'
          }`}
          aria-label="Select language"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {compact ? lang.flag : `${lang.flag} ${lang.name}`}
            </option>
          ))}
        </select>
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    );
  }

  // Button variant
  return (
    <div className="flex items-center space-x-1">
      <Globe className="w-4 h-4 text-gray-500" />
      <div className="flex space-x-1">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`px-2 py-1 text-xs rounded transition ${
              language === lang.code
                ? 'bg-purple-100 text-purple-700 font-medium'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            title={lang.name}
          >
            {lang.flag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;