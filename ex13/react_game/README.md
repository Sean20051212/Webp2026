# ex#13: OX 遊戲實作 (React Class)

Web Programming Spring 2026 - 第 13 次作業

使用 React Class Components 實作 OX(井字)遊戲,包含時光旅行(history)功能。

## 元件結構

- **Game** (`class`) - 最上層元件,管理 `history`、`stepNumber`、`xIsNext` 狀態
- **Board** (`class`) - 棋盤元件,負責 render 9 個 Square
- **Square** (`function`) - 單一格子元件,接收 props 顯示 X / O

## 功能

- 玩家輪流下 X / O
- 即時偵測勝利條件 (8 種連線組合)
- 顯示下一位玩家
- 步驟歷史紀錄,可跳回任意一步 (Time Travel)

## 啟動方式

```bash
npm install
npm start
```

預設會在 http://localhost:3000 開啟。

## 建置

```bash
npm run build
```
