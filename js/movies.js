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
}

getData('json/movies.json', onSuccess);