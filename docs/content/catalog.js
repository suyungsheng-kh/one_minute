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
      "title": "讓遊戲記住一件事，或很多件事",
      "description": "先用變數記住金幣，再用清單整理背包。從一個值走向多個項目。",
      "goal": "能依遊戲需要，選擇用變數記住一個值，或用清單保存多個項目。",
      "lessonIds": [
        "variables",
        "lists"
      ],
      "stepNotes": {
        "variables": "先讓遊戲記住一個會改變的值。",
        "lists": "接著把多個道具依序收進背包。"
      },
      "reflection": "生命值與背包道具，各適合用哪一種方式記住？試著說出理由。"
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
      "subtitle": "從遊戲裡的金幣與背包，逐集認識變數、清單。",
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
    }
  ]
};
