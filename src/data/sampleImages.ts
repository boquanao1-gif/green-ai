export interface SampleImage {
  id: string;
  title: string;
  description: string;
  expectedObjects: string[];
  dataUrl: string;
}

/**
 * Helper to generate crisp, recognizable graphic photos via canvas
 * so users can test multi-object detection instantly without uploading their own photos.
 */
function createSampleDataUrl(type: 'office' | 'desk' | 'kitchen'): string {
  // We can return high-quality SVG data URLs that render realistic illustrations of waste items
  if (type === 'office') {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#f1f5f9"/>
          <stop offset="100%" stop-color="#e2e8f0"/>
        </linearGradient>
        <linearGradient id="foam" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="100%" stop-color="#f8fafc"/>
        </linearGradient>
        <linearGradient id="bottle" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.8"/>
          <stop offset="50%" stop-color="#bae6fd" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#0284c7" stop-opacity="0.8"/>
        </linearGradient>
        <linearGradient id="bag" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#cbd5e1" stop-opacity="0.7"/>
          <stop offset="100%" stop-color="#94a3b8" stop-opacity="0.5"/>
        </linearGradient>
      </defs>
      <!-- Background Table -->
      <rect width="800" height="600" fill="url(#bg)"/>
      <rect x="0" y="450" width="800" height="150" fill="#cbd5e1" opacity="0.4"/>
      
      <!-- Label Header -->
      <text x="400" y="50" font-family="sans-serif" font-size="22" font-weight="bold" fill="#334155" text-anchor="middle">HỘP XỐP THỰC PHẨM, CHAI NHỰA PET VÀ TÚI NILON TRÊN BÀN ĂN</text>
      
      <!-- 1. Hộp xốp thực phẩm (Giữa - Trái) -->
      <g transform="translate(100, 220)">
        <polygon points="50,150 250,150 290,260 10,260" fill="url(#foam)" stroke="#94a3b8" stroke-width="3"/>
        <polygon points="20,130 260,130 250,150 50,150" fill="#e2e8f0"/>
        <!-- Dầu mỡ thức ăn bám trong hộp -->
        <ellipse cx="150" cy="210" rx="70" ry="35" fill="#f59e0b" opacity="0.6"/>
        <path d="M 120,200 Q 150,220 180,205" stroke="#b45309" stroke-width="4" fill="none"/>
        <text x="150" y="275" font-family="sans-serif" font-size="14" font-weight="bold" fill="#475569" text-anchor="middle">Hộp xốp dính dầu mỡ</text>
      </g>

      <!-- 2. Chai nước khoáng nhựa PET có nắp xanh (Bên phải) -->
      <g transform="translate(480, 160)">
        <!-- Thân chai -->
        <rect x="70" y="100" width="90" height="230" rx="20" fill="url(#bottle)" stroke="#0284c7" stroke-width="2"/>
        <!-- Cổ và miệng chai -->
        <path d="M 90,100 L 95,50 L 135,50 L 140,100 Z" fill="url(#bottle)" stroke="#0284c7" stroke-width="2"/>
        <!-- Nắp chai xanh lá -->
        <rect x="90" y="30" width="50" height="22" rx="4" fill="#16a34a" stroke="#15803d" stroke-width="2"/>
        <!-- Nhãn hiệu chai nước -->
        <rect x="70" y="180" width="90" height="60" fill="#ffffff" opacity="0.9"/>
        <text x="115" y="215" font-family="sans-serif" font-size="13" font-weight="bold" fill="#0284c7" text-anchor="middle">AQUA PET</text>
        <!-- Nước thừa đáy chai -->
        <rect x="70" y="300" width="90" height="30" rx="10" fill="#0284c7" opacity="0.6"/>
        <text x="115" y="350" font-family="sans-serif" font-size="14" font-weight="bold" fill="#475569" text-anchor="middle">Chai nhựa PET + Nắp</text>
      </g>

      <!-- 3. Túi nilon đựng đồ ăn vo tròn (Góc dưới) -->
      <g transform="translate(320, 360)">
        <path d="M 30,50 Q 80,10 130,40 Q 180,80 150,130 Q 100,160 50,130 Q 10,90 30,50 Z" fill="url(#bag)" stroke="#64748b" stroke-width="2"/>
        <path d="M 50,70 Q 90,50 120,80" stroke="#64748b" stroke-width="1.5" fill="none"/>
        <path d="M 40,100 Q 80,110 130,95" stroke="#64748b" stroke-width="1.5" fill="none"/>
        <text x="90" y="155" font-family="sans-serif" font-size="14" font-weight="bold" fill="#475569" text-anchor="middle">Túi nilon PE mỏng</text>
      </g>

      <!-- 4. Khăn giấy ướt đã dùng (Góc trái dưới) -->
      <g transform="translate(60, 420)">
        <path d="M 20,40 L 90,20 L 120,70 L 40,90 Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
        <text x="70" y="105" font-family="sans-serif" font-size="13" font-weight="bold" fill="#64748b" text-anchor="middle">Khăn giấy bẩn</text>
      </g>
    </svg>`;
    return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
  }

  if (type === 'desk') {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
      <defs>
        <linearGradient id="deskbg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#f8fafc"/>
          <stop offset="100%" stop-color="#e2e8f0"/>
        </linearGradient>
        <linearGradient id="can" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#dc2626"/>
          <stop offset="60%" stop-color="#ef4444"/>
          <stop offset="100%" stop-color="#991b1b"/>
        </linearGradient>
        <linearGradient id="cup" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#78350f"/>
          <stop offset="100%" stop-color="#b45309"/>
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#deskbg)"/>
      <text x="400" y="50" font-family="sans-serif" font-size="22" font-weight="bold" fill="#1e293b" text-anchor="middle">LON NHÔM NƯỚC NGỌT, CỐC CÀ PHÊ GIẤY VÀ PIN AA CŨ</text>

      <!-- 1. Lon nước ngọt nhôm đỏ (Bên trái) -->
      <g transform="translate(140, 180)">
        <rect x="40" y="80" width="100" height="200" rx="16" fill="url(#can)" stroke="#b91c1c" stroke-width="3"/>
        <ellipse cx="90" cy="80" rx="50" ry="16" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2"/>
        <ellipse cx="90" cy="80" rx="20" ry="6" fill="#64748b"/>
        <text x="90" y="190" font-family="sans-serif" font-size="20" font-weight="900" fill="#ffffff" text-anchor="middle">COLA</text>
        <text x="90" y="215" font-family="sans-serif" font-size="12" font-weight="bold" fill="#ffffff" opacity="0.9" text-anchor="middle">ALUMINUM 330ml</text>
        <text x="90" y="305" font-family="sans-serif" font-size="14" font-weight="bold" fill="#334155" text-anchor="middle">Lon nhôm kim loại</text>
      </g>

      <!-- 2. Cốc cà phê giấy mang đi có nắp nhựa (Giữa) -->
      <g transform="translate(370, 160)">
        <!-- Thân cốc giấy -->
        <polygon points="40,90 140,90 125,290 55,290" fill="url(#cup)" stroke="#78350f" stroke-width="2"/>
        <polygon points="43,150 137,150 130,220 50,220" fill="#fef3c7"/>
        <text x="90" y="190" font-family="sans-serif" font-size="13" font-weight="bold" fill="#78350f" text-anchor="middle">COFFEE CUP</text>
        <!-- Nắp nhựa trắng PP -->
        <rect x="30" y="65" width="120" height="25" rx="6" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
        <rect x="80" y="55" width="20" height="12" rx="3" fill="#e2e8f0"/>
        <text x="90" y="315" font-family="sans-serif" font-size="14" font-weight="bold" fill="#334155" text-anchor="middle">Cốc giấy + Nắp nhựa</text>
      </g>

      <!-- 3. Cặp pin tiểu AA cũ (Bên phải - Rác nguy hại) -->
      <g transform="translate(580, 250)">
        <!-- Pin 1 -->
        <rect x="20" y="60" width="35" height="90" rx="6" fill="#1e293b" stroke="#0f172a" stroke-width="2"/>
        <rect x="20" y="80" width="35" height="40" fill="#eab308"/>
        <rect x="32" y="50" width="11" height="10" rx="2" fill="#cbd5e1"/>
        <text x="37" y="105" font-family="sans-serif" font-size="10" font-weight="bold" fill="#000000" text-anchor="middle">AA</text>
        <!-- Pin 2 -->
        <rect x="75" y="80" width="35" height="90" rx="6" fill="#1e293b" stroke="#0f172a" stroke-width="2"/>
        <rect x="75" y="100" width="35" height="40" fill="#eab308"/>
        <rect x="87" y="70" width="11" height="10" rx="2" fill="#cbd5e1"/>
        <text x="92" y="125" font-family="sans-serif" font-size="10" font-weight="bold" fill="#000000" text-anchor="middle">AA</text>
        <!-- Biểu tượng rác nguy hại -->
        <circle cx="65" cy="205" r="14" fill="#ef4444"/>
        <text x="65" y="210" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">!</text>
        <text x="65" y="235" font-family="sans-serif" font-size="14" font-weight="bold" fill="#b91c1c" text-anchor="middle">Pin AA (Rác nguy hại)</text>
      </g>
    </svg>`;
    return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
  }

  // kitchen
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
    <defs>
      <linearGradient id="kbg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#ecfdf5"/>
        <stop offset="100%" stop-color="#d1fae5"/>
      </linearGradient>
      <linearGradient id="banana" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#fde047"/>
        <stop offset="80%" stop-color="#eab308"/>
        <stop offset="100%" stop-color="#713f12"/>
      </linearGradient>
      <linearGradient id="glass" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#059669" stop-opacity="0.8"/>
        <stop offset="50%" stop-color="#6ee7b7" stop-opacity="0.9"/>
        <stop offset="100%" stop-color="#047857" stop-opacity="0.8"/>
      </linearGradient>
    </defs>
    <rect width="800" height="600" fill="url(#kbg)"/>
    <text x="400" y="50" font-family="sans-serif" font-size="22" font-weight="bold" fill="#065f46" text-anchor="middle">VỎ CHUỐI HỮU CƠ, CHAI THỦY TINH VÀ VỎ TRỨNG NHÀ BẾP</text>

    <!-- 1. Vỏ chuối chín hữu cơ (Bên trái) -->
    <g transform="translate(100, 200)">
      <path d="M 30,120 Q 80,40 160,80 Q 230,120 200,200 Q 140,240 70,180 Z" fill="url(#banana)" stroke="#854d0e" stroke-width="3"/>
      <!-- Đốm thâm vỏ chuối -->
      <circle cx="80" cy="110" r="6" fill="#713f12"/>
      <circle cx="130" cy="120" r="8" fill="#713f12"/>
      <circle cx="160" cy="160" r="5" fill="#713f12"/>
      <path d="M 195,195 L 220,225" stroke="#713f12" stroke-width="6" stroke-linecap="round"/>
      <text x="120" y="250" font-family="sans-serif" font-size="14" font-weight="bold" fill="#166534" text-anchor="middle">Vỏ chuối chín (Rác hữu cơ)</text>
    </g>

    <!-- 2. Chai nước ngọt thủy tinh xanh (Ở giữa) -->
    <g transform="translate(370, 150)">
      <rect x="40" y="100" width="80" height="200" rx="15" fill="url(#glass)" stroke="#047857" stroke-width="2"/>
      <path d="M 60,100 L 65,40 L 95,40 L 100,100 Z" fill="url(#glass)" stroke="#047857" stroke-width="2"/>
      <rect x="62" y="30" width="36" height="12" rx="3" fill="#ca8a04"/>
      <rect x="40" y="160" width="80" height="60" fill="#ffffff" opacity="0.85"/>
      <text x="80" y="195" font-family="sans-serif" font-size="12" font-weight="bold" fill="#047857" text-anchor="middle">THỦY TINH</text>
      <text x="80" y="325" font-family="sans-serif" font-size="14" font-weight="bold" fill="#065f46" text-anchor="middle">Chai thủy tinh màu</text>
    </g>

    <!-- 3. Mảnh vỏ trứng gà (Bên phải) -->
    <g transform="translate(560, 240)">
      <path d="M 20,80 Q 50,20 100,40 Q 140,80 120,130 Q 70,160 30,120 Z" fill="#fed7aa" stroke="#ea580c" stroke-width="2"/>
      <path d="M 40,70 L 60,95 L 80,65 L 100,90" stroke="#c2410c" stroke-width="2" fill="none"/>
      <text x="80" y="165" font-family="sans-serif" font-size="14" font-weight="bold" fill="#9a3412" text-anchor="middle">Vỏ trứng gà (Rác hữu cơ)</text>
    </g>
  </svg>`;
  return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
}

export const SAMPLE_IMAGES: SampleImage[] = [
  {
    id: 'office-lunch',
    title: 'Rác văn phòng & hộp xốp',
    description: 'Hộp xốp dính dầu mỡ, chai nhựa PET có nắp xanh, túi nilon PE và khăn giấy bẩn.',
    expectedObjects: ['Hộp xốp dính dầu mỡ', 'Chai nhựa PET', 'Nắp chai nhựa', 'Túi nilon PE', 'Khăn giấy bẩn'],
    dataUrl: createSampleDataUrl('office'),
  },
  {
    id: 'desk-items',
    title: 'Bàn làm việc & Rác nguy hại',
    description: 'Lon nhôm Coca-Cola, cốc cà phê giấy có nắp nhựa PP, và pin tiểu AA (rác nguy hại).',
    expectedObjects: ['Lon nhôm nước ngọt', 'Cốc cà phê giấy', 'Nắp cốc nhựa PP', 'Pin tiểu AA đã dùng'],
    dataUrl: createSampleDataUrl('desk'),
  },
  {
    id: 'kitchen-waste',
    title: 'Rác hữu cơ & Chai thủy tinh',
    description: 'Vỏ chuối chín hữu cơ, chai thủy tinh màu xanh lá và vỏ trứng gà.',
    expectedObjects: ['Vỏ chuối chín', 'Chai thủy tinh xanh', 'Vỏ trứng gà hữu cơ'],
    dataUrl: createSampleDataUrl('kitchen'),
  },
];
