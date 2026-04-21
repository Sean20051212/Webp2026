// ── Step 1：取得最新照片清單（含 photo id）──
var imglist_Url =
  'https://api.flickr.com/services/rest/?' +
  'method=flickr.photos.getRecent' +
  '&api_key=ca370d51a054836007519a00ff4ce59e' +
  '&per_page=10' +
  '&format=json&nojsoncallback=1';

// ── Step 2：用 photo_id 取得該照片所有尺寸 ──
function getSizeUrl(photo_id) {
  return 'https://api.flickr.com/services/rest/?' +
    'method=flickr.photos.getSizes' +
    '&api_key=ca370d51a054836007519a00ff4ce59e' +
    '&photo_id=' + photo_id +
    '&format=json&nojsoncallback=1';
}

function getimg() {
  var status = document.getElementById('status');
  status.textContent = '載入照片清單中...';

  var xhr = new XMLHttpRequest();
  xhr.open('GET', imglist_Url, true);
  xhr.send();

  xhr.onload = function () {
    var data = JSON.parse(this.responseText);
    var photos = data.photos.photo; // 陣列，每個元素有 id、title

    status.textContent = '取得 ' + photos.length + ' 張照片，正在載入圖片...';

    var gal = document.getElementById('gallery');
    gal.innerHTML = ''; // 清空舊內容

    add_new_img(photos);
  };

  xhr.onerror = function () {
    var status = document.getElementById('status');
    status.textContent = '網路錯誤，請檢查連線';
  };
}

function add_new_img(dataset) {
  var gal = document.getElementById('gallery');
  var status = document.getElementById('status');

  // 對每張照片，用 id 再打 getSizes 取得實際圖片 URL
  dataset.forEach(function (photo) {
    var xhr2 = new XMLHttpRequest();
    xhr2.open('GET', getSizeUrl(photo.id), true);
    xhr2.send();

    xhr2.onload = function () {
      var sizeData = JSON.parse(this.responseText);
      var sizes = sizeData.sizes.size; // 各尺寸陣列

      // 優先取 "Small"（約 240px），找不到就用最後一個
      var target = sizes.find(function (s) {
        return s.label === 'Small';
      }) || sizes[sizes.length - 1];

      var img = document.createElement('img');
      img.setAttribute('src', target.source);
      img.setAttribute('alt', photo.title);
      gal.appendChild(img);
    };
  });

  status.textContent = '完成！';
}
