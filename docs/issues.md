# Issues

## 해결됨

### React `fetchPriority` 경고 (2026-07-02 발견 → 당일 해결)
- 증상: 콘솔에 "React does not recognize the `fetchPriority` prop" 경고
- 원인: React 18은 소문자 `fetchpriority` 표기 필요 (camelCase는 React 19부터)
- 해결: `Hero.jsx`의 img 속성을 `fetchpriority="high"`로 수정

## 알려진 한계

- **궤도 다이어그램은 xl(1280px)+ 전용** — 미만 해상도는 카드 그리드 폴백 (Figma 절대좌표 기반이라 축소 시 카드 겹침)
- **이미지 용량** — hero-bg.jpg(553KB), section-texture.jpg(506KB). 추가 최적화 여지 있음 (todo 참고)
- **스크롤 스파이** — WhyData 섹션은 네비 항목이 없어 히어로~WhyData 구간에서 활성 표시 없음 (의도된 동작)
