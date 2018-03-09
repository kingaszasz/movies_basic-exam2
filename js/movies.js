function getData(url, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callback(this);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function onSuccess(xhttp) {
    var movieData = JSON.parse(xhttp.responseText);

    sortByName(movieData);
    console.log(movieData);

    fixCategoryNames(movieData);
    generateMovieView(movieData);
    stat(movieData);

    document.getElementById('btn').addEventListener('click', function () {
        search(movieData);
    });

}

getData('json/movies.json', onSuccess);

function sortByName(data) {
    let temp = [];
    for (let i = 0; i < data.movies.length - 1; i++) {
        for (var j = i + 1; j < data.movies.length; j++) {
            if (data.movies[i].title > data.movies[j].title) {
                temp = data.movies[i];
                data.movies[i] = data.movies[j];
                data.movies[j] = temp;
            }
        }
    }
}



function fixCategoryNames(data) {
    const upperCase = {
        a: 'A',
        b: 'B',
        c: 'C',
        d: 'D',
        e: 'E',
        f: 'F',
        g: 'G',
        h: 'H',
        i: 'I',
        j: 'J',
        k: 'K',
        l: 'L',
        m: 'M',
        n: 'M',
        o: 'O',
        p: 'P',
        r: 'R',
        s: 'S',
        t: 'T',
        u: 'U',
        v: 'V',
        w: 'W',
        z: 'Z'
    }

    for (let i = 0; i < data.movies.length; i++) {
        for (j in data.movies[i].categories) {
            data.movies[i].categories[j] =
                data.movies[i].categories[j].replace(/^[a-z]/, c => upperCase[c]);
        }
    }
}


function removesShit(str) {
    const hunChar = {
        á: 'a',
        é: 'e',
        í: 'i',
        ó: 'o',
        ö: 'o',
        ő: 'o',
        ú: 'u',
        ü: 'u',
        ű: 'u',
    }
    str = str.toLocaleLowerCase();
    str = str.replace(/[\?:;,\.\+\*_]/g, ''); // [\?:;,\.\+\*_] kicsréli semmire globálisan
    str = str.replace(/[áéíóöőúüű]/g, c => hunChar[c]); //
    str = str.replace(/[ -]+/g, '-'); //a szóközt egyszer v többször ha előfordul kicserélem kötőjelre

    return str;
}

function showMovie(i, data) {
    let divMovie = `<div class="movie">
                    <h2> Cím: ${data.movies[i].title}</h2>
                    <img src="/img/covers/${removesShit(data.movies[i].title)}.jpg" alt="${data.movies[i].title}">
                    <p>Kategória: ${data.movies[i].categories.join(', ')} <br>
                    Hossz: ${data.movies[i].timeInMinutes} perc <br>
                    Premier: ${data.movies[i].premierYear} <br>
                    Premier: ${data.movies[i].directors.join(', ')}</p>`;

    return divMovie;
}

function showActors(i, j, data) {
    let divCast = `<div class="cast">
                    <img src="/img/actors/${removesShit(data.movies[i].cast[j].name)}.jpg" alt="${data.movies[i].cast[j].name}">
                    <p>${data.movies[i].cast[j].name} <br>
                    (${data.movies[i].cast[j].characterName}) <br>
                    ${data.movies[i].cast[j].birthYear}, ${data.movies[i].cast[j].birthCountry},${data.movies[i].cast[j].birthCity} </p>
                    </div>`;

    return divCast;
}



function generateMovieView(data) {
    let container = '';
    for (let i = 0; i < data.movies.length; i++) {
        container += showMovie(i, data);
        container += '<h2>Szereplők</h2>'
        for (let j = 0; j < data.movies[i].cast.length; j++) {
            container += showActors(i, j, data);
        }
        container += `</div>`
    }
    document.getElementsByClassName('container')[0].innerHTML = container;
}

function search(data) {
    var text = document.getElementById('find');
    var found = false;
    var newData = {};
    if (!text.value || text.value == ' ') {
        text.value = "Írj be egy címet, rendező vagy szereplő nevet";
    } else {
        for (var i = 0; i < data.movies.length; i++) {
            if (data.movies[i].title == text.value) {
                newData = data.movies[i];
                console.log(newData);
                found = true;
            }
        }
        if (!found) {
            text.value = "not found!";
        }
    }
}

function stat(data) {
    /* 
        o	Az összes színész neve, és mellette, hogy hány filmben szerepel
        o	A filmkatagória neve, és mellette, hogy hány film tartozik az adott kategóriába*/
    let statContent = '';
    let sum = 0;
    let avg = 0;
    let actors = [{
        name: '',
        act: 0
    }];

    for (let i = 0; i < data.movies.length; i++) {
        sum += parseInt(data.movies[i].timeInMinutes);
        /*for (let j = 0; j < data.movies[i].cast.length; j++) {
            actors[i].name = data.movies[i].cast[j].name;
            actors[i].act += 1;
        }*/
    }
    sum = (sum / 60).toFixed(2);
    avg = (sum / data.movies.length).toFixed(2);


    statContent = `<p> Az összes film hossza : ${sum} óra <br>
                    Az összes film hosszának átlaga: ${avg} óra <br>
                    </p>`

    document.getElementById('stat').innerHTML = statContent;
}