import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const FooterContainer = styled.footer`
  background: #2c3e50;
  color: white;
  padding: 3rem 0 1rem;
  position: relative;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const FooterTop = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FooterSection = styled.div`
  h4 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: #feca57;
  }

  p, li {
    color: #bdc3c7;
    line-height: 1.6;
    margin-bottom: 0.5rem;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  a {
    color: #bdc3c7;
    transition: color 0.3s ease;

    &:hover {
      color: #3498db;
    }
  }
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;

  img {
    height: 60px;
    width: auto;
  }
`;

const LogoText = styled.div`
  h3 {
    font-size: 1.5rem;
    margin: 0;
    color: white;
  }
  p {
    font-size: 0.9rem;
    margin: 0;
    color: #bdc3c7;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: #3498db;
    transform: translateY(-2px);
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 2rem;
  text-align: center;
  color: #95a5a6;
  font-size: 0.9rem;
`;

const BackToTop = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #3498db, #2ecc71);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
  transition: all 0.3s ease;
  z-index: 1000;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(52, 152, 219, 0.4);
  }

  @media (max-width: 768px) {
    bottom: 20px;
    right: 20px;
    width: 45px;
    height: 45px;
  }
`;

interface FooterProps {
  data: any;
}

const Footer: React.FC<FooterProps> = ({ data }) => {
  const { t } = useTranslation();
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <FooterContainer>
        <FooterContent>
          <FooterTop>
            <FooterSection>
              <LogoSection>
                <img src={data.siteInfo.logo} alt="中衛發展中心" />
                <LogoText>
                  <h3>{t('siteInfo.title')}</h3>
                  <p>{t('siteInfo.subtitle')}</p>
                </LogoText>
              </LogoSection>
              <p>{t('siteInfo.description')}</p>
              <SocialLinks>
                {data.contact.socialMedia.map((social: any, index: number) => (
                  <SocialLink key={index} href={social.url} target="_blank" rel="noopener noreferrer">
                    {social.icon}
                  </SocialLink>
                ))}
              </SocialLinks>
            </FooterSection>

            <FooterSection>
              <h4>{t('footer.serviceAreas')}</h4>
              <ul>
                <li><a href="#forward-service">{t('footer.forwardService')}</a></li>
                <li><a href="#achievements">{t('footer.industrySystem')}</a></li>
                <li><a href="#achievements">{t('footer.talentTraining')}</a></li>
                <li><a href="#achievements">{t('footer.innovationR&D')}</a></li>
              </ul>
            </FooterSection>

            <FooterSection>
              <h4>{t('contact.contactInfo')}</h4>
              <p>📍 {t('contact.info.address')}</p>
              <p>📞 {t('contact.info.phone')}</p>
              <p>✉️ {t('contact.email')}</p>
              <p>🌐 {t('contact.website')}</p>
            </FooterSection>

            <FooterSection>
              <h4>{t('footer.quickLinks')}</h4>
              <ul>
                <li><a href="#history">{t('footer.developmentHistory')}</a></li>
                <li><a href="#achievements">{t('footer.csdAchievements')}</a></li>
                <li><a href="#forward-service">{t('footer.forwardService')}</a></li>
                <li><a href="#contact">{t('footer.contactInquiry')}</a></li>
              </ul>
            </FooterSection>
          </FooterTop>

          <FooterBottom>
            <p>&copy; 2024 {t('siteInfo.title')}. {t('footer.copyright')}.</p>
            <p>{t('siteInfo.subtitle')}. {t('footer.allRightsReserved')}</p>
          </FooterBottom>
        </FooterContent>
      </FooterContainer>

      <BackToTop onClick={scrollToTop}>
        ↑
      </BackToTop>
    </>
  );
};

export default Footer;
