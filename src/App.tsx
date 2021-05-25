import { BrowserRouter as Router } from 'react-router-dom';

import { ResultsPage } from './results-page';
import { DataFetcherSwitch } from './data-fetcher';
import { SettingsProvider, FriendListProvider } from './models';

import './App.css';

function App() {
  return (
    <FriendListProvider>
      <SettingsProvider>
        <div id='app'>
          <Router>
            <ResultsPage />

            <DataFetcherSwitch />
          </Router>
        </div>
      </SettingsProvider>
    </FriendListProvider>
  );
}

export default App;
