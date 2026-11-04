# 新增／更新系列提示詞與 skill 使用說明

使用 [新增系列完整提示詞](https://suyungsheng-kh.github.io/one_minute/docs/production.html#new-series)，可以在新對話接續動畫製作、品牌、網站整合、技術經驗與 GitHub 交付。它是一組工作流範本，不代表已完成新影片，也不增加技術文章或動畫集數。

已有教材要修改時，使用 [更新既有系列或單元提示詞](https://suyungsheng-kh.github.io/one_minute/docs/production.html#update-unit)。兩組完整工作流與下方八組階段範本分開選用，避免把既有課程當成新系列重建。

## 在新對話開始

1. 開啟提示詞庫最前面的「新增系列｜從動畫製作到網站上架」，可先展開全文，或下載 Markdown。
2. 按「複製新增系列提示詞」，貼到新對話，填入主題、英文代號、集數、概念／情境及 animation 工作區的絕對路徑。工作區欄位刻意保留變數，避免把私人電腦路徑公開或套用到別人的環境。
3. 核對最後的製作與發布授權：範本預設完成製作、網站整合及正常推送指定 GitHub；若只要分鏡、只預覽或暫不發布，先修改任務與授權段落。既有明確授權持續有效，範本本身不授權付費升級、繞過用量管控或公開私人資料。
4. 確認新對話可使用 `$one-minute-production`，再送出提示詞。它會依當地 AGENTS.md、品牌規範、固定工具版本與實際任務範圍接續。

## 更新既有系列或單元

1. 開啟「更新既有系列或單元｜修改到重新上架」，按「複製更新單元提示詞」，或先展開全文／下載 Markdown。
2. 填寫系列或課程名稱、既有課程 id、專案位置或課程網址、本次修改的前後差異與完成條件、必須保留的內容及工作區。
3. 核對任務與最後的授權段落，再貼到新對話。若只要診斷、修改分鏡或預覽，先縮小範圍，避免把完整發布範本當成本次額外授權。
4. 從目前正式版本與原始專案接續，重用成功素材，不覆蓋歷史輸出；確認新版後才切換正式設定。課程 id、舊連結與觀看進度維持可用。

此工作流同步動畫修改、共同品牌、首頁／課程／路線、概念關聯、技術經驗、提示詞與 skill；只有文件或網站變更時，不重製影片。檢查本次實際變更後，依授權推送 GitHub 並確認 Pages。

## GitHub 部署失敗或排隊卡住

開啟 [修復 GitHub 部署提示詞](https://suyungsheng-kh.github.io/one_minute/docs/production.html#recover-deployment)，按「複製部署恢復提示詞」，填入儲存庫、目標提交／版本、正式網址、已知工作或錯誤及工作區，再貼到新對話。若只要診斷，先把最後的授權改成唯讀。它是接續發布的專用流程，不重新製作整套動畫。

流程先確認遠端是否收到提交，分辨建置、部署及平台錯誤，再依目前站點設定重試。排隊約十分鐘無進展時重新診斷；若舊重試無新 job 且取消回覆 409，可依 AGENTS 在 legacy 分支發布站點重新請求 Pages 建置，改追蹤新工作。自訂 workflow 不直接套用此方法。

HTTP 201、queued 與推送成功都不是完成證據。只有本次提交的部署與正式網站內容都確認，才回報上線；依影響核對入口、版本、檔案、下載、操作及進度。完整經驗在 [網站交付文章](https://suyungsheng-kh.github.io/one_minute/docs/article.html?id=publish-brand)，案例是 20261104.46 的實際恢復，不將其工作 ID 套到未來。

## 取得與更新 skill

在 [技術系列下載區](https://suyungsheng-kh.github.io/one_minute/docs/production.html#skill) 下載 skill ZIP。解壓後，將完整 `one-minute-production` 資料夾放入使用環境的技能目錄，更新既有安裝時保留自己的修改並合併新版，再重新載入技能或開啟新對話。

skill 的入口為 `SKILL.md`；新增系列、更新既有單元兩組完整範本、部署恢復提示詞與八組階段範本在 `references/prompts.md`，技術方法在 `references/playbook.md`，唯讀盤點工具在 `scripts/inspect-project.mjs`。包內不含動畫原始專案、配音金鑰或私人帳本。

若只處理既有專案的一個階段，使用提示詞庫下方的分鏡、環境、trace、聲音、審查、輸出、網站或 skill 範本，不必要求整套新增系列工作流。

## 新增系列的交付範圍

- 每集聚焦一個概念，完成分鏡、動畫、配音字幕、驗證與可重建資料；Azure 配音走工作區共用入口，重用成功音訊。
- 沿用霧白／墨綠主品牌、藍黃輔色與活潑教材構圖，學生入口共用首頁、觀看路線及課程頁。
- 整合首頁推薦、課程、封面、路線、合理的概念關聯與相關單元連結；保留舊連結與觀看紀錄。
- 將實際可複用經驗整理到技術文章、提示詞與 skill；沒有新經驗時記錄原因，不重複堆疊內容。
- 完成相應檢查與離線打包，依授權正常推送 GitHub，核對 Pages 後提供入口、影片連結與提交紀錄。

## 維護這份範本

完整工作區以 `one_minute/portal/content/production.json` 的 `workflowPrompts` 為唯一正文來源；階段範本仍放在各篇文章的 `prompt`。修改後在 `one_minute/portal` 執行：

```text
node tools/build-production.cjs --sync-skill
npm run build
npm run check
npm run package
node tools/export-github.cjs
```

網站維護儲存庫的對應來源是 `source/content/production.json`；同步參考檔使用 `node source/tools/build-production.cjs --sync-skill`，再執行根目錄的 build、check、package。不要只修改生成的網站資料、下載 Markdown 或 ZIP。發布前核對網站複製文字、下載檔、技能參考及已安裝版本一致，並依 AGENTS.md 的流程推送及驗證。

## 自訂積木與參數草稿（2026-10-24）

本次補充 trace-animation 的呼叫、參數與落地計數驗收，以及 project-environment 的零瀏覽器樣本判讀。new-series 與 update-unit 已檢視：原有製作、品牌、同步及發布授權仍適用，完整工作流正文不需修改。新課程已完成配音對時，實際畫面與成片檢查仍待完成，不加入公開案例；網站與已安裝技能版本的正式發布仍待完整驗證。

## 配音對時進度（2026-10-25）

三集重用 24 段成功旁白，補充 voice-caption 的尾段排程與 ASR 差異紀錄，並同步階段提示詞、技能參考檔與下載。new-series、update-unit 的原速、對時及驗證規則仍適用，正文無須變更。實際瀏覽器與成片 QA、GitHub 推送及已安裝技能副本仍待完成。

## 三集成片與網站整合（2026-10-25）

24 段旁白原速沿用；三集瀏覽器、倒回、手機與正式 MP4 技術檢查完成，新增尺規標籤遮擋的修正經驗至 motion-review 並同步提示詞、skill 參考檔及下載。new-series 與 update-unit 的原有驗證／發布規則仍適用，完整工作流正文無須變更。網站來源已整合 8 系列 24 集，線上推送與 Pages 確認以發布報告為準。ASR 與音訊比對未宣稱人工逐字聽審。

## GitHub 部署恢復經驗（2026-11-04）

擴充 publish-brand 技術文章與階段提示詞，新增 recover-deployment 專用工作流，同步 new-series、update-unit 的發布完成條件、skill 入口及生成參考。來源維持八篇文章、兩組完整製作工作流、一組部署恢復流程與八組階段提示詞；不增加動畫課程，也不為驗證呼叫 Azure。部署恢復須沿用當地 AGENTS、使用者授權與真實站點設定。
