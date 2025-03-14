const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorListLink: Handlebars.compile(document.querySelector('#template-author-list-link').innerHTML)
};
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
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
    titleList.insertAdjacentHTML('beforeend', linkHTML);
  }

  document.querySelectorAll('.titles a').forEach(link => {
    link.addEventListener('click', titleClickHandler);
  });
}

generateTitleLinks();

function calculateTagsParams(tags) {
  const params = {
    max: 0,
    min: 999999,
  };

  for (let tag in tags) {
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }

  return params;
}



function generateTags() {
  const tagsList = document.querySelector(optTagsListSelector);
  let allTags = {};

  // Zbieranie wszystkich tagów i ich liczby wystąpień
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

  // Obliczenie parametrów tagów
  const tagParams = calculateTagsParams(allTags);

  // Generowanie listy tagów z różnymi rozmiarami czcionek
  tagsList.innerHTML = Object.keys(allTags).map(tag => {
    const tagCount = allTags[tag];
    const fontSize = calculateTagSize(tagCount, tagParams.min, tagParams.max);
    return `<li><a href="#" data-tag="${tag}" style="font-size: ${fontSize}px;">${tag} (${tagCount})</a></li>`;
  }).join('');

  // Dodanie obsługi kliknięć w tagi
  document.querySelectorAll(`${optTagsListSelector} a`).forEach(link => {
    link.addEventListener('click', tagClickHandler);
  });
}

function calculateTagSize(count, min, max) {
  // Zakres rozmiarów czcionek (np. od 12px do 24px)
  const minFontSize = 12;
  const maxFontSize = 24;

  // Obliczenie rozmiaru czcionki na podstawie liczby wystąpień
  if (max === min) {
    return (minFontSize + maxFontSize) / 2; // Średnia, jeśli wszystkie tagi mają tę samą liczbę wystąpień
  }
  return minFontSize + ((count - min) / (max - min)) * (maxFontSize - minFontSize);
}

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  
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

// Nowa funkcja obsługująca kliknięcia w linki w artykule
function articleTagClickHandler(event) {
  event.preventDefault();
  const tag = event.target.innerText;
  generateTitleLinks(`tag-${tag}`);
}

// Funkcja generująca linki w artykule
function generateArticleLinks() {
  document.querySelectorAll('.post .post-tags .list-horizontal a').forEach(link => {
    link.addEventListener('click', articleTagClickHandler);
  });
}

// Wywołanie funkcji, aby zarejestrować kliknięcia w linki w artykule
generateArticleLinks();
