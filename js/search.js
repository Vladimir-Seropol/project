import { state } from './state.js';

export function initSearch() {
  const input = document.querySelector('.search__input');

  input.addEventListener('input', () => {
    state.setSearch(input.value);
  });
}
