import './App.css';

import Content from './Content';
import { DataFetcher } from './data-fetcher';
import { RedPandaDataProvider } from './data-providers';
import { LayoutContextProvider, FriendListProvider } from './models';

function App() {
  return (
    <FriendListProvider>
      <LayoutContextProvider>
        <div className='App'>
          <Content />
        </div>
        <DataFetcher username='' dataProvider={RedPandaDataProvider} />
      </LayoutContextProvider>
    </FriendListProvider>
  );
}

export default App;
