import './App.css';

import { MainLayout } from './main-layout';
import { DataFetcher } from './data-fetcher';
import { RedPandaDataProvider } from './data-providers';
import { SettingsProvider, FriendListProvider } from './models';

function App() {
  return (
    <FriendListProvider>
      <SettingsProvider>
        <div id='app'>
          <MainLayout />
        </div>
        <DataFetcher username='' dataProvider={RedPandaDataProvider} />
      </SettingsProvider>
    </FriendListProvider>
  );
}

export default App;
