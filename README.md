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

## シリーズ比較表（web-1, web-2, web-3）
| シリーズ名 | UI の特徴 | 技術的な工夫 |
|------------|-----------|--------------|
| [web-1](https://taiyo8911.github.io/pokemon-view-web-1/) | シンプルな一覧表示。小規模データ向け。 | HTML + CSS のみで最小構成。軽量。 |
| [web-2](https://taiyo8911.github.io/pokemon-view-web-2/) | 一覧＋検索ボックスで目的のポケモンを探せる。 | JavaScript による検索・フィルタリング機能を追加。 |
| [web-3](https://taiyo8911.github.io/pokemon-view-web-3/) | ギャラリー形式で画像を大きく表示。スマホでも見やすい。 | レスポンシブデザイン対応。CSS Grid / Flexbox を駆使。 |
