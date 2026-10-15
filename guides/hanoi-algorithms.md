# 河內塔與演算法：從解題步驟到時間成本

本文件是目前課程與後續製作的教學說明，修正早期製作文件將「有效性」解釋為「合理時間內完成」的文字。這兩件事不同；舊參考稿中的該句不再作為教學依據。

## 四個問題，分開看

| 概念 | 要問什麼？ | 河內塔的例子 |
| --- | --- | --- |
| 有效性 | 每一步是否為能確實執行、在有限時間內完成的基本操作？ | 一次搬動一個圓盤是做得到的操作；不代表整座塔很快就能搬完。 |
| 有限性 | 對固定的有限輸入，整套方法是否在有限步數後結束？ | 三盤七步、四盤十五步；六十四盤的最少步數也有限，卻非常大。 |
| 效率 | 解題需要多少步、時間或其他資源？輸入增加時成本如何成長？ | 每多一盤，最少步數翻倍再加一；每一步很快，整體仍可能耗時極長。 |
| 正確性 | 是否遵守問題規則，並得到要求的結果？ | 全程遵守三條規則，最後把整座塔搬到目標柱。 |

「有效」不等於「高效」；「有限」不等於「很快」；「正確」也不保證時間成本可接受。河內塔的最少步數快速增加，是問題在既定規則下的限制，不能因此宣稱遞迴搬法錯誤，或一定存在另一個很快的合法搬法。

## 建議的單元銜接

不需程式基礎，也不把演算法路線設為強制先修。建議先看[演算法是什麼？](https://suyungsheng-kh.github.io/one_minute/docs/lesson.html?id=algorithm-bread)，再走[河內塔三部曲](https://suyungsheng-kh.github.io/one_minute/docs/path.html?id=hanoi)。

- [河內塔怎麼玩？](https://suyungsheng-kh.github.io/one_minute/docs/lesson.html?id=hanoi-rules)：規則限制合法動作，演算法則安排具體的搬動順序。連到[為什麼需要演算法？](https://suyungsheng-kh.github.io/one_minute/docs/lesson.html?id=algorithm-why)，比較目標與方法。
- [遞迴的想法](https://suyungsheng-kh.github.io/one_minute/docs/lesson.html?id=hanoi-recursion)：連到[循序、選擇、重複](https://suyungsheng-kh.github.io/one_minute/docs/lesson.html?id=algorithm-control-flow)。三大步有順序，只剩一盤時直接搬；遞迴的關鍵是用同樣方法處理更小問題，並持續縮小到停止情況，不能只說是「一直重複」。
- [步數爆炸](https://suyungsheng-kh.github.io/one_minute/docs/lesson.html?id=hanoi-steps)：回顧有效性、有限性，再談效率。原影片「方法對了，不代表做得完」應理解為可能無法在實際可接受的時間內完成，不是數學上永遠不會結束。

## 文件與網站維護

網站正文與相關單元連結由 `portal/content/catalog.json` 的 `connections` 管理；課程頁與觀看路線共用呈現方式。保留課程 id 與各系列原順序，跨單元連結另列，不改變觀看進度或將點擊連結算成看完。現有影片與成功音訊重用；本次修正是文件與網站導讀，未改配音、字幕或動畫。

## 定義參考

有效性與有限性的區分依據 [James Madison University 課程講義：Properties of an algorithm](https://users.cs.jmu.edu/adamses/Web/CS%20228%20%20Fall%202005/Properties%20of%20an%20algorithm.htm)；步數、時間與空間成本的區分參考 [University of Florida：Data Structures & Algorithms](https://cise.ufl.edu/~mssz/DatStrucAlg/Discr-Math.html)。上述河內塔例子是本系列依定義所作的教學應用。
