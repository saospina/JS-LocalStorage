
// Write Javascript code!
const listaTweets = document.getElementById("lista-tweets");
const formulario = document.getElementById("formulario");

// Event listeners
eventListeners();
function eventListeners() {
  formulario.addEventListener("submit", agregarTweet);
  // Borrar listaTweets
  listaTweets.addEventListener("click", borrarTweet);
  // Cargar localStorage
  document.addEventListener("DOMContentLoaded", localStorageDone);
}

function agregarTweet(e) {
  e.preventDefault();
  const tweet = document.getElementById("tweet").value;
  const borrar = document.createElement("a");
  borrar.classList = "borrar-tweet";
  borrar.innerText = "X";

  // Mostrar en el DOM
  const li = document.createElement("li");
  li.innerText = tweet;
  li.appendChild(borrar);
  listaTweets.appendChild(li);

  // local storage

  agregarLocalStorage(tweet);
}

function borrarTweet(e) {
  e.preventDefault();
  if (e.target.className === "borrar-tweet") {
    e.target.parentElement.remove();
    //alert("This Tweet will be deleted");
    deleteFromLocalStorage(e.target.parentElement.innerText)
  } else {
    console.log("click en otra parte");
  }
}

function localStorageDone() {
  let tweets;
  tweets = getTweetsLocalStorage();
  console.log(tweets);
  tweets.forEach(function(tweet) {
    const borrar = document.createElement("a");
    borrar.classList = "borrar-tweet";
    borrar.innerText = "X";

    // Mostrar en el DOM
    const li = document.createElement("li");
    li.innerText = tweet;
    li.appendChild(borrar);
    listaTweets.appendChild(li);
  });
}

function agregarLocalStorage(tweet) {
  let tweets;
  tweets = getTweetsLocalStorage();
  tweets.push(tweet);
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

function getTweetsLocalStorage() {
  let tweets;

  if (localStorage.getItem("tweets") === null) {
    tweets = [];
  } else {
    tweets = JSON.parse(localStorage.getItem("tweets"));
  }
  return tweets;
}

function deleteFromLocalStorage(tweet) {
  let tweets, tweetBorrar;
  tweetBorrar = tweet.substring(0, tweet.length -1); 
  tweets = getTweetsLocalStorage();
  tweets.forEach(function(tweet, index) {
    if (tweetBorrar === tweet) {
      tweets.splice(index, 1)
    } 
  });

  localStorage.setItem('tweets', JSON.stringify(tweets));
  
  
}