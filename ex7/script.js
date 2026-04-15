// 先抓到 container 這個 div
var container = document.getElementById('container');

// ── 網頁載入完成時，先放 3 個亂數字母進去 ──────────────────
window.onload = function () {
  // add_new_chars(3) → b 預設 true → 亂數產生 1~3 個字母
  container.textContent = add_new_chars(3);
};

// ── add_new_chars(x, b)：產生隨機字母的工廠函式 ────────────
// x：最多幾個字母（或固定幾個）
// b：true = 亂數決定數量(1~x)；false = 固定產生 x 個
function add_new_chars(x, b = true) {
  var n = x; // 預設就用 x 個

  if (b) {
    // b 是 true 的話，數量要亂數：1 到 x 之間隨機選一個
    n = Math.floor(Math.random() * x) + 1;
  }

  // 用迴圈產生 n 個隨機 a-z 字母
  var str = '';
  for (let i = 0; i < n; i++) {
    // 97 = 'a' 的 ASCII 碼，加上 0~25 的亂數就是 a~z
    str += String.fromCharCode(97 + Math.floor(Math.random() * 26));
  }
  return str;
}

// ── 連續打錯次數的計數器 ────────────────────────────────────
var counter = 0;

// ── 監聽鍵盤放開事件 ─────────────────────────────────────────
window.addEventListener("keyup", function (e) {
  // 取出 container 裡的第一個字母（用 substring(0,1) 切出來）
  var firstone = container.textContent.substring(0, 1);

  if (e.key == firstone) {
    // ✅ 打對了！把第一個字母刪掉
    // substring(1, length) = 從第1個位置切到最後 = 去掉第一個
    container.textContent = container.textContent.substring(1, container.textContent.length);
    counter = 0; // 打對了，連續打錯次數歸零

  } else {
    // ❌ 打錯了！把你按的字母加在後面（懲罰之一）
    container.textContent += e.key;

    // counter++ 先用再加，所以：
    // 第1次錯：counter=0，0>=2？No → counter變1
    // 第2次錯：counter=1，1>=2？No → counter變2
    // 第3次錯：counter=2，2>=2？Yes！觸發懲罰
    if (counter++ >= 2) {
      // 懲罰：額外加 6 個字母（b=false 代表固定6個，不亂數）
      container.textContent += add_new_chars(6, false);
      counter = 0; // 懲罰結束，計數器歸零，重新計算
    }
  }

  // 不管打對打錯，每次按鍵後都在後面加 1~3 個新亂數字母
  container.textContent += add_new_chars(3);
});
