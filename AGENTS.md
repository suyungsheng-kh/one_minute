# 一分鐘認識：GitHub 網站

此儲存庫只維護入口網站與正式教學素材，不包含動畫原始製作專案。

- 主標題「把好奇，變成理解」，副標「一分鐘，認識一個概念」。國中生是內容與難度的背景設定，不反覆強調年齡。
- 網站骨架、樣式與互動修改 source/index.html、source/assets；課程修改 source/content/catalog.json。不要直接改生成的 docs/index.html 或 docs/content/catalog.js。
- 影片、字幕、封面及舊網址所需素材位於 docs。catalog 的來源路徑以儲存庫根目錄為基準。
- 補充教學維護 source/content/catalog.json 的 guide／comparisons；docs/series 下的 index.html 是生成的舊網址轉接，不作為教學編輯來源。
- npm run build 先生成 source/dist，再同步 docs；source/dist、review、exports 不提交。
- 提交前確認課程目錄及素材引用完整。版面或互動變更後執行 npm run check。
- 排序預設為 60 秒雲哲配音版，originalVersion 保存 30 秒原版的影片來源與同步提示，兩版皆保留。每集 id 應保持固定。
- 保留原有提交歷史，正常推送 main，不使用強制推送。
- 本儲存庫不儲存 Sites 的網站身分、憑證、備份或動畫製作素材。

- 正式網站、線上預覽及交付一律使用 https://suyungsheng-kh.github.io/one_minute/；所有站內頁面與素材使用同站相對路徑。不要自動發布到 Sites 或以 chatgpt.site 作為交付入口。根目錄 index.html 由 tools/github-entry.cjs 生成完整首頁；/docs 與 /(root) 的 Pages 設定皆可使用。

- 課程與路線模板為 source/lesson.html、source/path.html；catalog.paths 決定順序，recommendations 決定首頁推薦。公開課程必須加入同系列路線，新增課程需同步 learningGoals、keyTakeaway 與練習選項。新／舊分享連結、離線導航與進度接續須驗證。

## 新增與更新單元的必要交付流程

本規則適用所有既有系列與未來新增系列。每次新增或更新單元，都須在同一次工作中完成以下流程，不以單支影片或單頁修改作為完成交付：

1. 更新正式素材與課程目錄；有 release.json 的系列先同步正式版本。沿用既有課程 id，確認影片、封面、字幕與實際片長一致。
2. 同步整合首頁、課程頁與觀看路線。確認首頁可找到新內容、分類及數量正確；課程說明與練習對應新版；路線順序、上一集／下一集、返回入口及觀看進度正常。首頁推薦依內容調整，不引用未完成單元。
3. 每次新增或更新單元，也要檢查與既有單元的關聯，不限同一系列。辨識先備概念、共同原理、應用例子及容易混淆的差異，將有教學意義的關聯同步補進文件、課程頁與觀看路線，並加入相關單元連結。使用課程目錄的 connections 維護導讀及課程 id，必要時同步補上既有相關單元的反向連結；保留仍正確的導讀，不牽強建立關聯。連結只能指向已發布單元，不將建議觀看當成強制先修，也不因跨單元點擊而標為看完或重設進度。
4. 依維護文件完成建置、檢查及離線打包。網站功能或素材變更須驗證影片播放／跳轉、字幕下載、素材引用、站內及相關單元連結、搜尋篩選、手機版及受影響的觀看進度；跨單元導讀須核對概念與術語一致、連結目標正確、離線導航可用。不得沿用舊檢查結果冒充本次驗證。純文件變更則執行相應的文件與差異檢查。
5. 檢查通過後，先確認及合併遠端更新，再提交並正常推送至 https://github.com/suyungsheng-kh/one_minute 的 main。這是使用者已授權的日常更新流程，不需每次另問是否整合或推送；不得強制推送，也不把備份、憑證或動畫原始製作專案上傳網站儲存庫。
6. 推送後確認 GitHub Pages 已顯示本次更新、相關頁面及素材可用，再回報交付。正式網站與預覽入口固定為 https://suyungsheng-kh.github.io/one_minute/，不得改用 Sites 網址。

若使用者當次明確要求只做草稿、只預覽或暫不發布，依當次要求辦理，並清楚記錄尚未完成的整合／發布步驟。檢查失敗時先修復，不將失敗版本宣稱為已完成。

- 所有系列沿用共同課程結構與品牌；每集提供 guide、connections 與 comparison，共用導覽及播放工具。主品牌、字體、背景、按鈕與操作一致；僅依內容增加提示、補充題或影片版本。修改後核對全部課程與路線，參照 guides/website-brand.md。

- 正式動線統一為首頁 → 觀看路線 → 課程頁。Scratch／排序補充內容編輯 catalog 的 guide／comparisons；舊系列 index.html 由 tools/legacy-series.cjs 產生轉接，不能恢復成重複教學入口。保留 siteAnchor／legacySections 對應與舊素材網址；更新後檢查播放器提示、補充練習及 HTTP／離線舊網址轉接。

- 首頁概念關聯圖由 source/content/catalog.json 的 conceptMap 維護。更新單元時同步核對節點、連線與課程頁 connections 一致，目標須已發布；保留手機文字說明、鍵盤及離線導航，不以點選節點標為已看過。

- README 的動畫製作手冊與 workflows/一分鐘認識系列.md 由完整工作區匯出。修改時同步本機 one_minute/README.md 與 workflows，避免下次匯出覆蓋；只有此儲存庫時先保留修改，回到完整工作區再合併。文件包含動畫製作指令，但動畫原始專案並未隨此儲存庫提供。
