# 從一支影片，到可維護的教材網站

正式版本、課程路線、品牌與離線包一起交付；遇到部署失敗或排隊卡住時，以正式網站驗證完成發布。

延伸提示詞：[修復 GitHub 部署｜確認正式網站更新](https://suyungsheng-kh.github.io/one_minute/docs/production.html#recover-deployment)

技術文章；不代表新影片。更新：2026-11-04。

## 製作來源與公開交付分開

完整動畫專案保存在各系列 projects；網站目錄集中在 portal/content/catalog.json，正式素材依 release.json 選定。沿用穩定課程 id，保留影片版本與舊分享連結。

新增或改版要同步首頁、課程頁、觀看路線及有意義的既有單元關聯。發布到 GitHub Pages，不能只改一個影片連結就宣稱整站更新。

## 共同品牌可以是生成規格

網站有共用模板、Logo、色彩、用語與播放工具。各集品牌封面由 coverDesign 與 brand-covers.cjs 生成，與播放器的原畫面 poster 分開。新集數延續同一版型，避免每次重做一套圖。

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

## 影片完成與可上架，是兩個要分開核對的狀態

布林邏輯三集交接時已具有成功配音、字幕與 HTML 預覽，文件仍明確標示正式 MP4 尚未完成。接手先核對檔案與本次檢查，再在既有授權內補做正式輸出，不能把預覽包當作成片上架。

動畫專案保留在原本的 Scratch 製作目錄，公開網站則使用獨立的布林邏輯系列與觀看路線。公開分類不需要為了資料夾位置而綁在一起；正式版本清單記錄實際來源，避免多份來源各自修改。

## 推送、建置、部署與正式網站要分開記錄

GitHub 收到提交，只證明程式碼已送到遠端；build 成功只證明建置完成。部署要求被接受或顯示 queued，也還沒有證明正式網站已換成新版。分別記錄提交 SHA、推送、建置、部署及正式網址核對結果。

先確認這次要發布的提交與版本。推送遇到 HTTP 500 或逾時時，先查遠端 main 是否已收到該 SHA，收到就接續部署確認；沒有收到才正常重試推送。保留已檢查內容，不用空白提交、強制推送或重製影片處理平台故障。

```text
目標提交：本次已檢查的 SHA
推送：已收到
建置：成功
部署：queued
正式網站：仍是舊版
交付狀態：待完成，不宣稱已上線
```

## 部署失敗先找階段，排隊卡住先看有沒有新工作

先看對應提交的 Actions 工作、job／step 與錯誤註記。若建置失敗，依錯誤修正來源並重新驗證；若建置已成功而 Pages 建立部署回覆 HTTP 500，則核對官方服務狀態，處理發布流程，不把平台問題誤當成動畫或遊戲程式錯誤。

一般失敗可在既有授權內重試失敗步驟或完整工作流。排隊約十分鐘仍沒有新 job 或任何進展時，重新檢查，而不是反覆開啟相同等待程序。要取消僅操作這次的工作；正常取消失敗後才考慮官方 force-cancel。

這次重試長時間 queued，沒有新 job，正常與強制取消都回覆 HTTP 409，訊息為 Cannot cancel a workflow re-run that has not yet queued。這是需要換處理方式的證據，不能把「已接受重試」當作部署成功。

```text
唯讀核對：
git ls-remote origin refs/heads/main
GET /repos/{owner}/{repo}/actions/runs/{run_id}
GET /repos/{owner}/{repo}/actions/runs/{run_id}/jobs

只有工作確實失敗且仍屬於本次提交，才依授權重試：
POST /repos/{owner}/{repo}/actions/runs/{run_id}/rerun-failed-jobs
或 POST /repos/{owner}/{repo}/actions/runs/{run_id}/rerun
```

## 從同一提交重新請求 Pages 建置

先讀取現有 Pages 設定並再次核對遠端 main。對從分支發布、build_type 為 legacy 的站點，可重新請求 Pages 建置，從已檢查的 main 建立新的發布工作，不必新增程式碼提交。自訂 workflow 站點則使用其支援的重試方式，不照抄分支建置程序。

新請求也可能排隊，因此要改追蹤新工作 ID、head_sha 與結果。當遠端已出現較新的提交時，先檢視與整合、重新核對發布範圍，停止盲目重試舊工作。保留原分支、目錄、託管與存檔，不以改設定或升級方案碰運氣。

```text
先確認來源與目標提交：
GET /repos/{owner}/{repo}/pages
GET /repos/{owner}/{repo}/commits/main

只有既有授權、目標一致且 build_type 為 legacy 時：
POST /repos/{owner}/{repo}/pages/builds

HTTP 201／queued 只代表請求被接受；繼續追蹤新產生的 Actions 工作與正式網站。
```

## 本次已驗證案例與完成條件

2026-11-04 的 20261104.46 發布遇到推送 HTTP 500，確認遠端仍是舊提交後正常重試，程式碼成功送達。原部署建置通過，但部署建立回覆 HTTP 500；失敗步驟重試又長時間卡在隊列，取消亦回覆 HTTP 409。

確認站點為 legacy、來源為既有 main 後，重新請求 Pages 建置。新的工作開始執行並成功部署同一提交 5f73231；沒有增加空白提交，也沒有改動遊戲內容。這是本次驗證過的恢復方法，不代表所有 queued 或所有站點都適用相同步驟。

部署成功後，實際核對首頁、系列、遊戲、攻略與概念對照，確認四個入口為 20261104.46，並比較十份線上更新檔案。另驗證故事稿下載、存檔接續、結局重看、鍵盤與手機版面；瀏覽器測試使用獨立存檔及模擬觸控，不冒充完整真人通關或實體手機測試。

之後每次發布都以當次的提交、內容與驗證為準。只有成功部署與正式網站內容都確認，才算發布完成；若平台仍異常，就保留已推送、部署未確認的待完成狀態與紀錄，不沿用舊的通過結果。

```text
直接套用部署恢復提示詞：
https://suyungsheng-kh.github.io/one_minute/docs/production.html#recover-deployment

本次成功部署紀錄（僅供案例，不作未來預設工作 ID）：
https://github.com/suyungsheng-kh/one_minute/actions/runs/41821769342
```

## 可重複的步驟

1. 選定 release 的正式影片、字幕與實際片長
2. 更新課程、路線、封面與雙向關聯
3. 依影響完成建置、檢查與離線包核對
4. 確認遠端提交與授權，再正常推送並追蹤對應部署
5. 遇到失敗或隊列停滯時分階段診斷，依站點設定重試或重新請求建置
6. 核對正式網站的當次內容、入口與下載，記錄成功部署及實際驗證後交付

## 可複用提示詞

```text
請先閱讀工作區與目標專案的 AGENTS.md、README、版本設定及既有審查紀錄，沿用已確認需求。區分規劃、已生成、已驗證與未完成；保留原素材及歷史輸出。只執行本次指定階段，不因有提示詞而自行消耗配音額度、渲染或發布。對已授權事項不要重複詢問。

請將【已確認的影片版本】整合至【網站來源位置】。
沿用原課程 id 與觀看進度，依 release 設定更新影片、字幕、片長、封面、練習及相關單元。
同步首頁、課程頁、觀看路線與概念關聯圖；檢查有意義的反向連結及舊網址。
品牌封面沿用共同生成規格，不修改原始動畫或歷史輸出。
完成本次 build、check、離線打包與檔案核對。是否提交、推送與發布依【本次授權／既有 AGENTS 規則】；若已授權就完成並確認線上版本。
交接時分別確認成功音訊、HTML 預覽、正式 MP4 與公開發布狀態；公開系列分類可獨立於原始專案所在資料夾，但正式版本清單與素材路徑必須一致。
發布前鎖定本次提交與版本；推送出錯先查遠端，分別記錄已推送、建置、部署與正式網站核對。遇到失敗或排隊停滯時，依 AGENTS 的部署恢復流程及「修復 GitHub 部署」提示詞處理；確認 Pages 設定與遠端 main 後，才採適合該站點的重試。
只有本次提交的部署與正式網站內容都確認後才回報完成，提供正式網址與成功工作紀錄。
```

## 驗收

- 正式素材、課程與路線是同一版本
- 舊 id、舊網址與觀看紀錄可延續
- 離線包內容與建置一致
- 推送後有公開網址的實際驗證
- 提交 SHA、成功部署工作與正式網站的關鍵內容一致
- 重試與 queued 狀態有如實記錄，待完成與已上線分開
- 修復流程保留原託管設定、成功素材、存檔與已授權範圍

常見問題：把 Git push、build 成功或重試已排隊當作正式網站已更新；持續等待舊工作卻漏看新工作，或對不同提交、不同 Pages 發布方式直接套用相同重試。

## 案例與依據

- [conditions](https://suyungsheng-kh.github.io/one_minute/docs/lesson.html?id=conditions)：影片、課程與路線一起整合。
- [search-race](https://suyungsheng-kh.github.io/one_minute/docs/lesson.html?id=search-race)：新集數與既有單元關聯同步交付。
- [boolean-and](https://suyungsheng-kh.github.io/one_minute/docs/lesson.html?id=boolean-and)：先完成正式成片，再以獨立的布林邏輯系列整合課程。
- 網站維護規則：`portal/AGENTS.md`（完整動畫工作區相對路徑，非網站下載檔）。
- 品牌與封面規格：`portal/content/brand-guide.md`（完整動畫工作區相對路徑，非網站下載檔）。
- 網站產製工具：`portal/tools/build.cjs`（完整動畫工作區相對路徑，非網站下載檔）。
- 布林邏輯系列正式交付與關聯：`one_minute/scratch/BOOLEAN-LOGIC.md`（完整動畫工作區相對路徑，非網站下載檔）。
