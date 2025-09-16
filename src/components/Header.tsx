import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

const HeaderContainer = styled(motion.header)<{ scrolled: boolean; isDarkBackground: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${({ scrolled, isDarkBackground }) => {
    if (scrolled) {
      return isDarkBackground ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.95)';
    }
    return 'transparent';
  }};
  backdrop-filter: ${({ scrolled }) => scrolled ? 'blur(10px)' : 'none'};
  transition: all 0.3s ease;
  padding: 1rem 0;
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const LogoImage = styled.img`
  height: 50px;
  width: auto;
`;

const LogoText = styled.div<{ isDarkBackground: boolean }>`
  h1 {
    font-size: 1.5rem;
    color: ${({ isDarkBackground }) => isDarkBackground ? 'white' : '#2c3e50'};
    margin: 0;
    transition: color 0.3s ease;
  }
  p {
    font-size: 0.9rem;
    color: ${({ isDarkBackground }) => isDarkBackground ? 'rgba(255, 255, 255, 0.8)' : '#7f8c8d'};
    margin: 0;
    transition: color 0.3s ease;
  }
`;

const NavLinks = styled.ul<{ isOpen: boolean }>`
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    position: fixed;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    padding: 2rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    transform: ${({ isOpen }) => isOpen ? 'translateY(0)' : 'translateY(-100%)'};
    transition: transform 0.3s ease;
  }
`;

const NavLink = styled.li<{ isDarkBackground: boolean }>`
  a {
    color: ${({ isDarkBackground }) => isDarkBackground ? 'white' : '#2c3e50'};
    font-weight: 500;
    transition: color 0.3s ease;
    position: relative;

    &:hover {
      color: ${({ isDarkBackground }) => isDarkBackground ? '#74b9ff' : '#3498db'};
    }

    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 0;
      height: 2px;
      background: ${({ isDarkBackground }) => isDarkBackground ? '#74b9ff' : '#3498db'};
      transition: width 0.3s ease;
    }

    &:hover::after {
      width: 100%;
    }
  }
`;

const MobileMenuButton = styled.button<{ isDarkBackground: boolean }>`
  display: none;
  flex-direction: column;
  gap: 4px;
  padding: 8px;

  @media (max-width: 768px) {
    display: flex;
  }

  span {
    width: 25px;
    height: 3px;
    background: ${({ isDarkBackground }) => isDarkBackground ? 'white' : '#2c3e50'};
    transition: all 0.3s ease;
  }
`;

interface HeaderProps {
  data: any;
}

const Header: React.FC<HeaderProps> = ({ data }) => {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkBackground, setIsDarkBackground] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // 判斷目前在哪個區塊
      const heroSection = document.querySelector('#hero') || document.querySelector('section');
      const historySection = document.querySelector('#history');
      
      if (heroSection && historySection) {
        const historyTop = historySection.getBoundingClientRect().top;
        
        // 如果在 Hero 區塊內，使用深色背景
        setIsDarkBackground(historyTop > 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // 初始檢查
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: t('navigation.history'), href: '#history' },
    { label: t('navigation.achievements'), href: '#achievements' },
    { label: t('navigation.services'), href: '#forward-service' },
    { label: t('navigation.contact'), href: '#contact' }
  ];

  return (
    <HeaderContainer
      scrolled={scrolled}
      isDarkBackground={isDarkBackground}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Nav>
        <Logo>
          <LogoImage src={data.siteInfo.logo} alt="中衛發展中心" />
          <LogoText isDarkBackground={isDarkBackground}>
            <h1>{t('siteInfo.title')}</h1>
            <p>{t('siteInfo.subtitle')}</p>
          </LogoText>
        </Logo>

        <NavRight>
          <NavLinks isOpen={mobileMenuOpen}>
            {navItems.map((item) => (
              <NavLink key={item.label} isDarkBackground={isDarkBackground}>
                <a 
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              </NavLink>
            ))}
          </NavLinks>

          <LanguageSelector isDarkBackground={isDarkBackground} />

          <MobileMenuButton 
            isDarkBackground={isDarkBackground}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </MobileMenuButton>
        </NavRight>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
