# 一分鐘認識

**把好奇，變成理解。** 以「一分鐘，認識一個概念」為主軸，用生活與遊戲例子探索演算法、Scratch 與排序。內容難度以國中生為背景設定。

目前收錄三個系列、六支動畫；三支概念解說各 60 秒，三支排序實作各 30 秒。支援搜尋、分類、播放、字幕下載、練習及瀏覽器中的已看過紀錄。

## 觀看

下載完整儲存庫，開啟 index.html 或 docs/index.html。請保留所有子資料夾，影片與圖片皆可離線使用。

## 目錄

- docs：完整網站與正式影片、字幕、封面、Scratch／排序教學頁；可直接作為靜態網站發布來源。
- source：首頁骨架、樣式、互動程式、課程目錄與產製工具。
- source/content/catalog.json：新增系列或集數主要修改這裡。

動畫的原始製作專案仍由本機 animation/one_minute 各系列管理，本儲存庫只含網站維護來源及正式交付素材。

## 更新網站

安裝 Node.js 後，在儲存庫根目錄執行：

```text
npm run build
npm run preview
```

預覽預設 http://127.0.0.1:3037/，可用 PORT 指定其他連接埠。建置不需要套件安裝；現有影片皆已有封面，不需要 ffmpeg。新影片若不提供 posterSource，需安裝 ffmpeg 或設定 FFMPEG_PATH。

source/dist 是暫存產物，build 會同步到 docs。影片與系列頁的來源存放在 docs，請先新增／更新素材，再重新建置；不要在建置前刪除 docs。

瀏覽器驗證可執行 npm run check：需要可用的 puppeteer-core 與 Chrome／Edge，可用 PORTAL_PUPPETEER_MODULE、CHROME_PATH 指定。離線 ZIP 可用 npm run package 產生，需要 Python 3；ZIP 存在 source/exports。

## 新增課程或系列

1. 將正式影片放入 docs/media 或對應的 docs/series/<series>/videos，封面放入 docs/posters，字幕放入 docs/subtitles。
2. 在 source/content/catalog.json 的 lessons 新增資料，可參考 lesson-template.json。series 須對應既有系列 id；seconds 填實際片長。
3. videoSource、posterSource、subtitleSource 以儲存庫根目錄為基準，例如 docs/media/new-lesson.mp4。
4. 填寫生活例子、小問題、答案與挑戰；沒有字幕可填 null。
5. 新增系列時，在 series 陣列新增 title、subtitle、color、icon 等資料。有完整教學頁則設定 siteSource，例如 docs/series/science，否則填 null。
6. 執行 npm run build；首頁、搜尋、分類和數量會依目錄自動更新。完成確認後提交 source 與 docs。

保持既有課程 id 不變，分享連結與已看過紀錄才能延續。status: draft 不顯示；coming-soon 顯示準備中。

## GitHub Pages

若要發布此網站，在儲存庫 Settings → Pages 選擇 Deploy from a branch，分支 main、資料夾 /docs。啟用後網址為 https://suyungsheng-kh.github.io/one_minute/。推送檔案本身不代表已啟用 Pages。

## 本機來源同步

本機正式網站來源為 animation/one_minute/portal。日常先完成網站 build，再執行其 tools/export-github.cjs，便會更新 .github-publish/one_minute 這份儲存庫副本。確認差異後提交並推送；不要把整個動畫工作區或 .openai 設定上傳。
