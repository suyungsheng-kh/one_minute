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

## 可複用提示詞

```text
請先閱讀工作區與目標專案的 AGENTS.md、README、版本設定及既有審查紀錄，沿用已確認需求。區分規劃、已生成、已驗證與未完成；保留原素材及歷史輸出。只執行本次指定階段，不因有提示詞而自行消耗配音額度、渲染或發布。對已授權事項不要重複詢問。

請先盤點【專案路徑】的製作環境，這次只做唯讀檢查。
列出 package.json 的腳本用途、固定 CLI 版本、正式生成器、素材／字幕／成功音訊位置，以及目前正式交付版本。
檢查 Node、FFmpeg、FFprobe 是否可用；不要重裝、升級、重跑 setup 或改寫素材。
將「必須安裝」「已有可重用」「尚未確認」分開列出，提供接續工作建議與缺項；不要輸出 .env 或任何金鑰。
```

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
