const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list-horizontal a',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags',
  optAuthorsListSelector = '.authors';

function generateTitleLinks(filter = '') {
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles) {
    if (filter && !article.classList.contains(filter)) continue;

    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    const linkHTML = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;
    titleList.insertAdjacentHTML('beforeend', linkHTML);
  }

  document.querySelectorAll('.titles a').forEach(link => {
    link.addEventListener('click', titleClickHandler);
  });
}

generateTitleLinks();

function generateTags() {
  const tagsList = document.querySelector(optTagsListSelector);
  let allTags = {};

  document.querySelectorAll(optArticleSelector).forEach(article => {
    const tagsWrapper = article.querySelector('.post-tags .list-horizontal');
    if (!tagsWrapper) return;

    const tags = [...tagsWrapper.querySelectorAll('a')].map(tag => tag.innerText);
    tags.forEach(tag => {
      if (!allTags[tag]) allTags[tag] = 0;
      allTags[tag]++;
      article.classList.add(`tag-${tag}`);
    });
  });

  tagsList.innerHTML = Object.keys(allTags).map(tag =>
    `<li><a href="#" data-tag="${tag}">${tag} (${allTags[tag]})</a></li>`
  ).join('');

  document.querySelectorAll(`${optTagsListSelector} a`).forEach(link => {
    link.addEventListener('click', tagClickHandler);
  });
}

function titleClickHandler(event) {
    event.preventDefault(); // Zapobiega domyślnemu działaniu linka
    const clickedElement = this; // Pobiera kliknięty element
    console.log('Link was clicked!', clickedElement);
  
    // Usuwanie aktywnej klasy z poprzednio zaznaczonych linków
    const activeLinks = document.querySelectorAll('.titles a.active');
    activeLinks.forEach(link => link.classList.remove('active'));
  
    // Dodanie klasy aktywnej do klikniętego linku
    clickedElement.classList.add('active');
  
    // Ukrycie wszystkich artykułów
    const activeArticles = document.querySelectorAll('.post');
    activeArticles.forEach(article => article.classList.remove('active'));
  
    // Wyświetlenie odpowiedniego artykułu
    const articleId = clickedElement.getAttribute('href').substring(1);
    const targetArticle = document.getElementById(articleId);
    targetArticle.classList.add('active');
  }

generateTags();

function generateAuthors() {
  const authorsList = document.querySelector(optAuthorsListSelector);
  let allAuthors = {};

  document.querySelectorAll(optArticleSelector).forEach(article => {
    const authorElem = article.querySelector(optArticleAuthorSelector);
    if (!authorElem) return;

    const author = authorElem.innerText.replace('by ', '').trim();
    if (!allAuthors[author]) allAuthors[author] = 0;
    allAuthors[author]++;
    article.classList.add(`author-${author.replace(/\s+/g, '-')}`);
  });

  authorsList.innerHTML = Object.keys(allAuthors).map(author =>
    `<li><a href="#" data-author="${author}">${author} (${allAuthors[author]})</a></li>`
  ).join('');

  document.querySelectorAll(`${optAuthorsListSelector} a`).forEach(link => {
    link.addEventListener('click', authorClickHandler);
  });
}

generateAuthors();

function tagClickHandler(event) {
  event.preventDefault();
  const tag = event.target.getAttribute('data-tag');
  generateTitleLinks(`tag-${tag}`);
}

function authorClickHandler(event) {
  event.preventDefault();
  const author = event.target.getAttribute('data-author');
  generateTitleLinks(`author-${author.replace(/\s+/g, '-')}`);
}
