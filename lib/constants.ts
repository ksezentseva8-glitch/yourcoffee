export const LOYALTY_LEVELS = {
  novice: { name: "Новичок", minSpent: 0, bonusMultiplier: 1.0 },
  regular: { name: "Постоялец", minSpent: 5000, bonusMultiplier: 1.1 },
  expert: { name: "Кофеман", minSpent: 15000, bonusMultiplier: 1.25 },
  master: { name: "Мастер вкуса", minSpent: 50000, bonusMultiplier: 1.5 },
};

export const MENU_CATEGORIES = {
  coffee: "☕ Кофе",
  tea: "🍵 Чай",
  dessert: "🍰 Десерты",
  pastry: "🥐 Выпечка",
};

export const PAYMENT_METHODS = {
  bonus: "бонусами",
  card: "картой",
  cash: "наличными",
};

export const ORDER_STATUSES = {
  pending: "⏳ В ожидании",
  confirmed: "✅ Подтверждено",
  ready: "🎯 Готово",
  completed: "✔️ Завершено",
  cancelled: "❌ Отменено",
};

export const BONUS_REWARDS = [10, 25, 50, 100, 250, 500];

export const SPINNER_REWARDS = {
  small: 10,
  medium: 50,
  large: 100,
  jackpot: 500,
};

export const WEATHER_EMOJI = {
  Clear: "☀️",
  Clouds: "☁️",
  Rain: "🌧️",
  Drizzle: "🌦️",
  Thunderstorm: "⛈️",
  Snow: "❄️",
  Mist: "🌫️",
};

export const MOCK_MENU_ITEMS = [
  {
    id: "1",
    name: "Эспрессо",
    description: "Классический двойной эспрессо",
    category: "coffee",
    price: 120,
    bonusMultiplier: 1.0,
    weatherTag: ["cold"],
    timeOptimal: ["morning", "afternoon"],
  },
  {
    id: "2",
    name: "Капучино",
    description: "С молочной пеной",
    category: "coffee",
    price: 180,
    bonusMultiplier: 1.0,
    weatherTag: ["cold"],
    timeOptimal: ["morning"],
  },
  {
    id: "3",
    name: "Латте",
    description: "Мягкий и нежный кофе с молоком",
    category: "coffee",
    price: 200,
    bonusMultiplier: 1.0,
    weatherTag: ["cold", "hot"],
    timeOptimal: ["morning", "afternoon"],
  },
  {
    id: "4",
    name: "Ледяной кофе",
    description: "Прохладительный кофе со льдом",
    category: "coffee",
    price: 150,
    bonusMultiplier: 1.0,
    weatherTag: ["hot", "sunny"],
    timeOptimal: ["afternoon", "evening"],
  },
  {
    id: "5",
    name: "Шоколадный круассан",
    description: "Хрустящий круассан с шоколадом",
    category: "pastry",
    price: 90,
    bonusMultiplier: 0.5,
    weatherTag: [],
    timeOptimal: ["morning"],
  },
];
