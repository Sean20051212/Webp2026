// ── 工具函式：產生 n 個隨機 a-z 字母 ──────────────────────
function randomChars(n) {
  var result = "";
  for (var i = 0; i < n; i++) {
    // Math.random() 產生 0~1 的小數
    // * 26 變成 0~25，Math.floor 取整數
    // + 97 對應到 ASCII：97=a, 98=b ... 122=z
    var code = Math.floor(Math.random() * 26) + 97;
    result += String.fromCharCode(code);
  }
  return result;
}

// ── add_new_chars：在 container 後面亂數加 1~3 個字母 ──────
function add_new_chars() {
  var container = document.getElementById("container");
  // Math.floor(Math.random() * 3) + 1 → 產生 1, 2, 或 3
  var n = Math.floor(Math.random() * 3) + 1;
  container.innerHTML += randomChars(n);
}

// ── window.onload：網頁載入完成後自動執行 ──────────────────
window.onload = function () {
  var container = document.getElementById("container");

  // 步驟1：先亂數產生 0~2 個字母（0=沒有也可以）
  var n = Math.floor(Math.random() * 3); // 0, 1, 或 2
  container.innerHTML = randomChars(n);

  // 步驟2：監聽整個視窗的鍵盤放開事件
  window.addEventListener("keyup", function (e) {
    console.log("你按了：", e.key);

    // 只處理單一字母（長度為 1 的按鍵，排除 Enter、Shift 等）
    if (e.key.length === 1) {
      var text = container.innerHTML;

      // 步驟3：檢查你按的字和最前面那個字是否一樣
      if (text.length > 0 && e.key === text[0]) {
        // 一樣！把第一個字元切掉（從第1個字開始取到結尾）
        container.innerHTML = text.slice(1);
      }

      // 步驟4：不管有沒有消掉，都在後面加 1~3 個新字母
      add_new_chars();
    }
  });
};
