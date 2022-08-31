"use strict"
// 表示するデータ数
const num = 151;

// データの保管
let pokemonArray = [];
let pokemon = {
    name: "",
    type: "",
    image: "",
};

// データの取得と表示
async function main() {
    // APIでデータ取得
    for (let i = 0; i < num; i++) {
        // jsonを取得
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`);
        const data = await res.json();

        // オブジェクトに追加
        pokemon.name = data['name'];
        pokemon.type = data['types'][0]['type']['name'];
        pokemon.image = data['sprites']['front_default'];

        // 1件分のデータを配列に追加
        pokemonArray[i] = pokemon;

        // オブジェクトを初期化
        pokemon = {};
    }

    // 表示
    const div = document.querySelector('#app');

    let html = "";

    for (let i = 0; i < pokemonArray.length; i++) {
        html +=
            "<div>" +
            "<div class='card'>" +
            "<div class='row'>" +
            "<span class='name'>" + pokemonArray[i].name + "</span>" +
            "<span class='type'>" + pokemonArray[i].type + "</span>" +
            "</div>" +
            "<div class='image'>" +
            `<img src="${pokemonArray[i].image}">` +
            "</div>" +
            "</div>" +
            "</div>"
            ;
    }
    div.innerHTML = html;
}


main();