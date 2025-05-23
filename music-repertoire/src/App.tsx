import React from 'react';
import './App.css';
import MusicForm from './components/MusicForm';
import MusicList from './components/MusicList';
import TagFilter from './components/TagFilter';
import TagSelector from './components/TagSelector';
import { MusicProvider, useMusic } from './context/MusicContext'; // Import provider and hook

// Main App content component
const AppContent: React.FC = () => {
  const { 
    allTags, 
    activeFilters, 
    addTagToFilter, // Renamed from handleTagClickOnMusicItem for clarity with context
    removeTagFromFilter, // Renamed from handleRemoveFilter
    setInitialTagFilter, // Renamed from handleTagSelect
    getFilteredMusicItems 
  } = useMusic();

  const filteredItems = getFilteredMusicItems();

  return (
    <main>
      <MusicForm /> {/* Will use context to add items */}
      <TagSelector allTags={allTags} onSelectTag={setInitialTagFilter} />
      <TagFilter activeFilters={activeFilters} onRemoveFilter={removeTagFromFilter} />
      <MusicList musicItems={filteredItems} onTagClickInListItem={addTagToFilter} />
    </main>
  );
};

function App() {
  return (
    <MusicProvider> {/* Wrap content with provider */}
      <div className="App">
        <header className="App-header">
          <h1>Music Repertoire</h1>
        </header>
        <AppContent />
      </div>
    </MusicProvider>
  );
}

export default App;
