// 表示するデータ数
const num = 151;

// ポケモンデータを格納する配列
let pokemonArray = [];

// ポケモンデータをAPIから取得し配列に格納する
async function main() {
    // APIでデータ取得
    for (let i = 0; i < num; i++) {
        // jsonを取得
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`);
        const data = await res.json();

        // オブジェクトに追加
        const pokemon = {
            id: data['id'], // ポケモンのID番号
            name: data['name'], // ポケモンの名前
            type: data['types'][0]['type']['name'], // ポケモンのタイプ
            image: data['sprites']['front_default'] // ポケモンの画像URL
        };

        // 1件分のデータを配列に追加
        pokemonArray.push(pokemon);
    }

    // データ挿入位置のHTML要素を取得
    const div = document.querySelector('#app');

    let html = "";

    // ポケモンデータをHTMLに追加
    for (let i = 0; i < pokemonArray.length; i++) {
        html += `
            <div>
                <div class='card' id='${i + 1}'>
                    <div class='row'>
                        <span class='name'>${pokemonArray[i].name}</span> <!-- ポケモンの名前 -->
                        <span class='type'>${pokemonArray[i].type}</span> <!-- ポケモンのタイプ -->
                    </div>
                    <div class='image'>
                        <img src="${pokemonArray[i].image}"> <!-- ポケモンの画像 -->
                    </div>
                    <div>
                        <span class='id'>${pokemonArray[i].id}</span> <!-- ポケモンのID番号 -->
                    </div>
                </div>
            </div>`;
    }
    // HTMLにポケモンデータを表示する
    div.innerHTML = html;
}


main();