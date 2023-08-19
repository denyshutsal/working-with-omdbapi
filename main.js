"use strict";

const APIKEY = "";

let submitBtn = document.querySelector("#submitBtn");
let result = document.querySelector(".result");

submitBtn.addEventListener("click", function () {
  // get value from user input
  let filmTitle = document.querySelector("#titleRequest").value;
  let filmYear = document.querySelector("#yearRequest").value;

  if (!filmTitle || !filmYear) {
    alert("Please fill in all fields!");

    return;
  }

  // generate the GET path
  let theUrl = `http://www.omdbapi.com/?apikey=${APIKEY}&t=${filmTitle}&y=${filmYear}`;

  httpGetAsync(theUrl);
});

function httpGetAsync(theUrl) {
  let http = new XMLHttpRequest();

  http.open("GET", theUrl);

  http.send();

  http.onreadystatechange = function () {
    if (http.readyState === 4 && http.status === 200) {
      render(http.responseText);
    }
  };
}

// render given items
function render(responsetext) {
  // clear before put a new items
  result.innerHTML = "";

  let data = JSON.parse(responsetext);

  if (data.Response === "False") {
    alert("Not found!");

    return;
  } else {
    result.innerHTML += `<img src="${data.Poster}"><h3>${data.Title}</h3><p>${data.Plot}</p><p>Year: ${data.Year}</p><p>imdb Rating: ${data.imdbRating}</p>`;
  }

  return;
}
