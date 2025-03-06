const titleClickHandler = function(event){
    event.preventDefault(); // Zapobiega domyślnemu przewinięciu do kotwicy
    console.log('Link was clicked!');
  
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
