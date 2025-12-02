import { state } from './state.js';
import { renderCards, initLoadMore } from './render.js';
import { initFilters } from './filter.js';
import { initSearch } from './search.js';


state.onUpdate = renderCards;


renderCards(state.filtered);

initFilters();
initSearch();
initLoadMore();

setTimeout(() => {
  if (typeof updateFilterCountsManually === 'function') {
    updateFilterCountsManually();
  }
}, 100);