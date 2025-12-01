import { state } from './state.js';

export function initFilters() {
    
  const filtersContainer = document.querySelector('.filters');
  
  if (!filtersContainer) {
    console.error('Filters container not found!');
    return;
  }
  

  updateFilterCounts();
  
  filtersContainer.addEventListener('click', e => {
    const btn = e.target.closest('[data-category]');
    if (!btn) return;

    document.querySelectorAll('.filters__item')
      .forEach(b => b.classList.remove('filters__item--active'));

    btn.classList.add('filters__item--active');
    
    state.setCategory(btn.dataset.category);
    updateFilterCounts();
  });

  const originalOnUpdate = state.onUpdate;
  state.onUpdate = function(filteredCourses) {
    if (originalOnUpdate) {
      originalOnUpdate(filteredCourses);
    }

    updateFilterCounts();
  };
}

function updateFilterCounts() {
   
  const filters = document.querySelectorAll('.filters__item');
  
  if (filters.length === 0) {
    console.error('No filter buttons found!');
    return;
  }
  
  const allCourses = state.courses;
  
  if (!allCourses || allCourses.length === 0) {
    console.warn('No courses found in state');
    return;
  }
  
  const counts = {
    'all': allCourses.length
  };
  
  allCourses.forEach(course => {
    const category = course.category;
    counts[category] = (counts[category] || 0) + 1;
  });
  
  filters.forEach(filter => {
    const category = filter.dataset.category;
    const countElement = filter.querySelector('.filters__count');
    
    if (!countElement) {
      console.warn(`No .filters__count element found for ${category}`);
      return;
    }
    
    const count = counts[category] || 0;
    
    const oldCount = parseInt(countElement.textContent) || 0;

    countElement.textContent = count;

    if (oldCount !== count) {
      animateCountChange(countElement);
    }
  });
}

function animateCountChange(element) {
  element.style.transform = 'scale(1.2)';
  element.style.transition = 'transform 0.3s ease';
  
  setTimeout(() => {
    element.style.transform = 'scale(1)';
  }, 300);
}

export function updateFilterCountsManually() {
  updateFilterCounts();
}

