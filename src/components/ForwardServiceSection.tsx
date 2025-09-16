import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const ForwardServiceContainer = styled.section`
  padding: 100px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  position: relative;
  overflow: hidden;
`;

const VisionCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 3rem;
  text-align: center;
  margin-bottom: 4rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const VisionTitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #fff;
`;

const VisionContent = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #feca57;
`;

const VisionDescription = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
  line-height: 1.6;
`;

const BusinessScopeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const BusinessCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.15);
  }
`;

const BusinessIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const BusinessTitle = styled.h4`
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #fff;
`;

const ServiceList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ServiceItem = styled.li`
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.9);

  &:last-child {
    border-bottom: none;
  }

  &::before {
    content: '✓';
    color: #2ecc71;
    font-weight: bold;
    margin-right: 0.5rem;
  }
`;

const CapabilitiesSection = styled.div`
  margin-bottom: 4rem;
`;

const CapabilitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const CapabilityCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const CapabilityIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const CapabilityTitle = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #fff;
`;

const CapabilityDescription = styled.p`
  font-size: 0.9rem;
  opacity: 0.9;
  line-height: 1.5;
`;

const SuccessCasesSection = styled.div`
  margin-bottom: 4rem;
`;

const CasesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
`;

const CaseCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const CaseImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CaseContent = styled.div`
  padding: 1.5rem;
`;

const CaseTitle = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #fff;
`;

const CaseDescription = styled.p`
  font-size: 0.9rem;
  opacity: 0.9;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const CaseTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Tag = styled.span`
  background: rgba(46, 204, 113, 0.2);
  color: #2ecc71;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  border: 1px solid rgba(46, 204, 113, 0.3);
`;

const ImageGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const GalleryImage = styled(motion.img)`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const VisionCardWithAnimation: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ref, isVisible] = useScrollAnimation(0.2);

  return (
    <VisionCard
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {children}
    </VisionCard>
  );
};

const BusinessScopeWithAnimation: React.FC<{ data: any }> = ({ data }) => {
  const { t } = useTranslation();
  const [ref, isVisible] = useScrollAnimation(0.2);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <h3 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
        {t('forwardService.businessScope.title')}
      </h3>
      <BusinessScopeGrid>
        {data.categories.map((category: any, index: number) => (
          <BusinessCard
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <BusinessIcon>{category.icon}</BusinessIcon>
            <BusinessTitle>{t(`forwardService.businessScope.categories.${index}.title`)}</BusinessTitle>
            <ServiceList>
              {category.services.map((service: string, serviceIndex: number) => (
                <ServiceItem key={serviceIndex}>{t(`forwardService.businessScope.categories.${index}.services.${serviceIndex}`)}</ServiceItem>
              ))}
            </ServiceList>
          </BusinessCard>
        ))}
      </BusinessScopeGrid>
    </motion.div>
  );
};

const CapabilitiesWithAnimation: React.FC<{ data: any }> = ({ data }) => {
  const { t } = useTranslation();
  const [ref, isVisible] = useScrollAnimation(0.2);

  return (
    <CapabilitiesSection ref={ref}>
      <motion.h3
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8 }}
        style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}
      >
        {t('forwardService.coreCapabilities.title')}
      </motion.h3>
      <CapabilitiesGrid>
        {data.capabilities.map((capability: any, index: number) => (
          <CapabilityCard
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <CapabilityIcon>{capability.icon}</CapabilityIcon>
            <CapabilityTitle>{t(`forwardService.coreCapabilities.capabilities.${index}.title`)}</CapabilityTitle>
            <CapabilityDescription>{t(`forwardService.coreCapabilities.capabilities.${index}.description`)}</CapabilityDescription>
          </CapabilityCard>
        ))}
      </CapabilitiesGrid>
    </CapabilitiesSection>
  );
};

const SuccessCasesWithAnimation: React.FC<{ data: any }> = ({ data }) => {
  const { t } = useTranslation();
  const [ref, isVisible] = useScrollAnimation(0.2);

  return (
    <SuccessCasesSection ref={ref}>
      <motion.h3
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8 }}
        style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}
      >
{t('forwardService.successCasesTitle')}
      </motion.h3>
      <CasesGrid>
        {data.map((caseItem: any, index: number) => (
          <CaseCard
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <CaseImage src={caseItem.image} alt={caseItem.title} />
            <CaseContent>
              <CaseTitle>{t(`forwardService.successCases.${index}.title`)}</CaseTitle>
              <CaseDescription>{t(`forwardService.successCases.${index}.description`)}</CaseDescription>
              <CaseTags>
                {caseItem.tags.map((tag: string, tagIndex: number) => (
                  <Tag key={tagIndex}>{t(`forwardService.successCases.${index}.tags.${tagIndex}`)}</Tag>
                ))}
              </CaseTags>
            </CaseContent>
          </CaseCard>
        ))}
      </CasesGrid>
    </SuccessCasesSection>
  );
};

const TeamGalleryWithAnimation: React.FC<{ data: any; onImageClick: (src: string) => void }> = ({ data, onImageClick }) => {
  const { t } = useTranslation();
  const [ref, isVisible] = useScrollAnimation(0.2);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8 }}
    >
      <h3 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
        {t('forwardService.teamGallery')}
      </h3>
      <ImageGallery>
        {data.map((image: any, index: number) => (
          <GalleryImage
            key={index}
            src={image.src}
            alt={image.alt}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => onImageClick(image.src)}
          />
        ))}
      </ImageGallery>
    </motion.div>
  );
};

interface ForwardServiceSectionProps {
  data: any;
}

const ForwardServiceSection: React.FC<ForwardServiceSectionProps> = ({ data }) => {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <ForwardServiceContainer id="forward-service">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#fff' }}>
            {t('forwardService.title')}
          </h2>
          <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>
            {t('forwardService.description')}
          </p>
        </motion.div>

        <VisionCardWithAnimation>
          <VisionTitle>{t('forwardService.vision.title')}</VisionTitle>
          <VisionContent>{t('forwardService.vision.content')}</VisionContent>
          <VisionDescription>{t('forwardService.vision.description')}</VisionDescription>
        </VisionCardWithAnimation>

        <BusinessScopeWithAnimation data={data.forwardService.businessScope} />

        <CapabilitiesWithAnimation data={data.forwardService.coreCapabilities} />

        <SuccessCasesWithAnimation data={data.forwardService.successCases} />
        <TeamGalleryWithAnimation data={data.forwardService.images} onImageClick={setSelectedImage} />

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                padding: '20px'
              }}
              onClick={() => setSelectedImage(null)}
            >
              <img
                src={selectedImage}
                alt="放大圖片"
                style={{
                  maxWidth: '90%',
                  maxHeight: '90%',
                  objectFit: 'contain',
                  borderRadius: '10px'
                }}
              />
              <button
                onClick={() => setSelectedImage(null)}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  color: 'white',
                  fontSize: '2rem',
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  cursor: 'pointer'
                }}
              >
                ×
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ForwardServiceContainer>
  );
};

export default ForwardServiceSection;
