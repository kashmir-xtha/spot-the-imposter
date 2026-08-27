import { Category, CategoryGroup } from '../types';

export const ALL_CATEGORIES_ID = 'all';

export const categories: Category[] = [
  // SPORTS
  { id: 'football_players', label: 'Football Players', icon: '⚽', group: 'Sports' },
  { id: 'sports_equipment', label: 'Sports Equipment', icon: '🎾', group: 'Sports' },

  // ENTERTAINMENT
  { id: 'movies', label: 'Movies', icon: '🎬', group: 'Entertainment' },
  { id: 'tv_shows', label: 'TV Shows', icon: '📺', group: 'Entertainment' },
  { id: 'cartoon_characters', label: 'Cartoon Characters', icon: '🐰', group: 'Entertainment' },
  { id: 'video_games', label: 'Video Games', icon: '🎮', group: 'Entertainment' },
  { id: 'superheroes_villains', label: 'Superheroes & Villains', icon: '🦸', group: 'Entertainment' },
  { id: 'apps_software', label: 'Apps & Software', icon: '📱', group: 'Entertainment' },

  // PEOPLE & SOCIETY
  { id: 'famous_people', label: 'Famous People', icon: '⭐', group: 'People & Society' },
  { id: 'jobs_professions', label: 'Jobs & Professions', icon: '👨‍💼', group: 'People & Society' },

  // NATURE & ANIMALS
  { id: 'animals', label: 'Animals', icon: '🐯', group: 'Nature & Animals' },
  { id: 'fruits_vegetables', label: 'Fruits & Vegetables', icon: '🍎', group: 'Nature & Animals' },
  { id: 'space_planets', label: 'Space & Planets', icon: '🪐', group: 'Nature & Animals' },

  // LIFESTYLE
  { id: 'clothing', label: 'Clothing', icon: '👕', group: 'Lifestyle' },
  { id: 'food_drinks', label: 'Food & Drinks', icon: '🍕', group: 'Lifestyle' },
  { id: 'places', label: 'Places', icon: '🌎', group: 'Lifestyle' },
  { id: 'hobbies', label: 'Hobbies', icon: '🎨', group: 'Lifestyle' },
  { id: 'vehicles', label: 'Vehicles', icon: '🚗', group: 'Lifestyle' },
];

export const categoryGroupOrder: CategoryGroup[] = [
  'Sports',
  'Entertainment',
  'People & Society',
  'Nature & Animals',
  'Lifestyle',
];

export const groupIcons: Record<CategoryGroup, string> = {
  Sports: '⚽',
  Entertainment: '🎬',
  'People & Society': '⭐',
  'Nature & Animals': '🌿',
  Lifestyle: '🏠',
};

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function getCategoriesByGroup(group: CategoryGroup): Category[] {
  return categories.filter((c) => c.group === group);
}
