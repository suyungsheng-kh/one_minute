# 布林邏輯：且、或、非

網站獨立分類為「布林邏輯」，原始專案保留在 scratch/projects/scratch-boolean-and、scratch-boolean-or、scratch-boolean-not。正式版本由 tools/boolean-release.json 選定，不搬移或覆寫原始素材；學生入口沿用首頁 → 觀看路線 → 課程頁。

## 三集的分工

| 單元 | 核心規則 | 情境 |
| --- | --- | --- |
| [且](https://suyungsheng-kh.github.io/one_minute/docs/lesson.html?id=boolean-and) | 所有條件成立，結果才成立 | 有鑰匙且能量至少 5 點；剛好 5 點也符合 |
| [或](https://suyungsheng-kh.github.io/one_minute/docs/lesson.html?id=boolean-or) | 至少一個成立，包含兩個都成立 | 有鑰匙或知道密碼 |
| [非](https://suyungsheng-kh.github.io/one_minute/docs/lesson.html?id=boolean-not) | 反轉一個判斷的真／假 | 非（警報已啟動）；運算不會關掉警報 |

## 與既有單元的關聯

- [變數](https://suyungsheng-kh.github.io/one_minute/docs/lesson.html?id=variables)保存能量與目前狀態；狀態改變後，下次執行判斷才重新求值。
- [條件判斷](https://suyungsheng-kh.github.io/one_minute/docs/lesson.html?id=conditions)的如果／否則依真或假選擇動作。且、或、非只計算結果，本身不開門、扣能量或修改警報。
- [循序、選擇、重複](https://suyungsheng-kh.github.io/one_minute/docs/lesson.html?id=algorithm-control-flow)安排整體步驟；複合條件可放進選擇或重複的判斷位置。
- 排序與搜尋中的大小比較會得到真假，再由流程決定更新或停止；不能把比較數值、組合布林結果、移動資料當成同一件事。參考[二分搜尋](https://suyungsheng-kh.github.io/one_minute/docs/lesson.html?id=search-binary)。

三集每一關的規則各自獨立，不把前一關能量門檻自動加到下一關的密碼判斷。畫面逐盞亮燈是教學節奏，不宣稱所有程式語言都照同一順序求值。

## 整合挑戰

條件：（有鑰匙 或 知道密碼）且 非（警報已啟動）。先算或與非，再用且合併。

| 有鑰匙 | 知道密碼 | 警報已啟動 | 能通過 |
| --- | --- | --- | --- |
| 假 | 假 | 假 | 假 |
| 假 | 假 | 真 | 假 |
| 假 | 真 | 假 | 真 |
| 假 | 真 | 真 | 假 |
| 真 | 假 | 假 | 真 |
| 真 | 假 | 真 | 假 |
| 真 | 真 | 假 | 真 |
| 真 | 真 | 真 | 假 |

完整八種組合共三種能通過。對照來源為第三集 combined-challenge.json；第三集課程頁與觀看路線提供同一表達式的小挑戰。

## 製作與驗證

三集皆為 60 秒、1920×1080、30fps、雲哲配音。重用 24 段成功旁白；本次上架沒有呼叫 Azure。繁體字幕分別 21／17／17 段。

本次補齊先前受限的實際瀏覽器檢查，修正規則標籤被角色遮擋與對比不足，以及第一集進度條的起點；正式影片分別保存新版本。檢查來源、真假組合、播放、倒回、音訊跳段、成片規格、完整解碼與每段混音相關性。ASR 與音訊比對不代表人工逐字聽審。

實際證據保存在本機 scratch/review/boolean-browser-release.json、boolean-mp4-release.json 及各集 review；私人紀錄不匯出。技術經驗整合至網站 trace-animation、motion-review、publish-brand 三篇文章及提示詞／skill。
