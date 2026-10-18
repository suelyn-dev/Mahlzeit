const rand_api = "https://www.themealdb.com/api/json/v1/1/random.php"

async function getCardRecipe() {
    const kartenContainer = document.getElementById("gerichte-container")

    for(let i= 0; i < 6; i++){
        const response = await fetch(rand_api)
        const data = await response.json()
    
        const randGericht = data.meals[0]
    
        const {strMealThumb, strArea, strCategory, strMeal, idMeal} = randGericht
    
        //Karten erstellen:
        const karte = document.createElement("div")
        karte.className = "karte"

        //Vorschau-Bild
        const imgSmall = document.createElement("img")
        imgSmall.src = strMealThumb+"/small"
        karte.appendChild(imgSmall)

        //Labels
        const kartenLabels = document.createElement("div")
        kartenLabels.className = "kartenLabels"
        if(strArea != null && strArea != ""){
            const kartenArea = document.createElement("div")
            kartenArea.className="labels"
            kartenArea.textContent = strArea
            kartenLabels.appendChild(kartenArea)
        }

        const kartenCat = document.createElement("div")
        kartenCat.className = "labels"
        kartenCat.textContent = strCategory
        kartenLabels.appendChild(kartenCat)

        karte.appendChild(kartenLabels)

        //Titel
        const kartenTitel = document.createElement("h3")
        kartenTitel.textContent = strMeal
        karte.appendChild(kartenTitel)

        //ID übergeben:
        const weiter = document.createElement("a")
        /* *** wichtig neu Schlüssel erzeugen*** */
        weiter.href = "rezepte.html?id=" + idMeal
        weiter.textContent = "Rezept ansehen \u2192;"
        karte.appendChild(weiter)

        //Karte in den Container
        kartenContainer.appendChild(karte);
    }
}

getCardRecipe()