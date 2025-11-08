// 📦 Liste des avantages (avec icônes Ionicons)
export const advantages = [
  {
    key: "housing1",
    title: "Shared housing",
    icon: "home",
  },
  {
    key: "ac",
    title: "AC",
    icon: "snow", // ou "snow-outline"
  },
  {
    key: "wifi",
    title: "Wifi",
    icon: "wifi",
  },
  {
    key: "transport",
    title: "Transports covered",
    icon: "bus",
  },
  {
    key: "flexible",
    title: "Flexible schedule",
    icon: "time-outline",
  },
  {
    key: "meals",
    title: "All meals",
    icon: "restaurant",
  },
  {
    key: "tv",
    title: "TV",
    icon: "tv-outline",
  },
  {
    key: "hotwater",
    title: "Hot water",
    icon: "water-outline",
  },
];

export const getIconForAdvantage = (key: string): string => {
  const advantage = advantages.find((item) => item.key === key);
  return advantage ? advantage.icon : "checkmark-circle-outline";
};
