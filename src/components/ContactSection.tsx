import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const ContactContainer = styled.section`
  padding: 100px 0;
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  color: white;
  position: relative;
  overflow: hidden;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ContactInfo = styled.div`
  h3 {
    font-size: 2rem;
    margin-bottom: 2rem;
    color: #feca57;
  }
`;

const OrganizationInfo = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const OrganizationName = styled.h4`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #fff;
`;

const EnglishName = styled.p`
  font-size: 1rem;
  color: #bdc3c7;
  margin-bottom: 1.5rem;
  font-style: italic;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  gap: 1rem;
`;

const InfoIcon = styled.span`
  font-size: 1.2rem;
  width: 30px;
  text-align: center;
`;

const InfoText = styled.span`
  color: #ecf0f1;
`;

const DepartmentsSection = styled.div`
  h4 {
    font-size: 1.3rem;
    margin-bottom: 1rem;
    color: #feca57;
  }
`;

const DepartmentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const DepartmentItem = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 1rem;
  border-left: 4px solid #3498db;
`;

const DepartmentName = styled.div`
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #fff;
`;

const DepartmentContact = styled.div`
  font-size: 0.9rem;
  color: #bdc3c7;
`;

const ContactForm = styled.form`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const FormTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #feca57;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #ecf0f1;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    outline: none;
    border-color: #3498db;
    background: rgba(255, 255, 255, 0.15);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    outline: none;
    border-color: #3498db;
    background: rgba(255, 255, 255, 0.15);
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #3498db, #2ecc71);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(52, 152, 219, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const SocialMedia = styled.div`
  margin-top: 2rem;
  h4 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: #feca57;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 10px 15px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 25px;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

const SocialIcon = styled.span`
  font-size: 1.2rem;
`;

interface ContactSectionProps {
  data: any;
}

const ContactSection: React.FC<ContactSectionProps> = ({ data }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ref, isVisible] = useScrollAnimation(0.1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // 模擬表單提交
    setTimeout(() => {
      alert('感謝您的留言！我們會盡快與您聯繫。');
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <ContactContainer id="contact">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#fff' }}>
            {data.contact.title}
          </h2>
          <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>
            {data.contact.description}
          </p>
        </motion.div>

        <ContactGrid ref={ref}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ContactInfo>
              <h3>聯絡資訊</h3>
              
              <OrganizationInfo>
                <OrganizationName>{data.contact.info.organization}</OrganizationName>
                <EnglishName>{data.contact.info.englishName}</EnglishName>
                
                <InfoItem>
                  <InfoIcon>📍</InfoIcon>
                  <InfoText>{data.contact.info.address}</InfoText>
                </InfoItem>
                
                <InfoItem>
                  <InfoIcon>📞</InfoIcon>
                  <InfoText>{data.contact.info.phone}</InfoText>
                </InfoItem>
                
                <InfoItem>
                  <InfoIcon>✉️</InfoIcon>
                  <InfoText>{data.contact.info.email}</InfoText>
                </InfoItem>
                
                <InfoItem>
                  <InfoIcon>🌐</InfoIcon>
                  <InfoText>{data.contact.info.website}</InfoText>
                </InfoItem>
              </OrganizationInfo>

              <DepartmentsSection>
                <h4>各部門聯絡方式</h4>
                <DepartmentList>
                  {data.contact.departments.map((dept: any, index: number) => (
                    <DepartmentItem key={index}>
                      <DepartmentName>{dept.name}</DepartmentName>
                      <DepartmentContact>
                        📞 {dept.phone} | ✉️ {dept.email}
                      </DepartmentContact>
                    </DepartmentItem>
                  ))}
                </DepartmentList>
              </DepartmentsSection>

              <SocialMedia>
                <h4>關注我們</h4>
                <SocialLinks>
                  {data.contact.socialMedia.map((social: any, index: number) => (
                    <SocialLink key={index} href={social.url} target="_blank" rel="noopener noreferrer">
                      <SocialIcon>{social.icon}</SocialIcon>
                      {social.platform}
                    </SocialLink>
                  ))}
                </SocialLinks>
              </SocialMedia>
            </ContactInfo>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <ContactForm onSubmit={handleSubmit}>
              <FormTitle>聯絡我們</FormTitle>
              
              <FormGroup>
                <Label htmlFor="name">姓名 *</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="請輸入您的姓名"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email">電子郵件 *</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="請輸入您的電子郵件"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="company">公司名稱</Label>
                <Input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="請輸入您的公司名稱"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="subject">主旨 *</Label>
                <Input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="請輸入主旨"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="message">訊息內容 *</Label>
                <TextArea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="請輸入您的訊息內容"
                  required
                />
              </FormGroup>

              <SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? '發送中...' : '發送訊息'}
              </SubmitButton>
            </ContactForm>
          </motion.div>
        </ContactGrid>
      </div>
    </ContactContainer>
  );
};

export default ContactSection;
