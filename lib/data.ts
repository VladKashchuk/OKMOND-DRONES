export const SHOWCASE_MODELS = [
  { img: '/images/1P7A9957.JPG', title: 'ШТУРМОВИЙ КВАДРОКОПТЕР',  specs: ['3 КМ', '3 КГ', '120 КМ/ГОД', '1.8 КГ'] },
  { img: '/images/1P7A9958.JPG', title: 'ТАКТИЧНИЙ FPV ДРОН',       specs: ['1 КМ', '0.8 КГ', '180 КМ/ГОД', '0.6 КГ'] },
  { img: '/images/1P7A9961.JPG', title: 'РОЗВІДУВАЛЬНИЙ ДРОН',      specs: ['15 КМ', '0.5 КГ', '80 КМ/ГОД', '1.2 КГ'] },
  { img: '/images/1P7A9947.JPG', title: 'РЕТРАНСЛЯЦІЙНИЙ ДРОН',     specs: ['20 КМ', '0.3 КГ', '70 КМ/ГОД', '0.9 КГ'] },
]

export interface CarouselCard {
  slug: string
  model: string
  role: string
  badge: string
  img: string
  gold?: boolean
  bottomLabels: string[]
  bottomVals: string[]
  description?: string
}

export const CAROUSEL_CARDS: CarouselCard[] = [
  {
    slug: 'ok-fpv',
    model: 'OK-FPV',
    role: 'Carbon Frame · 5"',
    badge: 'Деталь',
    img: '/images/1P7A9958.JPG',
    description: 'Компактний FPV-дрон для точних ударних місій. Карбонова рама 5", висока маневреність та мінімальний час розгортання.',
    bottomLabels: ['Клас', 'Дальність', 'Навантаження', 'Швидкість'],
    bottomVals: ['FPV · Detail', '1 км', '0.5 кг', '150 км/год'],
  },
  {
    slug: 'ok-fpv-raid',
    model: 'OK-FPV\nRAID',
    role: '180 км/год · 0.8 кг',
    badge: 'FPV Raid',
    img: '/images/1P7A9957.JPG',
    description: 'Високошвидкісний FPV-дрон класу Raid для штурмових операцій. Збільшене навантаження та покращена аеродинаміка.',
    bottomLabels: ['Клас', 'Дальність', 'Навантаження', 'Швидкість'],
    bottomVals: ['FPV Raid', '1 км', '0.8 кг', '180 км/год'],
  },
  {
    slug: 'ok-7-assault',
    model: 'OK-7\nASSAULT',
    role: '3 кг · 45 хв · 10 км',
    badge: '★ Флагман',
    img: '/images/1P7A1367.JPG',
    gold: true,
    description: 'Флагманський штурмовий квадрокоптер з корисним навантаженням 3 кг. Дальність до 10 км, час польоту 45 хвилин. Захищений канал зв\'язку, Carbon Fiber 5 мм.',
    bottomLabels: ['Клас', 'Дальність', 'Навантаження', 'Швидкість'],
    bottomVals: ['Assault Class', '10 км', '3 кг', '120 км/год'],
  },
  {
    slug: 'ok-7-pro',
    model: 'OK-7\nPRO',
    role: 'Extended Range Edition',
    badge: 'Assault Quad',
    img: '/images/1P7A1354.JPG',
    description: 'Версія Pro з розширеною дальністю до 12 км та покращеною швидкістю. Призначений для складних тактичних завдань.',
    bottomLabels: ['Клас', 'Дальність', 'Навантаження', 'Швидкість'],
    bottomVals: ['Pro Series', '12 км', '3 кг', '135 км/год'],
  },
  {
    slug: 'ok-recon',
    model: 'OK\nRECON',
    role: 'Розвідка · 15 км',
    badge: 'Розвідка',
    img: '/images/1P7A1360.JPG',
    description: 'Розвідувальний дрон з дальністю 15 км та часом польоту до 60 хвилин. Тихий, малопомітний, з HD-відеотрансляцією в реальному часі.',
    bottomLabels: ['Клас', 'Дальність', 'Навантаження', 'Швидкість'],
    bottomVals: ['Recon Series', '15 км', '0.5 кг', '80 км/год'],
  },
  {
    slug: 'ok-relay',
    model: 'OK\nRELAY',
    role: 'Ретрансляція сигналу',
    badge: 'Signal Relay',
    img: '/images/1P7A9944.JPG',
    description: 'Дрон-ретранслятор для забезпечення стабільного зв\'язку на дальності до 20 км. Автономний час роботи до 90 хвилин.',
    bottomLabels: ['Клас', 'Дальність', 'Навантаження', 'Швидкість'],
    bottomVals: ['Relay Series', '20 км', '0.3 кг', '70 км/год'],
  },
]

export const SPEC_ROWS = [
  { key: 'Двигун',                  val: '4350KV Brushless' },
  { key: 'Час польоту',             val: '45 хвилин' },
  { key: 'Дальність зв\'язку',      val: 'До 10 км' },
  { key: 'Акумулятор',              val: '6S LiPo 10 Ач' },
  { key: 'Рамка',                   val: 'Carbon Fiber 5 мм' },
  { key: 'Маса (без навантаження)', val: '1.8 кг' },
  { key: 'Корисне навантаження',    val: 'До 3 кг' },
  { key: 'IP рейтинг',             val: 'IP54' },
  { key: 'Відеозатримка FPV',      val: '< 28 мс' },
  { key: 'Температурний діапазон',  val: '−20°C до +55°C' },
  { key: 'Протокол захисту',       val: 'FHSS 128-bit AES' },
]

export const HERO_SEQ = [
  { sel: '.hero-vert-label',       delay: 0    },
  { sel: '.htl-overline',          delay: 160  },
  { sel: '.hero-topleft-label h3', delay: 300  },
  { sel: '#hero h1',               delay: 460  },
  { sel: '.hero-sub-right',        delay: 640  },
  { sel: '.hero-card-light',       delay: 820  },
  { sel: '.hero-card-dark',        delay: 970  },
  { sel: '.hero-tags',             delay: 1120 },
  { sel: '.hero-strip',            delay: 1280 },
]

export const CONFIGURATOR_MODELS = [
  { model: 'OK-FPV',    name: 'OK-FPV DETAIL',  flight: '15 хв',  speed: '150 км/год', range: '1 км',  payload: '0.5 кг' },
  { model: 'OK-7',      name: 'OK‑7 ASSAULT',   flight: '45 хв',  speed: '120 км/год', range: '10 км', payload: '3 кг',  active: true },
  { model: 'OK-RECON',  name: 'OK RECON',        flight: '60 хв',  speed: '80 км/год',  range: '15 км', payload: '0.5 кг' },
  { model: 'OK-RELAY',  name: 'OK RELAY',        flight: '90 хв',  speed: '70 км/год',  range: '20 км', payload: '0.3 кг' },
]
