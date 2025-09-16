import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styled, { keyframes, css } from 'styled-components';

// 上下浮動動畫
const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

// 脈衝動畫
const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(102, 126, 234, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(102, 126, 234, 0);
  }
`;

// 機器人按鈕容器
const AssistantButton = styled.button<{ $isListening: boolean }>`
  position: fixed;
  bottom: 120px;
  right: 30px;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 30px;
  cursor: pointer;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  animation: ${css`${float} 3s ease-in-out infinite`};
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }

  ${props => props.$isListening && css`
    animation: ${pulse} 1.5s infinite;
    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  `}
`;

// 語音辨識狀態顯示
const StatusDisplay = styled.div.attrs<{ $show: boolean }>((props) => ({
  style: {
    opacity: props.$show ? 1 : 0,
    transform: props.$show ? 'translateY(0)' : 'translateY(10px)',
  },
}))`
  position: fixed;
  bottom: 210px;
  right: 30px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 15px 20px;
  border-radius: 10px;
  font-size: 14px;
  max-width: 300px;
  z-index: 1001;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
`;

// 完整指令顯示
const CommandDisplay = styled.div.attrs<{ $show: boolean }>((props) => ({
  style: {
    opacity: props.$show ? 1 : 0,
    transform: props.$show ? 'translateY(0)' : 'translateY(10px)',
  },
}))`
  position: fixed;
  bottom: 290px;
  right: 30px;
  background: rgba(102, 126, 234, 0.9);
  color: white;
  padding: 12px 18px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  max-width: 300px;
  z-index: 1002;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  text-align: center;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  display: flex;
  align-items: center;
  gap: 8px;
`;

// 回饋 emoji 顯示
const FeedbackEmoji = styled.div.attrs<{ $show: boolean }>((props) => ({
  style: {
    opacity: props.$show ? 1 : 0,
    transform: props.$show ? 'scale(1) translateY(0)' : 'scale(0.5) translateY(20px)',
  },
}))`
  position: fixed;
  bottom: 290px;
  right: 30px;
  font-size: 50px;
  z-index: 1002;
  transition: all 0.3s ease;
  pointer-events: none;
`;

// 幫助彈窗
const HelpModal = styled.div<{ $show: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => props.$show ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 2000;
  backdrop-filter: blur(5px);
`;

const HelpContent = styled.div`
  background: white;
  border-radius: 15px;
  padding: 30px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
`;

const HelpTitle = styled.h3`
  color: #333;
  margin-bottom: 20px;
  text-align: center;
  font-size: 24px;
`;

const HelpList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const HelpItem = styled.li`
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  color: #666;
  font-size: 16px;
  
  &:last-child {
    border-bottom: none;
  }
`;

const LanguageNote = styled.div`
  margin-top: 20px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #667eea;
  font-size: 14px;
  color: #666;
  
  .note-title {
    font-weight: 600;
    color: #333;
    margin-bottom: 8px;
  }
  
  .language-list {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  
  .language-item {
    background: #667eea;
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #999;
  
  &:hover {
    color: #333;
  }
`;

interface VoiceAssistantProps {
  onNavigate: (section: string) => void;
}

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ onNavigate }) => {
  const { t, i18n } = useTranslation();
  const [isListening, setIsListening] = useState(false);
  const [statusText, setStatusText] = useState('');
  const [showStatus, setShowStatus] = useState(false);
  const [commandText, setCommandText] = useState('');
  const [showCommand, setShowCommand] = useState(false);
  const [commandEmoji, setCommandEmoji] = useState('');
  const [feedbackEmoji, setFeedbackEmoji] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const isListeningRef = useRef(false);

  // 關鍵字映射 - 擴展更多可理解的指令
  const keywordMap = React.useMemo(() => ({
    'zh-TW': {
      // 歷史相關
      '發展歷史': 'history',
      '歷史': 'history',
      '公司歷史': 'history',
      '發展歷程': 'history',
      '歷史沿革': 'history',
      '成立歷史': 'history',
      
      // 成就相關
      '中衛成就': 'achievements',
      '成就': 'achievements',
      '獲獎': 'achievements',
      '獎項': 'achievements',
      '榮譽': 'achievements',
      '成果': 'achievements',
      '得獎': 'achievements',
      
      // 服務相關
      '前瞻服務部': 'forwardService',
      '前瞻服務': 'forwardService',
      '服務': 'forwardService',
      '服務部': 'forwardService',
      '業務': 'forwardService',
      '服務項目': 'forwardService',
      '服務內容': 'forwardService',
      
      // 聯絡相關
      '聯絡洽詢': 'contact',
      '聯絡我們': 'contact',
      '聯絡': 'contact',
      '洽詢': 'contact',
      '聯繫': 'contact',
      '聯繫我們': 'contact',
      '聯絡方式': 'contact',
      '電話': 'contact',
      '地址': 'contact',
      
      // 語言切換
      '中文': 'zh-TW',
      '英文': 'en',
      '日文': 'ja',
      '繁體中文': 'zh-TW',
      '英文版': 'en',
      '日文版': 'ja'
    },
    'en': {
      // History related
      'development history': 'history',
      'history': 'history',
      'company history': 'history',
      'our history': 'history',
      'historical': 'history',
      'timeline': 'history',
      
      // Achievements related
      'achievements': 'achievements',
      'awards': 'achievements',
      'honors': 'achievements',
      'recognition': 'achievements',
      'accomplishments': 'achievements',
      'success': 'achievements',
      
      // Service related
      'forward service': 'forwardService',
      'service': 'forwardService',
      'services': 'forwardService',
      'department': 'forwardService',
      'business': 'forwardService',
      'offerings': 'forwardService',
      
      // Contact related
      'contact': 'contact',
      'contact us': 'contact',
      'get in touch': 'contact',
      'reach us': 'contact',
      'phone': 'contact',
      'address': 'contact',
      'location': 'contact',
      
      // Language switching
      'chinese': 'zh-TW',
      'english': 'en',
      'japanese': 'ja',
      'chinese version': 'zh-TW',
      'english version': 'en',
      'japanese version': 'ja'
    },
    'ja': {
      // 歴史関連
      '発展歴史': 'history',
      '歴史': 'history',
      '会社の歴史': 'history',
      '沿革': 'history',
      '歴史的': 'history',
      'タイムライン': 'history',
      
      // 成果関連
      '中衛の成果': 'achievements',
      '成果': 'achievements',
      '受賞': 'achievements',
      '賞': 'achievements',
      '栄誉': 'achievements',
      '実績': 'achievements',
      '成功': 'achievements',
      
      // サービス関連
      '先見サービス部': 'forwardService',
      'サービス': 'forwardService',
      'サービス部': 'forwardService',
      '事業': 'forwardService',
      '業務': 'forwardService',
      '提供サービス': 'forwardService',
      
      // 連絡関連
      '連絡相談': 'contact',
      '連絡': 'contact',
      'お問い合わせ': 'contact',
      '連絡先': 'contact',
      '電話': 'contact',
      '住所': 'contact',
      '所在地': 'contact',
      
      // 言語切り替え
      '中国語': 'zh-TW',
      '英語': 'en',
      '日本語': 'ja',
      '中国語版': 'zh-TW',
      '英語版': 'en',
      '日本語版': 'ja'
    }
  }), []);

  // 處理語音指令
  const processVoiceCommand = React.useCallback((transcript: string) => {
    const currentLang = i18n.language as keyof typeof keywordMap;
    const keywords = keywordMap[currentLang] || keywordMap['zh-TW'];
    
    const lowerTranscript = transcript.toLowerCase().trim();
    let matchedKeywords = 0;
    let matchedAction = '';
    let matchedKeyword = '';

    console.log('語音辨識結果:', transcript);
    console.log('當前語言:', currentLang);
    console.log('可用關鍵字:', Object.keys(keywords));

    // 檢查關鍵字匹配
    for (const [keyword, action] of Object.entries(keywords)) {
      if (lowerTranscript.includes(keyword.toLowerCase())) {
        matchedKeywords++;
        matchedAction = action;
        matchedKeyword = keyword;
        console.log('匹配到關鍵字:', keyword, '-> 動作:', action);
        break; // 找到第一個匹配就停止
      }
    }

    // 修改邏輯：只要匹配到一個關鍵字就執行
    if (matchedKeywords >= 1) {
      // 辨識成功 - 關閉幫助彈窗
      setShowHelp(false);
      
      // 顯示完整指令和成功 emoji
      setCommandText(matchedKeyword);
      setCommandEmoji('✅');
      setShowCommand(true);
      setTimeout(() => setShowCommand(false), 3000);
      
      if (matchedAction === 'zh-TW' || matchedAction === 'en' || matchedAction === 'ja') {
        // 語言切換
        i18n.changeLanguage(matchedAction);
        setStatusText(`${t('voiceAssistant.languageChanged') as string}: ${matchedKeyword}`);
        
        // 停止當前語音辨識並重新初始化
        if (recognitionRef.current && isListeningRef.current) {
          // 先停止語音辨識
          try {
            recognitionRef.current.stop();
          } catch (error) {
            console.log('停止語音辨識時發生錯誤:', error);
          }
          
          // 重置狀態
          isListeningRef.current = false;
          setIsListening(false);
          setShowStatus(false);
          
          // 清除舊的語音辨識物件
          recognitionRef.current = null;
          
          // 延遲重新啟動以確保語言切換完成
          setTimeout(() => {
            // 直接在這裡重新啟動語音辨識，避免循環依賴
            if (!isListeningRef.current) {
              if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
                const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                recognitionRef.current = new SpeechRecognition();
                
                const recognition = recognitionRef.current;
                recognition.continuous = true;
                recognition.interimResults = true;
                recognition.lang = matchedAction === 'zh-TW' ? 'zh-TW' : matchedAction;

                recognition.onstart = () => {
                  setIsListening(true);
                  isListeningRef.current = true;
                  setStatusText(t('voiceAssistant.listening') as string);
                  setShowStatus(true);
                };

                recognition.onresult = (event) => {
                  let finalTranscript = '';
                  let interimTranscript = '';

                  for (let i = event.resultIndex; i < event.results.length; i++) {
                    const transcript = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                      finalTranscript += transcript;
                    } else {
                      interimTranscript += transcript;
                    }
                  }

                  if (interimTranscript) {
                    setStatusText(`${t('voiceAssistant.listening') as string}: ${interimTranscript}`);
                  }

                  if (finalTranscript) {
                    setStatusText(`${t('voiceAssistant.recognized') as string}: ${finalTranscript}`);
                    processVoiceCommand(finalTranscript);
                  }
                };

                recognition.onerror = (event) => {
                  console.error('語音辨識錯誤:', event.error);
                  setIsListening(false);
                  isListeningRef.current = false;
                  if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
                    setShowStatus(false);
                  }
                  setCommandText(t('voiceAssistant.error') as string || '語音辨識錯誤');
                  setCommandEmoji('❌');
                  setShowCommand(true);
                  setTimeout(() => setShowCommand(false), 3000);
                };

                recognition.onend = () => {
                  if (isListeningRef.current) {
                    setTimeout(() => {
                      if (recognitionRef.current && isListeningRef.current) {
                        try {
                          recognitionRef.current.start();
                        } catch (error) {
                          console.error('重新啟動語音辨識失敗:', error);
                          setIsListening(false);
                          isListeningRef.current = false;
                          setShowStatus(false);
                          setCommandText(t('voiceAssistant.error') as string || '語音辨識錯誤');
                          setCommandEmoji('❌');
                          setShowCommand(true);
                          setTimeout(() => setShowCommand(false), 3000);
                        }
                      }
                    }, 100);
                  }
                };

                setIsListening(true);
                isListeningRef.current = true;
                setStatusText(t('voiceAssistant.listening') as string);
                setShowStatus(true);
                recognition.start();
              }
            }
          }, 500);
        }
      } else {
        // 頁面跳轉
        onNavigate(matchedAction);
        setStatusText(`${t('voiceAssistant.navigating') as string}: ${matchedKeyword}`);
      }
    } else {
      // 辨識失敗，顯示幫助
      console.log('沒有匹配到任何關鍵字');
      setCommandText(t('voiceAssistant.unknownCommand') as string || '未知指令');
      setCommandEmoji('❓');
      setShowCommand(true);
      setTimeout(() => {
        setShowCommand(false);
        setShowHelp(true);
      }, 2000);
    }
  }, [i18n, t, onNavigate, keywordMap]);



  // 顯示回饋 emoji
  const showFeedbackEmoji = (emoji: string) => {
    setFeedbackEmoji(emoji);
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 2000);
  };

  // 開始語音辨識
  const startListening = () => {
    if (!isListening && !isListeningRef.current) {
      // 重新初始化語音辨識物件
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognitionRef.current = new SpeechRecognition();
        
        const recognition = recognitionRef.current;
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = i18n.language === 'zh-TW' ? 'zh-TW' : i18n.language;

        recognition.onstart = () => {
          setIsListening(true);
          isListeningRef.current = true;
          setStatusText(t('voiceAssistant.listening') as string);
          setShowStatus(true);
        };

        recognition.onresult = (event) => {
          let finalTranscript = '';
          let interimTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript;
            } else {
              interimTranscript += transcript;
            }
          }

          if (interimTranscript) {
            setStatusText(`${t('voiceAssistant.listening') as string}: ${interimTranscript}`);
          }

          if (finalTranscript) {
            setStatusText(`${t('voiceAssistant.recognized') as string}: ${finalTranscript}`);
            processVoiceCommand(finalTranscript);
          }
        };

        recognition.onerror = (event) => {
          console.error('語音辨識錯誤:', event.error);
          setIsListening(false);
          isListeningRef.current = false;
          // 只有在嚴重錯誤時才隱藏狀態框，不要因為重新啟動失敗就隱藏
          if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
            setShowStatus(false);
          }
          setCommandText(t('voiceAssistant.error') as string || '語音辨識錯誤');
          setCommandEmoji('❌');
          setShowCommand(true);
          setTimeout(() => setShowCommand(false), 3000);
        };

        recognition.onend = () => {
          console.log('語音辨識結束，當前聆聽狀態:', isListeningRef.current);
          // 如果還在聆聽模式，自動重新開始
          if (isListeningRef.current) {
            console.log('重新啟動語音辨識...');
            setTimeout(() => {
              if (recognitionRef.current && isListeningRef.current) {
                try {
                  recognitionRef.current.start();
                  console.log('語音辨識重新啟動成功');
                } catch (error) {
                  console.error('重新啟動語音辨識失敗:', error);
                  // 重新啟動失敗時，停止聆聽模式
                  setIsListening(false);
                  isListeningRef.current = false;
                  setShowStatus(false);
                  setCommandText(t('voiceAssistant.error') as string || '語音辨識錯誤');
                  setCommandEmoji('❌');
                  setShowCommand(true);
                  setTimeout(() => setShowCommand(false), 3000);
                }
              }
            }, 100);
          } else {
            console.log('聆聽模式已關閉，不重新啟動');
          }
        };

        setIsListening(true);
        isListeningRef.current = true;
        setStatusText(t('voiceAssistant.listening') as string);
        setShowStatus(true); // 立即顯示狀態框
        setShowHelp(false); // 開始聆聽時關閉幫助彈窗
        recognition.start();
      }
    }
  };

  // 停止語音辨識
  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      setIsListening(false);
      isListeningRef.current = false;
      setShowStatus(false); // 立即隱藏狀態顯示
      recognitionRef.current.stop();
    }
  };

  // 獲取幫助內容 - 只顯示主要目錄和語言
  const getHelpContent = () => {
    const currentLang = i18n.language as keyof typeof keywordMap;
    
    // 只顯示主要目錄項目
    const mainSections = {
      'zh-TW': ['發展歷史', '中衛成就', '前瞻服務部', '聯絡洽詢'],
      'en': ['Development History', 'Achievements', 'Forward Service', 'Contact'],
      'ja': ['発展歴史', '中衛の成果', '先見サービス部', '連絡相談']
    };
    
    // 支援的語言
    const supportedLanguages = {
      'zh-TW': ['中文', '英文', '日文'],
      'en': ['Chinese', 'English', 'Japanese'],
      'ja': ['中国語', '英語', '日本語']
    };
    
    return { 
      mainSections: mainSections[currentLang] || mainSections['zh-TW'],
      supportedLanguages: supportedLanguages[currentLang] || supportedLanguages['zh-TW']
    };
  };

  return (
    <>
      <AssistantButton
        $isListening={isListening}
        onClick={isListening ? stopListening : startListening}
        title={isListening ? (t('voiceAssistant.stopListening') as string) : (t('voiceAssistant.startListening') as string)}
      >
        {isListening ? '🛑' : '🤖'}
      </AssistantButton>

      <StatusDisplay $show={showStatus}>
        {statusText}
      </StatusDisplay>

      <CommandDisplay $show={showCommand}>
        {commandEmoji} "{commandText}"
      </CommandDisplay>

      <FeedbackEmoji $show={showFeedback}>
        {feedbackEmoji}
      </FeedbackEmoji>

      <HelpModal $show={showHelp} onClick={() => setShowHelp(false)}>
        <HelpContent onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={() => setShowHelp(false)}>×</CloseButton>
          <HelpTitle>{t('voiceAssistant.helpTitle') as string}</HelpTitle>
          <HelpList>
            {getHelpContent().mainSections.map((section, index) => (
              <HelpItem key={index}>
                💬 "{section}"
              </HelpItem>
            ))}
          </HelpList>
          <LanguageNote>
            <div className="note-title">🌐 支援語言</div>
            <div className="language-list">
              {getHelpContent().supportedLanguages.map((language, index) => (
                <span key={index} className="language-item">
                  {language}
                </span>
              ))}
            </div>
          </LanguageNote>
        </HelpContent>
      </HelpModal>
    </>
  );
};

export default VoiceAssistant;
