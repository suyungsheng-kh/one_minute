# Scratch 冒險小教室

給國中生的「一分鐘認識」。每課依序是白話說明、遊戲例子、中文動畫、想一想與動手挑戰。保留影片的紙雕 RPG 配色與角色。

目前三課：變數 → 清單 → 條件判斷。三部都是 60 秒，統一使用 Azure 台灣男聲「雲哲」，附繁體中文字幕、背景音樂與操作音效。第三集以森林商店示範「如果」與「否則」。2026-10-16 更新前兩集配音，依實際原速語音重新對齊字幕與動畫；舊聲音版本保存在製作專案與歷史交付包。

## 直接觀看

用瀏覽器開啟 `index.html` 即可，無須安裝套件或建置。影片、圖片、樣式與課程資料都在這個資料夾，離線也能閱讀及播放。前往 Scratch 編輯器的連結需要網路。

請保留完整資料夾結構；只複製 HTML 會缺少影片與內容。網頁使用系統中文字型，沒有外部字型、追蹤程式或帳號登入。

## 資料夾

```text
site/
├── index.html                 首頁與共用頁面骨架
├── content/
│   ├── lessons.js             所有課程內容（新增主題主要修改這裡）
│   └── lesson-template.txt    可複製的新課程範例
├── assets/
│   ├── app.js                 自動產生課程入口、內容及播放器
│   ├── style.css              電腦與手機共用樣式
│   ├── *-poster.jpg           影片封面
│   └── *.svg                  本系列紙雕插圖
├── videos/
│   ├── scratch-variables-yunjhe-v1.mp4  變數篇，雲哲版
│   ├── scratch-lists-yunjhe-v1.mp4      清單篇，雲哲版
│   └── scratch-conditions.mp4           條件判斷篇，雲哲版
├── subtitles/
│   ├── variables-yunjhe-v1.zh-TW.srt
│   ├── lists-yunjhe-v1.zh-TW.srt
│   └── conditions.zh-TW.srt
├── README.md
├── SOURCES.md
└── .nojekyll
```

三部影片皆有與旁白同步的內嵌字幕及可下載的繁體 SRT；畫面中的積木、標題與補充標籤不全數逐字口述。網頁不再疊加第二層字幕，以免擋住教學畫面。

## 上傳 GitHub Pages

1. 如果拿到 ZIP，先解壓縮。GitHub 不會自動把 ZIP 變成網站。
2. 建立儲存庫，把 **site 裡的所有檔案與子資料夾** 放進儲存庫根目錄，讓 `index.html` 在最外層。影片資料夾也要一併上傳。
3. 到儲存庫 **Settings → Pages**，在 **Source** 選擇 **Deploy from a branch**。
4. 選擇實際存放檔案的分支（通常為 `main`）與 **/(root)**，儲存。
5. 發布後，從 Pages 頁面開啟網站網址，確認三部影片都能播放。

若已有其他網站，也可把 site 資料夾放進現有 Pages 發布來源，以 `/site/` 路徑存取。若使用 `/docs` 作為發布來源，請將本資料夾內容放在 `docs` 裡，並選擇 `/docs`。所有資源使用相對路徑，支援儲存庫名稱與子資料夾網址。

參考：[GitHub 官方發布來源說明](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)。正式網站使用 [一分鐘認識](https://suyungsheng-kh.github.io/one_minute/)，本資料夾及 ZIP 也可獨立離線觀看。

## 新增一個主題

1. 將 MP4 放入 `videos/`，封面放入 `assets/`，SRT 放入 `subtitles/`。建議使用英文小寫與連字號命名。
2. 打開 `content/lessons.js`，在陣列結尾新增一筆資料。可複製既有課程或 `lesson-template.txt` 範例；兩筆資料之間要有逗號。
3. `id` 必須是新的英文識別名稱，例如 `loops`；它也會成為連結 `index.html#loops`。
4. 填入標題、簡介、例子、教學步驟、小提醒、看影片提示與練習答案。`intro`、`example`、`steps` 都可調整筆數。`video`、`poster`、`icon`、`subtitleFile` 是相對於 `index.html` 的路徑。
5. 儲存後重開或重新整理頁面。課程卡片、章節編號、文字、播放器及練習區會依資料順序自動產生，不必複製整段 HTML。
6. 若課程已超出變數／清單主題，可一併調整 `index.html` 的首頁介紹、學習路線和結尾比較表；那幾段是系列導讀，不由課程資料自動推論。

維護原則：每課先解釋用途，再帶入熟悉的遊戲例子；一次解釋一個術語。播放器不自動播放，開始播放其中一部時，另一部會暫停。可用鍵盤打開答案，支援手機排版與減少動態效果偏好。

## 系列正式來源

本網站位於 `animation/one_minute/scratch/site`；動畫製作來源在相鄰的 `projects`，日常工具在 `tools`，交付 ZIP 在 `exports/scratch-learning.zip`。總系列名稱為「一分鐘認識」，共用工作流是 `animation/one_minute/workflows/一分鐘認識系列.md`。

製作端新增主題時，先保留原始專案與全部輸出，再於 `tools/release.json` 選定網站使用的 MP4 與 SRT，執行 sync-site、check 與 package。學生網站只攜帶交付副本。既有影片保持原版，舊影片畫面可能仍顯示當時的系列名稱；之後的新輸出使用「一分鐘認識」。
