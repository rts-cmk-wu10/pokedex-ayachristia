const URL = new URLSearchParams(window.location.search)
const OFFSET = parseInt(URL.get("offset") || "0")

const NEXT_PAGE = document.querySelector(".nextPage")
const PREV_PAGE = document.querySelector(".prevPage")

fetch(`https://pokeapi.co/api/v2/pokemon?limit=14&offset=${OFFSET}`) //unresolved promise
    .then(function (response) {
        if (response.status === 200) {
            return response.json()
        } else {
            const errorMessage = "Ups, noget gik galt. Prøv igen senere."
            document.querySelector(".poke_info").innerHTML +=
                `
        <p class=   "errorMessage">${errorMessage}</p>
        `
        }
    }) //then tager imod en callback function og får et promise tilbage om at vi nok skal få et response
    .then(function (data) {
        console.log(data)



        const LAST_OFFSET = data.count - (data.count % 10)
        NEXT_PAGE.href = `/?offset=${Math.min(LAST_OFFSET, OFFSET + 10)}`
        PREV_PAGE.href = `/?offset=${Math.max(OFFSET - 10, 0)}`
        // PREV_PAGE.href = `/?offset=${OFFSET <= 0 ? 0 : OFFSET - 10}`
        //offset er større< eller lig med= 0 så? 0 ellers: offset-20
        //offset = 0 - 10



        //Hente pokelist ind i poke_info-----------------------
        const UL = document.querySelector(".pokeList")
        data.results.forEach(function (result) {
            const LI = document.createElement("li")
            LI.innerHTML = `<a href="/pokemon.html?name=${result.name}">${result.name}</a>`
            UL.append(LI)
        })

        
    })

// ----------------searcform autocomplete list---------------------

const DATALIST = document.querySelector("#pokemons")
const SEARCH_FIELD = document.querySelector(".pokemon_search")

SEARCH_FIELD.addEventListener("focusout", function (event) {
    SEARCH_FIELD.removeEventListener("focus", getDataList)
})//?
SEARCH_FIELD.addEventListener("focus", getDataList)

function getDataList(event) {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=1350`)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            data.results.forEach(function (pokemon) {
                DATALIST.innerHTML +=
                    `<option>${pokemon.name}</option>`
            })
        })

}




// ----------------types ---------------------
//kalde alle 3 buttons via const'S
//hvordan binder jeg et event til en knap i javascript

// const TYPE_BUTTON = document.querySelector(".types")
// TYPE_BUTTON.addEventListener("click", typeToInput)

// function typeToInput(event) {
//     event.preventDefault();

//     fetch(`https://pokeapi.co/api/v2/type?limit=1350`)
//         .then(function (response) {
//             return response.json()
//         })
//         .then(function (data) {
//             DATALIST.innerHTML = "";
//             data.results.forEach(function (type) {
//                 DATALIST.innerHTML +=
//                     `<option value="${type.name}">${type.name}</option>`;
//             })
//         })

// }