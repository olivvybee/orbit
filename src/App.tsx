import './App.css';

import Content from './Content';
import { DataFetcher } from './data-fetcher';
import { RedPandaDataProvider } from './data-providers';
import { SettingsProvider, FriendListProvider } from './models';

function App() {
  return (
    <FriendListProvider>
      <SettingsProvider>
        <div className='App'>
          <Content />
        </div>
        <DataFetcher username='' dataProvider={RedPandaDataProvider} />
      </SettingsProvider>
    </FriendListProvider>
  );
}

export default App;
