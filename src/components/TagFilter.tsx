import React from 'react';
import { Tag } from '../types';
import TagPill from './TagPill'; // Assuming TagPill is in the same folder

interface TagFilterProps {
  activeFilters: Tag[];
  onRemoveFilter: (tag: Tag) => void;
}

const TagFilter: React.FC<TagFilterProps> = ({ activeFilters, onRemoveFilter }) => {
  if (activeFilters.length === 0) {
    return <p style={{ margin: '15px 0', fontStyle: 'italic' }}>No filters active. Select a tag from the list above or from a music item.</p>;
  }

  return (
    <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #eee', backgroundColor: '#f9f9f9' }}>
      <h3>Active Filters (click to remove):</h3>
      <div>
        {activeFilters.map(tag => (
          <TagPill
            key={tag}
            tag={tag}
            onClick={() => onRemoveFilter(tag)}
            isSelected={true} // Indicate it's an active filter part
          />
        ))}
      </div>
    </div>
  );
};

export default TagFilter;
