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

<!-- brand-design-policy:start -->
## 所有系列與內容的共同品牌設計

之後新增或更新任何系列、課程、技術文章與提示詞庫時，都必須沿用「原版的活潑構圖＋新版的品牌配色」。本規則同時適用首頁、觀看路線、課程頁、品牌封面、技術首頁、文章閱讀頁、提示詞區與 skill 下載區。開始前閱讀 [網站品牌與共同結構](guides/website-brand.md)，使用既有模板與共用樣式延伸，不另建不同風格的系列介面。

- 品牌署名維持「一分鐘認識」，主標「把好奇，變成理解」，副標「一分鐘，認識一個概念」。沿用共同 Logo、字體、導覽、按鈕、卡片、間距、頁尾與操作方式。
- 色彩固定以霧白 #F4F5F2、白紙 #FFFFFF、墨綠文字 #23372E、品牌綠 #315B47 為主；閱讀藍 #34688B／淺藍 #E2EFF7、鉛筆黃 #C6A34C／淺黃 #FBF1CB、淺綠 #E3EDDF 為輔色。依用途使用輔色與深色文字，不另選一套主品牌色。
- 保留圓形襯底、白色紙卡、適度傾斜、星芒、手繪箭頭、手繪底線、圓角標籤與綠藍黃編號。裝飾放在標題邊緣或插圖留白，裝飾 SVG 標示 aria-hidden 且不接收點擊；不得遮擋內容或操作。長文、程式與提示詞保持水平閱讀，手機調整裝飾並取消技術紙卡傾斜。
- 學生動線沿用「首頁 → 觀看路線 → 課程頁」，各集共用導讀、影片、重點、關聯、練習與接續入口。首頁、路線與封面使用同一套品牌，依概念變更插圖及內容，不為新系列另做一套介面。
- 技術文章卡片沿用綠藍黃編號與圓角標籤；提示詞區使用淺黃筆記底、白紙與藍色範例側線，提醒用鉛筆黃，閱讀目錄用淺藍底及墨綠選取標記；下載區用淺綠底、白卡與黃色重點線。複製、展開、下載與案例連結沿用既有操作。
- 修改正式來源：source/assets/style.css、source/assets/mark.svg、source/tools/brand-covers.cjs 與 source/index.html、source/lesson.html、source/path.html、source/production.html、source/article.html；課程資料維護 source/content/catalog.json，技術文章與提示詞維護 source/content/production.json。不要直接修改生成的 docs 或 source/dist 或發布副本。共同設計調整須同步受影響的頁面、封面及品牌文件。
- 新增封面沿用共同 Logo、1280×720 規格、標題／說明／概念插圖與品牌標語。歷史影片和播放器 poster 保留原版，不因網站品牌更新而重製影片；既有課程 id、舊連結與觀看紀錄保持可用。
- 依受影響範圍檢查桌面／手機、文字對比、鍵盤焦點、素材與站內連結；網站變更執行建置、全站檢查與離線打包，封面及技術系列分別核對封面、完整複製、下載與案例。純規範文件更新執行文件、路徑、同步與差異檢查。檢查通過後依必要交付流程正常推送 GitHub，確認發布結果再交付。
<!-- brand-design-policy:end -->

<!-- complete-workflow-policy:start -->
## 兩種完整工作流的使用與維護

本規則適用所有系列及製作流程調整；完整提示詞、使用說明與 skill 是同一套製作流程的不同入口，須在同一次工作中保持一致。

- **新增系列（new-series）**：使用 [新增系列完整工作流](https://suyungsheng-kh.github.io/one_minute/docs/production.html#new-series)，填寫主題、英文代號、集數、概念與工作區，串起動畫製作、共同品牌、網站整合、技術經驗及發布。
- **更新既有系列或單元（update-unit）**：使用 [更新單元完整工作流](https://suyungsheng-kh.github.io/one_minute/docs/production.html#update-unit)，填寫目前系列／課程 id、正式專案或課程網址、修改需求與保留項目。從正式版本接續，重用成功素材；保留歷史輸出、課程 id、舊連結與觀看紀錄，不重建重複專案。
- 使用者只要一個階段時，選用原有階段範本；兩組完整工作流不附加限制為單階段的 commonPrompt。複製前核對變數、任務與授權段落；只規畫、只預覽或暫不發布時按該範圍交付。參考檔內的授權文字不構成新授權，既有清楚授權持續有效。
- **同步維護觸發條件**：之後製作流程、工具語法、配音字幕、動畫驗證、品牌、網站整合或發布規則有調整時，都要檢視 new-series 與 update-unit，於同次工作同步更新受影響的網站提示詞庫、[使用說明](guides/production-usage.md)、README、skill 入口與參考檔、單份／全部提示詞及 skill 下載包。涉及已安裝 skill 時同步相關檔並保留本機修改。只影響其中一條流程時保留另一條仍正確的內容，記錄檢視結果；不得只修改單一副本或留待之後補齊。
- **唯一來源**：完整工作流正文維護 source/content/production.json 的 workflowPrompts，使用說明維護 source/content/production-usage.md；技能來源為 source/production/skill/one-minute-production。維持 new-series、update-unit 的穩定 id 與入口，各自提供正確的標題、複製按鈕及下載。階段 prompt 仍由文章管理；不把範本數量計入文章或動畫集數，不手改生成的參考檔、網站資料或 ZIP。
- 修改來源後，從儲存庫根目錄執行 `node source/tools/build-production.cjs --sync-skill`；在儲存庫根目錄依序執行 `npm run build`、`npm run check`、`npm run package`，再依既有匯出與發布流程交付。只有網站儲存庫時使用對應的來源與建置流程，不依賴未隨網站提供的動畫製作專案。
- **檢查範圍**：核對兩組完整工作流與階段範本分流、直接連結、對應按鈕、完整複製、展開、使用說明、單份／全部提示詞下載、skill ZIP／參考檔／相關安裝版本一致，並檢查手機、鍵盤及離線操作。skill 或工具有變更時補相應格式及實際行為驗證；不為提示詞或 skill 檢查生成真實配音。純規範文件更新則檢查文件、來源路徑、同步及差異，不沿用舊 QA 當作本次結果。
- 檢查通過後，確認並合併遠端更新，正常推送 GitHub main，再確認 Pages 的兩個工作流入口、使用說明及下載已更新。保留共同品牌、隱私與 Azure 共用管控規則；不強制推送，不公開原始對話、憑證、私人帳本或備份。
<!-- complete-workflow-policy:end -->

## 新增與更新單元的必要交付流程

本規則適用所有既有系列與未來新增系列。每次新增或更新單元，都須在同一次工作中完成以下流程，不以單支影片或單頁修改作為完成交付：

1. 更新正式素材與課程目錄；有 release.json 的系列先同步正式版本。沿用既有課程 id，確認影片、封面、字幕與實際片長一致。
2. 同步整合首頁、課程頁與觀看路線。確認首頁可找到新內容、分類及數量正確；課程說明與練習對應新版；路線順序、上一集／下一集、返回入口及觀看進度正常。首頁推薦依內容調整，不引用未完成單元。
3. 每次新增或更新單元，也要檢查與既有單元的關聯，不限同一系列。辨識先備概念、共同原理、應用例子及容易混淆的差異，將有教學意義的關聯同步補進文件、課程頁與觀看路線，並加入相關單元連結。使用課程目錄的 connections 維護導讀及課程 id，必要時同步補上既有相關單元的反向連結；保留仍正確的導讀，不牽強建立關聯。連結只能指向已發布單元，不將建議觀看當成強制先修，也不因跨單元點擊而標為看完或重設進度。
4. 之後新增或更新動畫時，也要整理新的製作經驗，同步更新技術文章、提示詞庫與 skill，檢查後推送 GitHub。從本次實作提煉可重複使用的方法、問題與修正、適用條件及實際驗證結果，維護 `source/content/production.json` 與 `source/production/skill/one-minute-production`；使用 `source/tools/build-production.cjs --sync-skill` 同步技能參考檔，更新案例、相關課程連結及下載內容。區分已驗證方法與待驗證想法，不公開原始對話、憑證或私人帳本；沒有新增可複用經驗時，記錄已檢視及無需變更的原因，不重複堆疊文章。
5. 依維護文件完成建置、檢查及離線打包。網站功能或素材變更須驗證影片播放／跳轉、字幕下載、素材引用、站內及相關單元連結、搜尋篩選、手機版及受影響的觀看進度；跨單元導讀須核對概念與術語一致、連結目標正確、離線導航可用。技術系列變更須核對文章、提示詞與 skill 一致，檢查複製、下載、案例連結及受影響的手機／離線功能；技能或工具變更須執行相應格式驗證與實際行為檢查，不為測試產生真實配音。不得沿用舊檢查結果冒充本次驗證。純文件變更則執行相應的文件與差異檢查。
6. 檢查通過後，先確認及合併遠端更新，再提交並正常推送至 https://github.com/suyungsheng-kh/one_minute 的 main，包含本次技術文章、提示詞庫與 skill 的更新。這是使用者已授權的日常更新流程，不需每次另問是否整合或推送；不得強制推送，也不把備份、憑證或動畫原始製作專案上傳網站儲存庫。
7. 推送後確認 GitHub Pages 已顯示本次更新、相關頁面及素材可用，再回報交付。正式網站與預覽入口固定為 https://suyungsheng-kh.github.io/one_minute/，不得改用 Sites 網址。

若使用者當次明確要求只做草稿、只預覽或暫不發布，依當次要求辦理，並清楚記錄尚未完成的整合／發布步驟。檢查失敗時先修復，不將失敗版本宣稱為已完成。

- 所有系列沿用共同課程結構與品牌；每集提供 guide、connections 與 comparison，共用導覽及播放工具。主品牌、字體、背景、按鈕與操作一致；僅依內容增加提示、補充題或影片版本。修改後核對全部課程與路線，參照 guides/website-brand.md。

- 正式動線統一為首頁 → 觀看路線 → 課程頁。Scratch／排序補充內容編輯 catalog 的 guide／comparisons；舊系列 index.html 由 tools/legacy-series.cjs 產生轉接，不能恢復成重複教學入口。保留 siteAnchor／legacySections 對應與舊素材網址；更新後檢查播放器提示、補充練習及 HTTP／離線舊網址轉接。

- 首頁概念關聯圖由 source/content/catalog.json 的 conceptMap 維護。更新單元時同步核對節點、連線與課程頁 connections 一致，目標須已發布；保留手機文字說明、鍵盤及離線導航，不以點選節點標為已看過。

- README 的動畫製作手冊與 workflows/一分鐘認識系列.md 由完整工作區匯出。修改時同步本機 one_minute/README.md 與 workflows，避免下次匯出覆蓋；只有此儲存庫時先保留修改，回到完整工作區再合併。文件包含動畫製作指令，但動畫原始專案並未隨此儲存庫提供。

- 首頁與路線使用生成的品牌 cover，播放器使用原影片 poster。修改 coverDesign 與 tools/brand-covers.cjs，Logo 沿用 assets/mark.svg，不直接編輯 docs/covers；公開署名維持「一分鐘認識」。封面變更須檢查全部課程與離線版。

- 新增／更新系列完整範本維護 source/content/production.json 的 workflowPrompts，與文章階段 prompt 分開，不附加單階段 commonPrompt。同步網站複製、提示詞下載及 skill references/prompts.md；使用說明維護 source/content/production-usage.md，再建置生成下載副本。新增範本不算新文章或動畫。

- 動畫製作技術是獨立的文章系列，不虛增動畫集數。編輯 source/content/production.json、production.html、article.html、assets/production.js；技能來源在 source/production/skill。更新文章時同步 skill references（node source/tools/build-production.cjs --sync-skill），建置產生 Markdown、提示詞及 ZIP；檢查案例連結、複製與離線下載，保留影片觀看進度。不要上傳原始對話或私人資料。

- 2026-10-24 使用者最新確認「原版的活潑構圖＋新版的品牌配色」：霧白與墨綠為品牌，恢復藍、黃輔色、圓形襯底、傾斜紙卡、星芒、手繪箭頭與圓角標籤。依 guides/website-brand.md 同步首頁、課程、路線與封面，裝飾不得遮擋內容與操作；歷史影片與 poster 保留，不恢復橘色主導。

- 技術首頁、文章、提示詞庫與 skill 下載區沿用相同活潑教材品牌，依 guides/website-brand.md 維護圓形襯底、白紙卡、綠藍黃編號、星芒、手繪箭頭、筆記區及閱讀目錄。長文與提示詞保持水平可讀；修改 source/production.html、article.html、assets/style.css、assets/production.js 後執行 check-production，確認完整複製、下載、案例、鍵盤、手機與離線。

<!-- rpg-guide-policy:start -->
## 遊戲與官方攻略同步（2026-10-30 使用者要求）

- 每次更新 `source/game` 的玩法、故事、任務、地圖、機關、工具、裝備、數值、操作或結局，都要在同一次工作同步核對官方網頁攻略 `source/game/guide/index.html`，包含圖解、流程、解法、道具來源與版本，不能只改遊戲後留待補攻略。
- 攻略文案與產生器維護於 `source/tools/build-game-guide.cjs`、`source/game/guide/content.json`；介面維護於 `source/game/guide/guide.css` 與 `guide.js`。圖表直接讀取現行遊戲資料；不手改生成的攻略 HTML、`images` 或 `manifest.json`。遊戲新增模組時由遊戲入口的腳本順序取得最新資料入口。
- 建置會比較遊戲來源指紋與攻略已審閱版本。來源有變更時，先實際核對受影響文字、流程、解法與圖表，再執行 `node tools/build-game-guide.cjs --review` 記錄本次審閱。不得只更新指紋或版本來略過內容核對；無攻略內容差異時，也要記錄已檢視及原因。
- 執行 `npm run check:guide` 核對版本、來源指紋、三章與全部樓層／原支線／配方／材料的覆蓋、圖片與站內連結；遊戲功能改動照常執行相應遊戲檢查。完成建置、離線打包與既有 GitHub 匯出流程，讓遊戲與攻略一併交付。攻略勾選紀錄與遊戲存檔分開。
<!-- rpg-guide-policy:end -->

<!-- rpg-concepts-policy:start -->
## 遊戲、攻略與動畫概念對照同步（2026-10-30 使用者追加要求）

- 每次遊戲更新時，也要在同一次工作同步核對 `game-concepts.html` 與其 Markdown 對照文件；與官方攻略一起維護。現況分級、場景關聯與「尚未實作」提案必須如實更新，不能把新提案列成既有功能，也不能把相似機關直接算成已涵蓋動畫。
- 唯一對照資料維護於 `source/content/game-concepts.json`；課程名稱、核心概念與連結讀取正式 `source/content/catalog.json`。`source/tools/build-game-concepts.cjs` 產生雙向網頁與 Markdown，介面由 `source/assets/game-concepts.css`、`source/assets/game-concepts.js` 維護；不要直接修改生成副本。
- 遊戲來源或課程目錄內容變動時，實際核對受影響的概念、玩法與提案狀態，再執行 `node tools/build-game-concepts.cjs --review`；不得只更新指紋略過核對。動畫新增或更新時，也要檢視本表。沒有映射內容差異時，記錄已核對與原因。
- 執行 `npm run check:concepts` 檢查全部已發布課程、雙向關聯、現況分類、攻略錨點、動畫連結與生成的 Markdown；建置、離線包及 GitHub 匯出需一起包含本頁。對照頁放在遊戲外，不把教學名稱或任務門檻強加進 RPG，不因開啟動畫連結改變原觀看紀錄。
- 原對照討論稿已有 Library 文件身分。完整工作區更新時，依文件管理流程更新同一份 Markdown 文件並保留版本；本機 `reports` 中的文件識別與版本紀錄供核對，不把私人識別資料匯出到公開網站。
<!-- rpg-concepts-policy:end -->

<!-- rpg-series-policy:start -->
## 互動冒險系列入口（2026-10-31 使用者確認）

- 遊戲、官方攻略與動畫概念對照整合於 `adventure.html`，名稱為「互動冒險｜紙境冒險：星燈守望」。主站首頁放在觀看路線之後、動畫製作技術之前，保留原 `#rpg-game` 深連結。共用主導覽加入「互動冒險」，桌面與手機均須可見。
- 系列首頁、遊戲開始畫面、攻略與對照頁提供「系列首頁／進入遊戲／官方攻略／概念對照」。角色存檔、動畫觀看紀錄及攻略勾選仍由原頁面管理，系列頁不讀寫進度；互動冒險不混入動畫的系列與課程計數。
- 系列頁由 `source/tools/build-adventure.cjs` 與 `source/assets/adventure.css` 產生，不手改生成副本。版本從遊戲、攻略與對照資料取得；之後遊戲更新時，與本系列首頁一併同步，執行 `npm run check:adventure`。首頁、課程、路線及技術頁延續共同導覽與品牌。
- 建置、離線 ZIP、GitHub source/docs 與根目錄首頁都要包含本入口及往返連結。正式發布沿用 GitHub Pages，不另建平行網站。
<!-- rpg-series-policy:end -->

<!-- rpg-release-policy:start -->
## 遊戲系列的必要上線流程（2026-10-31）

之後更新遊戲的玩法、故事、任務、地圖、機關、數值、操作、素材或畫面時，都須在同一次工作同步核對遊戲、系列首頁、官方攻略與概念對照，完成檢查與發布；不以只改遊戲或只推送程式碼作為交付。

1. **確認正式版本與分工**：先讀現行規範、版本及交接資料，保留原素材與歷史版本。遊戲製作工作負責正式來源、攻略／對照同步、建置、驗證與離線包；入口網站工作接手 GitHub 匯出、提交、推送及 Pages 確認。既有發布授權持續有效；草稿、prototypes 與尚未核定的試作不納入正式發布。
2. **同步四個入口**：遊戲 `docs/game/index.html`、系列首頁 `docs/adventure.html`、官方攻略 `docs/game/guide/index.html`、概念對照 `docs/game-concepts.html` 必須對應同一份已審閱的遊戲版本，並同步主站首頁、共用導覽與往返連結。沿用共同品牌；遊戲存檔、動畫觀看紀錄及攻略勾選各自保留，不增加動畫系列或課程計數。
3. **先核對內容，再更新產物**：攻略文案與圖解、流程、解法、道具及版本依現行遊戲核對；概念對照與 Markdown 如實更新已實作／未實作狀態及相關課程。分別維護 `source/game/guide/content.json`、`source/content/game-concepts.json`、`source/tools/build-game-guide.cjs`、`source/tools/build-game-concepts.cjs`、`source/tools/build-adventure.cjs` 等正式來源。遵守既有攻略／對照審閱流程，不只改來源指紋來略過核對；無內容差異時記錄已檢視及原因，不手改生成 HTML、圖解或 manifest。
4. **檢查功能與使用情境**：依受影響範圍執行遊戲規則、章節、機關、交易、裝備與舊存檔相容檢查，並核對攻略覆蓋、概念雙向關聯、課程連結及四頁版本一致。瀏覽器檢查開始遊戲、鍵盤操作、存檔後重新載入／繼續、首頁導覽、攻略搜尋／勾選、圖片、手機版及離線往返；有觸控改動時另驗證對應操作。檢查紀錄寫本次實際結果與限制，不以舊 QA、資料檢查或縮小視窗冒充完整試玩／真機觸控驗證。
5. **建置並準備發布快照**：完成建置與離線打包，核對正式來源、生成頁面、ZIP、GitHub source/docs 及根目錄首頁一致。匯出前確認本次正式範圍，保留其他對話的未完成變更；交接記錄列版本、來源指紋、檢查結果、產物與待確認事項。發布紀錄應指向本次已核對的提交及檔案，不沿用不同提交的紀錄或公開私人 review、帳本、憑證、Library 識別與備份。
6. **檢查後正常推送**：入口網站工作先確認並妥善合併遠端更新，再正常提交／推送 GitHub main，不強制推送。既有發布工具須核對目的儲存庫、分支、提交及檔案一致；紀錄過期或來源已變更時先重新準備。遇網路錯誤先確認遠端是否已收到提交，保留內容與狀態，依已授權範圍接續。
7. **確認線上版本再交付**：正式入口固定為 https://suyungsheng-kh.github.io/one_minute/，確認首頁可進入互動冒險，系列首頁、遊戲、攻略與概念對照均已更新，相關圖片、下載與連結可用，必要時補做線上操作檢查。分開記錄「已推送」與「Pages 已確認」；尚未完成線上核對時如實回報，不宣稱已上線。交付提供正式系列網址、版本、檢查結果與提交紀錄。

純規範文件更新只做文件、路徑、同步及差異檢查，正常推送後核對公開規則與既有入口，不重製或重新發布未受影響的遊戲素材，也不覆寫歷史遊戲發布紀錄。若本次調整涉及動畫製作流程，另依兩種完整工作流規則同步技術文章、提示詞庫、使用說明及 skill；純遊戲更新未影響該流程時記錄原因，不重複堆疊技術內容。
<!-- rpg-release-policy:end -->

<!-- rpg-paper-style-policy:start -->
## 遊戲紙片風格的沿用與同步（2026-10-31 使用者要求）

之後新增或更新地圖、角色、物件、特效與介面，都沿用正式 BUILD 20261031.40 的紙片／折紙設計。以現行正式來源為基準延伸，並遵守共同品牌；本規則適用整個互動冒險系列。

- **地圖與場景**：沿用剪紙輪廓、奶油色紙邊、墨綠描線、分層紙面、錯位陰影與折痕，保持地形、前後景及互動物件清楚可辨。不同地區可沿用現有場景配色變化，但使用同一套紙層、描線與陰影語法。紙邊和陰影屬視覺裝飾；碰撞、可通行區、互動距離與鏡頭仍依遊戲資料，不以裝飾改變判定。
- **角色與物件**：沿用現有紙偶比例、共同腳底定位、正面／紙邊／受擊亮面與連續翻面轉身；友方角色共用 300×400 素材框及依場景縮放的繪製規則。新角色保留身分辨識，尺寸與動作跟隨現有 renderer；敵人及道具依各自既有比例延伸。移動搖擺、受擊回彈與紙片陰影保持一致。
- **動作與特效**：攻擊、火焰、閃電、治療、防禦、衝刺及倒下沿用折紙扇面、紙層與碎紙表現，清楚區分方向、範圍與結果。延續暫停和減少特效設定，視覺時間不可干擾傷害次數、機關判定、遊戲狀態或存檔。
- **配色與介面**：紙片素材沿用墨線 #263E33、紙邊 #FFF8DF、紙厚邊 #A38A61；遊戲介面沿用紙底 #FFF8E5、品牌綠 #315B47 與淡金黃 #EFD58B，藍色作輔色並維持文字對比。開始畫面、HUD、對話、背包、商店、任務紀錄及觸控按鈕共用紙卡、邊框、陰影、標籤、字體與按鈕狀態；裝飾不能遮住文字、互動提示、鍵盤焦點或操作區，手機與短螢幕仍可捲動及操作。
- **正式來源與生成**：場景、紙偶與特效繪製維護於 `source/game/renderer.js`，介面維護於 `source/game/style.css` 與 `source/game/index.html`，動態介面依 `source/game/game.js`；原始圖稿維護於 `source/game/assets`，紙片衍生素材由 `source/tools/build-paper-assets.cjs` 產生至 `source/game/assets/paper`。新增角色時同步產生器名單、載入與繪製入口；不只修改生成 SVG、manifest、dist 或發布副本，保留原始素材與歷史版本。
- **攻略、概念對照與系列首頁同次同步**：每次新增或更新地圖、角色與介面，核對並更新 `source/game/guide/content.json`、`source/tools/build-game-guide.cjs` 的流程、操作、角色／地圖圖解、道具與版本；同步 `source/content/game-concepts.json` 的場景關聯、已實作／未實作分類、課程連結及生成的 Markdown，再核對 `source/tools/build-adventure.cjs` 的系列導讀與入口。依既有 review 流程審閱後生成，不能只換指紋；純畫面變更無對照內容差異時記錄原因，不因風格更新提高概念涵蓋等級。
- **檢查與交付**：視覺或遊戲變更依必要上線流程完成建置、遊戲及攻略／概念／系列檢查、離線包，核對素材解碼、地圖紙層、角色比例與腳底、轉身／受擊、介面可讀性、桌面／手機、鍵盤及受影響觸控操作。保留舊存檔、觀看紀錄和攻略勾選；檢查後由入口網站工作正常推送 GitHub 並確認 Pages。純規則文件更新只做本次文件、來源路徑、匯出同步與差異檢查，不重製未受影響的遊戲素材或覆寫歷史發布紀錄。

本區規則由完整工作區的網站匯出工具同步至公開 AGENTS.md 並轉換為網站儲存庫的 source 路徑，避免下次匯出遺失。
<!-- rpg-paper-style-policy:end -->

<!-- github-deployment-recovery-policy:start -->
## GitHub 部署失敗、排隊卡住與完成確認（2026-11-04 使用者要求）

適用本網站所有系列、課程、遊戲、攻略、概念對照、技術內容及規範文件的 GitHub 發布。**推送成功、建置成功、接受重試或進入隊列，都不能單獨視為發布完成；必須核對本次提交的部署結果與正式網站內容。**既有正常提交、推送、重試與網站確認授權持續有效，接續工作不重複詢問是否發布。

1. **先鎖定本次內容**：記錄目標儲存庫、main 分支、已檢查的提交 SHA、版本、來源指紋及交付範圍；保留其他工作的未完成變更。重試前重新確認遠端 main；若已出現新提交，先檢視並整合、重新核對發布版本，不讓舊部署覆蓋較新的內容。不強制推送，不以新增空白提交、改託管位置或變更 Pages 設定來碰運氣。
2. **推送出錯先確認遠端**：HTTP 500、網路失敗或逾時後，先用 `git ls-remote origin refs/heads/main` 等方式確認遠端是否已收到目標 SHA，再決定是否正常重試推送。保留已檢查的檔案、提交與錯誤紀錄；已收到提交時接續部署確認，不重做遊戲、動畫或配音。
3. **找出失敗階段**：從本次提交對應的 Actions 工作讀取 status、conclusion、run_attempt、head_sha、各 job／step 與錯誤註記。區分原始碼或建置錯誤、部署 API 的伺服器錯誤、尚未啟動的隊列及瀏覽器快取。建置通過但 Pages 建立部署回覆 HTTP 500 時，核對 GitHub 官方服務狀態，保留該工作紀錄，不把它當成遊戲程式錯誤來修改內容。
4. **一般失敗重試**：確認該工作屬於本次提交且已失敗，再以既有 GitHub 授權重新執行失敗步驟或完整工作流；例如 `POST /repos/{owner}/{repo}/actions/runs/{run_id}/rerun-failed-jobs`、`POST /repos/{owner}/{repo}/actions/runs/{run_id}/rerun`。接受請求後繼續追蹤，不把 HTTP 201 或 queued 當成成功。採有間隔的查詢與重試，記錄每次結果，避免密集重送。
5. **排隊卡住要換檢查方式**：記錄等待時間、是否有新 job 建立及狀態是否推進；約 10 分鐘未啟動時重新診斷，不反覆重開相同等待程序。需要清理本次卡住的工作時先正常取消；只有正常取消失敗時，才依官方文件考慮 force-cancel。若正常與強制取消都回覆 HTTP 409／500，或出現「Cannot cancel a workflow re-run that has not yet queued」，保留異常紀錄，不持續對同一工作重送取消或失敗步驟重試。取消僅限已確認的本次工作，不中斷其他提交的部署。
6. **改由 Pages 請求全新建置**：上述重試卡住時，先讀取現有 Pages 設定並再次核對遠端 main。對既有從分支發布的站點（build_type 為 legacy），使用 `POST /repos/{owner}/{repo}/pages/builds`，從同一份已檢查的 main 重新發起建置，保留原本的分支、目錄與網站設定。若是自訂 workflow，使用該工作流支援的重新執行方式，不直接套用分支建置程序。新的請求也可能排隊；追蹤新產生的工作 ID、head_sha 與部署結果，不再只盯著舊的卡住工作。本次成功方式為重新請求 Pages 建置，無須新增程式碼提交。
7. **正式網站才是最後確認**：確認成功部署對應本次目標 SHA，並從 https://suyungsheng-kh.github.io/one_minute/ 實際核對首頁、受影響的系列／課程與往返連結。遊戲發布須核對系列首頁、遊戲、攻略、概念對照四頁的版本及關鍵更新檔案一致，圖片、故事稿與其他下載可取得；依變更範圍檢查實際操作、存檔接續、鍵盤與手機版面。必要時帶本次提交查詢參數或停用快取，並比較線上內容與已檢查檔案，不能只看 Actions 綠勾或 GitHub 儲存庫檔案。
8. **分開記錄與如實交付**：本機發布紀錄分別列出 pushed、部署結果與 pagesVerified，包含 SHA、版本、舊／新工作 ID、錯誤、重試方式、核對時間、實際結果及限制；保留歷史紀錄，完成後標記原待確認紀錄已解決。尚未確認正式網站更新時維持待完成狀態，回報已推送與仍卡住的階段，依既有授權接續檢查及恢復，不宣稱已上線。**只有本次部署與正式網站內容均確認後，才回報發布完成，附正式入口、提交及成功部署紀錄。**不公開憑證、原始對話、私人 review、帳本或備份。
9. **純規範文件更新**：只檢查本次文件、來源路徑、匯出同步及差異，再正常提交／推送；確認公開 AGENTS.md 符合本次內容、該提交的部署結果及既有正式入口可用。不提高遊戲版本、不重製未受影響的素材，也不覆寫既有遊戲發布紀錄。兩組完整製作提示詞與 skill 已要求先讀 AGENTS.md 並確認正式網站；檢視是否受影響，仍正確時記錄沿用原因，不重複堆疊相同規則。

操作依 [GitHub Actions 排障](https://docs.github.com/en/actions/how-tos/troubleshoot-workflows)、[工作流重試與取消 API](https://docs.github.com/en/rest/actions/workflow-runs)、[Pages 重新建置 API](https://docs.github.com/en/rest/pages/pages#request-a-github-pages-build) 及 [GitHub 官方服務狀態](https://www.githubstatus.com/) 核對；未來使用當次真實的儲存庫、提交與工作 ID。本區由完整工作區的匯出工具同步至公開 AGENTS.md，避免下次匯出遺失。
<!-- github-deployment-recovery-policy:end -->
