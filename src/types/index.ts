export type PlayerRole = 'player' | 'imposter';

export type Player = {
  id: number;
  name: string;
  avatarId: string;
  role: PlayerRole;
  hasRevealed: boolean;
};

export type CategoryId = string;

export type Category = {
  id: CategoryId;
  label: string;
  icon: string;
  group: CategoryGroup;
};

export type CategoryGroup =
  | 'Sports'
  | 'Entertainment'
  | 'People & Society'
  | 'Nature & Animals'
  | 'Lifestyle';

export type GameSettings = {
  playerCount: number;
  imposterCount: number;
  selectedCategoryIds: CategoryId[];
  playerNames: string[];
};

export type GamePhase =
  | 'setup'
  | 'reveal'
  | 'discussion'
  | 'results';

export type GameState = {
  players: Player[];
  secretWord: string;
  secretCategoryId: CategoryId | null;
  currentPlayerIndex: number;
  settings: GameSettings;
  phase: GamePhase;
};

export type Avatar = {
  id: string;
  emoji: string;
  label: string;
  color: string;
};
