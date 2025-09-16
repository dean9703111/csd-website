import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const AchievementsContainer = styled.section`
  padding: 100px 0;
  background: #f8f9fa;
  position: relative;
  overflow: hidden;
`;

const CategoryTabs = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const TabButton = styled.button<{ active: boolean }>`
  padding: 12px 24px;
  border: 2px solid ${({ active }) => active ? '#3498db' : '#e0e0e0'};
  background: ${({ active }) => active ? '#3498db' : 'white'};
  color: ${({ active }) => active ? 'white' : '#666'};
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
  }
`;

const CategoryContent = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const StatCard = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #3498db, #2ecc71);
  }
`;


const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 1.1rem;
  color: #7f8c8d;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const StatSubtitle = styled.div`
  font-size: 0.9rem;
  color: #95a5a6;
`;


interface AchievementsSectionProps {
  data: any;
}

const AchievementsSection: React.FC<AchievementsSectionProps> = ({ data }) => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState(0);
  const [ref, isVisible] = useScrollAnimation(0.1);

  const currentCategory = data.achievements.categories[activeCategory];

  return (
    <AchievementsContainer id="achievements">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#2c3e50' }}>
            {t('achievements.title')}
          </h2>
          <p style={{ fontSize: '1.2rem', color: '#7f8c8d' }}>
            {t('achievements.description')}
          </p>
        </motion.div>

        <CategoryTabs>
          {data.achievements.categories.map((category: any, index: number) => (
            <TabButton
              key={index}
              active={activeCategory === index}
              onClick={() => setActiveCategory(index)}
            >
              <span>{category.icon}</span>
              {t(`achievements.categories.${index}.title`)}
            </TabButton>
          ))}
        </CategoryTabs>

        <CategoryContent ref={ref}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <StatsGrid>
                {currentCategory.stats.map((stat: any, index: number) => (
                  <StatCard
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <StatValue>{t(`achievements.categories.${activeCategory}.stats.${index}.value`)}</StatValue>
                    <StatLabel>{t(`achievements.categories.${activeCategory}.stats.${index}.label`)}</StatLabel>
                    <StatSubtitle>{t(`achievements.categories.${activeCategory}.stats.${index}.subtitle`)}</StatSubtitle>
                  </StatCard>
                ))}
              </StatsGrid>
            </motion.div>
          </AnimatePresence>

        </CategoryContent>
      </div>
    </AchievementsContainer>
  );
};

export default AchievementsSection;
