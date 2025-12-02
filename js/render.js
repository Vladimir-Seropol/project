import { state } from './state.js';

export function renderCards(list, animate = false) {
  const template = document.getElementById('card-template');
  const grid = document.querySelector('.cards__grid');

  if (animate) {

    grid.style.opacity = '0.5';
    grid.style.transition = 'opacity 0.3s ease';
  }

  const fragment = document.createDocumentFragment();

  const categoryColors = {
    "Marketing": "rgba(3, 206, 164, 1)",
    "Management": "rgba(90, 135, 252, 1)",
    "HR & Recruiting": "rgba(248, 152, 40, 1)",
    "Design": "rgba(245, 47, 110, 1)",
    "Development": "rgba(119, 114, 241, 1)"
  };

  list.forEach(item => {
    const card = template.content.cloneNode(true);

    card.querySelector('.card__image').src = item.image;
    card.querySelector('.card__title').textContent = item.title;
    card.querySelector('.card__price').textContent = `$${item.price}`;
    card.querySelector('.card__author').textContent = item.author;

    const categoryBtn = card.querySelector('.card__bnt');
    const categorySpan = categoryBtn.querySelector('.card__category');
    categorySpan.textContent = item.category;

    if (categoryColors[item.category]) {
      categoryBtn.style.backgroundColor = categoryColors[item.category];
      categoryBtn.style.color = "#fff"; 
    } else {
      categoryBtn.style.backgroundColor = "#ccc"; 
      categoryBtn.style.color = "#000";
    }

    fragment.appendChild(card);
  });

  if (animate) {

    setTimeout(() => {
      grid.replaceChildren(fragment);
      
      setTimeout(() => {
        grid.style.opacity = '1';
      }, 50);
    }, 500);
  } else {

    grid.replaceChildren(fragment);
  }
}

export function initLoadMore() {
  const btn = document.querySelector('.cards__load-more-btn');
  
  btn?.addEventListener('click', async () => {

    const original = btn.innerHTML;
    
    btn.innerHTML = '<span style="font-family: Lato; font-size: 16px; color: #424551;">Загрузка...</span>';
    btn.style.pointerEvents = 'none';
    btn.style.transform = 'scale(0.95)';
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    renderCards(state.filtered, true);
    
    setTimeout(() => {
      btn.innerHTML = original;
      btn.style.pointerEvents = '';
      btn.style.transform = '';
    }, 500);
  });
}