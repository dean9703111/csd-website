import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useParallax } from '../hooks/useScrollAnimation';

const HeroContainer = styled.section`
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const BackgroundImage = styled(motion.div)<{ offset: number }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transform: translateY(${({ offset }) => offset}px);
  z-index: 1;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.8), rgba(118, 75, 162, 0.8));
  z-index: 2;
`;

const Content = styled(motion.div)`
  position: relative;
  z-index: 3;
  text-align: center;
  color: white;
  max-width: 800px;
  padding: 0 20px;
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  margin-bottom: 3rem;
  opacity: 0.8;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const CTAButton = styled(motion.button)`
  background: linear-gradient(135deg, #ff6b6b, #feca57);
  color: white;
  border: none;
  padding: 15px 40px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(255, 107, 107, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(255, 107, 107, 0.4);
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  color: white;
  text-align: center;
  cursor: pointer;

  .scroll-text {
    font-size: 0.9rem;
    margin-bottom: 10px;
    opacity: 0.8;
  }

  .scroll-arrow {
    width: 20px;
    height: 20px;
    border-right: 2px solid white;
    border-bottom: 2px solid white;
    transform: rotate(45deg);
    margin: 0 auto;
    animation: bounce 2s infinite;
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0) rotate(45deg);
    }
    40% {
      transform: translateY(-10px) rotate(45deg);
    }
    60% {
      transform: translateY(-5px) rotate(45deg);
    }
  }
`;

interface HeroProps {
  data: any;
}

const Hero: React.FC<HeroProps> = ({ data }) => {
  const parallaxOffset = useParallax(0.5);

  const scrollToNext = () => {
    const nextSection = document.getElementById('history');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <HeroContainer>
      <BackgroundImage offset={parallaxOffset} />
      <Overlay />
      
      <Content
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <Title
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {data.siteInfo.title}
        </Title>
        
        <Subtitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {data.siteInfo.subtitle}
        </Subtitle>
        
        <Description
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          {data.siteInfo.description}
        </Description>
        
        <CTAButton
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToNext}
        >
          探索我們的服務
        </CTAButton>
      </Content>

      <ScrollIndicator
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2 }}
        onClick={scrollToNext}
      >
        <div className="scroll-text">向下滾動</div>
        <div className="scroll-arrow"></div>
      </ScrollIndicator>
    </HeroContainer>
  );
};

export default Hero;
