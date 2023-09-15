fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
    .then((res) => res.json())
    .then(function (result) {
        console.log(result)

        const images = [
            result.sprites.front_default,
            result.sprites.back_default,
            // Add more image URLs here if needed
        ];

        let currentImageIndex = 0;

        const displayImage = () => {
            document.body.innerHTML = `
        <input type="search">
        <button>search</button>
        <h1 class="pokemonName">${result.name}</h1>
        <section class="imageContainer">
        <button id="switchButton" class="switchButton"
        <p>switch</p>
        </button>
        <img class="pokemonImage" src="${images[currentImageIndex]}" />
        </section>
        <p class="species">Species: ${result.species.name}</p>
      `

            const switchButton = document.querySelector(".switchButton")

            switchButton.addEventListener("click", () => {
                currentImageIndex = (currentImageIndex + 1) % images.length
                displayImage()
            });
        }

        displayImage()
    })
    .catch(function (error) {
        console.error("Error fetching data:", error);
    })