# 動畫製作技術手冊

依據五個動畫系列的對話與製作文件整理，現行政策優先於歷史案例。來源更新：2026-10-18。

<a id="brief-storyboard"></a>

# 把一個概念，拆成可製作的分鏡

從教學目標、生活比喻到逐幕講稿；先把要懂的事說清楚，再決定畫面。

技術文章；不代表新影片。更新：2026-10-18。

## 先定義觀眾要懂的一件事

一分鐘是聚焦的尺度，不是塞滿術語的理由。演算法第一集曾把效率比較與五大特性混在一起，後來聚焦成「清楚、做得到、會結束」的步驟概念；效率留給其他課程。

提問只補缺少的資料：核心目標、先備知識、情境、風格、片長、聲音、字幕與素材。已有確認的選擇繼續沿用。

## 把畫面、動作和講稿放在同一張表

分鏡至少寫出規劃秒數、教學意圖、物件的前後狀態、畫面重點字及完整旁白。標示哪些數字是實際示範、哪些是計算結果。

先提供具體可審查的製作單，再依當次授權進入製作。歷史對話曾逐集確認新講稿；這不表示每次修小字或再次預覽都要重新確認。

```text
BRIEF.md       核心目標、受眾、範圍、風格
STORYBOARD.md  時間、畫面、動作、旁白
SCRIPT.md      要讀出的完整講稿
SOURCES.md     素材來源與使用條件
```

## 把設計決定留下來

同系列的角色、場景、色彩、聲音與術語寫入文件，後續集數才可重用。演算法延續黏土廚房，Scratch 延續紙雕 RPG，排序與搜尋延續深藍圖表。這些是案例選擇，不是所有主題都要套同一種動畫風格。

## 可重複的步驟

1. 先寫一句學習目標與不包含的內容
2. 提出一個能解釋概念的生活或遊戲情境
3. 逐幕填好畫面、狀態、旁白與暫定時間
4. 按當次授權確認製作範圍，保存為製作文件

## 驗收

- 能用一句話說出本集目標
- 分鏡的每個動作都有教學用途
- 講稿與畫面沒有互相矛盾
- 規劃秒數明確標示為暫定

常見問題：把一分鐘當作硬性字數配額，或尚未釐清概念就先生成大量素材。

## 案例與依據

- [algorithm-bread](https://suyungsheng-kh.github.io/one_minute/docs/lesson.html?id=algorithm-bread)：從五大特性的內容修正，看聚焦教學目標。
- [conditions](https://suyungsheng-kh.github.io/one_minute/docs/lesson.html?id=conditions)：用森林商店把變數、清單與條件串成情境。
- 系列共用工作流：`workflows/一分鐘認識系列.md`（完整動畫工作區相對路徑，非網站下載檔）。
- 演算法第一集分鏡：`algorithms/projects/algorithm-bread/STORYBOARD.md`（完整動畫工作區相對路徑，非網站下載檔）。
- Scratch 條件判斷分鏡：`scratch/projects/scratch-conditions-adventure/STORYBOARD.md`（完整動畫工作區相對路徑，非網站下載檔）。

---

<a id="project-environment"></a>

# 把製作環境，變成可接續的專案

分清技能、CLI、專案與生成器；保留版本，換電腦或換對話也能接著做。

技術文章；不代表新影片。更新：2026-10-18。

## 技能與製作工具是不同層

技能提供代理工作方法；HyperFrames CLI 負責檢查、預覽與輸出。既有 Remotion 專案也不需要因為換代理就重建。本系列現行主要路線是 HTML、CSS、GSAP 與 HyperFrames。

本系列使用 Node.js、FFmpeg／FFprobe 和瀏覽器。先讀 package.json 與專案 README，使用固定版本的 npm scripts，不把歷史範例當成最新版本。

```text
node --version
npm --version
ffmpeg -version
ffprobe -version
```

## 資料夾保存的不只是影片

每一集保存原始碼、素材、成功音訊、分鏡、字幕、審查紀錄及各版本輸出。現有路徑為 one_minute/<系列>/projects/<專案>；共用工具與網站分開管理。

搜尋專案固定 HyperFrames 0.8.166；其他歷史專案有 0.8.156、0.8.160 等版本。這些是已交付案例，不是「所有專案必須升到同一版本」的要求。

## 先找正式生成器，再決定是否重建

部分 build 或 setup 腳本會重建 HTML、分鏡或素材清單。不能只改生成後的 HTML，之後又執行生成器把修正覆蓋。

新建專案先走 HyperFrames 工作流；維護舊專案則先閱讀本集 README、AGENTS、版本設定及 review。要搬移或替換完整目錄時，先留可還原備份與檔案雜湊。

```text
# 在目標專案資料夾，先讀懂 scripts 的作用
npm run
# 確定本專案 check 是驗證命令後再執行
npm run check
```

## 可重複的步驟

1. 盤點現有目錄、套件版本與正式輸出
2. 讀取生成器與腳本的作用，不執行會覆寫的 setup
3. 將素材、成功音訊及來源紀錄留在專案內
4. 記錄如何預覽、驗證與輸出新版本

## 驗收

- 可指出正式專案與正式生成器
- 能分清技能安裝與專案初始化
- 保留每集固定版本與原有輸出
- 沒有將私人設定或金鑰寫進說明

常見問題：看到舊檔就全部升級，或把初始化腳本當成每次預覽的必要步驟。

## 案例與依據

- [search-linear](https://suyungsheng-kh.github.io/one_minute/docs/lesson.html?id=search-linear)：固定版本與 build／verify 分工的案例。
- [selection-sort](https://suyungsheng-kh.github.io/one_minute/docs/lesson.html?id=selection-sort)：30 秒原版與 narrated-v1 分開保存。
- 整體製作手冊：`README.md`（完整動畫工作區相對路徑，非網站下載檔）。
- 搜尋第一集設定：`search/projects/search-linear/package.json`（完整動畫工作區相對路徑，非網站下載檔）。
- 排序配音版驗證：`sorting/review/NARRATED-QA.md`（完整動畫工作區相對路徑，非網站下載檔）。

---

<a id="trace-animation"></a>

# 讓動畫跟著資料走，而不是靠畫面猜

先產生動作追蹤，再把比較、交換、搬盤與搜尋範圍對到時間軸。

技術文章；不代表新影片。更新：2026-10-18。

## 追蹤紀錄是動作與統計的共同依據

排序先記錄比較、交換、右移與插入；河內塔先生成合法單盤搬法；搜尋記錄候選範圍、比較值與結果。畫面、音效、計數與網頁提示都從同一份狀態轉換取得。

例如 5、2、4、1、3：氣泡比較 10 次／交換 7 次；選擇比較 10 次／交換 3 次；插入比較 9 次／右移 7 次／插入 4 次。這是本組資料的案例，不是通用效率排名。

## 先驗證規則，再安排動作

每一步要能重播與檢查：數字沒有遺失或增加、比較條件成立、搬的都是頂盤且大盤不壓小盤。二分搜尋則要維持已排序前提與正確候選區間。

搜尋第二集依序比較 8、12、10、11，共 4 次；16 筆最多 5 次。這次示範與最差上限不同，不能混用。

```text
事件範例（示意結構，依專案 schema 調整）：
{ t: 12.5, action: "compare", indices: [0, 1],
  before: [5, 2, 4, 1, 3], after: [5, 2, 4, 1, 3] }
{ t: 13.2, action: "swap", indices: [0, 1],
  before: [5, 2, 4, 1, 3], after: [2, 5, 4, 1, 3] }
```

## 可快轉，也要能說清楚沒有跳過什麼

快轉縮短停留時間，追蹤事件仍完整存在。河內塔第三集實際展示 1／3／7／15 步四組搬法，共 26 次動作；大盤數另以計算呈現，不假裝全部搬完。

大數用 BigInt 等合適型別；標註最少搬動步數、最多比較次數，以及是否計入事先排序。不同操作不能直接當成同一種成本。

## 可重複的步驟

1. 定義初始資料、規則與計數單位
2. 產生與畫面分離的操作紀錄
3. 獨立重播每個事件，核對結果和不變量
4. 把動作、音效與提示掛到事件時間，再檢查倒回

## 驗收

- 事件能逐步重播且符合規則
- 同一份資料驅動畫面與計數
- 示範次數與上下限分開
- 可指出哪些動作縮時、哪些只作計算

常見問題：只檢查最後排好了，卻沒有驗證過程；或把顯示的數字直接寫死成「正確統計」。

## 案例與依據

- [insertion-sort](https://suyungsheng-kh.github.io/one_minute/docs/lesson.html?id=insertion-sort)：右移與交換分開計數的實作。
- [hanoi-steps](https://suyungsheng-kh.github.io/one_minute/docs/lesson.html?id=hanoi-steps)：實際四組搬法與大數計算分開。
- [search-binary](https://suyungsheng-kh.github.io/one_minute/docs/lesson.html?id=search-binary)：閉區間與比較順序都有驗證。
- 河內塔第三集審查：`hanoi/projects/hanoi-steps/review/QA.md`（完整動畫工作區相對路徑，非網站下載檔）。
- 搜尋驗證程式：`search/projects/search-binary/verify.mjs`（完整動畫工作區相對路徑，非網站下載檔）。
- 排序驗證紀錄：`sorting/review/NARRATED-QA.md`（完整動畫工作區相對路徑，非網站下載檔）。

---

<a id="voice-caption"></a>

# 先量到聲音，再安排字幕與畫面

凍結成功旁白，用真實長度及詞組時間對齊；同時保留用量與審音界線。

技術文章；不代表新影片。更新：2026-10-18。

## 保留自然語速與完整句尾

先分段確認講稿，再取得成功音訊的實際時長。畫面與字幕依實際語音安排，不按字數平均切割，也不為湊 60 秒加速或裁掉詞尾。

字幕應逐字對應核准旁白；同音轉寫、數字形式與辨識差異留在 audit。ASR 提供時間與差異線索，不能當成百分之百正確的聽審結果。

## 成功音訊是可重用資產

語音換聲會影響整體一致性，也會改變長度。現行系列正式版本以 Azure 台灣男聲「雲哲」為主；早期 James Gao 與原 30 秒排序版保留為歷史版本。續作優先重用已成功的原音，核對文字與音檔雜湊。

## 所有 Azure 呼叫走共用管控

本工作區的本機政策是 400,000 計費字元提醒、450,000 停止、單次最多 3,000，並套用 31 天累計。首次與換月要核對實際用量，不能把未知當作零。

只經 tools/azure-speech/index.mjs 或 synthesizeAzure；失敗仍保留預留、不自動重試。外部用量須補登。本機帳本不是 Azure 帳號全域硬限額，也不承諾免費方案永久條件。

```text
# 在 animation 工作區根目錄：只查看本機用量
node tools/azure-speech/index.mjs status
# 只預估；路徑請換成自己的檔案，不會生成配音
node tools/azure-speech/index.mjs synthesize --project one_minute/<系列>/projects/<專案> --input <純文字講稿路徑> --output <新音檔路徑> --dry-run
```

## 音樂與音效要幫助理解

旁白優先，配樂在說話時降低；操作音效跟 trace 的比較、交換或完成事件同步。用波形或相關係數核對音軌與位置，只能證明這些項目，不能宣稱已完成真人逐字聽審。

## 可重複的步驟

1. 確認講稿、聲音與當次授權
2. 先重用已成功的音訊，必要生成走共用用量入口
3. 量測每段實長，對齊詞組、字幕及畫面
4. 檢查字幕完整、無重疊、句尾及混音峰值

## 驗收

- 成功音訊能核對雜湊與文字版本
- 字幕連接後對應核准稿且不重疊
- 音訊結尾在影片範圍內，沒有裁句
- 用量與 ASR／人工聽審限制如實記錄

常見問題：把字幕改寫造成的差異誤判成漏讀，或把 ASR／波形檢查說成人工逐字聽審。

## 案例與依據

- [variables](https://suyungsheng-kh.github.io/one_minute/docs/lesson.html?id=variables)：前後版本換聲後重新對時的案例。
- [lists](https://suyungsheng-kh.github.io/one_minute/docs/lesson.html?id=lists)：字幕與旁白不一致，未必是 60 秒截字。
- 共用 Azure 管控：`../tools/azure-speech/README.md`（完整動畫工作區相對路徑，非網站下載檔）。
- Scratch 雲哲版審查：`scratch/projects/scratch-list-adventure/review/yunjhe-v1/QA.md`（完整動畫工作區相對路徑，非網站下載檔）。
- 排序配音版審查：`sorting/review/NARRATED-QA.md`（完整動畫工作區相對路徑，非網站下載檔）。

---

<a id="motion-review"></a>

# 把動畫審查，變成製作原則

緩動、物件連續性、文字層級與閱讀時間，一開始就納入設計。

技術文章；不代表新影片。更新：2026-10-18。

## 動作要有因果，文字要有閱讀時間

Scratch 清單的修正包含刪除後補位、替換道具、找到鑰匙再開箱等連續動作。每個動作都要讓觀眾看得懂因果，而不是只做出裝飾性的彈跳。

進場常用明確的 ease-out，移動依物理目的選曲線；線性適合等速掃描等情境，不是所有 linear 都應刪除。不要把早期「移除回彈」個案變成所有影片永遠不能回彈的規則。

## 時間軸必須能停、跳、倒回

每個 composition 註冊單一 paused timeline，對應 composition id。狀態依時間決定，避免靠播放過的次數、未固定亂數或執行當下時間。

HyperFrames 管理 clip 的顯示與媒體時間；動畫放在內層物件。主組件與子組件結構、時間單位、音軌 id 及本機素材依現用版本的 core 技能檢查。

```text
// GSAP 局部動作示意；在既有 composition 的時間軸內使用
const tl = gsap.timeline({ paused: true });
tl.fromTo("#scene-title",
  { y: 24, opacity: 0 },
  { y: 0, opacity: 1, duration: .45, ease: "power3.out" }, .2);
window.__timelines = window.__timelines || {};
window.__timelines["scene"] = tl;
```

## 視覺審查跟教學審查一起做

字幕區與圖表、提示、統計分開；標題、正文和註解要有層級。對照場景開始、動作中、完成、轉場前後及字幕較長的時刻。

自動檢查有零錯誤，不等於全片每格都已看過。先清 lint 錯誤，再確認 runtime、layout 與對比確實有執行及足夠樣本；把未修建議與有意裁切分別記錄。

## 可重複的步驟

1. 列出影響理解的問題並排優先度
2. 先修物件連續性與概念因果
3. 再修緩動、留白、文字層級與停留
4. 往前與倒回抽樣，確認同一時間得到同一狀態

## 驗收

- 問題有具體時間點與處理結果
- 物件不憑空改名或跳位
- 字幕和重點文字有閱讀空間
- 同一時間的前進／倒回狀態一致

常見問題：只換掉所有緩動名稱，卻沒有修掉遮擋、跳位或看不懂的因果。

## 案例與依據

- [lists](https://suyungsheng-kh.github.io/one_minute/docs/lesson.html?id=lists)：由清單動作與開箱因果檢查動畫連續性。
- [hanoi-rules](https://suyungsheng-kh.github.io/one_minute/docs/lesson.html?id=hanoi-rules)：字幕、搬盤路徑與規則提示的配置。
- Scratch 動畫審查：`scratch/projects/scratch-list-adventure/review/ANIMATION-REVIEW.md`（完整動畫工作區相對路徑，非網站下載檔）。
- HyperFrames 時間契約：`../.agents/skills/hyperframes-core/SKILL.md`（完整動畫工作區相對路徑，非網站下載檔）。
- 河內塔第一集審查：`hanoi/projects/hanoi-rules/review/QA.md`（完整動畫工作區相對路徑，非網站下載檔）。

---

<a id="render-validation"></a>

# 預覽正常之後，還要驗證真正的 MP4

把專案檢查、數據驗證、實際成片檢查分開，留下可追溯證據。

技術文章；不代表新影片。更新：2026-10-18。

## 三個層次，回答不同問題

專案 check 檢查語法、素材、執行與版面；verify.mjs 等程式驗證步驟、數字、字幕與雜湊；最後還要檢查真正輸出的 MP4。不能只因瀏覽器預覽正常，就宣稱成片影音正確。

## 先讀版本，再輸出新檔名

使用專案自己的 npm scripts。渲染已確認版本時，不額外重跑會改寫來源的 setup；新輸出用新版本檔名，保留已交付 MP4、字幕與成功音訊。

```text
# 在已確認的專案資料夾，使用其固定版本 scripts
npm run check
npm run render -- --output renders/<專案>-v2.mp4
# 下列範例的檔名需換成剛生成的新版本
ffprobe -v error -show_format -show_streams -of json renders/<專案>-v2.mp4
ffmpeg -v error -i renders/<專案>-v2.mp4 -f null -
```

## 讓 QA 有具體範圍與證據

確認實際片長、解析度、影格率與音軌，完整解碼，抽取真實成片的關鍵畫面。語音開始位置、最後一句結尾、峰值與字幕時間都要核對。

河內塔第三集將 26 次實際搬動與大盤數計算分開驗證；搜尋第三集獨立驗算 100／7、1000／10 等比較數。波形相關係數只證明音訊比對範圍，不能替代發音聽審。

交付紀錄寫清楚問題、修正、重查結果與尚存限制；不要直接複製上一版「全部通過」。

## 可重複的步驟

1. 保留來源、版本及正式素材基線
2. 先做專案與數據檢查
3. 按授權渲染成新版本檔案
4. 解碼、抽圖、核對影音字幕，再保存 QA 與雜湊

## 驗收

- 正式輸出檔案可以完整解碼
- 數字與 trace／字幕一致
- 關鍵畫面取自真正 MP4
- 本次 QA 與上一版紀錄分開保存

常見問題：把「沒有報錯」寫成「所有發音都正確」，或用 HTML 截圖代替真正 MP4 的畫面驗收。

## 案例與依據

- [hanoi-steps](https://suyungsheng-kh.github.io/one_minute/docs/lesson.html?id=hanoi-steps)：成片抽圖、字幕與大數驗算。
- [search-race](https://suyungsheng-kh.github.io/one_minute/docs/lesson.html?id=search-race)：用獨立程式驗算比較次數與旁白版本。
- 河內塔第三集 QA：`hanoi/projects/hanoi-steps/review/QA.md`（完整動畫工作區相對路徑，非網站下載檔）。
- 搜尋第三集驗證：`search/projects/search-race/verify.mjs`（完整動畫工作區相對路徑，非網站下載檔）。
- 排序完整交付 QA：`sorting/review/NARRATED-QA.md`（完整動畫工作區相對路徑，非網站下載檔）。

---

<a id="publish-brand"></a>

# 從一支影片，到可維護的教材網站

正式版本、課程目錄、路線、封面、相關單元與離線包一起交付。

技術文章；不代表新影片。更新：2026-10-18。

## 製作來源與公開交付分開

完整動畫專案保存在各系列 projects；網站目錄集中在 portal/content/catalog.json，正式素材依 release.json 選定。沿用穩定課程 id，保留影片版本與舊分享連結。

新增或改版要同步首頁、課程頁、觀看路線及有意義的既有單元關聯。發布到 GitHub Pages，不能只改一個影片連結就宣稱整站更新。

## 共同品牌可以是生成規格

網站有共用模板、Logo、色彩、用語與播放工具。十五集品牌封面由 coverDesign 與 brand-covers.cjs 生成，與播放器的原畫面 poster 分開。新集數延續同一版型，避免每次重做一套圖。

技術文章也是同一品牌的延伸：明確標示為文章與提示詞，不把尚未製作的內容冒充新動畫，也不虛增動畫集數。

## 產製完成後，檢查公開版本

本機完成 build、check、package；匯出網站與獨立維護來源，確認遠端新變更後正常推送。再核對 Pages 的新目錄、素材、課程與下載。

離線包保留相對路徑，逐檔核對影片、字幕、封面與文件。觀看紀錄只存在讀者瀏覽器，不因相關單元跳轉而重設。

```text
# 在 one_minute/portal 執行
npm run build
npm run check
npm run package
# 從 animation 工作區匯出（需先備妥指定 GitHub checkout）
node one_minute/portal/tools/export-github.cjs
# 提交／推送與正式網址依目標專案 AGENTS 及本次授權
```

## 可重複的步驟

1. 選定 release 的正式影片、字幕與實際片長
2. 更新課程、路線、封面與雙向關聯
3. 建置後檢查網站與離線包
4. 依授權匯出、正常推送，核對線上內容

## 驗收

- 正式素材、課程與路線是同一版本
- 舊 id、舊網址與觀看紀錄可延續
- 離線包內容與建置一致
- 推送後有公開網址的實際驗證

常見問題：把 Git push 成功當作 Pages 已完成部署，或只更新首頁卻留下舊路線與字幕。

## 案例與依據

- [conditions](https://suyungsheng-kh.github.io/one_minute/docs/lesson.html?id=conditions)：影片、課程與路線一起整合。
- [search-race](https://suyungsheng-kh.github.io/one_minute/docs/lesson.html?id=search-race)：新集數與既有單元關聯同步交付。
- 網站維護規則：`portal/AGENTS.md`（完整動畫工作區相對路徑，非網站下載檔）。
- 品牌與封面規格：`portal/content/brand-guide.md`（完整動畫工作區相對路徑，非網站下載檔）。
- 網站產製工具：`portal/tools/build.cjs`（完整動畫工作區相對路徑，非網站下載檔）。

---

<a id="prompts-to-skill"></a>

# 把成功流程，封裝成提示詞與 skill

提示詞描述這次要做什麼；skill 保存可重用方法、來源與操作界線。

技術文章；不代表新影片。更新：2026-10-18。

## 先拆階段，再組合成完整工作流

本系列提供八組提示詞，分別處理需求、環境、trace、配音字幕、動作審查、成片驗證、網站交付及流程封裝。每組先交代專案、當次模式、授權範圍與驗收，不要求代理重演所有歷史步驟。

把可替換內容寫成【主題】【專案路徑】【指定階段】；把成功案例、工具版本與已知限制放在參考資料。公開文章不包含原始對話、私人帳本、金鑰或登入資訊。

## skill 保留決策，不只是一段很長的提示詞

one-minute-production 的 SKILL.md 只保留適用範圍、階段判斷、必要規則與參考入口。較長的技術說明與提示詞在 references；唯讀盤點工具在 scripts。

下載的 skill 能放到自己的技能目錄；在不同電腦上使用時先檢查工具、素材授權與用量入口，不能假設本工作區帳本已存在，也不能複製舊帳本冒充目前用量。

```text
使用 $one-minute-production。
專案：【完整專案路徑】
本次只做：【需求／製作／檢查／預覽／輸出／網站整合】
沿用已確認內容：【已知選擇】
希望取得：【具體交付】
外部生成與發布授權：【實際範圍】
```

## 複用成功方法，也保留失敗的界線

早期 edge-tts 曾查得到聲音清單，但實際生成回覆 403；這只證明該次環境測試失敗，不等於所有聲音都不可用。舊 HeyGen 額度與平台費率也不能當成現在的可用量。

使用 skill 不等於授權付費 API、任意升級或上線。既有明確授權繼續有效；新方案、新資料或額度未知時，先完成不依賴它的工作，清楚列出需要補足的條件。

## 可重複的步驟

1. 選擇一個反覆出現的真實任務
2. 抽出輸入、決策、驗收與操作界線
3. 將較長案例與語法放進 references
4. 驗證技能格式與唯讀工具，再用實際需求試用

## 驗收

- 提示詞可以替換變數直接使用
- skill 的觸發範圍明確
- 參考檔案與腳本都存在且可驗證
- 不把 skill 當成外部操作的授權

常見問題：把整段聊天原封不動貼進 skill，連過期設定、登入資訊與臨時解法一起永久化。

## 案例與依據

- [algorithm-bread](https://suyungsheng-kh.github.io/one_minute/docs/lesson.html?id=algorithm-bread)：從需求與審查累積出系列工作流。
- [lists](https://suyungsheng-kh.github.io/one_minute/docs/lesson.html?id=lists)：將動畫審查與字幕差異轉為可複用方法。
- 共用工作流：`workflows/一分鐘認識系列.md`（完整動畫工作區相對路徑，非網站下載檔）。
- 網站品牌規格：`portal/content/brand-guide.md`（完整動畫工作區相對路徑，非網站下載檔）。
- 本次來源稽核（本機）：`production/review/source-audit.json`（完整動畫工作區相對路徑，非網站下載檔）。
