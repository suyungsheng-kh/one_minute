# 把動畫審查，變成製作原則

緩動、物件連續性、文字層級與閱讀時間，一開始就納入設計。

技術文章；不代表新影片。更新：2026-10-23。

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

## 文字靜止時清楚，不代表角色經過時仍可讀

布林邏輯第二、三集首次實際瀏覽器檢查發現：城門下方的規則文字會被走動角色遮住，背景顏色也使對比不足。將文字移至城門上方的固定淺色區，再重新檢查各時間點，保留原有配音與動作時序。

畫面檢查要包含角色穿越、開門、狀態重置與倒回。只在開場截圖，容易漏掉動作中才出現的遮擋。預覽播放、隨機跳段後回到同一時間點，也要得到相同物件狀態。

## 可重複的步驟

1. 列出影響理解的問題並排優先度
2. 先修物件連續性與概念因果
3. 再修緩動、留白、文字層級與停留
4. 往前與倒回抽樣，確認同一時間得到同一狀態

## 可複用提示詞

```text
請先閱讀工作區與目標專案的 AGENTS.md、README、版本設定及既有審查紀錄，沿用已確認需求。區分規劃、已生成、已驗證與未完成；保留原素材及歷史輸出。只執行本次指定階段，不因有提示詞而自行消耗配音額度、渲染或發布。對已授權事項不要重複詢問。

請審查【專案路徑】的現有動畫，先以教學理解與物件連續性排序問題，再看緩動、層級、對比與閱讀時間。
逐幕列「問題、時間點、原因、修正方式、驗證狀態」。
進場依目的選 ease-out 或自訂曲線；等速動作可保留 linear，不為展示效果添加無關回彈。
確認 paused timeline、固定狀態、媒體時間與字幕區安全。測試前進、倒回及場景邊界。
只修本次指定問題，保留原素材和成功音訊；先提供修正版預覽與實際驗證紀錄，是否正式渲染依既有授權。
加入角色跨過文字區、開門、狀態重置等動態時點，檢查遮擋與對比；將時間軸先往後再倒回同一時間，比對物件狀態與音訊位置。
```

## 驗收

- 問題有具體時間點與處理結果
- 物件不憑空改名或跳位
- 字幕和重點文字有閱讀空間
- 同一時間的前進／倒回狀態一致
- 角色移動與重置時文字仍可讀，倒回同一時點可重建同一狀態。

常見問題：只換掉所有緩動名稱，卻沒有修掉遮擋、跳位或看不懂的因果。

## 案例與依據

- [lists](https://suyungsheng-kh.github.io/one_minute/docs/lesson.html?id=lists)：由清單動作與開箱因果檢查動畫連續性。
- [hanoi-rules](https://suyungsheng-kh.github.io/one_minute/docs/lesson.html?id=hanoi-rules)：字幕、搬盤路徑與規則提示的配置。
- [boolean-or](https://suyungsheng-kh.github.io/one_minute/docs/lesson.html?id=boolean-or)：移動規則標籤，避免角色走進城門時遮擋文字。
- [boolean-not](https://suyungsheng-kh.github.io/one_minute/docs/lesson.html?id=boolean-not)：警報保持原狀，重新求值與倒回不改變示範語義。
- Scratch 動畫審查：`scratch/projects/scratch-list-adventure/review/ANIMATION-REVIEW.md`（完整動畫工作區相對路徑，非網站下載檔）。
- HyperFrames 時間契約：`../.agents/skills/hyperframes-core/SKILL.md`（完整動畫工作區相對路徑，非網站下載檔）。
- 河內塔第一集審查：`hanoi/projects/hanoi-rules/review/QA.md`（完整動畫工作區相對路徑，非網站下載檔）。
- 本次實際播放與跳段檢查：`one_minute/scratch/review/boolean-browser-release.json`（完整動畫工作區相對路徑，非網站下載檔）。
