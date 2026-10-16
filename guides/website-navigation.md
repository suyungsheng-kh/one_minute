# 統一網站入口與舊網址相容

正式學生動線是「首頁 → 觀看路線 → 課程頁」。首頁推薦與概念關聯圖仍可直接開啟同一套課程頁，不另建系列教學網站。

## 補充內容放在哪裡？

- Scratch 三集：原有概念說明、操作步驟、例子、提醒、觀看任務、練習及挑戰，整合至對應課程。變數與清單的比較表在課程內提供。
- 排序三集：原有生活比喻、操作步驟、第一輪結果、觀看任務與顏色提醒，整合至對應課程。保留重看、0.75 倍播放、依影片時間更新的提示、方法辨識練習與三種方法比較。
- 共用課程原有的練習、跨單元導讀、字幕下載、上一集／下一集與觀看進度繼續使用；所有課程可下載正式影片。不再顯示「進入完整教學」連結。

## 唯一維護來源

`content/catalog.json` 的 lesson.guide 保存補充內容：intro、exampleTitle、example、steps、reminders、watch；排序另有 cues（t、text）及 extraPractice（question、answer、choices、correctChoice）。comparison 參照頂層 comparisons，集中維護比較表，避免三集各改一份。

新單元或新版本需同步核對 guide、比較表、cues、練習、connections 與概念關聯圖。播放提示以正式影片時間為準；不因內容整合重製既有旁白或更改影片。

## 舊網址如何處理？

| 舊入口或章節 | 新位置 |
| --- | --- |
| series/scratch/ 或 index.html，沒有單元章節 | Scratch 觀看路線 |
| #variables、#lists、#conditions | 對應課程頁 |
| series/sorting/ 或 index.html，沒有單元章節 | 排序觀看路線 |
| #bubble、#selection、#insertion | 對應排序課程 |
| 排序 #compare | 氣泡排序課程內的完整方法比較表，可連到另外兩集 |
| 排序 #quiz | 氣泡排序課程的辨識練習，其餘兩題移到各自課程 |
| 原單元的 -watch、-practice、-title 或 video- 章節 | 對應課程的影片、練習或標題 |

查詢參數 id／lesson 也可對應已知單元；未知章節回到該系列觀看路線。使用 location.replace 避免上一頁回到轉接頁形成迴圈，且不更改觀看紀錄。JavaScript 未啟用時，轉接頁提供明確的路線與課程連結。

siteAnchor 與系列 legacySections 保存舊章節映射；tools/legacy-series.cjs 和 assets/legacy-series.js 產生及處理轉接。轉接在 HTTP 與離線 HTML 都可使用，保留舊影片、字幕與素材網址。GitHub 的 /docs 與根目錄發布設定均沿用同一套輸出。

## 原始系列網站

本機 scratch/site、sorting/site 及其來源保留作歷史比對與正式素材產製。網站建置只在 portal/dist 副本產生轉接，不覆寫原始動畫或舊製作資料。後續補充教學直接修改 portal 的 catalog，不再把原系列頁當成第二份學生網站或教學編輯來源。

## 交付檢查

核對六集補充內容、比較表、排序提示與練習；確認舊入口、各單元章節、比較與練習連結能到新位置。測試播放／跳轉、字幕與影片下載、慢速與重看、手機版、離線轉接、跨單元連結及進度。檢查通過後更新離線包並正常推送 GitHub，再確認線上版本。

## 排序影片版本

各排序課程頁預設播放 60 秒雲哲配音版，影片上方可選擇 30 秒實作原版。切換後播放位置歸零並暫停，字幕下載只在配音版顯示；兩版各用自己的同步提示與下載連結，已看過紀錄維持同一課程 id。catalog 的 originalVersion 管理原版來源、片長與提示；guide.cues 對應新版。正式入口仍是首頁 → 排序觀看路線 → 課程頁。
