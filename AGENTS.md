# 一分鐘認識：GitHub 網站

此儲存庫只維護入口網站與正式教學素材，不包含動畫原始製作專案。

- 主標題「把好奇，變成理解」，副標「一分鐘，認識一個概念」。國中生是內容與難度的背景設定，不反覆強調年齡。
- 網站骨架、樣式與互動修改 source/index.html、source/assets；課程修改 source/content/catalog.json。不要直接改生成的 docs/index.html 或 docs/content/catalog.js。
- 影片、字幕、封面及系列完整教學頁的素材來源位於 docs。catalog 的來源路徑以儲存庫根目錄為基準。
- 更新系列教學時可修改 docs/series 下的原始教學頁和課程資料，再執行 build。返回入口連結只保留一份。
- npm run build 先生成 source/dist，再同步 docs；source/dist、review、exports 不提交。
- 提交前確認課程目錄及素材引用完整。版面或互動變更後執行 npm run check。
- 既有排序影片保留 30 秒，字幕依現有正式版本提供。每集 id 應保持固定。
- 保留原有提交歷史，正常推送 main，不使用強制推送。
- 本儲存庫不儲存 Sites 的網站身分、憑證、備份或動畫製作素材。
