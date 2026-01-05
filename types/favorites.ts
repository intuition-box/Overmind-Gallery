export interface FavoriteItem {
  id: string;
  type: 'nft' | 'collection';
  name: string;
  image: string;
  collection?: string;
  creator?: string;
  addedAt: Date;
}

export interface FavoritesState {
  favorites: FavoriteItem[];
  addFavorite: (item: Omit<FavoriteItem, 'addedAt'>) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
}

export type FavoriteType = 'nft' | 'collection';