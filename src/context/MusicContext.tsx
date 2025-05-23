import React, { createContext, useContext, useState, ReactNode, useMemo, useCallback } from 'react';
import { MusicItem, Tag } from '../types'; // Adjust path if necessary
import { v4 as uuidv4 } from 'uuid'; // We'll need to install uuid

export interface MusicState {
  musicItems: MusicItem[];
  allTags: Tag[];
  activeFilters: Tag[];
}

export interface MusicContextType extends MusicState {
  addMusicItem: (item: Omit<MusicItem, 'id' | 'tags'> & { tags: string }) => void; // Tags as comma-separated string
  addTagToFilter: (tag: Tag) => void;
  removeTagFromFilter: (tag: Tag) => void;
  setInitialTagFilter: (tag: Tag) => void; // For when a user first clicks a tag in TagSelector
  getFilteredMusicItems: () => MusicItem[];
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [musicItems, setMusicItems] = useState<MusicItem[]>([]);
  const [activeFilters, setActiveFilters] = useState<Tag[]>([]);

  const allTags = useMemo(() => {
    const tagsSet = new Set<Tag>();
    musicItems.forEach(item => item.tags.forEach(tag => tagsSet.add(tag)));
    return Array.from(tagsSet).sort();
  }, [musicItems]);

  const addMusicItem = useCallback((item: Omit<MusicItem, 'id' | 'tags'> & { tags: string }) => {
    const newMusicItem: MusicItem = {
      ...item,
      id: uuidv4(),
      tags: item.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
    };
    setMusicItems(prevItems => [...prevItems, newMusicItem]);
  }, []);

  const addTagToFilter = useCallback((tag: Tag) => {
    setActiveFilters(prevFilters => {
      if (!prevFilters.includes(tag)) {
        return [...prevFilters, tag];
      }
      return prevFilters;
    });
  }, []);

  const removeTagFromFilter = useCallback((tag: Tag) => {
    setActiveFilters(prevFilters => prevFilters.filter(t => t !== tag));
  }, []);
  
  const setInitialTagFilter = useCallback((tag: Tag) => {
    setActiveFilters([tag]);
  }, []);

  const getFilteredMusicItems = useCallback(() => {
    if (activeFilters.length === 0) {
      // If no filters, initially show nothing or everything? For now, let's show items matching at least one tag if any music exists,
      // or prompt to select a tag. The requirements imply starting with one tag.
      // Let's refine this: if no filters, show all music. TagSelector will initiate the first filter.
      // However, the prompt says "I choose one existing tag, it lists me the music titles with that tag".
      // So, if activeFilters is empty, we should show nothing *until* a TagSelector tag is chosen.
      // Or, if a specific view "show all" is desired, that's a different state.
      // For now, let's stick to: if activeFilters is empty, no items are shown.
      // The TagSelector will set the first filter.
      return [];
    }
    return musicItems.filter(item => 
      activeFilters.every(filterTag => item.tags.includes(filterTag))
    );
  }, [musicItems, activeFilters]);

  const contextValue = useMemo(() => ({
    musicItems,
    allTags,
    activeFilters,
    addMusicItem,
    addTagToFilter,
    removeTagFromFilter,
    setInitialTagFilter,
    getFilteredMusicItems,
  }), [musicItems, allTags, activeFilters, addMusicItem, addTagToFilter, removeTagFromFilter, setInitialTagFilter, getFilteredMusicItems]);

  return (
    <MusicContext.Provider value={contextValue}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = (): MusicContextType => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};
