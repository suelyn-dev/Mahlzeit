const rand_api = "https://www.themealdb.com/api/json/v1/1/random.php"

async function getCardRecipe(api) {
    const kartenContainer = document.getElementById("gerichte-container")
    kartenContainer.innerHTML = ""
    try {
        for (let i = 0; i < 6; i++) {
            const response = await fetch(api)
            const data = await response.json()


            /* ------------------------------ */
            const randGericht = data.meals[i] || data.meals[0]
            if (!data.meals[i] && !api.includes("random.php")) {
                break;
            }
            /* ------------------------------ */

            const { strMealThumb, strArea, strCategory, strMeal, idMeal } = randGericht

            //Karten erstellen:
            const karte = document.createElement("div")
            karte.className = "karte"

            //Vorschau-Bild
            const imgSmall = document.createElement("img")
            imgSmall.src = strMealThumb + "/small"
            karte.appendChild(imgSmall)

            //Labels
            const kartenLabels = document.createElement("div")
            kartenLabels.className = "kartenLabels"
            if (strArea != null && strArea != "") {
                const kartenArea = document.createElement("div")
                kartenArea.className = "labels"
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
            weiter.textContent = "Rezept ansehen \u2192"
            karte.appendChild(weiter)

            //Karte in den Container
            kartenContainer.appendChild(karte);
        }
    } catch (error) {
        console.log("Die gewünschten rezepte können nicht angezeigt werden");
    }
}
getCardRecipe(rand_api)

/* ========== Suchfunktion ========== */
// FIXME: Suche: wenn es nur ein Ergebnis gibt, zeigt Suche immer die gleichen Karten an, try/catch
const sucheInput = document.getElementById("suche-input");
const suchBtn = document.getElementById("btn-suchen");

suchBtn.addEventListener("click", (event) => {
    const suchText = sucheInput.value;
    const such_API = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + suchText
    getCardRecipe(such_API)
});

//Event-Listener für die Enter-Taste im Eingabefeld
sucheInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        suchBtn.click();
    }
});

/* ========== Filtern ========== */

const cat_api_basic = "https://www.themealdb.com/api/json/v1/1/filter.php?c="

async function filterRezepte(cat) {
    let cat_api;

    if (cat == "all") {
        cat_api = rand_api;
    } else {
        cat_api = cat_api_basic + cat;
    }
    getCardRecipe(cat_api);
}
