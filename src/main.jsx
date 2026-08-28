import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// iOS Safari는 "클릭 가능"한 요소에만 탭 시 :hover/:active를 적용함 —
// 빈 touchstart 리스너를 달면 모든 요소가 탭에 반응 (index.css의 @custom-variant hover와 한 쌍)
document.addEventListener('touchstart', () => {}, { passive: true });

const rootEl = document.getElementById('root');
const tree = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// 프리렌더된 마크업이 있으면 hydrate, 없으면(개발 서버 등) 일반 렌더
if (rootEl.hasChildNodes()) {
  hydrateRoot(rootEl, tree);
} else {
  createRoot(rootEl).render(tree);
}
