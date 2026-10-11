window.ONE_MINUTE_CATALOG = {
  "title": "一分鐘認識",
  "description": "一分鐘，認識一個概念。從生活與遊戲例子開始，把好奇變成理解。",
  "startLesson": "variables",
  "series": [
    {
      "id": "algorithms",
      "title": "演算法",
      "subtitle": "用烤麵包的生活例子，先認識「演算法」是什麼。",
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
      "video": "media/algorithm-bread.mp4",
      "subtitleFile": "subtitles/algorithm-bread.zh-TW.srt",
      "poster": "posters/algorithm-bread.jpg"
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
      "site": "series/sorting/index.html#insertion",
      "video": "series/sorting/videos/insertion-sort.mp4",
      "poster": "posters/insertion-sort.jpg"
    }
  ]
};
