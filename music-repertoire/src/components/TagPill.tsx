import React from 'react';
import { Tag } from '../types'; // Assuming types.ts is in src

interface TagPillProps {
  tag: Tag;
  onClick?: (tag: Tag) => void;
  isSelected?: boolean;
}

const TagPill: React.FC<TagPillProps> = ({ tag, onClick, isSelected }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(tag);
    }
  };

  return (
    <span 
      style={{ 
        border: '1px solid #ccc', 
        padding: '2px 5px', 
        margin: '2px', 
        borderRadius: '3px', 
        cursor: onClick ? 'pointer' : 'default',
        backgroundColor: isSelected ? 'lightblue' : 'transparent'
      }}
      onClick={handleClick}
    >
      {tag}
    </span>
  );
};

export default TagPill;
