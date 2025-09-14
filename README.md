# pokemon-view-web-3
ポケモンAPIを使用して、ポケモンの情報を取得し、HTMLに表示するウェブアプリ。ポケモンをカード形式で一覧表示します。

---

## アプリの特徴
- **データ取得とHTML生成を分離**
  - APIからポケモンのデータを取得して配列に格納
  - 別のループでHTMLを文字列として作成し、一括挿入
- **DOM操作の最適化**
  - 1件ごとにDOMを書き換えるのではなく、文字列をまとめて挿入することで処理を高速化

## 使用したAPI
- [PokéAPI](https://pokeapi.co/)  
  - ポケモンのID・名前・タイプ・画像を取得

## 表示される情報
- **ID**（ポケモン図鑑番号）
- **名前**（英語表記）
- **タイプ**（1種類目のみ）
- **画像**（正面）

## コードのポイント

### 1.データをまとめて取得
``` javascript
for (let i = 0; i < num; i++) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`);
    const data = await res.json();
    const pokemon = {
        id: data['id'],
        name: data['name'],
        type: data['types'][0]['type']['name'],
        image: data['sprites']['front_default']
    };
    pokemonArray.push(pokemon);
}
```

- 1匹ずつ API からデータを取得
- ID・名前・タイプ・画像をオブジェクトにまとめて、配列 pokemonArray に保存

### 2.HTMLを文字列として作成
``` javascript
let html = "";
for (let i = 0; i < pokemonArray.length; i++) {
    html += `
        <div class='card'>
            <span class='name'>${pokemonArray[i].name}</span>
            <span class='type'>${pokemonArray[i].type}</span>
            <img src="${pokemonArray[i].image}">
            <span class='id'>${pokemonArray[i].id}</span>
        </div>`;
}
```

- 1匹ごとに```<div>```を作成
- テンプレート文字列 `...` を使って、HTMLを「文字列」として追加
- += で次々に連結して、最後に1つの大きな文字列にまとめる


### 3. DOMに一括で挿入
``` javascript
div.innerHTML = html;
```
- 作成した HTML 全体を 一度に挿入
- DOM 操作が最小限になり、表示が速い

## 処理の流れ
- APIから151匹分のデータを取得
- 配列にデータを保存
- 配列をもとにHTMLを文字列で生成
- 最後にまとめて画面に表示

## シリーズ比較表（web-1, web-2, web-3 の違い）

| シリーズ | UI の特徴 | 技術的な工夫 |
|---|---:|---|
| [web-1](https://taiyo8911.github.io/pokemon-view-web-1/) | ID・タイプ・英語名・日本語名・画像を一覧表示。 | `fetch` をループで順次実行して各ポケモン情報を取得。データはフィールド別の配列で保持。日本語名はローカルファイル `name_trans.json から取得変換して表示。|
| [web-2](https://taiyo8911.github.io/pokemon-view-web-2/) | ID・Name・たかさ(m)・おもさ(kg)）を一覧表示。ヘッダ下のボタンで「たかさ」「おもさ」を昇順・降順に切替可能。ウェブフォント適用。 | `pokemon-species` エンドポイントで種情報を取り、`varieties[0].pokemon.url` から実体の Pokemon API を取得。`generateTableRow()` が `<tr>` を DOM で生成して返す実装。複数の `generateTableRow()` を `Promise.all` で並列実行して効率的に取得・生成し、取得後に行をまとめて `<tbody>` に追加。ソートは DOM 内の該当列テキストを比較して並べ替え。 |
| [web-3](https://taiyo8911.github.io/pokemon-view-web-3/) | ID・名前・タイプ・画像 をカード形式で表示。| まず API で全データを配列 `pokemonArray` に取得して格納（データ取得ループ）。その後、配列を走査してテンプレート文字列で HTML を連結し、`div.innerHTML = html` で一括挿入。データ取得と HTML 生成を分離することで DOM 書き換え回数を減らし高速化。 |
