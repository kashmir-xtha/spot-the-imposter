import React, { createContext, useCallback, useContext, useMemo, useReducer } from 'react';
import { GamePhase, GameState, Player } from '../types';
import { avatars } from '../data/avatars';
import { ALL_CATEGORIES_ID, categories } from '../data/categories';
import { getEntityPool } from '../data/entities';
import { assignUnique, pickRandom, pickUniqueIndices } from '../utils/random';

export const MIN_PLAYERS = 3;
export const MAX_PLAYERS = 20;
export const MIN_IMPOSTERS = 1;

const allCategoryIds = categories.map((c) => c.id);

function defaultPlayerNames(count: number): string[] {
  return Array.from({ length: count }, (_, i) => `Player ${i + 1}`);
}

const initialState: GameState = {
  players: [],
  secretWord: '',
  secretCategoryId: null,
  currentPlayerIndex: 0,
  settings: {
    playerCount: MIN_PLAYERS,
    imposterCount: 1,
    selectedCategoryIds: [ALL_CATEGORIES_ID],
    playerNames: defaultPlayerNames(MIN_PLAYERS),
  },
  phase: 'setup',
};

type Action =
  | { type: 'SET_PLAYER_COUNT'; count: number }
  | { type: 'SET_PLAYER_NAME'; index: number; name: string }
  | { type: 'SET_IMPOSTER_COUNT'; count: number }
  | { type: 'TOGGLE_CATEGORY'; id: string }
  | { type: 'SELECT_ALL_CATEGORIES' }
  | { type: 'START_GAME' }
  | { type: 'NEXT_PLAYER' }
  | { type: 'START_DISCUSSION' }
  | { type: 'END_GAME' }
  | { type: 'PLAY_AGAIN' }
  | { type: 'RESET_TO_HOME' };

function clampImposters(imposterCount: number, playerCount: number): number {
  return Math.max(MIN_IMPOSTERS, Math.min(imposterCount, playerCount));
}

function buildPlayers(
  names: string[],
  imposterCount: number,
): { players: Player[]; secretIndexForImposters: number[] } {
  const shuffledAvatars = assignUnique(
    avatars.map((a) => a.id),
    names.length,
  );
  const imposterIndices = pickUniqueIndices(names.length, imposterCount);
  const imposterSet = new Set(imposterIndices);

  const players: Player[] = names.map((name, index) => ({
    id: index,
    name,
    avatarId: shuffledAvatars[index],
    role: imposterSet.has(index) ? 'imposter' : 'player',
    hasRevealed: false,
  }));

  return { players, secretIndexForImposters: imposterIndices };
}

function resolveCategoryIds(selected: string[]): string[] {
  if (selected.length === 0 || selected.includes(ALL_CATEGORIES_ID)) {
    return allCategoryIds;
  }
  return selected;
}

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'SET_PLAYER_COUNT': {
      const playerCount = Math.max(MIN_PLAYERS, Math.min(action.count, MAX_PLAYERS));
      const existingNames = state.settings.playerNames;
      const playerNames = Array.from({ length: playerCount }, (_, i) =>
        existingNames[i] && existingNames[i].trim().length > 0
          ? existingNames[i]
          : `Player ${i + 1}`,
      );
      return {
        ...state,
        settings: {
          ...state.settings,
          playerCount,
          playerNames,
          imposterCount: clampImposters(state.settings.imposterCount, playerCount),
        },
      };
    }
    case 'SET_PLAYER_NAME': {
      const playerNames = [...state.settings.playerNames];
      playerNames[action.index] = action.name;
      return {
        ...state,
        settings: { ...state.settings, playerNames },
      };
    }
    case 'SET_IMPOSTER_COUNT': {
      return {
        ...state,
        settings: {
          ...state.settings,
          imposterCount: clampImposters(action.count, state.settings.playerCount),
        },
      };
    }
    case 'TOGGLE_CATEGORY': {
      const { selectedCategoryIds } = state.settings;
      if (action.id === ALL_CATEGORIES_ID) {
        return {
          ...state,
          settings: { ...state.settings, selectedCategoryIds: [ALL_CATEGORIES_ID] },
        };
      }
      const withoutAll = selectedCategoryIds.filter((id) => id !== ALL_CATEGORIES_ID);
      const isSelected = withoutAll.includes(action.id);
      let next = isSelected
        ? withoutAll.filter((id) => id !== action.id)
        : [...withoutAll, action.id];

      // If every individual category ends up selected, collapse to "All".
      if (next.length === allCategoryIds.length) {
        next = [ALL_CATEGORIES_ID];
      }
      if (next.length === 0) {
        next = [];
      }
      return {
        ...state,
        settings: { ...state.settings, selectedCategoryIds: next },
      };
    }
    case 'SELECT_ALL_CATEGORIES': {
      return {
        ...state,
        settings: { ...state.settings, selectedCategoryIds: [ALL_CATEGORIES_ID] },
      };
    }
    case 'START_GAME':
    case 'PLAY_AGAIN': {
      const resolvedCategoryIds = resolveCategoryIds(state.settings.selectedCategoryIds);
      const pool = getEntityPool(resolvedCategoryIds);
      // Pick the word and its hint category together so they can never end up
      // mismatched when multiple categories are selected.
      const chosenEntry =
        pool.length > 0 ? pickRandom(pool) : { word: 'Mystery', categoryId: resolvedCategoryIds[0] ?? null };
      const secretWord = chosenEntry.word;
      const secretCategoryId = chosenEntry.categoryId;
      const names =
        state.settings.playerNames.length === state.settings.playerCount
          ? state.settings.playerNames
          : defaultPlayerNames(state.settings.playerCount);
      const { players } = buildPlayers(names, state.settings.imposterCount);

      return {
        ...state,
        players,
        secretWord,
        secretCategoryId,
        currentPlayerIndex: 0,
        phase: 'reveal' as GamePhase,
      };
    }
    case 'NEXT_PLAYER': {
      const players = state.players.map((p, idx) =>
        idx === state.currentPlayerIndex ? { ...p, hasRevealed: true } : p,
      );
      const isLast = state.currentPlayerIndex >= players.length - 1;
      return {
        ...state,
        players,
        currentPlayerIndex: isLast ? state.currentPlayerIndex : state.currentPlayerIndex + 1,
      };
    }
    case 'START_DISCUSSION': {
      return { ...state, phase: 'discussion' };
    }
    case 'END_GAME': {
      return { ...state, phase: 'results' };
    }
    case 'RESET_TO_HOME': {
      return {
        ...initialState,
        settings: state.settings,
      };
    }
    default:
      return state;
  }
}

type GameContextValue = {
  state: GameState;
  setPlayerCount: (count: number) => void;
  setImposterCount: (count: number) => void;
  toggleCategory: (id: string) => void;
  selectAllCategories: () => void;
  setPlayerName: (index: number, name: string) => void;
  startGame: () => void;
  nextPlayer: () => void;
  startDiscussion: () => void;
  endGame: () => void;
  playAgain: () => void;
  resetToHome: () => void;
  isConfigValid: boolean;
  effectiveCategoryIds: string[];
  categoryLabel: string;
};

const GameContext = createContext<GameContextValue | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setPlayerCount = useCallback((count: number) => {
    dispatch({ type: 'SET_PLAYER_COUNT', count });
  }, []);

  const setImposterCount = useCallback((count: number) => {
    dispatch({ type: 'SET_IMPOSTER_COUNT', count });
  }, []);

  const toggleCategory = useCallback((id: string) => {
    dispatch({ type: 'TOGGLE_CATEGORY', id });
  }, []);

  const selectAllCategories = useCallback(() => {
    dispatch({ type: 'SELECT_ALL_CATEGORIES' });
  }, []);

  const setPlayerName = useCallback((index: number, name: string) => {
    dispatch({ type: 'SET_PLAYER_NAME', index, name });
  }, []);

  const startGame = useCallback(() => {
    dispatch({ type: 'START_GAME' });
  }, []);

  const nextPlayer = useCallback(() => {
    dispatch({ type: 'NEXT_PLAYER' });
  }, []);

  const startDiscussion = useCallback(() => {
    dispatch({ type: 'START_DISCUSSION' });
  }, []);

  const endGame = useCallback(() => {
    dispatch({ type: 'END_GAME' });
  }, []);

  const playAgain = useCallback(() => {
    dispatch({ type: 'PLAY_AGAIN' });
  }, []);

  const resetToHome = useCallback(() => {
    dispatch({ type: 'RESET_TO_HOME' });
  }, []);

  const effectiveCategoryIds = useMemo(
    () => resolveCategoryIds(state.settings.selectedCategoryIds),
    [state.settings.selectedCategoryIds],
  );

  const isConfigValid = useMemo(() => {
    const { playerCount, imposterCount, selectedCategoryIds } = state.settings;
    return (
      playerCount >= MIN_PLAYERS &&
      imposterCount >= MIN_IMPOSTERS &&
      imposterCount <= playerCount &&
      selectedCategoryIds.length > 0
    );
  }, [state.settings]);

  const categoryLabel = useMemo(() => {
    const { selectedCategoryIds } = state.settings;
    if (selectedCategoryIds.length === 0) return 'Select categories';
    if (selectedCategoryIds.includes(ALL_CATEGORIES_ID)) return 'All Categories';
    if (selectedCategoryIds.length === 1) {
      const found = categories.find((c) => c.id === selectedCategoryIds[0]);
      return found ? found.label : '1 Category';
    }
    return `${selectedCategoryIds.length} Categories`;
  }, [state.settings]);

  const value: GameContextValue = {
    state,
    setPlayerCount,
    setImposterCount,
    toggleCategory,
    selectAllCategories,
    setPlayerName,
    startGame,
    nextPlayer,
    startDiscussion,
    endGame,
    playAgain,
    resetToHome,
    isConfigValid,
    effectiveCategoryIds,
    categoryLabel,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame(): GameContextValue {
  const ctx = useContext(GameContext);
  if (!ctx) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return ctx;
}
