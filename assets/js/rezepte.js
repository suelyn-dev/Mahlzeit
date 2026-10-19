/* Neue Instanz der Klasse URLSearchParams --> Konstruktor Aufruf new URLSearchParams*/
/* Query String window.location.search holt alles ab dem ? aus dem String */
/* parameter.get("id") holt die ID raus, mehrere KEys werden mit & getrennt */

const parameter = new URLSearchParams(window.location.search);
const rezeptId = parameter.get("id");
/* const surprise = parameter.get("source") ==="random" */

//passende API-URL für IDs:

let api_url

if(rezeptId){
    api_url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + rezeptId;
} else {
    api_url = "https://www.themealdb.com/api/json/v1/1/random.php"
}

getRecipe(api_url)



async function getRecipe(api) {
    try {
        const response = await fetch(api)
        const data = await response.json()

        const gericht = data.meals[0]

        const { strMealThumb, strArea, strCategory, strMeal, strYoutube, strInstructions } = gericht

        /* Analog:
        const strMealThumb = gericht.strMealThumb;
        const strArea = gericht.strArea;
        const strCategory = gericht.strCategory;
        const strMeal = gericht.strMeal;
        const strYoutube = gericht.strYoutube;
        const strInstructions = gericht.strInstructions; 
        
        ***ODER***
        const strMealThumb = gericht["strMealThumb"];
        const strArea      = gericht["strArea"];
        const strCategory  = gericht["strCategory"];
        const strMeal      = gericht["strMeal"];
        const strYoutube   = gericht["strYoutube"];
        const strInstructions = gericht["strInstructions"];*/

        //Bild einfügen
        const imgLarge = document.createElement("img")
        imgLarge.src = gericht.strMealThumb + "/large"
        document.getElementById("img-large").appendChild(imgLarge)

        //Labels einfügen
        document.getElementById("area").textContent = strArea
        if(!strArea  || strArea.trim()===""){
            document.getElementById("area").style.display = "none"
        }
        document.getElementById("category").textContent = strCategory

        //Titel
        document.getElementById("title").textContent = strMeal

        //Video (ausblenden wenn nicht vorhanden)
        const videoLink = document.getElementById("video-btn");
        if(!strYoutube || strYoutube.trim() === ""){
            videoLink.style.display = "none"
        }else{
            videoLink.href = strYoutube
        }

        //Liste Zutaten
        const tabelle = document.getElementById("zutaten-tabelle");
        tabelle.innerHTML = ""; // Leert den Platzhalter-Text "Zutaten"

        // Schleife für Keys und Tabelle Zutaten & Menge
        for (let i = 1; i <= 20; i++) {
            const zutat = gericht["strIngredient" + i];
            const menge = gericht["strMeasure" + i];

            
            if (zutat != null && zutat != "") {
                const zeile = document.createElement("tr");

                // Spalte für Zutat (links)
                const spalteZutat = document.createElement("td");
                spalteZutat.className = "spalte-zutat";
                spalteZutat.textContent = zutat;

                // Spalte für Menge (rechts)
                const spalteMenge = document.createElement("td");
                spalteMenge.className = "spalte-menge";
                //Tenärer Operator, falls keine Mengenangabe!
                spalteMenge.textContent = (menge != null && menge != "") ? menge : "";

                zeile.appendChild(spalteZutat);
                zeile.appendChild(spalteMenge);

                tabelle.appendChild(zeile);
            }
        }

        //Zubereitung
        const zubereitung = strInstructions
        const zubereitungArray = zubereitung.split(".").filter(s => s.length > 0);
        console.log(zubereitungArray);

        const zubereitungsListe = document.getElementById("instructions")

        zubereitungArray.forEach(schritt => {
            const li = document.createElement("li");
            li.textContent = schritt + "."
            zubereitungsListe.appendChild(li)
        })

    } catch (error) {
        console.error("Das hat noch nicht geklappt", error)
    }
}

