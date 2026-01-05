'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useFavorites } from '@/hooks/useFavorites';
import { FavoritesState, FavoriteItem } from '@/types/favorites';

const FavoritesContext = createContext<FavoritesState | undefined>(undefined);

interface FavoritesProviderProps {
  children: ReactNode;
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const favoritesLogic = useFavorites();

  const value: FavoritesState = {
    favorites: favoritesLogic.favorites,
    addFavorite: favoritesLogic.addFavorite,
    removeFavorite: favoritesLogic.removeFavorite,
    isFavorite: favoritesLogic.isFavorite,
    clearFavorites: favoritesLogic.clearFavorites,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavoritesContext(): FavoritesState {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavoritesContext must be used within a FavoritesProvider');
  }
  return context;
}