import React from 'react';
import { MusicItem, Tag } from '../types';
import MusicListItem from './MusicListItem';
import { useMusic } from '../context/MusicContext'; // Import useMusic

interface MusicListProps {
  musicItems: MusicItem[];
  onTagClickInListItem: (tag: Tag) => void;
}

const MusicList: React.FC<MusicListProps> = ({ musicItems, onTagClickInListItem }) => {
  const { activeFilters } = useMusic(); // Get activeFilters from context

  if (activeFilters.length === 0 && musicItems.length === 0) {
    return <p style={{ margin: '15px 0', fontStyle: 'italic' }}>Select a tag from "Select a Tag to Start Filtering" to view music.</p>;
  }

  if (musicItems.length === 0 && activeFilters.length > 0) {
    return <p style={{ margin: '15px 0', fontStyle: 'italic' }}>No music items match the current filters. Try removing some filters or adding new music with these tags.</p>;
  }
  
  // This case might not be strictly necessary if getFilteredMusicItems never returns all items when no filters are set.
  // However, if there's music but no filters are chosen (e.g. if TagSelector wasn't used yet), this could be a state.
  // Given current logic of getFilteredMusicItems (returns [] if activeFilters is empty), this might not be hit.
  // Let's keep it simple based on the above two conditions. If musicItems has items, it means filters are active and items match.

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Music List</h2>
      {musicItems.map(item => (
        <MusicListItem 
          key={item.id} 
          item={item} 
          onTagClick={onTagClickInListItem}
        />
      ))}
    </div>
  );
};

export default MusicList;
