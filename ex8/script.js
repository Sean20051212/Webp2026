// ── 1. API 網址：政府提供的觀光展覽開放資料 ────────────────
var openUrl =
  "https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6";

// ── 2. 用 XMLHttpRequest 打電話給 API ──────────────────────
var xhr = new XMLHttpRequest();  // 建立「打電話的工具」
xhr.open('GET', openUrl, true);  // 指定：用 GET 方式、打給 openUrl、非同步(true)
xhr.send();                      // 把電話真正打出去！

// ── 3. 等電話接通後，處理回傳的資料 ───────────────────────
xhr.onreadystatechange = function () {
  // readyState == 4：對方講完了（資料全部傳完）
  // status == 200：電話有接通（伺服器回應成功）
  if (this.readyState == 4 && this.status == 200) {
    // 把收到的文字（字串）翻譯成 JS 陣列
    dataset = JSON.parse(this.responseText);
    // 把資料填進表格
    addNewData(dataset);
  }
};

// ── 4. addNewData：把每一筆展覽資料加進表格 ────────────────
function addNewData(dataset) {
  var myTable = document.getElementById("csie");

  // dataset 是一個陣列，forEach 會一筆一筆處理
  dataset.forEach(function (data, index) {
    // insertRow(-1)：在表格「最後面」插入一個新的列（row）
    var row = myTable.insertRow(-1);

    // insertCell(0)：在這列的第0格填入展覽名稱
    row.insertCell(0).innerHTML = data['title'];

    // insertCell(1)：在第1格填入地點
    // showInfo 是陣列，[0] 取第一筆展場資訊，['location'] 取地點
    row.insertCell(1).innerHTML = data['showInfo'][0]['location'];

    // insertCell(2)：在第2格填入票價
    row.insertCell(2).innerHTML = data['showInfo'][0]['price'];
  });
}

// ── 5. delOldData：刪除表格裡所有的資料列（保留標題列）────
function delOldData() {
  var myTable = document.getElementById("csie");

  // 表格的 rows.length 是總列數（含標題列）
  // 我們從最後一列往前刪，留下第 0 列（標題）不動
  // 為什麼從後面刪？因為刪掉一列後 index 會跑掉，從後面刪比較安全
  while (myTable.rows.length > 1) {
    myTable.deleteRow(myTable.rows.length - 1);
  }
}
