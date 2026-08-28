import { renderToString } from 'react-dom/server';
import App from './App.jsx';

/** 빌드 타임 프리렌더용 — scripts/prerender.mjs가 dist/index.html에 주입한다.
 *  StrictMode는 클라이언트(main.jsx)에만 두어 서버 마크업을 단순하게 유지. */
export function render() {
  return renderToString(<App />);
}
