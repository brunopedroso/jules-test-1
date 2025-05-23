import React from 'react';
import { Tag } from '../types';
import TagPill from './TagPill'; // Assuming TagPill is in the same folder
import { useMusic } from '../context/MusicContext'; // To access activeFilters

interface TagSelectorProps {
  allTags: Tag[];
  onSelectTag: (tag: Tag) => void; // This will call setInitialTagFilter from context
}

const TagSelector: React.FC<TagSelectorProps> = ({ allTags, onSelectTag }) => {
  const { activeFilters } = useMusic();

  if (allTags.length === 0) {
    return <p>No tags available yet. Add some music with tags!</p>;
  }

  return (
    <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #eee' }}>
      <h3>Select a Tag to Start Filtering:</h3>
      <div>
        {allTags.map(tag => (
          <TagPill
            key={tag}
            tag={tag}
            onClick={() => onSelectTag(tag)}
            isSelected={activeFilters.length === 1 && activeFilters[0] === tag}
          />
        ))}
      </div>
    </div>
  );
};

export default TagSelector;
