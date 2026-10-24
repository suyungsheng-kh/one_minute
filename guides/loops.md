# 迴圈與停止條件

三集正式成片皆已完成，各 60 秒、1920×1080、30fps、雲哲配音。正式版本由 tools/loop-release.json 指定；成功原音、歷史輸出及審查紀錄保留。先前網路環境的失敗紀錄屬歷史，不代表目前 GitHub 發布狀態。

## 觀看順序

1. [重複幾次？](https://suyungsheng-kh.github.io/one_minute/docs/lesson.html?id=loop-repeat)：前進加收星，整組完成才是一輪。4 輪共 8 次本體指令，不把控制檢查算成本體動作。
2. [什麼時候停？](https://suyungsheng-kh.github.io/one_minute/docs/lesson.html?id=loop-until)：每輪先檢查停止條件；三種情境前進 3／1／0 次，檢查 4／2／1 次。起初已成立時可以一次都不執行；離開迴圈後繼續後面的指令。
3. [為什麼停不下來？](https://suyungsheng-kh.github.io/one_minute/docs/lesson.html?id=loop-energy)：前進不會自動扣能量。補上每輪減 1，才讓本例停止條件有機會成立。有限影片以教學暫停展示錯誤，不宣稱真的模擬了無限步。

[完整觀看路線](https://suyungsheng-kh.github.io/one_minute/docs/path.html?id=loops)。首頁推薦、課程、路線及概念圖使用同一份課程目錄。

## 與既有單元的關聯

- 變數保存輪數、位置或能量；每輪依規則更新狀態。
- 條件判斷產生真／假，再決定繼續本體或離開。
- 布林邏輯可組合停止條件，例如「碰到寶箱 或 能量 ≤ 0」。
- 演算法控制流程把循序、選擇與重複組合起來。排序與搜尋也會反覆比較、更新資料並檢查是否停止。
- 不把持續執行一律當成錯誤；需依任務判斷。能量從 5 開始每輪減 2，可能跨過 0，應比較「等於 0」與「≤ 0」的適用條件。

## 維護及發布

三個專案保留在 projects/scratch-loop-repeat、scratch-loop-until、scratch-loop-energy。修改先讀各集 README、STORYBOARD 與 review/QA，先改正式生成器，再依專案固定版本檢查。預覽、檢查與輸出重用成功旁白，不重配。

學生課程唯一來源為 portal/content/catalog.json，系列 id 為 loops。技術文章 trace-animation 與 voice-caption、提示詞及 skill references 已納入迴圈製作經驗；個人已安裝參考檔也須與公開下載一致。

發布檢查記錄於本機 portal/review/loop-public-check.json 與 loop-publish-state.json；公開儲存庫只保留網站來源、正式素材與文件，不包含私人帳本或原始動畫專案。後續更新依 portal/AGENTS.md 的一般流程，不重跑已完成的初次發布批次。
