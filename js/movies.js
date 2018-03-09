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