/**
 * AI рекомендации
 */

export interface MenuItemData {
  id: string;
  name: string;
  description?: string;
  category: string;
  price: number;
  weatherTag?: string[];
  timeOptimal?: string[];
}

/**
 * Mock AI-рекомендация
 */
export async function getAIRecommendation(
  menuItems: MenuItemData[],
  context: {
    weather?: string;
    temperature?: number;
    timeOfDay?: string;
    userPreferences?: {
      favoriteCategories?: string[];
      temperature?: string;
      sugarLevel?: string;
    };
  }
): Promise<{
  recommendedItem: MenuItemData;
  reason: string;
}> {
  try {
    // Фильтруем по погоде и времени
    const recommended = menuItems
      .filter((item) => {
        if (context.timeOfDay && item.timeOptimal?.length) {
          return item.timeOptimal.includes(context.timeOfDay);
        }
        return true;
      })
      .sort(() => Math.random() - 0.5)[0] || menuItems[0];

    return {
      recommendedItem: recommended,
      reason: `Идеален для ${context.timeOfDay || "сейчас"}! Попробуйте ${recommended.name}.`,
    };
  } catch (error) {
    console.error("getAIRecommendation error:", error);
    return {
      recommendedItem: menuItems[0],
      reason: "Наш выбор дня для вас!",
    };
  }
}

export async function generateDailyChallenge(): Promise<{
  title: string;
  description: string;
  reward: number;
}> {
  const challenges = [
    { title: "Кофейный марафон", description: "Закажите 3 напитка сегодня", reward: 50 },
    { title: "Новый вкус", description: "Попробуйте что-то новое из меню", reward: 25 },
    { title: "Бонус дня", description: "Потратьте 500₽ - получите 100 бонусов", reward: 100 },
  ];

  return challenges[Math.floor(Math.random() * challenges.length)];
}
