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

## 課程頁、觀看路線與首頁推薦

每集使用共用的 source/lesson.html，路線使用 source/path.html。首頁推薦、三條觀看順序及所有課程文字集中在 source/content/catalog.json。

- 課程：openingQuestion 是生活問題，learningGoals 是學習目標，keyTakeaway 是一句重點；question／answer／challenge 是練習。choices 與 correctChoice（從 0 開始）提供可重試的選擇題。
- 路線：頂層 paths 每筆含 id、series、title、description、goal、lessonIds、stepNotes、reflection。公開課程必須加入至少一條同系列路線，lessonIds 順序決定上一集與下一集。
- 推薦：頂層 recommendations 每筆含 lesson、label、reason；startLesson 決定第一次來的快捷入口。只推薦已完成、可播放的課程。
- 網址：lesson.html?id=variables、path.html?id=scratch；舊 #lesson/variables 分享連結可繼續使用。
- 進度：HTTP／線上網站在目前瀏覽器保存已看過紀錄，路線可接續第一個未看過的課程；file:// 跨頁儲存行為由瀏覽器決定。答題不會自動標為已看過。

更新後執行 npm run build、npm run check 與 npm run package；新增課程時請一起更新路線。

<!-- animation-production-guide -->

## 動畫製作準備與完整工作流

本節是「一分鐘認識」的製作手冊，整理日期為 2026-10-11。安裝、提示詞、檔案格式、預覽、渲染與網站同步都集中在這裡。完整教學設計規則見 [一分鐘認識系列工作流](workflows/一分鐘認識系列.md)。

閱讀順序：初次使用從環境與技能安裝開始；環境已備妥可直接看第 5 節的提示詞；操作工具看第 8 節；發布新課程看第 9 節。

### 先確認你要做哪件事

| 工作 | 準備內容 |
| --- | --- |
| 觀看網站與影片 | 下載網站全部檔案，用瀏覽器開啟；不用安裝製作工具。 |
| 修改入口網站 | Node.js；自動瀏覽器檢查另需 Chrome／Edge 與 puppeteer-core；ZIP 打包另需 Python。 |
| 新製作／修改動畫 | 可操作本機資料夾的 AI 程式代理、Node.js 22 以上、HyperFrames 技能與 CLI、FFmpeg／FFprobe，以及渲染用 Chrome。 |
| 產生中文旁白或新素材 | 再準備已授權的配音／圖片／音樂工具；本系列中文旁白沿用 HeyGen James Gao。 |

GitHub 的 `one_minute` 儲存庫提供網站、正式影片、維護來源及工作流文件；現有動畫的可修改原始專案仍在本機 `animation/one_minute/*/projects`。只下載 GitHub 網站儲存庫，無法直接重渲染既有六支動畫；需要另外還原完整動畫工作區，或依下列流程建立新集數。

### 1. 安裝與確認製作環境

以下以 Windows PowerShell 為例。只安裝缺少的工具，安裝後重新開啟終端機與代理，讓 PATH 生效。

| 工具 | 用途與安裝方式 |
| --- | --- |
| AI 程式代理 | 本系列使用 Codex，也可使用支援本機技能、檔案與終端機的其他代理。先完成代理本身的登入，再開啟動畫工作區。 |
| Node.js 22 以上 | 執行 HyperFrames、網站與製作腳本。從 [Node.js 官方下載頁](https://nodejs.org/en/download) 安裝符合最低版本的 LTS；npm、npx 隨 Node.js 提供。 |
| Git | 保留修改紀錄、下載技能與同步 GitHub。使用 [Git for Windows 官方安裝頁](https://git-scm.com/install/windows)；可選用其列出的 winget 安裝方式。 |
| FFmpeg 與 FFprobe | 編碼 MP4、合成與檢查音訊、確認影片時長。從 [FFmpeg 官方下載頁](https://ffmpeg.org/download.html) 連出的 Windows 建置來源下載，解壓後將含兩個 exe 的 bin 加入 PATH。 |
| Chrome／Edge | 網站預覽與檢查。HyperFrames 的渲染瀏覽器另用 `browser ensure` 準備。 |
| Python 3 | 入口與排序網站的 ZIP 工具使用 Python 標準函式庫；可從 [Python 官方 Windows 下載頁](https://www.python.org/downloads/windows/) 安裝，不需額外 pip 套件。 |
| puppeteer-core | 僅供入口／Scratch 網站自動瀏覽器檢查；安裝方式見下方。不必為所有動畫專案各裝一份。 |

官方 HyperFrames 對本機製作列出的基本需求為 Node.js 22 以上與 FFmpeg，參閱 [官方專案說明](https://github.com/heygen-com/hyperframes)。

確認工具可找到：

```powershell
node --version
npm --version
npx --version
git --version
ffmpeg -version
ffprobe -version
python --version
```

本機整理當日實際使用：Node.js 24.20.0、npm 11.19.0、Git 2.55.0、Python 3.13.7、FFmpeg／FFprobe 9.0.1。這是現有環境紀錄，不是要求每台電腦完全相同。

若不想修改整台電腦的 PATH，可以在這次 PowerShell 工作階段設定路徑。把以下範例換成你實際解壓的位置：

```powershell
$env:PATH = 'C:\Tools\ffmpeg\bin;' + $env:PATH
$env:HYPERFRAMES_FFMPEG_PATH = 'C:\Tools\ffmpeg\bin\ffmpeg.exe'
$env:HYPERFRAMES_FFPROBE_PATH = 'C:\Tools\ffmpeg\bin\ffprobe.exe'
$env:FFMPEG_PATH = 'C:\Tools\ffmpeg\bin\ffmpeg.exe'
```

`HYPERFRAMES_*` 是 HyperFrames 的指定位置；`FFMPEG_PATH` 給入口網擷取封面使用。既有系列腳本有直接呼叫 ffmpeg／ffprobe，所以 PATH 仍要能找到它們。設定 `$env:` 只作用於目前視窗及其啟動的程式。

### 2. 安裝 HyperFrames 技能與準備 CLI

在動畫工作區根目錄 `animation` 執行。現有技能位於 `.agents/skills`，不是各集專案內；代理應先讀取 `hyperframes/SKILL.md`。CLI 負責操作工具，技能負責指導代理的製作流程，兩者用途不同。

若已有 HyperFrames 插件，由插件管理其技能與更新；不要再手動覆寫插件內的檔案。以下為本系列目前使用的獨立技能安裝方式，參閱 [官方入門](https://hyperframes.heygen.com/quickstart)。

```powershell
# 初次安裝：開啟技能選單，選核心技能並指定使用的代理
npx skills add heygen-com/hyperframes

# 安裝／更新核心及教學解說工作流
npx hyperframes skills update faceless-explainer

# 有自訂動畫需求時，另外安裝對應工作流
npx hyperframes skills update general-video

# 核對已安裝技能是否完整、是否需要更新
npx hyperframes skills check
```

不需全域安裝 HyperFrames；`npx` 首次使用會取得 CLI，需有網路。安裝完成後確認 `.agents/skills/hyperframes`、`hyperframes-core`、`hyperframes-cli`、`hyperframes-animation`、`hyperframes-creative`、`media-use` 及本次所需的工作流存在，再重新開啟代理。

| 名稱 | 在本系列的用途 |
| --- | --- |
| `/hyperframes` | 動畫任務的入口，判斷新製作、修改、預覽或輸出。 |
| `/faceless-explainer` | 用故事、角色、文字及圖解說明概念；本系列主要路線。 |
| `/general-video` | 自訂多幕動畫、特殊組合與不適合既有解說流程的需求。 |
| `/hyperframes-core` | HTML 動畫專案的結構與時間契約。 |
| `/hyperframes-animation`、`/hyperframes-keyframes` | 動作、轉場、可跳轉的時間軸與關鍵影格。 |
| `/hyperframes-creative` | 風格、版面、字體、色彩及講稿設計。 |
| `/media-use`、`/hyperframes-audio` | 素材、配音、字幕及已放入時間軸的音訊混音。 |
| `/hyperframes-cli` | 檢查、預覽、擷取畫面、渲染與診斷。 |

上述 `/名稱` 是代理技能的名稱，放在聊天提示詞中使用；不是 PowerShell 指令。`一分鐘認識系列.md` 則是本專案的工作流文件，不會自動註冊成 `/one_minute` 指令。最穩定的叫法是直接指定文件位置。

既有專案的 CLI 固定版本：演算法與 Scratch 為 **0.8.145**；排序為 **0.8.146**，以各集 `package.json` 為準。維護既有影片優先執行專案的 `npm run ...`，避免無意間換版本。若要升級，先留存可還原版本，讀取當前技能的升級規則，升級後重新檢查及檢視畫面，不能假設新舊版本輸出完全一致。

在需製作動畫的專案內準備渲染瀏覽器並診斷。以下以 0.8.145 為例，排序換成 0.8.146：

```powershell
npx hyperframes@0.8.145 browser ensure
npx hyperframes@0.8.145 browser path
npx hyperframes@0.8.145 doctor --json
```

確認 Node.js、FFmpeg、FFprobe 與渲染瀏覽器可用。診斷也可能列出 Docker 或本機語音等選用工具；本機 HTML 動畫製作不要求將每個選用項目都安裝。

### 3. 配音、圖片與聲音素材

本系列已選定中文男聲 **HeyGen James Gao**，既有專案記錄的 voice id 為 `5700258d53664cecb4b21a8154856355`。新增配音前先查目前服務的聲音清單與可用性；帳戶、額度及供應商清單可能改變，不僅依名稱猜測聲音。

Windows 可先使用 HyperFrames 自身的 OAuth 登入指令，再讓配音腳本使用同一份本機憑證：

```powershell
npx hyperframes@0.8.145 auth login
npx hyperframes@0.8.145 auth status
```

在開啟的瀏覽器完成登入即可；不把密碼、token 或 API key 寫進 README、專案或 GitHub。帳戶可用額度以服務當下顯示為準。旁白、生成圖片及其他服務可能各有費用；本機影片渲染和配音服務是不同工作。

素材目錄搜尋若需要獨立 HeyGen CLI，依 [HeyGen 官方 CLI 文件](https://developers.heygen.com/cli) 安裝及登入。該頁目前以 macOS／Linux 為主，Windows 建議 WSL；不要在 PowerShell 直接貼它的 `curl ... | bash` 指令。若代理的宿主已提供 HeyGen 服務連線，依宿主提供的工具處理。WSL 的登入不應假設 Windows 程式會自動讀到；本系列 Windows 配音優先使用上方 HyperFrames 登入。

技能安裝後，可在 `animation` 根目錄用清單確認聲音：

```powershell
node .agents/skills/media-use/audio/scripts/heygen-tts.mjs --list
```

以下是單句配音的語法示例。它會呼叫語音服務，僅在需要生成新聲音時執行，先確認目標資料夾存在，並使用新的輸出檔名：

```powershell
node .agents/skills/media-use/audio/scripts/heygen-tts.mjs '清單可以依序保存多個道具。' --lang zh --voice 5700258d53664cecb4b21a8154856355 --output one_minute/scratch/projects/my-new-lesson/assets/voice/line-01.wav --words one_minute/scratch/projects/my-new-lesson/assets/voice/line-01.words.json
```

完整解說由代理讀取 `SCRIPT.md` 與分鏡後拆句生成，以實際語音長度安排畫面、字幕與停頓。現有集數使用各專案的 `generate-narration.mjs` 等腳本；它們不是通用範本，也不是網站檢查指令。`npx hyperframes tts` 是另一個本機 Kokoro 路線，不能用它假裝生成 James Gao。

圖片、角色、字型、GSAP、旁白與音效都保存到各集 `assets`，來源及授權用途記入 `SOURCES.md`／`.media/manifest.jsonl`。保留字型使用條件；搬到另一台電腦時不要假設仍有相同中文字型。不必額外安裝 Blender、Remotion、Docker 或 GPU 模型才能沿用目前的 HTML 動畫流程。

### 4. 新集數放哪裡

以下路徑都以完整動畫工作區 `animation` 為基準；不是 GitHub 網站儲存庫根目錄。

```text
animation/
├── .agents/skills/                  代理技能
└── one_minute/
    ├── README.md                   本製作手冊
    ├── AGENTS.md                   系列共同規則
    ├── workflows/一分鐘認識系列.md  教學工作流
    ├── algorithms/projects/        演算法各集專案
    ├── scratch/projects/           Scratch 各集專案
    ├── scratch/site/               Scratch 教學網站
    ├── scratch/tools/              同步、檢查及打包
    ├── sorting/projects/           排序各集專案
    ├── sorting/site/               排序教學網站
    ├── sorting/site-source/        模板、正式版本與工具
    └── portal/                     入口網站來源與產製工具
```

新領域可以新增 `one_minute/<series>/projects/<project-name>`，再擴充入口目錄。`scratch/archive/scratch-rpg-list` 是保留的空白草稿，不作為正式製作起點；備份只供還原，其他主題維持原位置。

若只拿到 GitHub 網站儲存庫，先在另一個資料夾建立 `animation` 工作區並安裝技能，建立新集數；完成後再將正式影片加入 GitHub 的 `docs`。若要繼續修改既有動畫，從完整工作區備份還原專案、素材、分鏡及工具，不從已發布 MP4 反推原始檔。

### 5. 可以直接貼入對話的工作流提示詞

**第一次準備環境**，在代理已開啟 `animation` 工作區的對話中貼入：

```text
請準備「一分鐘認識」的 HyperFrames 動畫製作環境。
先讀取 one_minute/README.md、one_minute/AGENTS.md
及 one_minute/workflows/一分鐘認識系列.md。
檢查 Node.js、npm／npx、Git、FFmpeg／FFprobe、渲染用 Chrome
及 .agents/skills 中的 HyperFrames 核心技能和 faceless-explainer。
只補上缺少的項目，保留現有專案與固定版本。
需要中文配音時，確認 HeyGen 登入與 James Gao 聲音是否可用。
先回報可用與缺少的項目，這次不生成配音或渲染影片。
```

**新增概念解說**，把括號內容換成自己的主題與檔名：

```text
請使用 /hyperframes，依 one_minute/workflows/一分鐘認識系列.md
製作「一分鐘認識」新一集，主題是【主題】。
系列放在【algorithms／scratch／sorting 或新的英文系列名】，
專案放在 one_minute/【系列】/projects/【英文小寫專案名】。
核心目標是【看完後要理解的一件事】。
觀眾以國中生的先備知識為背景，用生活或遊戲例子說明，
不在標題反覆強調「給國中生」。預設繁體中文、60 秒、
1920×1080、30fps，中文男聲沿用已選定的 HeyGen James Gao，
自然原速、逐字中文字幕、低音量配樂與適量音效。
先整理已知需求，只問缺少的資訊，提供風格選單、分鏡及旁白稿。
確認後製作配音與動畫，檢視全片動作、文字、教學內容及聲音，
修正後提供完整預覽；確認成片後輸出新版本 MP4、SRT 與審查紀錄。
最後同步系列教學網站、入口目錄與離線交付包。
```

**修改現有一集**：

```text
請依「一分鐘認識」工作流修改
one_minute/【系列】/projects/【專案名】，這次調整【具體內容】。
先讀現有 AGENTS.md、BRIEF.md、STORYBOARD.md、SCRIPT.md 及製作紀錄，
沿用已確認的需求與聲音，保留原素材及上一版輸出。
完成後檢查、預覽並輸出新版本；依實際授權完成後續步驟，
不重新詢問已明確確認的事項。正式版本確認後再更新網站。
```

**只預覽或只輸出**：

```text
請開啟 one_minute/【系列】/projects/【專案名】的 HyperFrames 預覽，
提供完整時間軸網址；這次只預覽。
```

```text
此版本已確認，請將 one_minute/【系列】/projects/【專案名】
以專案固定版本輸出為 renders/【新版本檔名】.mp4，
保留舊檔，檢查實際成片的片長、畫面、聲音與字幕。
```

方括號是要替換的文字；上述提示詞貼在代理聊天中，不貼到 PowerShell。

### 6. 需求、分鏡與講稿的檔案語法

每集至少保留 `BRIEF.md`（需求）、`STORYBOARD.md`（分鏡）、`frame.md`（視覺規格）、`index.html`（主動畫）、`assets`（素材）、`renders`（輸出）及 `review`（本次驗證）。有旁白時增加 `SCRIPT.md`、語音檔及逐字對齊資料。`compositions/frames` 用於分幕；實際結構以所用工作流建立的專案為準。

`BRIEF.md` 的最小示例，供代理記錄需求：

```markdown
---
workflow: faceless-explainer
flow: automation
storyboard: yes
message: 用勇者背包理解清單可以儲存多個道具
audience: 國中初學者
length: 60s
aspect: 1920x1080
language: zh-TW
voice: James Gao
---

# 製作需求
以遊戲背包說明新增、刪除與編號，每幕只說明一個重點。
繁體中文字幕與實際旁白一致；不要加速或裁掉句尾。
```

`flow: automation` 指所選工作流的自動製作流程，不代表跳過確認；是否已授權直接製作，應另記在需求與對話中。`storyboard: yes` 表示先看分鏡。代理要依當前技能補齊必要欄位。

`STORYBOARD.md` 的分幕語法示例，這是第一幕，不是一份完整 60 秒分鏡：

```markdown
---
format: 1920x1080
duration: 60s
message: 清單能依序儲存多個道具
audience: 國中初學者
---

## Frame 1 — 背包裡有什麼？

- scene: 勇者打開背包，道具依序出現
- duration: 6s
- transition_in: cut
- status: outline
- voiceover: 勇者的背包，可以同時放進好多個道具。
- src: compositions/frames/01-bag.html

先打開背包，再依序呈現道具，最後停留讓觀眾看清楚。
```

`SCRIPT.md` 的旁白語法示例：

```markdown
# 中文旁白

**Voice:** HeyGen James Gao
**Voice settings:** speed 1.0
**Voice direction:** 清楚、自然、溫暖的中文解說。

## Line 1 — 背包 (Frame 1)

**Time:** 0–6s

    勇者的背包，可以同時放進好多個道具。
```

縮排的句子才是要讀出的內容；標題與製作註記不應念進影片。時間先是規劃，生成後以實際語音時長及字詞對齊資料修正，不按字數平均切字幕。

### 7. 從製作到交付的順序

1. **聚焦一個概念**：寫出「觀眾看完要理解什麼」，內容過多先拆集。
2. **整理需求**：沿用系列已確認的語言、尺寸與聲音，確認本集情境、風格與必要重點。
3. **分鏡與講稿**：提供每幕起訖、畫面、文字、旁白、動作與音效；需要確認時讓使用者看具體方案，已有授權則依授權繼續。
4. **準備素材與旁白**：先生成並聽完實際旁白，再定稿時間軸；素材保存在本集，記錄來源。
5. **製作動畫**：一幕一個焦點；動作解釋新增、比較、選取及變化；保留物件連續性、因果順序與閱讀時間。
6. **檢查與全片審查**：確認可跳轉、倒回、逐幕掛載，檢查文字遮擋、術語、語音漏字、句尾與字幕。排序另核對 trace 與統計。
7. **預覽及修正**：先處理教學／聲音錯誤，再調節奏與版面；既有授權持續有效。使用者要求只預覽時就只預覽。
8. **輸出新版本**：不覆寫舊成片；檢查實際 MP4，再選為網站正式版本。
9. **同步與交付**：更新系列網站、入口及 ZIP；線上發布另走目前使用的託管方式，GitHub 提交使用正常推送。

預設解說 60 秒；既有三大排序是 **30 秒實作動畫、無旁白、含操作音效**。不能將預設中文配音套到既有排序影片，也不因「一分鐘」名稱強制延長。

### 8. 終端機：建立、檢查、預覽與輸出

以下均以 PowerShell 執行；`Set-Location` 改變工作目錄。第一段從 `animation` 根目錄開始，只用於尚不存在的新專案；不要對現有專案重跑 init。先確認本集需求，再建立空白專案，再寫 BRIEF／分鏡，避免 init 被既有文件阻擋。

```powershell
# 範例：建立新的演算法集數，名稱請自行替換
npx hyperframes@0.8.145 init one_minute/algorithms/projects/my-new-lesson --resolution landscape --skill=faceless-explainer --non-interactive
Set-Location one_minute/algorithms/projects/my-new-lesson

# 用代理完成需求、分鏡、素材與 HTML 動畫後再檢查
npm run check

# 背景預覽：保持可供審查的服務
npx hyperframes@0.8.145 preview --background
npx hyperframes@0.8.145 preview --status
```

以預覽工具回報的實際連接埠與網址為準，例如 `http://localhost:<port>/#project/my-new-lesson`。新專案的 package scripts 版本應與你選定的 CLI 相符。手動前景預覽可用 `npm run dev`，用 Ctrl+C 關閉；背景服務用同版本 `preview --stop` 關閉。

在既有專案內，直接執行下面指令。片名及版本請更換；正式輸出要已取得相應授權：

```powershell
npm run check
npm run render -- --quality draft --output renders/lesson-draft-v2.mp4
npm run render -- --quality delivery --fps 30 --output renders/lesson-final-v2.mp4
ffprobe -v error -show_format -show_streams renders/lesson-final-v2.mp4
```

`draft` 用於製作中的查看，`delivery` 用於正式輸出。MP4 應非空白、尺寸正確、片長符合本集設定；完整聽看首尾、關鍵操作與轉場。SRT 不是上面 render 指令自動產生的交付檔，應由已對齊的旁白資料另外生成並核對。

現有排序專案在本集目錄另執行 `node verify-trace.cjs`。完整重建用的 `build.mjs`、`build-selection.cjs`、`build-insertion.cjs` 可能覆寫已編輯的原始動畫，普通預覽與網站打包不要重跑它們。

### 9. 完成後更新系列網站與入口

**完整動畫工作區**：回到 `animation` 根目錄。先確認正式影片，更新對應 release.json 與課程資料，再執行所需系列工具；不是每次都要重建所有系列。

```powershell
# Scratch：更新 one_minute/scratch/tools/release.json 後
node one_minute/scratch/tools/sync-site.cjs
node one_minute/scratch/tools/check.cjs
& './one_minute/scratch/tools/package.ps1'

# 排序：更新 one_minute/sorting/site-source/release.json 後
node one_minute/sorting/site-source/build-sorting-lesson.cjs
node one_minute/sorting/site-source/check-site.cjs
python one_minute/sorting/site-source/package-site.py

# 入口：更新 one_minute/portal/content/catalog.json 後
npm --prefix one_minute/portal run build
npm --prefix one_minute/portal run check
npm --prefix one_minute/portal run package
npm --prefix one_minute/portal run preview
```

`portal/content/catalog.json` 的素材來源以 `one_minute` 為基準，片長填實際秒數；新集數 id 保持固定，並新增問題、答案及挑戰。完整教學網站與入口須重新建置，影片副本不會自己更新。

若入口／Scratch 網站檢查找不到 puppeteer-core，在相應工具目錄安裝即可；以下是按需執行的例子：

```powershell
npm --prefix one_minute/portal install --no-save --package-lock=false puppeteer-core
npm --prefix one_minute/scratch/tools install --no-save --package-lock=false puppeteer-core
```

也可用 `PORTAL_PUPPETEER_MODULE` 或 `SCRATCH_PUPPETEER_MODULE` 指向已安裝套件；瀏覽器位置用 `CHROME_PATH` 指定。排序的 check-site 包含素材、正式影片、trace 與模擬頁面互動檢查，仍需另外在瀏覽器確認實際播放與版面。

**只有 GitHub 網站儲存庫**：在下載的 `one_minute` 儲存庫根目錄，新增正式素材到 `docs`，修改 `source/content/catalog.json`、`source/index.html` 或 `source/assets`，然後：

```powershell
npm --prefix source install --no-save --package-lock=false puppeteer-core
npm run build
npm run check
npm run package
npm run preview
```

只有需要自動瀏覽器檢查才執行第一行安裝。此版 catalog 的素材來源以儲存庫根目錄為基準，例如 `docs/media/new-lesson.mp4`；不要將本機 `one_minute` 的來源路徑直接搬來。`build` 先讀取素材到 `source/dist`，再同步 `docs`；建置前不要刪除 `docs`。這裡的 `npm run build` 產生網站，不產生動畫 MP4。

完整本機工作區要匯出 GitHub 網站更新時，先在 `.github-publish/one_minute` 拉取並處理遠端變更，再回到 `animation` 根目錄執行：

```powershell
git -C .github-publish/one_minute pull --ff-only origin main
node one_minute/portal/tools/export-github.cjs
git -C .github-publish/one_minute diff
```

確認差異後才提交並正常推送；不強制推送。匯出會同步網站、README 的本製作手冊及工作流文件；動畫原始專案、備份、憑證與 `.openai` 設定不納入。`--ff-only` 若因分支不同步而失敗，先處理版本差異，不直接覆蓋遠端工作。

### 10. 常見問題與交付核對

| 情況 | 檢查方式 |
| --- | --- |
| 找不到 node／ffmpeg／python | 重新開啟終端機，確認 PATH 與指向的檔案；不要只看「已安裝」。 |
| npx 首次執行失敗 | 確認網路與 npm 可用；已安裝的快取不代表新電腦也有。 |
| PowerShell 擋住 npm.ps1 | 可改呼叫 `npm.cmd`／`npx.cmd`；不必為此修改整台電腦的執行原則。 |
| 預覽連接埠被占用 | 使用工具回報的實際網址；HyperFrames 可指定 `--port`，網站服務可設定 `$env:PORT`。 |
| 缺圖片、字型或音效 | 核對來源路徑、各集 assets 及媒體清單；不要引用舊工作副本或暫存生成位置。 |
| 登入過期或聲音不可用 | 用 auth status 確認，依服務提示重新登入；不要默默換成另一個聲音。 |
| 修改稿後配音仍是舊句 | 核對每句文字與音檔；有些專案會重用已存在的句子檔，應使用新版本或明確重做該句。 |
| 旁白超時 | 先精簡或拆集，不加速、不裁切句尾。 |
| 檢查通過但成片不對 | 工具檢查、人工審查及實際 MP4 驗證是三件事；核對真正輸出的影片。 |
| 新影片沒出現在網站 | 核對 release.json、catalog 的來源及 status，再同步系列與重建入口。 |

交付至少保留：可修改專案、需求／分鏡／視覺規格、素材來源、正式 MP4、旁白稿及對應 SRT（有旁白時）、本次問題與修正紀錄、更新過的網站及完整離線 ZIP。舊 MP4、舊版本素材及備份保留，不用新結果覆蓋歷史驗證。

安裝與新專案範例是可重用的操作說明；本次整理文件並未重新生成旁白、建立新集數或重渲染影片。後續依實際機器與服務版本執行當次檢查。
