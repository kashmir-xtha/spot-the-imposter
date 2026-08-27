import { Avatar } from '../types';

/**
 * Cute animal/entity avatars randomly assigned to players each game.
 * Rendered as emoji inside a circular badge (see AvatarDisplay component),
 * each with its own accent color used for the badge ring/background tint.
 */
export const avatars: Avatar[] = [
  { id: 'unicorn', emoji: '🦄', label: 'Unicorn', color: '#7DD3FC' },
  { id: 'cat', emoji: '🐱', label: 'Cat', color: '#FCD34D' },
  { id: 'dog', emoji: '🐶', label: 'Dog', color: '#D4A373' },
  { id: 'fox', emoji: '🦊', label: 'Fox', color: '#FB923C' },
  { id: 'panda', emoji: '🐼', label: 'Panda', color: '#E5E7EB' },
  { id: 'frog', emoji: '🐸', label: 'Frog', color: '#4ADE80' },
  { id: 'tiger', emoji: '🐯', label: 'Tiger', color: '#FBBF24' },
  { id: 'koala', emoji: '🐨', label: 'Koala', color: '#9CA3AF' },
  { id: 'lion', emoji: '🦁', label: 'Lion', color: '#F59E0B' },
  { id: 'monkey', emoji: '🐵', label: 'Monkey', color: '#A16207' },
  { id: 'rabbit', emoji: '🐰', label: 'Rabbit', color: '#F1F5F9' },
  { id: 'bear', emoji: '🐻', label: 'Bear', color: '#B45309' },
  { id: 'penguin', emoji: '🐧', label: 'Penguin', color: '#38BDF8' },
  { id: 'owl', emoji: '🦉', label: 'Owl', color: '#A78BFA' },
  { id: 'octopus', emoji: '🐙', label: 'Octopus', color: '#F472B6' },
  { id: 'bee', emoji: '🐝', label: 'Bee', color: '#FACC15' },
  { id: 'turtle', emoji: '🐢', label: 'Turtle', color: '#34D399' },
  { id: 'dragon', emoji: '🐲', label: 'Dragon', color: '#4ADE80' },
  { id: 'ghost', emoji: '👻', label: 'Ghost', color: '#E5E7EB' },
  { id: 'alien', emoji: '👽', label: 'Alien', color: '#84CC16' },
];

export function getAvatarById(id: string): Avatar {
  return avatars.find((a) => a.id === id) ?? avatars[0];
}
