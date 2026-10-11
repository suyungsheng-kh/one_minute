# 一分鐘認識｜排序小教室

給國中生的排序教學頁面：氣泡排序、選擇排序、插入排序。內容類型：實作動畫；三支影片各 30 秒，保留實際片長。
每一節先讀白話說明，再看 30 秒有聲動畫，最後用比較表與小練習複習。

## 在電腦上觀看

用瀏覽器開啟 `index.html`。三支有聲影片放在專案內的 `videos` 資料夾，網頁會直接讀取它們，離線也能播放。請保留整個資料夾結構。

## 專案內容

```text
sorting-lesson/
├── index.html
├── videos/
│   ├── bubble-sort.mp4
│   ├── selection-sort.mp4
│   └── insertion-sort.mp4
├── preview.jpg
├── README.md
└── .nojekyll
```

## 上傳到 GitHub Pages

1. 解壓縮 `sorting-lesson.zip`。
2. 將 `sorting-lesson` 裡的全部檔案與 `videos` 子資料夾一起上傳到儲存庫根目錄，讓 `index.html` 位於最外層。不要只上傳 HTML。
3. 到 **Settings → Pages**，選 **Deploy from a branch**。
4. 選擇 **main** 與 **/(root)**，按 **Save**。
5. 等發布完成後，從 Pages 設定頁開啟網站並分享網址。

首頁檔案是 `index.html`；`preview.jpg` 是頁面預覽；`.nojekyll` 可讓 GitHub Pages 直接發布這些檔案。

## 正式來源與更新

完整排序系列在 animation/one_minute/sorting；本資料夾為 `site`，原始動畫在 `../projects`，網站工具在 `../site-source`，交付 ZIP 在 `../exports`。

後續新增、修改、預覽及輸出都使用新位置。工具依 release.json 選定正式影片；網站提示由動畫原始 trace 產製，請先更新原始專案再重新 build、check、package。網站內的 MP4 是交付副本，動畫正式來源仍在 projects。

![教學頁面預覽](preview.jpg)
