window.ONE_MINUTE_CATALOG = {
  "title": "一分鐘認識",
  "description": "一分鐘，認識一個概念。從生活與遊戲例子開始，把好奇變成理解。",
  "startLesson": "variables",
  "recommendations": [
    {
      "lesson": "variables",
      "label": "第一次來，從這裡開始",
      "reason": "遊戲怎麼記住金幣？從一個會改變的數字開始。"
    },
    {
      "lesson": "algorithm-bread",
      "label": "從生活裡找答案",
      "reason": "從烤麵包出發，用三集認識演算法的特性、流程與用途。"
    },
    {
      "lesson": "bubble-sort",
      "label": "想看數字動起來",
      "reason": "用 30 秒，看相鄰的數字如何比較、交換。"
    }
  ],
  "paths": [
    {
      "id": "algorithms",
      "series": "algorithms",
      "title": "把生活變成清楚的步驟",
      "description": "三集依序認識五大特性、循序／選擇／重複，以及為什麼需要演算法。跟著小廚師，把早餐目標變成能執行、能檢查的方法。",
      "goal": "能用五大特性檢查步驟，選擇適合的基本流程，並說明清楚的方法如何幫助執行與修正。",
      "lessonIds": [
        "algorithm-bread",
        "algorithm-control-flow",
        "algorithm-why"
      ],
      "stepNotes": {
        "algorithm-bread": "第一集：認識演算法，用五大特性檢查步驟。",
        "algorithm-control-flow": "第二集：用循序、選擇與重複安排早餐任務。",
        "algorithm-why": "第三集：理解方法的用途，練習找出遺漏並修正。"
      },
      "reflection": "把準備早餐寫成清楚、做得到且會結束的步驟，標出循序、選擇與重複，再請別人照著演練，檢查是否漏了什麼。"
    },
    {
      "id": "scratch",
      "series": "scratch",
      "title": "讓遊戲記住事情，也會選擇動作",
      "description": "先用變數記住金幣，用清單整理背包，再用條件判斷能不能買藥水。",
      "goal": "能用變數與清單保存資料，再根據條件選擇下一個動作。",
      "lessonIds": [
        "variables",
        "lists",
        "conditions"
      ],
      "stepNotes": {
        "variables": "先讓遊戲記住一個會改變的值。",
        "lists": "接著把多個道具依序收進背包。",
        "conditions": "第三集：用「如果」與「否則」，決定能不能買藥水。"
      },
      "reflection": "藥水售價 5 枚，用「金幣 < 5」判斷時，3、7、5 枚各會走哪一條分支？"
    },
    {
      "id": "sorting",
      "series": "sorting",
      "title": "看看三種方法，怎麼把數字排好",
      "description": "依序觀察相鄰比較、找最小值與插入位置。同一組數字，也可以用不同方法整理。",
      "goal": "能分辨氣泡、選擇與插入排序各自最重要的動作。",
      "lessonIds": [
        "bubble-sort",
        "selection-sort",
        "insertion-sort"
      ],
      "stepNotes": {
        "bubble-sort": "先觀察相鄰比較與交換。",
        "selection-sort": "再看看先找最小值的做法。",
        "insertion-sort": "最後把新數字插進已排好的部分。"
      },
      "reflection": "哪一種方法會先找最小值？哪一種比較相鄰的數字？哪一種像整理手上的卡牌？"
    },
    {
      "id": "hanoi",
      "series": "hanoi",
      "title": "把大問題，交給同樣的方法",
      "description": "先學會河內塔的規則，觀察第四步。後兩集「遞迴的想法」與「步數爆炸」準備中。",
      "goal": "說出三條規則，看懂三個圓盤的七步搬法。",
      "lessonIds": [
        "hanoi-rules"
      ],
      "stepNotes": {
        "hanoi-rules": "第一集：先學會規則，觀察第四步為什麼能搬最大的圓盤。"
      },
      "reflection": "如果增加一個圓盤，你會先搬哪一個？哪些小圓盤需要先讓開？"
    }
  ],
  "series": [
    {
      "id": "algorithms",
      "title": "演算法",
      "subtitle": "跟著小廚師，用三集認識演算法的特性、流程與用途。",
      "color": "coral",
      "icon": "steps",
      "siteAnchor": "",
      "recommended": "algorithm-bread"
    },
    {
      "id": "scratch",
      "title": "Scratch",
      "subtitle": "從金幣、背包到森林商店，逐集認識變數、清單與條件判斷。",
      "color": "green",
      "icon": "code",
      "siteAnchor": "",
      "recommended": "variables",
      "site": "series/scratch/index.html"
    },
    {
      "id": "sorting",
      "title": "排序",
      "subtitle": "每支 30 秒實作，分別認識一種排序方法。",
      "color": "blue",
      "icon": "bars",
      "siteAnchor": "",
      "recommended": "bubble-sort",
      "site": "series/sorting/index.html"
    },
    {
      "id": "hanoi",
      "title": "河內塔",
      "subtitle": "三根柱子、幾個圓盤，認識遞迴的想法。",
      "color": "orange",
      "icon": "hanoi",
      "siteAnchor": "",
      "recommended": "hanoi-rules"
    }
  ],
  "lessons": [
    {
      "id": "algorithm-bread",
      "series": "algorithms",
      "title": "演算法是什麼？",
      "subtitle": "烤一片麵包，也能理解五大特性",
      "summary": "輸入、輸出、明確性、有限性、有效性，用早餐裡的步驟一次看懂。",
      "seconds": 60,
      "type": "概念解說",
      "tags": [
        "生活例子",
        "五大特性",
        "演算法"
      ],
      "question": "一份食譜只寫「烤到差不多就好」，缺少了哪一項特性？",
      "answer": "明確性。步驟要清楚，例如溫度與時間，才知道怎麼執行。",
      "challenge": "試著把刷牙寫成幾個明確、做得到，而且會結束的步驟。",
      "openingQuestion": "烤麵包的步驟，也算是演算法嗎？",
      "learningGoals": [
        "認識演算法的意思與用途",
        "分辨輸入、輸出、明確性、有限性與有效性"
      ],
      "keyTakeaway": "演算法是一套清楚、做得到，而且會結束的解決問題步驟。",
      "choices": [
        "明確性",
        "有限性",
        "輸出"
      ],
      "correctChoice": 0,
      "video": "media/algorithm-bread.mp4",
      "subtitleFile": "subtitles/algorithm-bread.zh-TW.srt",
      "poster": "posters/algorithm-bread.jpg"
    },
    {
      "id": "algorithm-control-flow",
      "series": "algorithms",
      "title": "循序、選擇、重複",
      "subtitle": "小廚師的三種指令",
      "summary": "照順序烤吐司、看條件選果醬、重複做三片早餐，認識安排步驟的三種基本流程。",
      "seconds": 60,
      "type": "概念解說",
      "tags": [
        "生活例子",
        "循序",
        "選擇",
        "重複",
        "演算法"
      ],
      "question": "「如果想吃甜的，就塗果醬；否則保留原味。」用了哪一種流程？",
      "answer": "選擇。先判斷是否想吃甜的，再走其中一條路，不是兩條路都做。",
      "challenge": "寫下準備三份早餐的步驟，標出哪裡依序做、哪裡看條件，以及哪一組動作重複三次後停止。",
      "openingQuestion": "早餐要照順序做，遇到不同口味或要做三份時，又該怎麼安排？",
      "learningGoals": [
        "分辨循序、選擇與重複的作用",
        "用條件與次數安排生活中的步驟"
      ],
      "keyTakeaway": "循序是依序做，選擇是看條件走其中一條路，重複是再做同一組動作，達到停止條件就結束。",
      "choices": [
        "循序：照順序把兩種口味都做一遍",
        "選擇：看條件決定其中一條路",
        "重複：一直塗果醬"
      ],
      "correctChoice": 1,
      "video": "media/algorithm-control-flow.mp4",
      "subtitleFile": "subtitles/algorithm-control-flow.zh-TW.srt",
      "poster": "posters/algorithm-control-flow.jpg"
    },
    {
      "id": "algorithm-why",
      "series": "algorithms",
      "title": "為什麼需要演算法？",
      "subtitle": "讓小廚師不再靠猜！",
      "summary": "把「做好早餐」的目標拆成可執行的方法，讓別人照著做、再次使用，也能逐步找出錯誤。",
      "seconds": 60,
      "type": "概念解說",
      "tags": [
        "生活例子",
        "目標與方法",
        "檢查修正",
        "演算法"
      ],
      "question": "照著方法做出的吐司沒有果醬，應該怎麼處理？",
      "answer": "逐步檢查，找出是否漏了塗果醬，補上後再測試。步驟寫清楚，仍要確認結果是否正確。",
      "challenge": "請同學照你寫的早餐步驟口頭演練，找出一個不清楚或遺漏的地方，修改後再試一次。",
      "openingQuestion": "只告訴機器人「做好吃的吐司」，它就知道該怎麼做嗎？",
      "learningGoals": [
        "分辨要達成的目標與實際執行的方法",
        "理解清楚步驟如何幫助執行、重用及檢查修正"
      ],
      "keyTakeaway": "目標說明要做什麼，演算法說清楚怎麼做；方法能交給別人執行、再次使用，也要測試是否正確。",
      "choices": [
        "只要步驟清楚，結果一定正確",
        "換一個人做就好，不用檢查方法",
        "逐步檢查、補上漏掉的步驟，再測試"
      ],
      "correctChoice": 2,
      "video": "media/algorithm-why.mp4",
      "subtitleFile": "subtitles/algorithm-why.zh-TW.srt",
      "poster": "posters/algorithm-why.jpg"
    },
    {
      "id": "variables",
      "series": "scratch",
      "title": "變數",
      "subtitle": "讓遊戲記住一個值",
      "summary": "金幣、分數、生命值：認識設定與增減，讓遊戲裡的數字跟著操作改變。",
      "seconds": 60,
      "type": "概念解說",
      "tags": [
        "金幣",
        "設定",
        "增減",
        "變數"
      ],
      "question": "金幣是 7，先「改變 3」，再「設為 2」，最後是多少？",
      "answer": "2。改變 3 會得到 10，但設為 2 會用 2 取代原本的值。",
      "challenge": "建立「生命值」，開始設為 100，碰到敵人時改變 -10。",
      "openingQuestion": "遊戲怎麼記住你有幾枚金幣？",
      "learningGoals": [
        "用變數記住一個值",
        "分辨「設為」與「改變」的效果"
      ],
      "keyTakeaway": "變數像有名字的盒子，記住一個值；「設為」取代它，「改變」在原本的值上增減。",
      "choices": [
        "10",
        "2",
        "12"
      ],
      "correctChoice": 1,
      "site": "series/scratch/index.html#variables",
      "video": "series/scratch/videos/scratch-variables.mp4",
      "subtitleFile": "subtitles/variables.zh-TW.srt",
      "poster": "posters/variables.jpg"
    },
    {
      "id": "lists",
      "series": "scratch",
      "title": "清單",
      "subtitle": "把多個道具排好、收好",
      "summary": "把清單想成勇者的背包，練習新增、刪除、替換，還有找出需要的道具。",
      "seconds": 60,
      "type": "概念解說",
      "tags": [
        "背包",
        "道具",
        "清單",
        "新增",
        "刪除"
      ],
      "question": "清單是「藥水、火把、繩子、鑰匙」。刪除第 2 項後，第 3 項是什麼？",
      "answer": "鑰匙。刪除火把後，後面的項目往前補位，清單長度變成 3。",
      "challenge": "建立一個背包清單，加入三件道具，再用「包含？」找其中一件。",
      "openingQuestion": "背包裡有好多件道具，要怎麼記住？",
      "learningGoals": [
        "用清單依序保存多個項目",
        "觀察刪除後的編號與長度變化"
      ],
      "keyTakeaway": "清單依序保存多個項目；刪除一項後，後面的項目往前補位。",
      "choices": [
        "繩子",
        "火把",
        "鑰匙"
      ],
      "correctChoice": 2,
      "site": "series/scratch/index.html#lists",
      "video": "series/scratch/videos/scratch-lists.mp4",
      "subtitleFile": "subtitles/lists.zh-TW.srt",
      "poster": "posters/lists.jpg"
    },
    {
      "id": "conditions",
      "series": "scratch",
      "title": "條件判斷",
      "subtitle": "讓遊戲選擇下一步",
      "summary": "金幣夠不夠買藥水？用「如果」與「否則」選擇動作，觀察 3 枚、7 枚和剛好 5 枚的結果。",
      "seconds": 60,
      "type": "概念解說",
      "tags": [
        "金幣",
        "條件",
        "如果",
        "否則",
        "商店"
      ],
      "openingQuestion": "藥水要 5 枚金幣，程式怎麼判斷勇者買不買得起？",
      "learningGoals": [
        "分辨條件的真與假",
        "看懂「如果」與「否則」如何選擇一條分支"
      ],
      "keyTakeaway": "先判斷條件，再選動作；同一次執行只走一條分支，下次執行才重新判斷。",
      "question": "金幣剛好是 5，「金幣 < 5」會走哪一邊？買完剩多少？",
      "answer": "走「否則」，買完剩 0 枚。5 沒有小於 5，所以條件是假，扣掉 5 枚並得到藥水。",
      "challenge": "建立金幣變數、背包清單與商店判斷。每次測試前清空背包，分別把金幣設為 3、7、5，觀察分支與結果。",
      "choices": [
        "走「如果」，維持 5 枚",
        "走「否則」，剩 0 枚",
        "先走「否則」，再回頭走「如果」"
      ],
      "correctChoice": 1,
      "site": "series/scratch/index.html#conditions",
      "video": "series/scratch/videos/scratch-conditions.mp4",
      "subtitleFile": "subtitles/conditions.zh-TW.srt",
      "poster": "posters/conditions.jpg"
    },
    {
      "id": "bubble-sort",
      "series": "sorting",
      "title": "氣泡排序",
      "subtitle": "相鄰比較，讓大數字慢慢往後走",
      "summary": "一次看旁邊的一對數字，順序不對就交換，觀察每一輪如何完成一個位置。",
      "seconds": 30,
      "type": "實作動畫",
      "tags": [
        "排序",
        "相鄰比較",
        "交換",
        "氣泡排序"
      ],
      "question": "數字 5 和 2 相鄰，要由小到大排列，需要交換嗎？",
      "answer": "需要。5 比 2 大，所以交換成 2、5。",
      "challenge": "試著用相鄰比較，把 3、1、2 排成由小到大。",
      "openingQuestion": "每次只看旁邊兩個數字，也能排好嗎？",
      "learningGoals": [
        "觀察相鄰比較與交換",
        "理解一輪結束後的大數字位置"
      ],
      "keyTakeaway": "氣泡排序比較相鄰數字，順序不對就交換，讓大數字逐步往後走。",
      "choices": [
        "需要交換，成為 2、5",
        "不用交換，維持 5、2",
        "直接刪掉 5"
      ],
      "correctChoice": 0,
      "site": "series/sorting/index.html#bubble",
      "video": "series/sorting/videos/bubble-sort.mp4",
      "poster": "posters/bubble-sort.jpg"
    },
    {
      "id": "selection-sort",
      "series": "sorting",
      "title": "選擇排序",
      "subtitle": "先找最小的，再放到前面",
      "summary": "在還沒排好的數字中找最小值，每一輪找完才交換，看看它和氣泡排序的差別。",
      "seconds": 30,
      "type": "實作動畫",
      "tags": [
        "排序",
        "最小值",
        "選擇排序"
      ],
      "question": "在 5、2、4、1、3 裡，第一輪應該選出哪個數字？",
      "answer": "1。先掃描全部還沒排好的數字，找到最小的 1，再放到最前面。",
      "challenge": "排好第一個位置後，看看剩下的數字中，下一輪會選誰。",
      "openingQuestion": "先找出最小的數字，會發生什麼事？",
      "learningGoals": [
        "從未排序的部分找最小值",
        "理解每輪選完再放到前方的做法"
      ],
      "keyTakeaway": "選擇排序先在未排序的部分找最小值，再放到這一輪的前方位置。",
      "choices": [
        "5",
        "2",
        "1"
      ],
      "correctChoice": 2,
      "site": "series/sorting/index.html#selection",
      "video": "series/sorting/videos/selection-sort.mp4",
      "poster": "posters/selection-sort.jpg"
    },
    {
      "id": "insertion-sort",
      "series": "sorting",
      "title": "插入排序",
      "subtitle": "取出一個數字，插進正確的位置",
      "summary": "像整理手上的卡牌，把新數字放進已排好的部分；較大的數字先往右挪出空位。",
      "seconds": 30,
      "type": "實作動畫",
      "tags": [
        "排序",
        "卡牌",
        "插入排序",
        "挪動"
      ],
      "question": "已排好 2、4，現在要插入 3，應該放在哪裡？",
      "answer": "放在 2 和 4 之間。先把 4 往右挪，再將 3 插進空位。",
      "challenge": "拿三張不同數字的卡牌，逐張加入已排好的部分。",
      "openingQuestion": "像整理卡牌一樣，數字能逐張放好嗎？",
      "learningGoals": [
        "分辨已排序與還沒加入的部分",
        "觀察挪動與插入的先後順序"
      ],
      "keyTakeaway": "插入排序取出下一個數字，挪開較大的數字，再插進已排好部分的適當位置。",
      "choices": [
        "放在 2 前面",
        "放在 2 和 4 之間",
        "放在 4 後面"
      ],
      "correctChoice": 1,
      "site": "series/sorting/index.html#insertion",
      "video": "series/sorting/videos/insertion-sort.mp4",
      "poster": "posters/insertion-sort.jpg"
    },
    {
      "id": "hanoi-rules",
      "series": "hanoi",
      "title": "河內塔怎麼玩？",
      "subtitle": "三條規則，七步搬完一座塔",
      "summary": "一次搬一個、只拿最上面、大的不壓小的，看三個圓盤怎麼搬到目標柱。",
      "seconds": 60,
      "type": "概念解說",
      "tags": [
        "河內塔",
        "規則",
        "圓盤"
      ],
      "status": "published",
      "openingQuestion": "你能把整座塔搬到另一根柱子嗎？",
      "learningGoals": [
        "說出河內塔的三條規則",
        "看懂三個圓盤的七步搬法，觀察第四步"
      ],
      "keyTakeaway": "一次搬一個、只拿最上面、大的不壓小的；三個圓盤要七步。",
      "question": "想把 4 號放在 2 號上面，違反哪一條規則？",
      "choices": [
        "一次只能搬一個",
        "只能拿最上面的",
        "大的不能壓在小的上面"
      ],
      "correctChoice": 2,
      "answer": "大的不能壓在小的上面。4 號比 2 號大，所以不能放上去。",
      "challenge": "用三枚大小不同的硬幣，在紙上畫三個位置，試著用七步搬完。",
      "video": "media/hanoi-rules.mp4",
      "subtitleFile": "subtitles/hanoi-rules.zh-TW.srt",
      "poster": "posters/hanoi-rules.jpg"
    },
    {
      "id": "hanoi-recursion",
      "series": "hanoi",
      "title": "遞迴的想法",
      "subtitle": "一疊＋最大的，拆到最小就停",
      "summary": "把上面的圓盤當成一疊，用同樣的三大步解決越來越小的問題。",
      "seconds": 60,
      "type": "概念解說",
      "tags": [
        "河內塔",
        "遞迴",
        "拆解問題",
        "停止條件"
      ],
      "status": "coming-soon",
      "openingQuestion": "四個圓盤，要怎麼想才不會亂？",
      "learningGoals": [
        "用一疊加最大的說明搬法",
        "說出遞迴在只剩一個時停下來"
      ],
      "keyTakeaway": "遞迴就是用同樣的方法解決更小的同一個問題，而且一定要有停下來的時候。",
      "question": "要搬五個圓盤，第一大步應該做什麼？",
      "choices": [
        "先搬最大的",
        "把上面四個當成一疊先搬開",
        "把五個一起搬到目標"
      ],
      "correctChoice": 1,
      "answer": "把上面四個當成一疊先搬開。最大的上面空了，才能搬到目標。",
      "challenge": "排隊時問前面的人自己排第幾，他再問更前面的人。這個方法在哪裡停下來？",
      "poster": "assets/mark.svg"
    },
    {
      "id": "hanoi-steps",
      "series": "hanoi",
      "title": "步數爆炸",
      "subtitle": "多一個圓盤，步數翻倍再加一",
      "summary": "從一、三、七、十五找出規律，再看六十四個圓盤要搬多久。",
      "seconds": 60,
      "type": "概念解說",
      "tags": [
        "河內塔",
        "步數",
        "規律",
        "效率"
      ],
      "status": "coming-soon",
      "openingQuestion": "圓盤越多，要搬幾步？",
      "learningGoals": [
        "說出翻倍再加一的規律",
        "理解方法正確不代表能在合理時間內完成"
      ],
      "keyTakeaway": "每多一個圓盤，步數翻倍再加一；方法對了，不代表做得完。",
      "question": "五個圓盤要搬幾步？",
      "choices": [
        "16",
        "25",
        "31"
      ],
      "correctChoice": 2,
      "answer": "31。四個要十五步，十五乘二再加一，就是三十一步。",
      "challenge": "八個圓盤要幾步？每秒搬一步要多久？答案：255步，4分15秒。",
      "poster": "assets/mark.svg"
    }
  ]
};
