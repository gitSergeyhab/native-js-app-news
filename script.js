document.addEventListener('DOMContentLoaded', function() {
    M.AutoInit();
  });

// Моя Версия
const urlNews = 'https://newsapi.org/v2/';
const key = 'cb30a180751945a88741dc330e2472a2';

const newsHeaderContainer = document.querySelector('.news-container .container .grid-container');
const newsControls = document.querySelector('[name="newsControls"]');
const countries = newsControls.querySelector('#country');
const inputSerch = newsControls.querySelector('.input-field .autocomplete');

const createCard = ({title, author, url, urlToImage}) => `
    <div>
        <img src=${urlToImage} width="430">
        <h3>${title}</h3>
        <h4>${author || 'автор неизвестен'}</h4>
        <a href=${url}><h5>источник</h5></a>
    </div>
    `;

// получаю данные по запросу и вставляю их в newsHeaderContainer
const xhrOnLoad = (xhr) => {
    const response = xhr.responseText;
    const responses = JSON.parse(response);
    const newsHtml = responses.articles.reduce((acc, resp) => acc + createCard(resp), '');
    newsHeaderContainer.innerHTML = newsHtml;
}

// выбираю урл для апиньюз в зависимости от значений в инпутах
const getNeedUrl = (category) => {
    if (inputSerch.value.trim()) {
        return `${urlNews}everything?q=${inputSerch.value.trim()}&apiKey=${key}`;
    }
    const country = countries.value;
    return `${urlNews}top-headlines?country=${country}&category=${category}&apiKey=${key}`;
}

// вешаю обработчик на отправку формы
const getSomeInfo = (category = 'business') => {
    const xhr = new XMLHttpRequest();
    newsControls.addEventListener('submit', (evt) => {
        evt.preventDefault();
        const url = getNeedUrl(category);
        xhr.open('get', url);
        xhr.addEventListener('load', () => xhrOnLoad(xhr));
        xhr.send();
    })
};

getSomeInfo();
