import { state } from './state.js';
import { renderCards } from './render.js';
import { initFilters } from './filter.js';
import { initSearch } from './search.js';


state.onUpdate = renderCards;


renderCards(state.filtered);

initFilters();
initSearch();

setTimeout(() => {
  if (typeof updateFilterCountsManually === 'function') {
    updateFilterCountsManually();
  }
}, 100);