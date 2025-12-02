import { state } from './state.js';

export function initLoadMore() {
  const loadMoreBtn = document.querySelector('.load-more-btn');
  
  if (!loadMoreBtn) {
    console.warn('Load More button not found');
    return;
  }
  
  loadMoreBtn.style.display = 'flex';
  
  loadMoreBtn.addEventListener('click', () => {

    loadMoreBtn.classList.add('loading');
    loadMoreBtn.disabled = true;
    
    setTimeout(() => {

      state.loadMore();
      
      loadMoreBtn.classList.remove('loading');
      loadMoreBtn.disabled = false;
      
      showNotification('Courses reloaded!');
    }, 500);
  });
}

function showNotification(message) {

  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #424551;
    color: white;
    padding: 12px 20px;
    border-radius: 4px;
    font-family: Lato, sans-serif;
    z-index: 1000;
    animation: slideIn 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}