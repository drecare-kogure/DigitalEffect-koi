const tileTitleList = ["事業領域", "サステナビリティ", "MISSION"];
const tileTextList = [
  "・商用プラント事業<br>・技術ライセンス事業<br>・アパレル事業<br>・ボトル事業",
  "PET樹脂生産のLCA<br>・衣料品のリサイクル<br>・ペットボトルの<br>　リサイクル<br><span class='mainTile__annotation'>※LCA<br>(ライフサイクルアセスメント)</span>",
  "あらゆるものを<br>循環させる<br>We circulate<br> our world",
];
const tileImageList = [
  "assets/img/mv_tile-icon_graph.png",
  "assets/img/mv_tile-icon_recycle.png",
  "assets/img/mv_tile-icon_mission.png",
];
const tileMiniImageList = [
  "assets/img/mv_mini-tile-icon_graph.png",
  "assets/img/mv_mini-tile-icon_recycle.png",
  "assets/img/mv_mini-tile-icon_mission.png",
];

let currentIndex = 0; // 現在のメッセージのインデックスを管理
let intervalId; // setIntervalのIDを保存する変数

// changeTile関数の呼び出し
function startInterval() {
  intervalId = window.setInterval(changeTile, 5000); // 5秒ごとに変更（フェードアウト時間を考慮）
}

function stopInterval() {
  clearInterval(intervalId); // setIntervalを停止
}

function changeTile() {
  const mainTileWrap = document.querySelector(".tileWrap");
  const mainTile__title = document.querySelector(".mainTile__title");
  const mainTile__text = document.querySelector(".mainTile__text");
  const mainTile__image = document.querySelector(".mainTile__image");

  const subTileWraps = document.getElementsByClassName("subTileWrap");
  const subTile__titles = document.getElementsByClassName("subTile__title");
  const subTile__images = document.getElementsByClassName("subTile__image");

  // mainTileとsubTileの中身を消す
  mainTileWrap.classList.add("transparent");
  for (let i = 0; i < subTileWraps.length; i++) {
    const subTileWrap = subTileWraps[i];
    subTileWrap.classList.add("transparent");
  }

  // 少し待ってからテキストを更新してフェードイン
  setTimeout(() => {
    // mvTitles配列からtitleとtextを取得して設定
    const currentTitle = tileTitleList[currentIndex % tileTitleList.length];
    const currentText = tileTextList[currentIndex % tileTextList.length];
    const currentImage = tileImageList[currentIndex % tileImageList.length];

    mainTile__title.innerText = "ー" + currentTitle + "ー";
    mainTile__text.innerHTML = currentText;
    mainTile__image.src = currentImage;

    // サブタイルのテキストと画像を更新
    for (let i = 0; i < subTileWraps.length; i++) {
      const currentSubTitle = tileTitleList[(currentIndex + i + 1) % tileTitleList.length];
      const subTile__title = subTile__titles[i];
      const currentSubImage = tileMiniImageList[(currentIndex + i + 1) % tileMiniImageList.length];
      const subTile__image = subTile__images[i];
      subTile__title.innerText = currentSubTitle;
      subTile__image.src = currentSubImage;
    }

    // mainTileとsubTileの中身を表示
    mainTileWrap.classList.remove("transparent");
    for (let i = 0; i < subTileWraps.length; i++) {
      const subTileWrap = subTileWraps[i];
      subTileWrap.classList.remove("transparent");
    }

    // インデックスを進める
    currentIndex++;

    // インデックスがメッセージの長さを超えたら、リセットしてループ
    if (currentIndex >= tileTitleList.length) {
      currentIndex = 0;
    }
  }, 2000); // 1.5秒後にテキストを更新（フェードアウト後の遅延）
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
