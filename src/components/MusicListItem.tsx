import React from 'react';
import { MusicItem, Tag } from '../types';
import TagPill from './TagPill'; // Assuming TagPill is in the same folder
import { useMusic } from '../context/MusicContext'; // To access activeFilters

interface MusicListItemProps {
  item: MusicItem;
  onTagClick: (tag: Tag) => void; // This will call addTagToFilter from context
}

const MusicListItem: React.FC<MusicListItemProps> = ({ item, onTagClick }) => {
  const { activeFilters } = useMusic();

  // Tags for this item that are not already in activeFilters
  const nonActiveTags = item.tags.filter(tag => !activeFilters.includes(tag));
  // Tags for this item that ARE in activeFilters (to potentially style them differently, or just show all)
  const currentItemActiveTags = item.tags.filter(tag => activeFilters.includes(tag));


  return (
    <div style={{ padding: '10px', borderBottom: '1px solid #f0f0f0' }}>
      <h4 style={{ marginBottom: '5px' }}>{item.title}</h4>
      <div style={{ marginBottom: '5px' }}>
        <small>Content: {item.content.substring(0, 100)}{item.content.length > 100 ? '...' : ''}</small>
      </div>
      <div>
        <strong>Tags: </strong>
        {/* Display tags that are part of the current filter for this item */}
        {currentItemActiveTags.map(tag => (
          <TagPill
            key={tag}
            tag={tag}
            isSelected={true} // Mark as selected as it's an active filter
          />
        ))}
        {/* Display other tags for this item that can be added to the filter */}
        {nonActiveTags.map(tag => (
          <TagPill
            key={tag}
            tag={tag}
            onClick={() => onTagClick(tag)} // Click to add to filter
          />
        ))}
      </div>
    </div>
  );
};

export default MusicListItem;
