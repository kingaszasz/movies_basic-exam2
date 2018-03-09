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
    console.log(movieData);

    sortByName(movieData);
    console.log(movieData);

    fixCategoryNames(movieData)


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
            data.movies[i].categories[j] = data.movies[i].categories[j].replace(/^[a-z]/, c => upperCase[c]);
            console.log(data.movies[i].categories[j]);
        }
    }
}