window.ONE_MINUTE_PRODUCTION = {
  "title": "動畫製作技術",
  "subtitle": "把製作過程，也變成可複用的方法。",
  "description": "從各動畫系列的製作對話與實作紀錄，整理教學設計、時間軸、聲音、驗證與交付；每篇都有可複用提示詞。",
  "updated": "2026-10-24",
  "format": "技術文章與提示詞",
  "commonPrompt": "請先閱讀工作區與目標專案的 AGENTS.md、README、版本設定及既有審查紀錄，沿用已確認需求。區分規劃、已生成、已驗證與未完成；保留原素材及歷史輸出。只執行本次指定階段，不因有提示詞而自行消耗配音額度、渲染或發布。對已授權事項不要重複詢問。\n\n",
  "articles": [
    {
      "id": "brief-storyboard",
      "title": "把一個概念，拆成可製作的分鏡",
      "summary": "從教學目標、生活比喻到逐幕講稿；先把要懂的事說清楚，再決定畫面。",
      "tags": [
        "教學設計",
        "需求",
        "分鏡"
      ],
      "sections": [
        {
          "title": "先定義觀眾要懂的一件事",
          "body": [
            "一分鐘是聚焦的尺度，不是塞滿術語的理由。演算法第一集曾把效率比較與五大特性混在一起，後來聚焦成「清楚、做得到、會結束」的步驟概念；效率留給其他課程。",
            "提問只補缺少的資料：核心目標、先備知識、情境、風格、片長、聲音、字幕與素材。已有確認的選擇繼續沿用。"
          ]
        },
        {
          "title": "把畫面、動作和講稿放在同一張表",
          "body": [
            "分鏡至少寫出規劃秒數、教學意圖、物件的前後狀態、畫面重點字及完整旁白。標示哪些數字是實際示範、哪些是計算結果。",
            "先提供具體可審查的製作單，再依當次授權進入製作。歷史對話曾逐集確認新講稿；這不表示每次修小字或再次預覽都要重新確認。"
          ],
          "code": "BRIEF.md       核心目標、受眾、範圍、風格\nSTORYBOARD.md  時間、畫面、動作、旁白\nSCRIPT.md      要讀出的完整講稿\nSOURCES.md     素材來源與使用條件"
        },
        {
          "title": "把設計決定留下來",
          "body": [
            "同系列的角色、場景、色彩、聲音與術語寫入文件，後續集數才可重用。演算法延續黏土廚房，Scratch 延續紙雕 RPG，排序與搜尋延續深藍圖表。這些是案例選擇，不是所有主題都要套同一種動畫風格。"
          ]
        }
      ],
      "steps": [
        "先寫一句學習目標與不包含的內容",
        "提出一個能解釋概念的生活或遊戲情境",
        "逐幕填好畫面、狀態、旁白與暫定時間",
        "按當次授權確認製作範圍，保存為製作文件"
      ],
      "prompt": "這次只做需求與分鏡，主題為【主題】，看完要理解【單一目標】。\n專案位置：【專案路徑】。已確定：【既有選擇】；還沒確定：【待選項】。\n以生活或遊戲例子說明，先提供風格選項與逐幕表：規劃時間、教學目的、物件前後狀態、畫面文字及完整繁中旁白。\n明確標記示意、縮時及計算結果。檢查容易混淆的術語與既有單元關聯。\n本次先不生成媒體或正式影片；交付 BRIEF、STORYBOARD、SCRIPT 與待決問題。",
      "acceptance": [
        "能用一句話說出本集目標",
        "分鏡的每個動作都有教學用途",
        "講稿與畫面沒有互相矛盾",
        "規劃秒數明確標示為暫定"
      ],
      "cases": [
        {
          "lesson": "algorithm-bread",
          "reason": "從五大特性的內容修正，看聚焦教學目標。"
        },
        {
          "lesson": "conditions",
          "reason": "用森林商店把變數、清單與條件串成情境。"
        }
      ],
      "sources": [
        {
          "label": "系列共用工作流",
          "path": "workflows/一分鐘認識系列.md"
        },
        {
          "label": "演算法第一集分鏡",
          "path": "algorithms/projects/algorithm-bread/STORYBOARD.md"
        },
        {
          "label": "Scratch 條件判斷分鏡",
          "path": "scratch/projects/scratch-conditions-adventure/STORYBOARD.md"
        }
      ],
      "pitfall": "把一分鐘當作硬性字數配額，或尚未釐清概念就先生成大量素材。",
      "related": [
        "project-environment"
      ]
    },
    {
      "id": "project-environment",
      "title": "把製作環境，變成可接續的專案",
      "summary": "分清技能、CLI、專案與生成器；保留版本，換電腦或換對話也能接著做。",
      "tags": [
        "環境",
        "版本",
        "可重建"
      ],
      "sections": [
        {
          "title": "技能與製作工具是不同層",
          "body": [
            "技能提供代理工作方法；HyperFrames CLI 負責檢查、預覽與輸出。既有 Remotion 專案也不需要因為換代理就重建。本系列現行主要路線是 HTML、CSS、GSAP 與 HyperFrames。",
            "本系列使用 Node.js、FFmpeg／FFprobe 和瀏覽器。先讀 package.json 與專案 README，使用固定版本的 npm scripts，不把歷史範例當成最新版本。"
          ],
          "code": "node --version\nnpm --version\nffmpeg -version\nffprobe -version"
        },
        {
          "title": "資料夾保存的不只是影片",
          "body": [
            "每一集保存原始碼、素材、成功音訊、分鏡、字幕、審查紀錄及各版本輸出。現有路徑為 one_minute/<系列>/projects/<專案>；共用工具與網站分開管理。",
            "搜尋專案固定 HyperFrames 0.8.166；其他歷史專案有 0.8.156、0.8.160 等版本。這些是已交付案例，不是「所有專案必須升到同一版本」的要求。"
          ]
        },
        {
          "title": "先找正式生成器，再決定是否重建",
          "body": [
            "部分 build 或 setup 腳本會重建 HTML、分鏡或素材清單。不能只改生成後的 HTML，之後又執行生成器把修正覆蓋。",
            "新建專案先走 HyperFrames 工作流；維護舊專案則先閱讀本集 README、AGENTS、版本設定及 review。要搬移或替換完整目錄時，先留可還原備份與檔案雜湊。"
          ],
          "code": "# 在目標專案資料夾，先讀懂 scripts 的作用\nnpm run\n# 確定本專案 check 是驗證命令後再執行\nnpm run check"
        }
      ],
      "steps": [
        "盤點現有目錄、套件版本與正式輸出",
        "讀取生成器與腳本的作用，不執行會覆寫的 setup",
        "將素材、成功音訊及來源紀錄留在專案內",
        "記錄如何預覽、驗證與輸出新版本"
      ],
      "prompt": "請先盤點【專案路徑】的製作環境，這次只做唯讀檢查。\n列出 package.json 的腳本用途、固定 CLI 版本、正式生成器、素材／字幕／成功音訊位置，以及目前正式交付版本。\n檢查 Node、FFmpeg、FFprobe 是否可用；不要重裝、升級、重跑 setup 或改寫素材。\n將「必須安裝」「已有可重用」「尚未確認」分開列出，提供接續工作建議與缺項；不要輸出 .env 或任何金鑰。",
      "acceptance": [
        "可指出正式專案與正式生成器",
        "能分清技能安裝與專案初始化",
        "保留每集固定版本與原有輸出",
        "沒有將私人設定或金鑰寫進說明"
      ],
      "cases": [
        {
          "lesson": "search-linear",
          "reason": "固定版本與 build／verify 分工的案例。"
        },
        {
          "lesson": "selection-sort",
          "reason": "30 秒原版與 narrated-v1 分開保存。"
        }
      ],
      "sources": [
        {
          "label": "整體製作手冊",
          "path": "README.md"
        },
        {
          "label": "搜尋第一集設定",
          "path": "search/projects/search-linear/package.json"
        },
        {
          "label": "排序配音版驗證",
          "path": "sorting/review/NARRATED-QA.md"
        }
      ],
      "pitfall": "看到舊檔就全部升級，或把初始化腳本當成每次預覽的必要步驟。",
      "related": [
        "brief-storyboard",
        "trace-animation"
      ]
    },
    {
      "id": "trace-animation",
      "title": "讓動畫跟著資料走，而不是靠畫面猜",
      "summary": "先產生動作追蹤，再把比較、交換、搬盤與搜尋範圍對到時間軸。",
      "tags": [
        "trace",
        "狀態",
        "教學驗證"
      ],
      "sections": [
        {
          "title": "追蹤紀錄是動作與統計的共同依據",
          "body": [
            "排序先記錄比較、交換、右移與插入；河內塔先生成合法單盤搬法；搜尋記錄候選範圍、比較值與結果。畫面、音效、計數與網頁提示都從同一份狀態轉換取得。",
            "例如 5、2、4、1、3：氣泡比較 10 次／交換 7 次；選擇比較 10 次／交換 3 次；插入比較 9 次／右移 7 次／插入 4 次。這是本組資料的案例，不是通用效率排名。"
          ]
        },
        {
          "title": "先驗證規則，再安排動作",
          "body": [
            "每一步要能重播與檢查：數字沒有遺失或增加、比較條件成立、搬的都是頂盤且大盤不壓小盤。二分搜尋則要維持已排序前提與正確候選區間。",
            "搜尋第二集依序比較 8、12、10、11，共 4 次；16 筆最多 5 次。這次示範與最差上限不同，不能混用。"
          ],
          "code": "事件範例（示意結構，依專案 schema 調整）：\n{ t: 12.5, action: \"compare\", indices: [0, 1],\n  before: [5, 2, 4, 1, 3], after: [5, 2, 4, 1, 3] }\n{ t: 13.2, action: \"swap\", indices: [0, 1],\n  before: [5, 2, 4, 1, 3], after: [2, 5, 4, 1, 3] }"
        },
        {
          "title": "可快轉，也要能說清楚沒有跳過什麼",
          "body": [
            "快轉縮短停留時間，追蹤事件仍完整存在。河內塔第三集實際展示 1／3／7／15 步四組搬法，共 26 次動作；大盤數另以計算呈現，不假裝全部搬完。",
            "大數用 BigInt 等合適型別；標註最少搬動步數、最多比較次數，以及是否計入事先排序。不同操作不能直接當成同一種成本。"
          ]
        },
        {
          "title": "布林邏輯：先把真假組合列完整",
          "body": [
            "布林邏輯三集把輸入狀態、各條件的真／假、合成結果與動作分開。且與或各列四種輸入組合；非固定原判斷「警報已啟動？」並列兩種真假。兩個都真也符合或，非運算則不會改變警報本身。",
            "每個示範是一個獨立情境。換情境先重設角色、門與狀態，再重新求值；不要把前一關的能量門檻加到下一關的密碼規則。最後才用（有鑰匙 或 知道密碼）且 非（警報已啟動）驗證八種組合，其中三種可以通過。"
          ]
        },
        {
          "title": "迴圈：把檢查、輪數與本體指令分開",
          "body": [
            "固定次數示範先定義一輪的範圍：前進加收星共兩個指令，整組做四輪，本體指令共八次。統計不包含迴圈控制與迴圈外指令。",
            "重複直到示範每輪先檢查，不成立才前進；三個獨立情境前進 3／1／0 次，條件檢查分別為 4／2／1 次。最後一次成立的檢查不再執行本體。起初已成立時直接離開，再執行外面的下一個指令。",
            "動畫使用同一份事件時間表驅動角色位置、檢查結果與計數，並驗證倒回後狀態相同。視覺碰到寶箱的時刻也必須與條件為真一致，不能只靠文字宣告已碰到。",
            "示範停不下來時，有限影片只能展示前幾步，必須標明教學暫停，不能讓片段結束看起來像程式自然停止。每輪前進與扣能量分開：缺少更新時能量維持3；補上減1後到零，下一次檢查成立才離開。更新後用「待再檢查」取代過時真假結果，避免與目前數值矛盾。"
          ]
        }
      ],
      "steps": [
        "定義初始資料、規則與計數單位",
        "產生與畫面分離的操作紀錄",
        "獨立重播每個事件，核對結果和不變量",
        "把動作、音效與提示掛到事件時間，再檢查倒回"
      ],
      "prompt": "請為【專案路徑】的【演算法或操作】建立可重播的 animation-trace。\n資料為【初始資料】，規則為【規則】，需要計數【比較／交換／右移／搬動等】。\n先產生事件的 before／after、動作與順序，獨立驗證資料守恆、操作是否合法及最後結果。\n再把事件對到畫面、計數、音效與提示；快轉仍保留所有必要操作。\n明確區分本例次數、最好／最差上限、實際示範與計算結果。這次先完成 trace 與驗證，不重新配音或輸出 MP4。\n若是條件或布林邏輯動畫，列完整真假組合，固定原判斷，分開記錄輸入狀態、判斷結果與動作。驗證或包含兩者皆真、非不改變原狀態；每個獨立示範重新設置狀態。\n若是迴圈動畫，分開記錄條件檢查、本體動作與完成輪數；重複直到需覆蓋起初成立的零次案例。驗證每輪先檢查、最後成立時不再做本體，以及離開後的下一個指令。\n示範不停止的迴圈時，標明只展示有限步與教學暫停；驗證狀態是否朝停止條件改變。更新後尚未重算的條件不要冒充目前結果，並區分刻意持續執行與不符合任務的錯誤。",
      "acceptance": [
        "事件能逐步重播且符合規則",
        "同一份資料驅動畫面與計數",
        "示範次數與上下限分開",
        "可指出哪些動作縮時、哪些只作計算",
        "條件動畫涵蓋全部真假組合，運算不會偷偷改變輸入狀態。",
        "迴圈檢查、本體動作與輪數各自計數；零次案例、畫面接觸與成立結果一致。",
        "不停止案例有有限展示標示；更新後到重新檢查之間不顯示過時結果為目前判斷。"
      ],
      "cases": [
        {
          "lesson": "insertion-sort",
          "reason": "右移與交換分開計數的實作。"
        },
        {
          "lesson": "hanoi-steps",
          "reason": "實際四組搬法與大數計算分開。"
        },
        {
          "lesson": "search-binary",
          "reason": "閉區間與比較順序都有驗證。"
        },
        {
          "lesson": "boolean-or",
          "reason": "四種組合完整列出，特別驗證兩個都真也可以。"
        },
        {
          "lesson": "boolean-not",
          "reason": "反轉一個判斷，警報狀態保持不變。"
        },
        {
          "lesson": "loop-repeat",
          "reason": "兩個本體指令做四輪，輪數與指令次數分開。"
        },
        {
          "lesson": "loop-until",
          "reason": "3／1／0 次前進與 4／2／1 次檢查，並驗證倒回。"
        },
        {
          "lesson": "loop-energy",
          "reason": "缺少能量更新與修正後三輪對照，教學暫停不冒充程式終止。"
        }
      ],
      "sources": [
        {
          "label": "河內塔第三集審查",
          "path": "hanoi/projects/hanoi-steps/review/QA.md"
        },
        {
          "label": "搜尋驗證程式",
          "path": "search/projects/search-binary/verify.mjs"
        },
        {
          "label": "排序驗證紀錄",
          "path": "sorting/review/NARRATED-QA.md"
        },
        {
          "label": "布林邏輯示範與驗證",
          "path": "one_minute/scratch/projects/scratch-boolean-or/scenes.json"
        },
        {
          "label": "組合條件八種狀態",
          "path": "one_minute/scratch/projects/scratch-boolean-not/combined-challenge.json"
        },
        {
          "label": "迴圈狀態與正式成片審查",
          "path": "one_minute/scratch/projects/scratch-loop-until/review/QA.md"
        },
        {
          "label": "停止條件更新與語音對時",
          "path": "one_minute/scratch/projects/scratch-loop-energy/review/QA.md"
        }
      ],
      "pitfall": "只檢查最後排好了，卻沒有驗證過程；或把顯示的數字直接寫死成「正確統計」。",
      "related": [
        "project-environment",
        "voice-caption"
      ]
    },
    {
      "id": "voice-caption",
      "title": "先量到聲音，再安排字幕與畫面",
      "summary": "凍結成功旁白，用真實長度及詞組時間對齊；同時保留用量與審音界線。",
      "tags": [
        "旁白",
        "字幕",
        "用量"
      ],
      "sections": [
        {
          "title": "保留自然語速與完整句尾",
          "body": [
            "先分段確認講稿，再取得成功音訊的實際時長。畫面與字幕依實際語音安排，不按字數平均切割，也不為湊 60 秒加速或裁掉詞尾。",
            "字幕應逐字對應核准旁白；同音轉寫、數字形式與辨識差異留在 audit。ASR 提供時間與差異線索，不能當成百分之百正確的聽審結果。",
            "數數比操作動畫快時，可在已確認沒有語音的句間加入停頓，保留原音與原速；重新生成逐字時間戳、字幕與畫面事件。迴圈第三集在兩個數數間隙加入1.6秒與1.3秒，讓前進、扣能量、再檢查可辨識；這是本例對時，不是固定通用節拍。"
          ]
        },
        {
          "title": "成功音訊是可重用資產",
          "body": [
            "語音換聲會影響整體一致性，也會改變長度。現行系列正式版本以 Azure 台灣男聲「雲哲」為主；早期 James Gao 與原 30 秒排序版保留為歷史版本。續作優先重用已成功的原音，核對文字與音檔雜湊。"
          ]
        },
        {
          "title": "所有 Azure 呼叫走共用管控",
          "body": [
            "本工作區的本機政策是 400,000 計費字元提醒、450,000 停止、單次最多 3,000，並套用 31 天累計。首次與換月要核對實際用量，不能把未知當作零。",
            "只經 tools/azure-speech/index.mjs 或 synthesizeAzure；失敗仍保留預留、不自動重試。外部用量須補登。本機帳本不是 Azure 帳號全域硬限額，也不承諾免費方案永久條件。"
          ],
          "code": "# 在 animation 工作區根目錄：只查看本機用量\nnode tools/azure-speech/index.mjs status\n# 只預估；路徑請換成自己的檔案，不會生成配音\nnode tools/azure-speech/index.mjs synthesize --project one_minute/<系列>/projects/<專案> --input <純文字講稿路徑> --output <新音檔路徑> --dry-run"
        },
        {
          "title": "音樂與音效要幫助理解",
          "body": [
            "旁白優先，配樂在說話時降低；操作音效跟 trace 的比較、交換或完成事件同步。用波形或相關係數核對音軌與位置，只能證明這些項目，不能宣稱已完成真人逐字聽審。"
          ]
        }
      ],
      "steps": [
        "確認講稿、聲音與當次授權",
        "先重用已成功的音訊，必要生成走共用用量入口",
        "量測每段實長，對齊詞組、字幕及畫面",
        "檢查字幕完整、無重疊、句尾及混音峰值"
      ],
      "prompt": "請處理【專案路徑】的旁白與繁體字幕。先核對 SCRIPT、既有成功音訊、字幕與用量紀錄。\n本次模式：【只檢查／重用音訊重新對時／已授權的新配音】。\n聲音沿用【已確認聲線】，不自行換聲；重用成功音檔，不以試聽反覆生成。\n如需 Azure，先讀 tools/azure-speech/README.md，僅用共用 guard；未知用量先停止生成，不自動重試。\n依實際音訊及詞組時間安排字幕與畫面，保留自然速度和完整句尾。字幕逐字接回核准稿，保留 ASR 差異。\n交付音檔／字幕對照、最後語音結尾時間、實際做過的檢查及尚待聽審事項；不輸出金鑰或帳本私密內容。\n若計數語句快於操作，先核對無語音間隙，再加入必要停頓並重算字幕與動作，不用加速或重配掩蓋對時問題。",
      "acceptance": [
        "成功音訊能核對雜湊與文字版本",
        "字幕連接後對應核准稿且不重疊",
        "音訊結尾在影片範圍內，沒有裁句",
        "用量與 ASR／人工聽審限制如實記錄",
        "若插入停頓，確認不切斷語音，並同步更新字幕與動作事件。"
      ],
      "cases": [
        {
          "lesson": "variables",
          "reason": "前後版本換聲後重新對時的案例。"
        },
        {
          "lesson": "lists",
          "reason": "字幕與旁白不一致，未必是 60 秒截字。"
        },
        {
          "lesson": "loop-energy",
          "reason": "保留原速，以句間停頓對齊三次能量更新。"
        }
      ],
      "sources": [
        {
          "label": "共用 Azure 管控",
          "path": "../tools/azure-speech/README.md"
        },
        {
          "label": "Scratch 雲哲版審查",
          "path": "scratch/projects/scratch-list-adventure/review/yunjhe-v1/QA.md"
        },
        {
          "label": "排序配音版審查",
          "path": "sorting/review/NARRATED-QA.md"
        }
      ],
      "pitfall": "把字幕改寫造成的差異誤判成漏讀，或把 ASR／波形檢查說成人工逐字聽審。",
      "related": [
        "trace-animation",
        "motion-review"
      ]
    },
    {
      "id": "motion-review",
      "title": "把動畫審查，變成製作原則",
      "summary": "緩動、物件連續性、文字層級與閱讀時間，一開始就納入設計。",
      "tags": [
        "動作",
        "GSAP",
        "可跳轉"
      ],
      "sections": [
        {
          "title": "動作要有因果，文字要有閱讀時間",
          "body": [
            "Scratch 清單的修正包含刪除後補位、替換道具、找到鑰匙再開箱等連續動作。每個動作都要讓觀眾看得懂因果，而不是只做出裝飾性的彈跳。",
            "進場常用明確的 ease-out，移動依物理目的選曲線；線性適合等速掃描等情境，不是所有 linear 都應刪除。不要把早期「移除回彈」個案變成所有影片永遠不能回彈的規則。"
          ]
        },
        {
          "title": "時間軸必須能停、跳、倒回",
          "body": [
            "每個 composition 註冊單一 paused timeline，對應 composition id。狀態依時間決定，避免靠播放過的次數、未固定亂數或執行當下時間。",
            "HyperFrames 管理 clip 的顯示與媒體時間；動畫放在內層物件。主組件與子組件結構、時間單位、音軌 id 及本機素材依現用版本的 core 技能檢查。"
          ],
          "code": "// GSAP 局部動作示意；在既有 composition 的時間軸內使用\nconst tl = gsap.timeline({ paused: true });\ntl.fromTo(\"#scene-title\",\n  { y: 24, opacity: 0 },\n  { y: 0, opacity: 1, duration: .45, ease: \"power3.out\" }, .2);\nwindow.__timelines = window.__timelines || {};\nwindow.__timelines[\"scene\"] = tl;"
        },
        {
          "title": "視覺審查跟教學審查一起做",
          "body": [
            "字幕區與圖表、提示、統計分開；標題、正文和註解要有層級。對照場景開始、動作中、完成、轉場前後及字幕較長的時刻。",
            "自動檢查有零錯誤，不等於全片每格都已看過。先清 lint 錯誤，再確認 runtime、layout 與對比確實有執行及足夠樣本；把未修建議與有意裁切分別記錄。"
          ]
        },
        {
          "title": "文字靜止時清楚，不代表角色經過時仍可讀",
          "body": [
            "布林邏輯第二、三集首次實際瀏覽器檢查發現：城門下方的規則文字會被走動角色遮住，背景顏色也使對比不足。將文字移至城門上方的固定淺色區，再重新檢查各時間點，保留原有配音與動作時序。",
            "畫面檢查要包含角色穿越、開門、狀態重置與倒回。只在開場截圖，容易漏掉動作中才出現的遮擋。預覽播放、隨機跳段後回到同一時間點，也要得到相同物件狀態。"
          ]
        }
      ],
      "steps": [
        "列出影響理解的問題並排優先度",
        "先修物件連續性與概念因果",
        "再修緩動、留白、文字層級與停留",
        "往前與倒回抽樣，確認同一時間得到同一狀態"
      ],
      "prompt": "請審查【專案路徑】的現有動畫，先以教學理解與物件連續性排序問題，再看緩動、層級、對比與閱讀時間。\n逐幕列「問題、時間點、原因、修正方式、驗證狀態」。\n進場依目的選 ease-out 或自訂曲線；等速動作可保留 linear，不為展示效果添加無關回彈。\n確認 paused timeline、固定狀態、媒體時間與字幕區安全。測試前進、倒回及場景邊界。\n只修本次指定問題，保留原素材和成功音訊；先提供修正版預覽與實際驗證紀錄，是否正式渲染依既有授權。\n加入角色跨過文字區、開門、狀態重置等動態時點，檢查遮擋與對比；將時間軸先往後再倒回同一時間，比對物件狀態與音訊位置。",
      "acceptance": [
        "問題有具體時間點與處理結果",
        "物件不憑空改名或跳位",
        "字幕和重點文字有閱讀空間",
        "同一時間的前進／倒回狀態一致",
        "角色移動與重置時文字仍可讀，倒回同一時點可重建同一狀態。"
      ],
      "cases": [
        {
          "lesson": "lists",
          "reason": "由清單動作與開箱因果檢查動畫連續性。"
        },
        {
          "lesson": "hanoi-rules",
          "reason": "字幕、搬盤路徑與規則提示的配置。"
        },
        {
          "lesson": "boolean-or",
          "reason": "移動規則標籤，避免角色走進城門時遮擋文字。"
        },
        {
          "lesson": "boolean-not",
          "reason": "警報保持原狀，重新求值與倒回不改變示範語義。"
        }
      ],
      "sources": [
        {
          "label": "Scratch 動畫審查",
          "path": "scratch/projects/scratch-list-adventure/review/ANIMATION-REVIEW.md"
        },
        {
          "label": "HyperFrames 時間契約",
          "path": "../.agents/skills/hyperframes-core/SKILL.md"
        },
        {
          "label": "河內塔第一集審查",
          "path": "hanoi/projects/hanoi-rules/review/QA.md"
        },
        {
          "label": "本次實際播放與跳段檢查",
          "path": "one_minute/scratch/review/boolean-browser-release.json"
        }
      ],
      "pitfall": "只換掉所有緩動名稱，卻沒有修掉遮擋、跳位或看不懂的因果。",
      "related": [
        "voice-caption",
        "render-validation"
      ]
    },
    {
      "id": "render-validation",
      "title": "預覽正常之後，還要驗證真正的 MP4",
      "summary": "把專案檢查、數據驗證、實際成片檢查分開，留下可追溯證據。",
      "tags": [
        "MP4",
        "FFmpeg",
        "驗收"
      ],
      "sections": [
        {
          "title": "三個層次，回答不同問題",
          "body": [
            "專案 check 檢查語法、素材、執行與版面；verify.mjs 等程式驗證步驟、數字、字幕與雜湊；最後還要檢查真正輸出的 MP4。不能只因瀏覽器預覽正常，就宣稱成片影音正確。"
          ]
        },
        {
          "title": "先讀版本，再輸出新檔名",
          "body": [
            "使用專案自己的 npm scripts。渲染已確認版本時，不額外重跑會改寫來源的 setup；新輸出用新版本檔名，保留已交付 MP4、字幕與成功音訊。"
          ],
          "code": "# 在已確認的專案資料夾，使用其固定版本 scripts\nnpm run check\nnpm run render -- --output renders/<專案>-v2.mp4\n# 下列範例的檔名需換成剛生成的新版本\nffprobe -v error -show_format -show_streams -of json renders/<專案>-v2.mp4\nffmpeg -v error -i renders/<專案>-v2.mp4 -f null -"
        },
        {
          "title": "讓 QA 有具體範圍與證據",
          "body": [
            "確認實際片長、解析度、影格率與音軌，完整解碼，抽取真實成片的關鍵畫面。語音開始位置、最後一句結尾、峰值與字幕時間都要核對。",
            "河內塔第三集將 26 次實際搬動與大盤數計算分開驗證；搜尋第三集獨立驗算 100／7、1000／10 等比較數。波形相關係數只證明音訊比對範圍，不能替代發音聽審。",
            "交付紀錄寫清楚問題、修正、重查結果與尚存限制；不要直接複製上一版「全部通過」。"
          ]
        }
      ],
      "steps": [
        "保留來源、版本及正式素材基線",
        "先做專案與數據檢查",
        "按授權渲染成新版本檔案",
        "解碼、抽圖、核對影音字幕，再保存 QA 與雜湊"
      ],
      "prompt": "【專案路徑】的目前版本已確認，請依現有授權輸出【新版本檔名】。\n先核對固定 CLI 版本、既有 scripts 與正式來源；保留舊成片及成功音訊，不重跑初始化。\n執行專案檢查與本集數據驗證，再渲染新 MP4。\n對真正成片檢查片長、尺寸、影格率、音軌、完整解碼與關鍵畫面；核對每段旁白位置、完整句尾、字幕對應及峰值。\n交付本次實際執行的檢查、修正紀錄、雜湊與限制；未做人工聽審就明說。",
      "acceptance": [
        "正式輸出檔案可以完整解碼",
        "數字與 trace／字幕一致",
        "關鍵畫面取自真正 MP4",
        "本次 QA 與上一版紀錄分開保存"
      ],
      "cases": [
        {
          "lesson": "hanoi-steps",
          "reason": "成片抽圖、字幕與大數驗算。"
        },
        {
          "lesson": "search-race",
          "reason": "用獨立程式驗算比較次數與旁白版本。"
        }
      ],
      "sources": [
        {
          "label": "河內塔第三集 QA",
          "path": "hanoi/projects/hanoi-steps/review/QA.md"
        },
        {
          "label": "搜尋第三集驗證",
          "path": "search/projects/search-race/verify.mjs"
        },
        {
          "label": "排序完整交付 QA",
          "path": "sorting/review/NARRATED-QA.md"
        }
      ],
      "pitfall": "把「沒有報錯」寫成「所有發音都正確」，或用 HTML 截圖代替真正 MP4 的畫面驗收。",
      "related": [
        "motion-review",
        "publish-brand"
      ]
    },
    {
      "id": "publish-brand",
      "title": "從一支影片，到可維護的教材網站",
      "summary": "正式版本、課程目錄、路線、封面、相關單元與離線包一起交付。",
      "tags": [
        "網站",
        "GitHub",
        "品牌"
      ],
      "sections": [
        {
          "title": "製作來源與公開交付分開",
          "body": [
            "完整動畫專案保存在各系列 projects；網站目錄集中在 portal/content/catalog.json，正式素材依 release.json 選定。沿用穩定課程 id，保留影片版本與舊分享連結。",
            "新增或改版要同步首頁、課程頁、觀看路線及有意義的既有單元關聯。發布到 GitHub Pages，不能只改一個影片連結就宣稱整站更新。"
          ]
        },
        {
          "title": "共同品牌可以是生成規格",
          "body": [
            "網站有共用模板、Logo、色彩、用語與播放工具。十五集品牌封面由 coverDesign 與 brand-covers.cjs 生成，與播放器的原畫面 poster 分開。新集數延續同一版型，避免每次重做一套圖。",
            "技術文章也是同一品牌的延伸：明確標示為文章與提示詞，不把尚未製作的內容冒充新動畫，也不虛增動畫集數。"
          ]
        },
        {
          "title": "產製完成後，檢查公開版本",
          "body": [
            "本機完成 build、check、package；匯出網站與獨立維護來源，確認遠端新變更後正常推送。再核對 Pages 的新目錄、素材、課程與下載。",
            "離線包保留相對路徑，逐檔核對影片、字幕、封面與文件。觀看紀錄只存在讀者瀏覽器，不因相關單元跳轉而重設。"
          ],
          "code": "# 在 one_minute/portal 執行\nnpm run build\nnpm run check\nnpm run package\n# 從 animation 工作區匯出（需先備妥指定 GitHub checkout）\nnode one_minute/portal/tools/export-github.cjs\n# 提交／推送與正式網址依目標專案 AGENTS 及本次授權"
        },
        {
          "title": "影片完成與可上架，是兩個要分開核對的狀態",
          "body": [
            "布林邏輯三集交接時已具有成功配音、字幕與 HTML 預覽，文件仍明確標示正式 MP4 尚未完成。接手先核對檔案與本次檢查，再在既有授權內補做正式輸出，不能把預覽包當作成片上架。",
            "動畫專案保留在原本的 Scratch 製作目錄，公開網站則使用獨立的布林邏輯系列與觀看路線。公開分類不需要為了資料夾位置而綁在一起；正式版本清單記錄實際來源，避免多份來源各自修改。"
          ]
        }
      ],
      "steps": [
        "選定 release 的正式影片、字幕與實際片長",
        "更新課程、路線、封面與雙向關聯",
        "建置後檢查網站與離線包",
        "依授權匯出、正常推送，核對線上內容"
      ],
      "prompt": "請將【已確認的影片版本】整合至【網站來源位置】。\n沿用原課程 id 與觀看進度，依 release 設定更新影片、字幕、片長、封面、練習及相關單元。\n同步首頁、課程頁、觀看路線與概念關聯圖；檢查有意義的反向連結及舊網址。\n品牌封面沿用共同生成規格，不修改原始動畫或歷史輸出。\n完成本次 build、check、離線打包與檔案核對。是否提交、推送與發布依【本次授權／既有 AGENTS 規則】；若已授權就完成並確認線上版本。\n交接時分別確認成功音訊、HTML 預覽、正式 MP4 與公開發布狀態；公開系列分類可獨立於原始專案所在資料夾，但正式版本清單與素材路徑必須一致。",
      "acceptance": [
        "正式素材、課程與路線是同一版本",
        "舊 id、舊網址與觀看紀錄可延續",
        "離線包內容與建置一致",
        "推送後有公開網址的實際驗證"
      ],
      "cases": [
        {
          "lesson": "conditions",
          "reason": "影片、課程與路線一起整合。"
        },
        {
          "lesson": "search-race",
          "reason": "新集數與既有單元關聯同步交付。"
        },
        {
          "lesson": "boolean-and",
          "reason": "先完成正式成片，再以獨立的布林邏輯系列整合課程。"
        }
      ],
      "sources": [
        {
          "label": "網站維護規則",
          "path": "portal/AGENTS.md"
        },
        {
          "label": "品牌與封面規格",
          "path": "portal/content/brand-guide.md"
        },
        {
          "label": "網站產製工具",
          "path": "portal/tools/build.cjs"
        },
        {
          "label": "布林邏輯系列正式交付與關聯",
          "path": "one_minute/scratch/BOOLEAN-LOGIC.md"
        }
      ],
      "pitfall": "把 Git push 成功當作 Pages 已完成部署，或只更新首頁卻留下舊路線與字幕。",
      "related": [
        "render-validation",
        "prompts-to-skill"
      ]
    },
    {
      "id": "prompts-to-skill",
      "title": "把成功流程，封裝成提示詞與 skill",
      "summary": "提示詞描述這次要做什麼；skill 保存可重用方法、來源與操作界線。",
      "tags": [
        "提示詞",
        "skill",
        "複用"
      ],
      "sections": [
        {
          "title": "先拆階段，再組合成完整工作流",
          "body": [
            "本系列提供八組提示詞，分別處理需求、環境、trace、配音字幕、動作審查、成片驗證、網站交付及流程封裝。每組先交代專案、當次模式、授權範圍與驗收，不要求代理重演所有歷史步驟。",
            "把可替換內容寫成【主題】【專案路徑】【指定階段】；把成功案例、工具版本與已知限制放在參考資料。公開文章不包含原始對話、私人帳本、金鑰或登入資訊。"
          ]
        },
        {
          "title": "skill 保留決策，不只是一段很長的提示詞",
          "body": [
            "one-minute-production 的 SKILL.md 只保留適用範圍、階段判斷、必要規則與參考入口。較長的技術說明與提示詞在 references；唯讀盤點工具在 scripts。",
            "下載的 skill 能放到自己的技能目錄；在不同電腦上使用時先檢查工具、素材授權與用量入口，不能假設本工作區帳本已存在，也不能複製舊帳本冒充目前用量。"
          ],
          "code": "使用 $one-minute-production。\n專案：【完整專案路徑】\n本次只做：【需求／製作／檢查／預覽／輸出／網站整合】\n沿用已確認內容：【已知選擇】\n希望取得：【具體交付】\n外部生成與發布授權：【實際範圍】"
        },
        {
          "title": "複用成功方法，也保留失敗的界線",
          "body": [
            "早期 edge-tts 曾查得到聲音清單，但實際生成回覆 403；這只證明該次環境測試失敗，不等於所有聲音都不可用。舊 HeyGen 額度與平台費率也不能當成現在的可用量。",
            "使用 skill 不等於授權付費 API、任意升級或上線。既有明確授權繼續有效；新方案、新資料或額度未知時，先完成不依賴它的工作，清楚列出需要補足的條件。"
          ]
        }
      ],
      "steps": [
        "選擇一個反覆出現的真實任務",
        "抽出輸入、決策、驗收與操作界線",
        "將較長案例與語法放進 references",
        "驗證技能格式與唯讀工具，再用實際需求試用"
      ],
      "prompt": "請把【已完成的製作流程／專案紀錄】整理成可重複使用的 skill。\n先區分現行規則、歷史案例與未驗證想法，保留可追溯的來源。\nSKILL.md 僅放必要決策與操作界線；長篇技術、提示詞與案例移到 references，確實可重複的機械工作才做 scripts。\n描述清楚適用與不適用情境，沿用使用者已授權範圍，不把單次偏好或過往問題變成普遍禁令。\n驗證前言、引用與腳本行為；試用不得生成真實配音或發布。交付可安裝資料夾、使用範例、驗證結果與限制。",
      "acceptance": [
        "提示詞可以替換變數直接使用",
        "skill 的觸發範圍明確",
        "參考檔案與腳本都存在且可驗證",
        "不把 skill 當成外部操作的授權"
      ],
      "cases": [
        {
          "lesson": "algorithm-bread",
          "reason": "從需求與審查累積出系列工作流。"
        },
        {
          "lesson": "lists",
          "reason": "將動畫審查與字幕差異轉為可複用方法。"
        }
      ],
      "sources": [
        {
          "label": "共用工作流",
          "path": "workflows/一分鐘認識系列.md"
        },
        {
          "label": "網站品牌規格",
          "path": "portal/content/brand-guide.md"
        },
        {
          "label": "本次來源稽核（本機）",
          "path": "production/review/source-audit.json"
        }
      ],
      "pitfall": "把整段聊天原封不動貼進 skill，連過期設定、登入資訊與臨時解法一起永久化。",
      "related": [
        "publish-brand"
      ]
    }
  ],
  "officialSources": [
    {
      "title": "HyperFrames 官方專案與需求",
      "url": "https://github.com/heygen-com/hyperframes"
    },
    {
      "title": "HyperFrames composition 時間契約",
      "url": "https://github.com/heygen-com/hyperframes/blob/main/packages/core/docs/core.md"
    },
    {
      "title": "Azure 文字轉語音與計費字元",
      "url": "https://learn.microsoft.com/en-us/azure/ai-services/speech-service/text-to-speech"
    }
  ],
  "workflowPrompts": [
    {
      "id": "new-series",
      "title": "新增系列｜從動畫製作到網站上架",
      "summary": "一次串起動畫製作、共同品牌、網站整合、技術經驗、提示詞與 skill 更新，檢查後推送 GitHub。",
      "steps": [
        "填入主題、英文代號、集數、概念及 animation 工作區的絕對路徑。",
        "下方範本包含完整製作與 GitHub 發布授權；若只要規畫、預覽或暫不發布，先修改任務範圍與最後的授權段落。",
        "複製到新對話。先確認可使用 $one-minute-production；尚未安裝時，從本頁下載 skill ZIP 並依使用說明安裝。"
      ],
      "prompt": "請使用 `$one-minute-production` skill，為「一分鐘認識」新增教學動畫系列，完成製作、網站整合與發布。\n\n系列主題：【主題名稱】\n系列英文代號：【資料夾名稱】\n預計集數：【集數】\n希望涵蓋的概念或情境：【簡述；未指定部分請提出建議】\n工作區：【animation 工作區絕對路徑】\n\n請先閱讀工作區、one_minute、所屬系列及 portal 的 AGENTS.md、品牌規範與製作工作流，確認現有專案和工具，再於 one_minute 正式位置製作。\n\n請完成以下工作：\n\n1. 動畫製作：每集約一分鐘、聚焦一個核心概念，使用繁體中文，以適合國中生理解的生活或遊戲情境說明。完成分集規畫、分鏡、講稿、動畫、配音、字幕、實際影片檢查與交付文件。配音遵守共用 Azure 用量管控，重用成功音訊；保留原始專案與歷史輸出。\n\n2. 品牌一致：沿用「原版的活潑構圖＋新版的品牌配色」：霧白、墨綠為主，藍黃輔色，搭配圓形襯底、白紙卡、星芒、手繪箭頭及圓角標籤。網站、封面、技術文章與提示詞庫共用既有模板；影片依共同品牌與教學情境設計。署名維持「一分鐘認識」，主軸為「一分鐘，認識一個概念」。\n\n3. 網站整合：同步更新首頁推薦、課程目錄、觀看路線、課程頁與品牌封面；檢查概念關聯圖是否需要擴充。整理與既有單元的合理關聯，補入文件、課程頁及觀看路線，加入相關課程連結，必要時補反向連結。保留既有網址與觀看紀錄，維持「首頁 → 觀看路線 → 課程頁」動線。\n\n4. 技術經驗整理：將本次可重複使用的製作方法、問題與修正、適用條件及實際驗證結果，整理進技術文章、提示詞庫與 one-minute-production skill，並同步技能參考檔、案例及下載內容。正文維護唯一來源，區分已驗證方法與待驗證想法；沒有新經驗時記錄原因，不重複堆疊文章。\n\n5. 檢查與發布：完成動畫內容、聲畫字幕對時、素材引用、影片播放與跳轉、課程導航、搜尋篩選、觀看進度、手機、鍵盤、提示詞複製、下載及離線檢查。依規範完成建置與打包，修正問題後再發布。\n\n本次授權完成上述製作、整合及正常推送至 https://github.com/suyungsheng-kh/one_minute 的 main。推送前確認並妥善合併遠端更新，不強制推送，不上傳憑證、私人帳本、備份或動畫原始製作專案。確認 GitHub Pages 已更新後，提供正式系列入口、各集連結、檢查結果與提交紀錄。正式網站固定使用 https://suyungsheng-kh.github.io/one_minute/。",
      "download": "downloads/prompts/new-series.md"
    }
  ],
  "downloads": {
    "handbook": "downloads/production-handbook.md",
    "prompts": "downloads/production-prompts.md",
    "skill": "downloads/one-minute-production-skill.zip",
    "usage": "downloads/production-usage.md"
  }
};
