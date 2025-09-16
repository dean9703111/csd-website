import React from 'react';
import styled from 'styled-components';

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
                  <h3>{data.siteInfo.title}</h3>
                  <p>{data.siteInfo.subtitle}</p>
                </LogoText>
              </LogoSection>
              <p>{data.siteInfo.description}</p>
              <SocialLinks>
                {data.contact.socialMedia.map((social: any, index: number) => (
                  <SocialLink key={index} href={social.url} target="_blank" rel="noopener noreferrer">
                    {social.icon}
                  </SocialLink>
                ))}
              </SocialLinks>
            </FooterSection>

            <FooterSection>
              <h4>服務領域</h4>
              <ul>
                <li><a href="#forward-service">前瞻服務部</a></li>
                <li><a href="#achievements">產業體系建構</a></li>
                <li><a href="#achievements">人才培育</a></li>
                <li><a href="#achievements">創新研發</a></li>
              </ul>
            </FooterSection>

            <FooterSection>
              <h4>聯絡資訊</h4>
              <p>📍 {data.contact.info.address}</p>
              <p>📞 {data.contact.info.phone}</p>
              <p>✉️ {data.contact.info.email}</p>
              <p>🌐 {data.contact.info.website}</p>
            </FooterSection>

            <FooterSection>
              <h4>快速連結</h4>
              <ul>
                <li><a href="#history">發展歷史</a></li>
                <li><a href="#achievements">中衛成就</a></li>
                <li><a href="#forward-service">前瞻服務部</a></li>
                <li><a href="#contact">聯絡洽詢</a></li>
              </ul>
            </FooterSection>
          </FooterTop>

          <FooterBottom>
            <p>&copy; 2024 財團法人中衛發展中心. 版權所有.</p>
            <p>Corporate Synergy Development Center. All rights reserved.</p>
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
