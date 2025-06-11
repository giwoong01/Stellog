export const ROUTE_COLORS = [
  "#4ade80", // 초록
  "#f472b6", // 분홍
  "#60a5fa", // 파랑
  "#c084fc", // 보라
  "#fb923c", // 주황
  "#fbbf24", // 노랑
  "#34d399", // 민트
  "#a78bfa", // 라벤더
  "#f87171", // 빨강
  "#38bdf8", // 하늘
] as const;

export const getRandomColor = () => {
  return ROUTE_COLORS[Math.floor(Math.random() * ROUTE_COLORS.length)];
};
