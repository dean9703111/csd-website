import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const HistoryContainer = styled.section`
  padding: 100px 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  position: relative;
  overflow: hidden;
`;

const Timeline = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 4px;
    background: linear-gradient(180deg, #3498db, #2ecc71, #f39c12, #e74c3c, #9b59b6, #1abc9c);
    transform: translateX(-50%);
    border-radius: 2px;

    @media (max-width: 768px) {
      left: 20px;
    }
  }
`;

const TimelineItem = styled(motion.div)<{ isLeft: boolean }>`
  display: flex;
  justify-content: ${({ isLeft }) => isLeft ? 'flex-end' : 'flex-start'};
  margin-bottom: 80px;
  position: relative;

  @media (max-width: 768px) {
    justify-content: flex-start;
    padding-left: 60px;
  }
`;

const TimelineContent = styled.div<{ isLeft: boolean; color: string }>`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 45%;
  position: relative;
  border-left: 4px solid ${({ color }) => color};

  ${({ isLeft, color }) => isLeft ? `
    margin-right: 5%;
    border-left: none;
    border-right: 4px solid ${color};
  ` : `
    margin-left: 5%;
  `}

  @media (max-width: 768px) {
    width: 100%;
    margin: 0;
    border-left: 4px solid ${({ color }) => color};
    border-right: none;
  }

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    ${({ isLeft }) => isLeft ? 'right: -15px;' : 'left: -15px;'}
    width: 0;
    height: 0;
    border: 15px solid transparent;
    border-${({ isLeft }) => isLeft ? 'left' : 'right'}-color: white;
    transform: translateY(-50%);

    @media (max-width: 768px) {
      left: -15px;
      right: auto;
      border-left-color: transparent;
      border-right-color: white;
    }
  }
`;

const TimelineDot = styled.div<{ color: string }>`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  background: ${({ color }) => color};
  border-radius: 50%;
  border: 4px solid white;
  box-shadow: 0 0 0 4px ${({ color }) => color}20;
  z-index: 2;

  @media (max-width: 768px) {
    left: 20px;
  }
`;

const Year = styled.h3`
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-weight: 700;
`;

const Title = styled.h4`
  font-size: 1.3rem;
  color: #34495e;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const Description = styled.p`
  color: #7f8c8d;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const Background = styled.p`
  font-size: 0.9rem;
  color: #95a5a6;
  font-style: italic;
  background: #f8f9fa;
  padding: 0.5rem;
  border-radius: 5px;
  border-left: 3px solid #3498db;
`;

const StatsContainer = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 3rem;
  margin-top: 4rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const StatsTitle = styled.h3`
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 2rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #3498db;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: #7f8c8d;
  font-weight: 500;
`;

interface TimelineItemWithAnimationProps {
  item: any;
  index: number;
}

const TimelineItemWithAnimation: React.FC<TimelineItemWithAnimationProps> = ({ item, index }) => {
  const { t } = useTranslation();
  const [ref, isVisible] = useScrollAnimation(0.3);

  return (
    <TimelineItem
      ref={ref}
      isLeft={index % 2 === 0}
      initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <TimelineContent isLeft={index % 2 === 0} color={item.color}>
        <Year>{item.year}</Year>
        <Title>{t(`history.timeline.${index}.title`)}</Title>
        <Description>{t(`history.timeline.${index}.description`)}</Description>
        <Background>{t(`history.timeline.${index}.background`)}</Background>
      </TimelineContent>
      <TimelineDot color={item.color} />
    </TimelineItem>
  );
};

interface HistorySectionProps {
  data: any;
}

const HistorySection: React.FC<HistorySectionProps> = ({ data }) => {
  const { t } = useTranslation();
  const [ref, isVisible] = useScrollAnimation(0.1);

  return (
    <HistoryContainer id="history">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '1rem', color: '#2c3e50' }}
          >
            {t('history.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ textAlign: 'center', fontSize: '1.2rem', color: '#7f8c8d', marginBottom: '3rem' }}
          >
            {t('history.description')}
          </motion.p>
        </div>

        <Timeline ref={ref}>
          {data.history.timeline.map((item: any, index: number) => (
            <TimelineItemWithAnimation
              key={item.year}
              item={item}
              index={index}
            />
          ))}
        </Timeline>

        <StatsContainer
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <StatsTitle>{t('history.currentTitle')}</StatsTitle>
          <StatsGrid>
            <StatItem>
              <StatValue>{t('history.currentStats.servicePoints')}</StatValue>
              <StatLabel>{t('history.statsLabels.servicePoints')}</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>{t('history.currentStats.employees')}</StatValue>
              <StatLabel>{t('history.statsLabels.employees')}</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>{t('history.currentStats.annualVisits')}</StatValue>
              <StatLabel>{t('history.statsLabels.annualVisits')}</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>{t('history.currentStats.costReduction')}</StatValue>
              <StatLabel>{t('history.statsLabels.costReduction')}</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>{t('history.currentStats.revenueIncrease')}</StatValue>
              <StatLabel>{t('history.statsLabels.revenueIncrease')}</StatLabel>
            </StatItem>
          </StatsGrid>
        </StatsContainer>
      </motion.div>
    </HistoryContainer>
  );
};

export default HistorySection;
