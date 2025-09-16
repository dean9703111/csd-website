import React, { useState, useEffect } from 'react';
import { GlobalStyle } from './styles/GlobalStyles';
import Header from './components/Header';
import Hero from './components/Hero';
import HistorySection from './components/HistorySection';
import AchievementsSection from './components/AchievementsSection';
import ForwardServiceSection from './components/ForwardServiceSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import data from './data.json';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 模擬載入時間
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        fontSize: '1.5rem'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '3px solid rgba(255,255,255,0.3)',
            borderTop: '3px solid white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          <p>載入中...</p>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="App">
      <GlobalStyle />
      <Header data={data} />
      <Hero data={data} />
      <HistorySection data={data} />
      <AchievementsSection data={data} />
      <ForwardServiceSection data={data} />
      <ContactSection data={data} />
      <Footer data={data} />
    </div>
  );
}

export default App;