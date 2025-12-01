import { courses } from './data.js';

export const state = {
  search: '',
  category: 'all',
  courses,
  filtered: courses,
  onUpdate: null,

  setSearch(value) {
    this.search = value;
    this.applyFilters();
  },

  setCategory(value) {
    this.category = value;
    this.applyFilters();
  },

  applyFilters() {
    const q = this.search.toLowerCase();

    this.filtered = this.courses.filter(item =>
      (this.category === 'all' || item.category === this.category) &&
      item.title.toLowerCase().includes(q)
    );

    this.onUpdate?.(this.filtered);
  }
};
