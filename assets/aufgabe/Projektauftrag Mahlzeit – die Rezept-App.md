# Projektauftrag: Mahlzeit – die Rezept-App

Oct 15, 2026

## Die Ausgangslage

Lena kocht gern, aber jeden Abend steht sie vor derselben Frage: Was gibt es heute? Auf den üblichen Rezeptseiten scrollt sie erst durch Werbung und lange Vorgeschichten, bevor sie die Zutaten findet. Das nervt sie.

Deshalb hat sie eine Idee: **Mahlzeit**, eine schlanke Rezept-Website, die sofort Gerichte zeigt, sich nach Kategorien filtern lässt und ein Rezept so darstellt, dass man es beim Kochen mit einem Blick lesen kann. Euer Team ist ihr Entwicklerteam. Das Design hat eine Gestalterin schon gezeichnet. Eure Aufgabe ist, daraus eine funktionierende Website zu bauen, die ihre Gerichte live aus dem Internet holt.

## Euer Auftrag: Lenas Abend mit Mahlzeit

So soll ein Abend mit eurer Website ablaufen. Jeder Schritt ist eine Funktion, die ihr bauen müsst.

1. Lena öffnet die Seite. Sie muss nichts eingeben: Es erscheinen sofort Gerichte als Karten mit Foto, Name, Küche und Kategorie.
2. Sie tippt „Arrabiata“ ins Suchfeld und schickt die Suche ab. Die Karten werden durch die Treffer ersetzt. Gibt es keinen Treffer, sieht sie eine freundliche Meldung statt einer leeren Seite.
3. Sie probiert es anders und klickt auf die Kategorie „Seafood“. Die Karten zeigen nur noch Gerichte dieser Kategorie. Der Chip der aktiven Kategorie ist hervorgehoben, „Alle“ hebt den Filter wieder auf.
4. Sie hat immer noch keine Idee und drückt „Überrasch mich“. Die Seite öffnet ein zufälliges Gericht.
5. Sie klickt eine Karte an und landet im Rezept: großes Foto, Name, Kategorie und Küche, die Zutatenliste mit Mengen und die Zubereitung in Schritten. Gibt es ein Video, führt ein Knopf dorthin. Über „Zurück zur Übersicht“ kommt sie wieder zur Liste.
6. Später kocht sie am Handy. Dieselbe Seite muss dort genauso funktionieren: eine Spalte, große Knöpfe (mindestens 44 px hoch) und gut lesbare Schrift.

**Auch das gehört zu einem guten Ergebnis:** Während Daten laden, sieht Lena einen Ladehinweis. Schlägt eine Anfrage fehl, bekommt sie eine verständliche Fehlermeldung. Und die Seite stürzt nicht ab, wenn die API „keine Treffer“ meldet.

## Die Datenquelle: TheMealDB

Alle Daten kommen von [TheMealDB](https://www.themealdb.com/api.php), einer kostenlosen Rezept-API. Ihr benutzt den Test-Schlüssel `1`, der für Entwicklung und Unterricht gedacht ist. Alle Adressen beginnen mit `https://www.themealdb.com/api/json/v1/1/`.

| Wofür | Endpunkt | Liefert |
| --- | --- | --- |
| Suche nach Name | `search.php?s=Arrabiata` | komplette Gerichte |
| Gerichte nach Anfangsbuchstabe | `search.php?f=a` | komplette Gerichte |
| Ein Gericht per ID | `lookup.php?i=52772` | ein komplettes Gericht |
| Zufallsgericht | `random.php` | ein komplettes Gericht |
| Alle Kategorien | `categories.php` | Name, Bild und Beschreibung je Kategorie |
| Nach Kategorie filtern | `filter.php?c=Seafood` | nur ID, Name und Bild |

Drei Dinge solltet ihr wissen:

- Ein komplettes Gericht hat unter anderem die Felder `strMeal` (Name), `strCategory`, `strArea` (Küche), `strInstructions`, `strMealThumb` (Bild) und `strYoutube`.
- Die Zutaten stehen nicht als Liste da, sondern in nummerierten Feldern: `strIngredient1` bis `strIngredient20` und dazu `strMeasure1` bis `strMeasure20`. Leere Felder müsst ihr überspringen.
- Findet die Suche nichts, antwortet die API mit `meals: null`. Das ist kein Fehler, aber euer Code muss damit umgehen.

Bilder gibt es auch kleiner: Hängt `/small`, `/medium` oder `/large` an die Bildadresse.

Der Test-Schlüssel gilt nur für Entwicklung und Unterricht. Ihr veröffentlicht die Seite also nicht öffentlich. Die Premium-Endpunkte (zum Beispiel `latest.php`) braucht ihr nicht.

## So soll es aussehen

Das Design zeigt vier Ansichten: Übersicht und Rezept, jeweils für Desktop und fürs Handy. 

- **Farben:** Tomatenrot `#C93E22` für Hauptknöpfe, Tannengrün `#1F4A3A` für Kategorien und zweite Knöpfe, Hintergrund `#F4F6F2`, Karten weiß.
- **Schriften:** Bricolage Grotesque für Überschriften, DM Sans für den Text. Beide gibt es kostenlos bei Google Fonts.
- **Bilder:** Das farbige Feld „Foto · strMealThumb“ ersetzt ihr durch das echte Bild des Gerichts.
- **Texte:** Die Rezepte im Design sind nur Beispiele. Die echten Daten kommen aus der API.

