import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Noto Sans TC', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.6;
    color: #333;
    background-color: #f8f9fa;
  }

  html {
    scroll-behavior: smooth;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.2;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
    font-family: inherit;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  @media (max-width: 768px) {
    .container {
      padding: 0 15px;
    }
  }
`;

export const Section = styled.section`
  padding: 80px 0;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 60px 0;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
  color: #2c3e50;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, #3498db, #2ecc71);
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  text-align: center;
  color: #7f8c8d;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
`;

export const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'outline' }>`
  padding: 12px 30px;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid transparent;

  ${({ variant = 'primary' }) => {
    switch (variant) {
      case 'primary':
        return `
          background: linear-gradient(135deg, #3498db, #2ecc71);
          color: white;
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(52, 152, 219, 0.3);
          }
        `;
      case 'secondary':
        return `
          background: linear-gradient(135deg, #e74c3c, #f39c12);
          color: white;
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(231, 76, 60, 0.3);
          }
        `;
      case 'outline':
        return `
          background: transparent;
          color: #3498db;
          border-color: #3498db;
          &:hover {
            background: #3498db;
            color: white;
          }
        `;
      default:
        return '';
    }
  }}

  @media (max-width: 768px) {
    padding: 10px 25px;
    font-size: 0.9rem;
  }
`;

export const Card = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

export const Grid = styled.div<{ columns?: number; gap?: string }>`
  display: grid;
  grid-template-columns: repeat(${({ columns = 3 }) => columns}, 1fr);
  gap: ${({ gap = '2rem' }) => gap};

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

export const Flex = styled.div<{ 
  direction?: 'row' | 'column'; 
  justify?: string; 
  align?: string; 
  gap?: string;
  wrap?: boolean;
}>`
  display: flex;
  flex-direction: ${({ direction = 'row' }) => direction};
  justify-content: ${({ justify = 'flex-start' }) => justify};
  align-items: ${({ align = 'stretch' }) => align};
  gap: ${({ gap = '1rem' }) => gap};
  flex-wrap: ${({ wrap = false }) => wrap ? 'wrap' : 'nowrap'};

  @media (max-width: 768px) {
    flex-direction: ${({ direction }) => direction === 'row' ? 'column' : direction};
  }
`;
