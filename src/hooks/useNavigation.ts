import { useCallback } from 'react';

export const useNavigation = () => {
  const scrollToSection = useCallback((sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);

  const navigate = useCallback((section: string) => {
    const sectionMap: { [key: string]: string } = {
      'history': 'history',
      'achievements': 'achievements', 
      'forwardService': 'forward-service',
      'contact': 'contact'
    };

    const sectionId = sectionMap[section];
    if (sectionId) {
      scrollToSection(sectionId);
    }
  }, [scrollToSection]);

  return { navigate, scrollToSection };
};
