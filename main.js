import { search } from "./search.js";
import { fetchVerses } from "./fetch-json.js";

export const MEMORY_VERSES = [
    {
        number: 1,
        verse: "John 3:16",
        p: "For God so loved the world that he gave his only begotten son, that whosoever believes in him shall not perish but have everlasting life."
    },
    {
        number: 2,
        verse: "Matthew 18:4",
        p: "Whoever humbles himself like this little child is the greatest in the kingdom of heaven."
    },
    {
        number: 3,
        verse: "Matthew 10:30-31",
        p: "But even the hairs of your head are all numbered. Therefore, fear not, for you are of more value than many sparrows."
    }
]

function loadMemoryVerses(searchIndexResult = [], query) {
    const div = document.getElementById("memory-verse");

    div.innerHTML = "";
    if (query) {
        if (Array.isArray(searchIndexResult) && searchIndexResult.length > 0) {
            for (let i = 0; i < searchIndexResult.length; i++) {
                let obj = MEMORY_VERSES.find(obj => obj.number === searchIndexResult[i]);

                div.innerHTML += `
                    <div class="verse-div">
                        <h3 class="verse">${obj.number.toString().replace(query, `<b class="highlighted">${query}</b>`)}: ${obj.verse.replaceAll(query, `<b class="highlighted">${query[0] === obj.verse[0].toLowerCase() ? capitalizeFirstLetter(query) : query}</b>`)}</h3>
                        <p class="p">${obj.p.replaceAll(query, `<b class="highlighted">${query}</b>`)}</p>
                    </div>
                `;
            }
        } else if (searchIndexResult.length === 0) {
            div.innerHTML = "<pre class='search-fail'>Search failed; please make sure your search is right.</pre>";
        } 
    } else {
        MEMORY_VERSES.forEach(obj => {
            div.innerHTML += `
                <div class="verse-div">
                    <h3 class="verse">${obj.number}: ${obj.verse}</h3>
                    <p class="p">${obj.p}</p>
                </div>
            `;
        });
    }
}

loadMemoryVerses();

const searchBtn = document.getElementById("search");
let searchQuery = document.getElementById("search-input").value.toString().toLowerCase();

function searchAndRender() {
    searchQuery = document.getElementById("search-input").value.toString().toLowerCase();
    if (!searchQuery || /^\s*$/.test(searchQuery)) {
        console.warn(`Error: Input value is "${searchQuery}". make sure input has value, not only spaces or else.`);
        document.getElementById("memory-verse").innerHTML = "<pre class='search-fail'>Search failed; please make sure your search is right.</pre>";
        return;
    }
    const results = search(MEMORY_VERSES, searchQuery);
    loadMemoryVerses(results, searchQuery);
}

searchBtn.addEventListener("click", searchAndRender);


document.getElementById("search-bar").addEventListener("submit", function(event) {
    event.preventDefault();
});

document.getElementById("clear").addEventListener("click", () => {
    loadMemoryVerses();
    document.getElementById("search-input").value = "";
});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function capitalizeFirstLetterOfEachWord(string) {
    let words = string.split(" ");
    for (let i = 0; i < string.words; i++) {
        words[i] = capitalizeFirstLetter(words[i]);
    }
    words.join(" ");
    return words;
}



    /*
     TO DO: 
     FIX LINE 32 RENDERING OF OUTPUT IN VERSE; THE FULL BOOK NAME DOESN'T BECOME HIGHLIGHTED.
     ADD MORE BIBLE VERSES AND MOVE TO A NEW FILE
     UPLOAD TO GITHUB AND CHECK.
    */
