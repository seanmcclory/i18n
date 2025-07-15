import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  flagFallback: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', flagFallback: 'EN' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', flagFallback: 'IT' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱', flagFallback: 'PL' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', flagFallback: 'FR' },
];

const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [supportsEmoji, setSupportsEmoji] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  // Check if emoji flags are supported
  useEffect(() => {
    // Simple detection: Windows Chrome often has issues with flag emojis
    const isWindows = navigator.platform.toLowerCase().includes('win');
    const isChrome = navigator.userAgent.toLowerCase().includes('chrome');
    
    // Default to supporting emojis unless it's Windows Chrome
    setSupportsEmoji(!(isWindows && isChrome));
  }, []);

  const getFlagDisplay = (language: Language) => {
    return supportsEmoji ? language.flag : language.flagFallback;
  };

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className="language-switcher" ref={dropdownRef} onKeyDown={handleKeyDown}>
      <button
        className="language-switcher__trigger"
        onClick={toggleDropdown}
        aria-label={t('common.language')}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span
          className={`language-switcher__flag ${!supportsEmoji ? 'fallback' : ''}`}
          data-fallback={!supportsEmoji ? 'true' : undefined}
        >
          {getFlagDisplay(currentLanguage)}
        </span>
        <span className="language-switcher__name">{currentLanguage.nativeName}</span>
        <span className={`language-switcher__arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <div className="language-switcher__dropdown" role="listbox">
          {languages.map((language) => (
            <button
              key={language.code}
              className={`language-switcher__option ${
                language.code === i18n.language ? 'active' : ''
              }`}
              onClick={() => handleLanguageChange(language.code)}
              role="option"
              aria-selected={language.code === i18n.language}
            >
              <span
                className={`language-switcher__flag ${!supportsEmoji ? 'fallback' : ''}`}
                data-fallback={!supportsEmoji ? 'true' : undefined}
              >
                {getFlagDisplay(language)}
              </span>
              <span className="language-switcher__name">{language.nativeName}</span>
              {language.code === i18n.language && (
                <span className="language-switcher__check">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;