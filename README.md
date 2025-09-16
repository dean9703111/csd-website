# 中衛發展中心形象網頁

這是一個為財團法人中衛發展中心設計的專業形象網頁，採用 React + TypeScript 開發，具有現代化的設計和豐富的互動效果。

## 功能特色

### 🎨 視覺設計
- **現代化 UI/UX**：採用漸層色彩和玻璃擬態設計
- **響應式設計**：完美適配桌面、平板、手機等各種裝置
- **動畫效果**：使用 Framer Motion 實現流暢的滾動動畫
- **視覺化數據**：互動式圖表和數據展示

### 📱 頁面結構
1. **首頁 Hero**：震撼的視覺效果和品牌展示
2. **中衛發展歷史**：時間軸展示，滾動時有時代漸層效果
3. **中衛成就**：數據視覺化展示，多分類切換
4. **前瞻服務部介紹**：願景、定位、業務範疇、核心能力展示
5. **聯絡洽詢**：完整的聯絡資訊和表單

### 🛠 技術特色
- **JSON 資料管理**：所有內容透過 JSON 檔案管理，支援多國語言擴展
- **組件化架構**：可重用的 React 組件
- **TypeScript**：完整的型別安全
- **Styled Components**：CSS-in-JS 樣式管理
- **自定義 Hooks**：滾動動畫和視差效果

## 技術棧

- **React 18** - 前端框架
- **TypeScript** - 型別安全
- **Styled Components** - CSS-in-JS
- **Framer Motion** - 動畫庫
- **React Intersection Observer** - 滾動偵測

## 專案結構

```
src/
├── components/          # React 組件
│   ├── Header.tsx      # 導航列
│   ├── Hero.tsx        # 首頁主視覺
│   ├── HistorySection.tsx      # 發展歷史
│   ├── AchievementsSection.tsx # 中衛成就
│   ├── ForwardServiceSection.tsx # 前瞻服務部
│   ├── ContactSection.tsx      # 聯絡洽詢
│   └── Footer.tsx      # 頁尾
├── hooks/              # 自定義 Hooks
│   └── useScrollAnimation.ts
├── styles/             # 樣式檔案
│   └── GlobalStyles.ts
├── assets/             # 靜態資源
│   └── img/           # 圖片資源
├── data.json          # 內容資料
├── App.tsx            # 主應用程式
└── index.tsx          # 入口檔案
```

## 安裝與執行

### 環境需求
- Node.js 16.0 或更高版本
- npm 或 yarn

### 安裝依賴
```bash
npm install
```

### 開發模式
```bash
npm start
```
在瀏覽器中開啟 [http://localhost:3000](http://localhost:3000) 查看結果。

### 建置生產版本
```bash
npm run build
```

### 執行測試
```bash
npm test
```

## 資料管理

所有網站內容都透過 `src/data.json` 檔案管理，包含：

- **網站基本資訊**：標題、描述、Logo 等
- **發展歷史**：時間軸資料和統計數據
- **中衛成就**：各類別成就數據和圖片
- **前瞻服務部**：業務範疇、核心能力、成功案例
- **聯絡資訊**：聯絡方式、部門資訊、社群媒體

### 多國語言支援
JSON 資料結構設計支援多國語言擴展，未來可以輕鬆添加不同語言版本：

```json
{
  "zh-TW": { ... },
  "en-US": { ... },
  "ja-JP": { ... }
}
```

## 設計特色

### 色彩系統
- **主色調**：藍色系 (#3498db) - 專業、信任
- **輔助色**：綠色系 (#2ecc71) - 成長、永續
- **強調色**：橙色系 (#f39c12) - 活力、創新
- **漸層效果**：多處使用漸層背景增加視覺層次

### 動畫效果
- **滾動觸發**：元素進入視窗時觸發動畫
- **視差效果**：背景圖片隨滾動移動
- **懸停效果**：按鈕和卡片懸停時的互動效果
- **頁面轉場**：平滑的頁面切換動畫

### 響應式設計
- **桌面版**：1200px 以上，完整功能展示
- **平板版**：768px - 1024px，適配觸控操作
- **手機版**：768px 以下，優化觸控體驗

## 瀏覽器支援

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 部署建議

### 靜態網站部署
由於是純前端應用，可以部署到任何靜態網站託管服務：

- **Vercel**：推薦，支援自動部署
- **Netlify**：功能豐富的靜態網站託管
- **GitHub Pages**：免費的靜態網站託管
- **AWS S3 + CloudFront**：企業級解決方案

### 部署步驟
1. 執行 `npm run build` 建置生產版本
2. 將 `build` 資料夾內容上傳到託管服務
3. 設定自訂網域（可選）
4. 配置 HTTPS 憑證

## 維護與更新

### 內容更新
1. 編輯 `src/data.json` 檔案
2. 重新建置並部署

### 功能擴展
1. 在 `src/components` 新增組件
2. 在 `src/App.tsx` 引入並使用
3. 更新 `data.json` 添加對應資料

### 樣式調整
1. 修改 `src/styles/GlobalStyles.ts`
2. 調整各組件的 Styled Components

## 授權

此專案為財團法人中衛發展中心所有，僅供內部使用。

## 聯絡資訊

如有任何問題或建議，請聯絡：
- 電子郵件：info@csd.org.tw
- 電話：+886-2-2345-6789
- 網站：https://www.csd.org.tw