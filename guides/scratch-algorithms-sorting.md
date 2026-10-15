# 從 Scratch 基本概念，走到演算法與排序

變數和清單保存資料，條件判斷決定動作；演算法把這些工具安排成解題步驟。排序是具體的演算法應用。Scratch 是實作它們的一種方式，排序不限定只能用 Scratch 或清單。

## 各自負責什麼？

| 概念 | 遊戲裡的例子 | 排序裡的用途 |
| --- | --- | --- |
| 變數 | 記住金幣、生命值等目前的值 | 記目前位置、最小值的位置、交換前的暫存值或待插入的值。 |
| 清單 | 依序保存背包裡的多個道具 | 保存整串待排序數字，依項目編號讀取或更新。 |
| 條件判斷 | 金幣是否足夠？決定買或不買 | 比較大小，決定交換、更新最小值紀錄、右移或停止。 |
| 演算法 | 把買藥水或整理背包的步驟寫清楚 | 安排讀取、比較、更新、重複與停止，完成指定順序。 |

清單「第 2 項」的編號是 2，裡面的值卻可能是 5。變數可以保存其中任一種資料，命名時要分清楚位置和值。Scratch 的數字項目編號從 1 開始；讀取前確認編號在有效範圍內。

## 三種排序，怎麼用到它們？

| 方法 | 清單與變數 | 條件及流程 |
| --- | --- | --- |
| 氣泡排序 | 清單保存數字，變數記目前位置；交換前暫存其中一項。 | 由小到大時，相鄰左值大於右值才交換；再重複處理其他相鄰項目。 |
| 選擇排序 | 記住目前最小值的位置，掃描尚未排好的部分。 | 遇到更小值先更新位置，整輪找完才決定交換；不是每比較一次就交換。 |
| 插入排序 | 先保存待插入的值，讓已排好部分中較大的數字右移。 | 每次判斷是否繼續右移，找到位置或到達最前面時放回保存的值。 |

「選擇排序」的選擇是挑最小值；「選擇流程」是依條件決定動作。兩者相關，卻不是同一個概念。條件要在每次需要時重新判斷；同一次「如果／否則」只執行其中一條分支，不代表整段程式永遠只有一次判斷。

## 一個小例子

清單先放入 `3、1、2`。只看氣泡排序的第一對：因為 3 大於 1，所以先用暫存變數記住 3，把第 1 項換成 1，再把第 2 項換成暫存的 3，得到 `1、3、2`。這只完成一次比較與交換，還沒有排完整串。

插入排序若已排好 `1、3`，現在要插入 2，先保存 2，再讓 3 右移，最後把 2 放在中間，得到 `1、2、3`。中途右移可能覆寫原位置，保存的值能避免資料遺失；不要把畫面的「挪出空位」直接理解成必須刪掉清單項目。

## 容易混淆的地方

- 清單有順序，並不代表已依大小排序。排序完成後應保留原本所有項目與數量，也保留重複值；排序不是刪除重複資料。
- Scratch 的「替換第幾項」可更新指定位置而不改變項目數；刪除會使後面的編號改變。使用刪除或插入積木實作時，必須另外處理位置與資料完整性，不能隨意代替交換或右移。
- 比較、交換、右移與插入是不同動作。影片的次數只適用該組數字及實作，不以交換較少或不同動作次數，直接宣稱某種方法永遠最快。
- 有效性、有限性與效率仍分開看，定義及河內塔例子見[河內塔與演算法](https://suyungsheng-kh.github.io/one_minute/docs/lesson.html?id=hanoi-steps)。

## 建議觀看與相關單元

可先看[演算法是什麼？](https://suyungsheng-kh.github.io/one_minute/docs/lesson.html?id=algorithm-bread)，再看[循序、選擇、重複](https://suyungsheng-kh.github.io/one_minute/docs/lesson.html?id=algorithm-control-flow)和[為什麼需要演算法？](https://suyungsheng-kh.github.io/one_minute/docs/lesson.html?id=algorithm-why)。也可直接從熟悉的遊戲例子開始，沒有強制先修。

1. [變數](https://suyungsheng-kh.github.io/one_minute/docs/lesson.html?id=variables) → [清單](https://suyungsheng-kh.github.io/one_minute/docs/lesson.html?id=lists) → [條件判斷](https://suyungsheng-kh.github.io/one_minute/docs/lesson.html?id=conditions)：建立保存資料和選擇動作的概念。
2. [氣泡排序](https://suyungsheng-kh.github.io/one_minute/docs/lesson.html?id=bubble-sort) → [選擇排序](https://suyungsheng-kh.github.io/one_minute/docs/lesson.html?id=selection-sort) → [插入排序](https://suyungsheng-kh.github.io/one_minute/docs/lesson.html?id=insertion-sort)：看同一組資料如何用不同方法整理。
3. 從[Scratch 路線](https://suyungsheng-kh.github.io/one_minute/docs/path.html?id=scratch)、[排序路線](https://suyungsheng-kh.github.io/one_minute/docs/path.html?id=sorting)或[演算法路線](https://suyungsheng-kh.github.io/one_minute/docs/path.html?id=algorithms)跨單元閱讀；既有河內塔延伸與各系列原順序保留。

## 維護與依據

網站導讀與連結統一在 `portal/content/catalog.json` 的 `connections` 維護。更新相關單元時一併核對說明與目標；不因點擊相關連結而標示看完，也不重設觀看進度。本次只補文件與網站導讀，重用已完成影片、字幕及音訊。

概念依據：[Scratch Foundation：Variables and Lists](https://www.scratchfoundation.org/learn/learning-library/variables-lists)、[Conditional Statements](https://www.scratchfoundation.org/learn/learning-library/conditional-statements)；排序方法參考 [Princeton：Elementary Sorts](https://algs4.cs.princeton.edu/21elementary/)，並與本系列既有排序示範對照。文中的遊戲到排序對照是本系列的教學安排，不是來源文件原有的課程序列。
