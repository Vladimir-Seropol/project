export function renderCards(list) {
  const template = document.getElementById('card-template');
  const grid = document.querySelector('.cards__grid');

  const fragment = document.createDocumentFragment();

  const categoryColors = {
    "Marketing": "rgba(3, 206, 164, 1)",
    "Management": "rgba(90, 135, 252, 1)",
    "HR & Recruting": "rgba(248, 152, 40, 1)",
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

  grid.replaceChildren(fragment);
}

