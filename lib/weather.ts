/**
 * OpenWeather API интеграция
 */

const WEATHER_API_KEY = process.env.OPENWEATHER_KEY || "";
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";

export interface WeatherData {
  temp: number;
  description: string;
  main: string;
  icon: string;
  humidity: number;
  windSpeed: number;
}

export async function getWeather(
  lat: number,
  lon: number
): Promise<WeatherData | null> {
  try {
    const response = await fetch(
      `${WEATHER_API_URL}?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric&lang=ru`
    );

    if (!response.ok) {
      throw new Error("Weather API error");
    }

    const data = await response.json();

    return {
      temp: Math.round(data.main.temp),
      description: data.weather[0].description,
      main: data.weather[0].main,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed),
    };
  } catch (error) {
    console.error("getWeather error:", error);
    return null;
  }
}

export function getTemperatureTag(temp: number): "hot" | "cold" | "warm" {
  if (temp < 10) return "cold";
  if (temp > 25) return "hot";
  return "warm";
}

export function getTimeTag(): "morning" | "afternoon" | "evening" {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 18) return "afternoon";
  return "evening";
}
