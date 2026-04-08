// 計數器：記住現在有幾個按鈕了
var count = 1;

// ✅ addfunction：按下「Add it」就執行這個函式
function addfunction() {
  // 第一步：用魔法變出一個新按鈕（但還沒放進網頁）
  var btn = document.createElement("BUTTON");

  // 第二步：幫按鈕貼上標籤文字，例如 "CLICK ME (1)"
  btn.innerHTML = `CLICK ME (${count})`;

  // 第三步：幫按鈕取一個獨一無二的名字，例如 "btn_1"、"btn_2"
  //         count++ 的意思是：用完之後數字 +1（先用再加）
  btn.setAttribute("id", "btn_" + count++);

  // 第四步：幫按鈕加上 Bootstrap 樣式讓它變紅色
  btn.setAttribute("class", "btn btn-outline-danger");

  // 第五步：把按鈕放進網頁的 body 裡（這樣才看得到！）
  document.body.appendChild(btn);
}

// ❌ delfunction：按下「Del it」就執行這個函式
function delfunction() {
  // --count 的意思是：先把數字 -1，再拿來用
  // 這樣就能找到「最後一個加進去的按鈕」的名字
  var btn = document.getElementById("btn_" + --count);

  // 印出來看看找到了哪個按鈕（在瀏覽器 Console 可以看到）
  console.log(btn);

  // 如果找到了，就把它從網頁裡刪掉
  if (btn) {
    document.body.removeChild(btn);
  }
}
