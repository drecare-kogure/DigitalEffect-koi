const tileTitleList = ["サステナビリティ", "事業領域", "MISSION"];
const tileTextList = [
  "PET樹脂生産のLCA<br>・衣料品のリサイクル<br>・ペットボトルの<br>　リサイクル<br><span class='mainTile__annotation'>※LCA<br>(ライフサイクルアセスメント)</span>",
  "・商用プラント事業<br>・技術ライセンス事業<br>・アパレル事業<br>・ボトル事業",
  "あらゆるものを<br>循環させる<br>We circulate<br> our world"
]

let currentIndex = 0; // 現在のメッセージのインデックスを管理
let intervalId; // setIntervalのIDを保存する変数

// changeText関数の呼び出し
function startInterval() {
  intervalId = window.setInterval(changeText, 5000); // 5秒ごとに変更（フェードアウト時間を考慮）
}

function stopInterval() {
  clearInterval(intervalId); // setIntervalを停止
}

function changeText() {
  // mainTile__title と mainTile__text は1つずつなので、querySelectorを使用
  const mainTile__title = document.querySelector(".mainTile__title");
  const mainTile__text = document.querySelector(".mainTile__text");

  // mainTile__title と mainTile__text は1つなので、ここで直接操作
  mainTile__title.classList.add("fade-out");
  mainTile__text.classList.add("fade-out");

  // subTile__title は複数存在するので、getElementsByClassName を使用
  const subTile__titles = document.getElementsByClassName("subTile__title");

  // すべての subTile__title 要素を一旦フェードアウトさせる
  for (let i = 0; i < subTile__titles.length; i++) {
    const subTile__title = subTile__titles[i];

    // subTile__title のみにフェードアウトのクラスを追加
    subTile__title.classList.add("fade-out");
  }

  // 少し待ってからテキストを更新してフェードイン
  setTimeout(() => {
    // mvTitles配列からtitleとtextを取得して設定
    const currentTitle = tileTitleList[currentIndex % tileTitleList.length];
    const currentText = tileTextList[currentIndex % tileTextList.length];

    mainTile__title.innerText = "ー" + currentTitle + "ー";
    mainTile__text.innerHTML = currentText;

    // フェードインのクラスを削除
    mainTile__title.classList.remove("fade-out");
    mainTile__text.classList.remove("fade-out");

    // 各要素のテキストを更新
    for (let i = 0; i < subTile__titles.length; i++) {
      const currentSubTitle = tileTitleList[(currentIndex + i + 1) % tileTitleList.length];
      const subTile__title = subTile__titles[i];
      subTile__title.innerText = currentSubTitle;
      subTile__title.classList.remove("fade-out");
    }

    // インデックスを進める
    currentIndex++;

    // インデックスがメッセージの長さを超えたら、リセットしてループ
    if (currentIndex >= tileTitleList.length) {
      currentIndex = 0;
    }
  }, 1500); // 1.5秒後にテキストを更新（フェードアウト後の遅延）
}

// .mainTile 要素に対してホバーイベントを設定
const mainTileElement = document.querySelector(".mainTile");

// ホバー時にインターバルを停止
mainTileElement.addEventListener("mouseenter", () => {
  stopInterval();
});

// ホバーを外した時にインターバルを再開
mainTileElement.addEventListener("mouseleave", () => {
  startInterval();
});

// ページがロードされた時にインターバルを開始
startInterval();

