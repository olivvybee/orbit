import { BrowserRouter as Router } from 'react-router-dom';

import { MainLayout } from './main-layout';
import { DataFetcherSwitch } from './data-fetcher';
import { SettingsProvider, FriendListProvider } from './models';

import './App.css';

function App() {
  return (
    <FriendListProvider>
      <SettingsProvider>
        <div id='app'>
          <Router>
            <MainLayout />

            <DataFetcherSwitch />
          </Router>
        </div>
      </SettingsProvider>
    </FriendListProvider>
  );
}

export default App;
