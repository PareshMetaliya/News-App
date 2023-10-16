//https://github.com/SauravKanchan/NewsAPI

// const baseUrl = "https://saurav.tech/NewsAPI/";
// const topHeadlines = `/top-headlines/category/${query}/in.json`;
// const everything_api = "/everything/cnn.json";


//On loading of the page first load the everything api to load all news at Home section
window.addEventListener("load",() => fetchNews("Home") );


//Fetching api
async function fetchNews(query) {
  
  
  //As everthing_api have diff api string formate so two types of api string generated on basis of selector Id
    if (query === "Home") {
    const res = await fetch(
      `https://saurav.tech/NewsAPI/everything/fox-news.json`
    );
    const data = await res.json();

    bindData(data.articles);
  } 

  //As for TopNews api have diff api string so formate that string for fetch
  else {
    const res = await fetch(
      `https://saurav.tech/NewsAPI/top-headlines/category/${query}/in.json`
    );
    const data = await res.json();
    // console.log(data);


    //Binding data call with passing an Array of fetched data 
    bindData(data.articles);
  }
}


//binding data for template formate
function bindData(articles) {

    //select Card container & Template of HTML
  const cardsContainer = document.getElementById("card-container");
  const newsCardTemplate = document.getElementById("temp-card");

  //First clear Card Container before loading of diffrent Id news launch 
    cardsContainer.innerHTML = "";
    
    
//get single objects from Array of data.articles
  articles.forEach((article) => {
    
    //If any fetched data have not available any of belowed data than reject it logic
    if (!article.urlToImage) return;
    if (!article.title) return;
    if (!article.description) return;
    if (!article.source.name) return;
    if (!article.publishedAt) return;


    //create a clone of template
    const cardClone = newsCardTemplate.content.cloneNode(true);


    //call the function of filldatain card for fill cloned template with api fetched data
    fillDataInCard(cardClone, article);

    //Now append template to card-container area
    cardsContainer.appendChild(cardClone);
  });
}

//Fill data in the template
function fillDataInCard(cardClone, article) {

    // select all HTML area using Id
  const newsImg = cardClone.querySelector("#news-img");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-source");
  const newsDesc = cardClone.querySelector("#news-desc");


  //fill data in HTML area 
  newsImg.src = article.urlToImage;

  newsTitle.innerHTML = article.title;

  newsDesc.innerHTML = article.description;

  //convert publishedAt object of fetched data to readable date and time formate
  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });

  newsSource.innerHTML = `${article.source.name} . ${date}`;


  //Add eventlistner for go to new url link
  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}


//for active class show on
let curSelectorNav = null;

//get id from HTML ul li onclick function
function onNavClick(id) {
  fetchNews(id);

  //for active class show on
const navItem = document.getElementById(id);
curSelectorNav?.classList.remove("active");
curSelectorNav = navItem;

curSelectorNav.classList.add("active");

}

