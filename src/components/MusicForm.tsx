import React, { useState } from 'react';
import { useMusic } from '../context/MusicContext';

const MusicForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState(''); // Tags as a comma-separated string

  const { addMusicItem } = useMusic();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('Title and content are required.'); // Basic validation
      return;
    }
    addMusicItem({ title, content, tags });
    setTitle('');
    setContent('');
    setTags('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #eee' }}>
      <h2>Add New Music</h2>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="title" style={{ display: 'block', marginBottom: '5px' }}>Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="content" style={{ display: 'block', marginBottom: '5px' }}>Content:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          style={{ width: '100%', padding: '8px', minHeight: '80px', boxSizing: 'border-box' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="tags" style={{ display: 'block', marginBottom: '5px' }}>Tags (comma-separated):</label>
        <input
          type="text"
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
      </div>
      <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        Add Music
      </button>
    </form>
  );
};

export default MusicForm;
