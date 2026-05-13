# React DataGrid (HW#5)

用 MUI DataGrid 改寫 hw#4 的 table,並用 `useEffect` 呼叫文化部展覽 API 來更新 DataGrid 的資料。

## 功能

- **DataGrid**:取代 hw#4 的 HTML `<table>`
- **useEffect**:元件 mount 時呼叫 API 並 `setRows`
- **內建分頁**:DataGrid 自帶上一頁/下一頁/目前第幾頁/總共幾頁,可選 5/10/25/50 筆
- **名稱搜尋**:輸入關鍵字即時過濾(對應 hw#4 的 onchange 搜尋)
- **欄位**:名稱 / 地點 / 票價

## API 來源

```
https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6
```

對應 JSON 欄位:
- `title` → 名稱
- `showInfo[0].location` → 地點
- `showInfo[0].price` → 票價

## Tech Stack

- React 18
- @mui/material v5.15.15
- @mui/x-data-grid v7

## Getting Started

```bash
npm install
npm start
```

開啟 [http://localhost:3000](http://localhost:3000)。
