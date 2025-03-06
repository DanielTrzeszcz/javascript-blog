const titleClickHandler = function(event){
    event.preventDefault(); // Zapobiega domyślnemu przewinięciu do kotwicy
    console.log(event);
  
    /* remove class 'active' from all article links  */
    document.querySelectorAll(".titles a.active").forEach(link => {
        link.classList.remove("active");
    });
    
    /* add class 'active' to the clicked link */
    event.currentTarget.classList.add("active");

    /* remove class 'active' from all articles */
    document.querySelectorAll("article").forEach(article => {
        article.classList.remove("active");
    });

    /* get 'href' attribute from the clicked link */
    const href = event.currentTarget.getAttribute("href");

    /* find the correct article using the selector (value of 'href' attribute) */
    const article = document.querySelector(href);

    /* add class 'active' to the correct article */
    if (article) {
        article.classList.add("active");
        
        // Get article details
        const articleTitle = article.querySelector(".post-title")?.innerText || "No title";
        const articleAuthor = article.querySelector(".post-author")?.innerText || "No author";
        
        console.log(`Article ID: ${href}`);
        console.log(`Title: ${articleTitle}`);
        console.log(`Author: ${articleAuthor}`);
    }
}

const links = document.querySelectorAll('.titles a');

for (let link of links) {
    link.addEventListener('click', titleClickHandler);
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks() {
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles) {
    /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element */
    const titleElement = article.querySelector(optTitleSelector);

    /* get the title from the title element */
    const articleTitle = titleElement.innerHTML;

    /* create HTML of the link */
    const linkHTML = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;

    /* insert link into titleList using insertAdjacentHTML */
    titleList.insertAdjacentHTML('beforeend', linkHTML);
  }

  /* Add event listeners to newly created links */
  const links = titleList.querySelectorAll('a');
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();
