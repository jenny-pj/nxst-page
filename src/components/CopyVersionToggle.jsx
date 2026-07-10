import { copyVersion } from '../data/copy.js';

/**
 * 카피 v1/v2 비교용 임시 토글 — 우하단 고정.
 * 클릭 시 localStorage에 다음 버전을 저장하고 새로고침해 전환한다.
 * 카피 확정 시 이 컴포넌트와 App의 렌더 라인을 제거할 것.
 */
export default function CopyVersionToggle() {
  const next = copyVersion === 'v1' ? 'v2' : 'v1';
  return (
    <button
      type="button"
      onClick={() => {
        localStorage.setItem('copyVersion', next);
        location.reload();
      }}
      className="fixed bottom-4 right-4 z-[70] rounded-full bg-dark/80 px-3.5 py-2 text-xs font-semibold tracking-wide text-ink-light shadow-lg backdrop-blur transition-colors hover:bg-dark"
      aria-label={`카피 버전 전환: 현재 ${copyVersion.toUpperCase()}, 클릭 시 ${next.toUpperCase()}`}
    >
      카피 {copyVersion.toUpperCase()} → {next.toUpperCase()}
    </button>
  );
}
