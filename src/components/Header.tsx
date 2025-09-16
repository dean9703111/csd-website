import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeaderContainer = styled(motion.header)<{ scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${({ scrolled }) => 
    scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent'};
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

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const LogoImage = styled.img`
  height: 50px;
  width: auto;
`;

const LogoText = styled.div`
  h1 {
    font-size: 1.5rem;
    color: #2c3e50;
    margin: 0;
  }
  p {
    font-size: 0.9rem;
    color: #7f8c8d;
    margin: 0;
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

const NavLink = styled.li`
  a {
    color: #2c3e50;
    font-weight: 500;
    transition: color 0.3s ease;
    position: relative;

    &:hover {
      color: #3498db;
    }

    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 0;
      height: 2px;
      background: #3498db;
      transition: width 0.3s ease;
    }

    &:hover::after {
      width: 100%;
    }
  }
`;

const MobileMenuButton = styled.button`
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
    background: #2c3e50;
    transition: all 0.3s ease;
  }
`;

interface HeaderProps {
  data: any;
}

const Header: React.FC<HeaderProps> = ({ data }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: '發展歷史', href: '#history' },
    { label: '中衛成就', href: '#achievements' },
    { label: '前瞻服務部', href: '#forward-service' },
    { label: '聯絡洽詢', href: '#contact' }
  ];

  return (
    <HeaderContainer
      scrolled={scrolled}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Nav>
        <Logo>
          <LogoImage src={data.siteInfo.logo} alt="中衛發展中心" />
          <LogoText>
            <h1>{data.siteInfo.title}</h1>
            <p>{data.siteInfo.subtitle}</p>
          </LogoText>
        </Logo>

        <NavLinks isOpen={mobileMenuOpen}>
          {navItems.map((item) => (
            <NavLink key={item.label}>
              <a 
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            </NavLink>
          ))}
        </NavLinks>

        <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </MobileMenuButton>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
