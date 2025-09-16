import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const LanguageSelectorContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const SelectButton = styled.button<{ isDarkBackground: boolean }>`
  background: ${({ isDarkBackground }) => 
    isDarkBackground 
      ? 'rgba(255, 255, 255, 0.1)' 
      : 'rgba(0, 0, 0, 0.05)'};
  border: 1px solid ${({ isDarkBackground }) => 
    isDarkBackground 
      ? 'rgba(255, 255, 255, 0.2)' 
      : 'rgba(0, 0, 0, 0.1)'};
  color: ${({ isDarkBackground }) => 
    isDarkBackground ? 'white' : '#2c3e50'};
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: ${({ isDarkBackground }) => 
      isDarkBackground 
        ? 'rgba(255, 255, 255, 0.2)' 
        : 'rgba(0, 0, 0, 0.1)'};
    border-color: ${({ isDarkBackground }) => 
      isDarkBackground 
        ? 'rgba(255, 255, 255, 0.3)' 
        : 'rgba(0, 0, 0, 0.2)'};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ isDarkBackground }) => 
      isDarkBackground 
        ? 'rgba(255, 255, 255, 0.3)' 
        : 'rgba(52, 152, 219, 0.3)'};
  }
`;

const Dropdown = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  min-width: 120px;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(-10px)'};
  transition: all 0.2s ease;
`;

const LanguageOption = styled.button`
  width: 100%;
  padding: 10px 16px;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f5f5f5;
  }

  &:first-child {
    border-radius: 8px 8px 0 0;
  }

  &:last-child {
    border-radius: 0 0 8px 8px;
  }

  &:only-child {
    border-radius: 8px;
  }
`;

const Flag = styled.span`
  font-size: 16px;
  margin-right: 6px;
`;

const ChevronIcon = styled.span<{ isOpen: boolean }>`
  font-size: 12px;
  transition: transform 0.2s ease;
  transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

const languages = [
  { code: 'zh-TW', name: '繁體中文', flag: '🇹🇼' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' }
];

interface LanguageSelectorProps {
  isDarkBackground: boolean;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ isDarkBackground }) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <LanguageSelectorContainer>
      <SelectButton isDarkBackground={isDarkBackground} onClick={toggleDropdown}>
        <Flag>{currentLanguage.flag}</Flag>
        <span>{currentLanguage.name}</span>
        <ChevronIcon isOpen={isOpen}>▼</ChevronIcon>
      </SelectButton>
      
      <Dropdown isOpen={isOpen}>
        {languages.map((language) => (
          <LanguageOption
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
          >
            <Flag>{language.flag}</Flag>
            {language.name}
          </LanguageOption>
        ))}
      </Dropdown>
    </LanguageSelectorContainer>
  );
};

export default LanguageSelector;
