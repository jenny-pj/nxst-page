/**
 * 논문 실적 데이터 (스펙 §6 원본).
 * - pillar: A=이상탐지, B=생성모델, C=산업적용, D=도메인적응·강건인지, E=데이터플랫폼
 * - featured: Research 섹션 상단 고정 + Technology 다이어그램 연결 대상
 * - authors 필드는 서지 보존용 — 화면에는 렌더링하지 않는다 (개인 정보 비노출 방침, 사용자 확정).
 */

export const PILLARS = {
  A: { key: 'A', label: '이상탐지', full: '비지도/강건 이상탐지', color: 'var(--color-pillar-a)' },
  B: { key: 'B', label: '생성모델', full: '생성모델 기반 이상탐지·합성', color: 'var(--color-pillar-b)' },
  C: { key: 'C', label: '산업적용', full: '산업·인프라 적용', color: 'var(--color-pillar-c)' },
  D: { key: 'D', label: '도메인적응', full: '도메인 적응·전이학습', color: 'var(--color-pillar-d)' },
  E: { key: 'E', label: '데이터플랫폼', full: '데이터 플랫폼·거버넌스', color: 'var(--color-pillar-e)' },
};

export const PILLAR_ORDER = ['A', 'B', 'C', 'D', 'E'];

export const publications = [
  {
    id: 'P-A1',
    title: 'Normality-calibrated autoencoder for unsupervised anomaly detection on data contamination',
    authors: 'Jongmin Yu, Minkyung Kim, Junsik Kim, Hyeontaek Oh',
    venue: 'Neurocomputing, Vol. 667, 132249',
    year: 2026,
    doi: '10.1016/j.neucom.2025.132249',
    pillar: ['A'],
    featured: true,
  },
  {
    id: 'P-B1',
    title: 'Adversarial Denoising Diffusion Model for Unsupervised Anomaly Detection',
    authors: 'Jongmin Yu, Hyeontaek Oh, Jinhong Yang',
    venue: 'arXiv:2312.04382',
    year: 2023,
    doi: 'arXiv:2312.04382',
    pillar: ['B', 'A'],
    featured: true,
  },
  {
    id: 'P-A5',
    title: 'An Iterative Method for Unsupervised Robust Anomaly Detection Under Data Contamination',
    authors: 'Minkyung Kim, Jongmin Yu, Junsik Kim, Tae-Hyun Oh, Jun Kyun Choi',
    venue: 'IEEE Transactions on Neural Networks and Learning Systems, Vol. 35, No. 10',
    year: 2024,
    doi: '10.1109/TNNLS.2023.3267028',
    pillar: ['A'],
    featured: true,
  },
  {
    id: 'P-A6',
    title: 'Active anomaly detection based on deep one-class classification',
    authors: 'Minkyung Kim, Junsik Kim, Jongmin Yu, Jun Kyun Choi',
    venue: 'Pattern Recognition Letters, Vol. 167',
    year: 2023,
    doi: '10.1016/j.patrec.2022.12.009',
    pillar: ['A'],
  },
  {
    id: 'P-B2',
    title: 'Abnormal event detection using adversarial predictive coding for motion and appearance',
    authors: 'Jongmin Yu, Jung-Gyun Kim, Jeonghwan Gwak, Byung-Geun Lee, Moongu Jeon',
    venue: 'Information Sciences, Vol. 586',
    year: 2022,
    doi: '10.1016/j.ins.2021.11.001',
    pillar: ['B', 'A'],
  },
  {
    id: 'P-B3',
    title: 'Abnormal Event Detection and Localization via Adversarial Event Prediction',
    authors: 'Jongmin Yu, Younkwan Lee, Kin Chung Yow, Moongu Jeon, Witold Pedrycz',
    venue: 'IEEE Transactions on Neural Networks and Learning Systems, Vol. 33, No. 8',
    year: 2022,
    doi: '10.1109/TNNLS.2021.3053563',
    pillar: ['B', 'A'],
    featured: true,
  },
  {
    id: 'P-B4',
    title:
      'Unusual Insider Behavior Detection Framework on Enterprise Resource Planning Systems Using Adversarial Recurrent Autoencoder',
    authors: 'Jongmin Yu, Hyeontaek Oh, Minkyung Kim, Sangjin Jung',
    venue: 'IEEE Transactions on Industrial Informatics, Vol. 18, No. 3',
    year: 2022,
    doi: '10.1109/TII.2021.3090362',
    pillar: ['B', 'C'],
  },
  {
    id: 'P-C1',
    title:
      'Multi-class Road Defect Detection and Segmentation using Spatial and Channel-wise Attention for Autonomous Road Repairing',
    authors: 'Jongmin Yu, C. B. Chi, S. Fichera, P. Paoletti, D. Mehta, S. Luo',
    venue: 'IEEE ICRA 2024, Yokohama',
    year: 2024,
    doi: '10.1109/ICRA57147.2024.10611081',
    pillar: ['C'],
    featured: true,
  },
  {
    id: 'P-C2',
    title: 'Road Surface Defect Detection — From Image-Based to Non-Image-Based: A Survey',
    authors: 'Jongmin Yu et al.',
    venue: 'IEEE Transactions on Intelligent Transportation Systems, Vol. 25, No. 9',
    year: 2024,
    doi: '10.1109/TITS.2024.3382837',
    pillar: ['C'],
  },
  {
    id: 'P-C3',
    title: '깊은 신경망 기반 객체 검출을 이용한 발전 설비 터빈 블레이드 이상 탐지',
    authors: '유종민, 이장원, 오현택, 박상기, 양진홍',
    venue: '한국정보전자통신기술학회 논문지, 15(1)',
    year: 2022,
    doi: '',
    pillar: ['C', 'A'],
    featured: true,
    note: '발전설비 실측 데이터 기반 — 제조·에너지 현장 적용 실적',
  },
  {
    id: 'P-C4',
    title:
      'Real-Time Abnormal Insider Event Detection on Enterprise Resource Planning Systems via Predictive Auto-Regression Model',
    authors: 'Jongmin Yu, Minkyung Kim, Hyeontaek Oh, Jinhong Yang',
    venue: 'IEEE Access, Vol. 9',
    year: 2021,
    doi: '10.1109/ACCESS.2021.3074149',
    pillar: ['C', 'A'],
  },
  {
    id: 'P-D1',
    title: 'Multi-source Domain Adaptation for Unsupervised Road Defect Segmentation',
    authors: 'Jongmin Yu, Hyeontaek Oh, S. Fichera, P. Paoletti, S. Luo',
    venue: 'IEEE ICRA 2023, London',
    year: 2023,
    doi: '10.1109/ICRA48891.2023.10161099',
    pillar: ['D', 'C'],
    featured: true,
  },
  {
    id: 'P-D2',
    title: 'Weakly Supervised Contrastive Learning for Unsupervised Vehicle Reidentification',
    authors: 'Jongmin Yu, Hyeontaek Oh, Minkyung Kim, Junsik Kim',
    venue: 'IEEE Transactions on Neural Networks and Learning Systems, Vol. 35, No. 11',
    year: 2024,
    doi: '10.1109/TNNLS.2023.3288139',
    pillar: ['D'],
  },
  {
    id: 'P-D3',
    title: 'Learning to Remove Bad Weather: Towards Robust Visual Perception for Self-Driving',
    authors: 'Younkwan Lee, Yeongmin Kim, Jongmin Yu, Moongu Jeon',
    venue: 'IEEE Robotics and Automation Letters',
    year: 2022,
    doi: '10.1109/LRA.2022.3154830',
    pillar: ['D'],
  },
  {
    id: 'P-D4',
    title: 'Camera-Tracklet-Aware Contrastive Learning for Unsupervised Vehicle Re-Identification',
    authors: 'Jongmin Yu, Junsik Kim, Minkyung Kim, Hyeontaek Oh',
    venue: 'IEEE ICRA 2022, Philadelphia',
    year: 2022,
    doi: '10.1109/ICRA46639.2022.9812007',
    pillar: ['D'],
  },
  {
    id: 'P-D5',
    title: 'Graph-structure based multi-label prediction and classification for unsupervised person re-identification',
    authors: 'Jongmin Yu, Hyeontaek Oh',
    venue: 'Applied Intelligence, Vol. 52',
    year: 2022,
    doi: '10.1007/s10489-022-03163-6',
    pillar: ['D'],
  },
  {
    id: 'P-E1',
    title:
      "A Profit Maximization Model for Data Consumers with Data Providers' Incentives in Personal Data Trading Market",
    authors: 'H. Park, Hyeontaek Oh, Jun Kyun Choi',
    venue: 'Data, 9(1), 6',
    year: 2024,
    doi: '10.3390/data9010006',
    pillar: ['E'],
  },
  {
    id: 'P-E2',
    title:
      'A privacy scoring framework: Automation of privacy compliance and risk evaluation with standard indicators',
    authors: 'Nakyoung Kim, Hyeontaek Oh, Jun Kyun Choi',
    venue: 'Journal of King Saud University - Computer and Information Sciences, Vol. 35, Issue 1',
    year: 2023,
    doi: '10.1016/j.jksuci.2022.12.019',
    pillar: ['E'],
  },
  {
    id: 'P-E3',
    title: 'Deposit Decision Model for Data Brokers in Distributed Personal Data Markets Using Blockchain',
    authors: 'Hyeontaek Oh, S. Park, Jun Kyun Choi, S. Noh',
    venue: 'IEEE Access, Vol. 9',
    year: 2021,
    doi: '10.1109/ACCESS.2021.3104870',
    pillar: ['E'],
    featured: true,
  },
  {
    id: 'P-E4',
    title: 'Robust Operation Scheme of EV Charging Facility With Uncertain User Behavior',
    authors: 'Jangkyum Kim, Hyeontaek Oh',
    venue: 'IEEE Transactions on Industrial Informatics, Vol. 19, No. 10',
    year: 2023,
    doi: '10.1109/TII.2023.3240752',
    pillar: ['E', 'C'],
  },
  {
    id: 'P-E5',
    title: 'Learning based cost optimal energy management model for campus microgrid systems',
    authors: 'Jangkyum Kim, Hyeontaek Oh, Jun Kyun Choi',
    venue: 'Applied Energy, Vol. 311, 118630',
    year: 2022,
    doi: '10.1016/j.apenergy.2022.118630',
    pillar: ['E', 'C'],
  },
  {
    id: 'P-E6',
    title: '마이데이터 기반 IoT 데이터 커먼즈 기술 동향',
    authors: '오현택, 양진홍, 임선환, 박찬원',
    venue: '정보과학회지, 40(2)',
    year: 2022,
    doi: '',
    pillar: ['E'],
  },
];

/** DOI 문자열 → 클릭 가능한 URL (빈 값이면 null) */
export function doiUrl(doi) {
  if (!doi) return null;
  if (doi.startsWith('arXiv:')) return `https://arxiv.org/abs/${doi.replace('arXiv:', '')}`;
  return `https://doi.org/${doi}`;
}
