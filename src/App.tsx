import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { ResultsPage } from './results-page';
import { DataFetcherSwitch } from './data-fetcher';
import { SettingsProvider, FriendListProvider } from './models';

import './App.css';
import { Homepage } from './homepage';

function App() {
  return (
    <FriendListProvider>
      <SettingsProvider>
        <div id='app'>
          <Router>
            <Switch>
              <Route path='/' exact>
                <Homepage />
              </Route>
              <Route>
                <ResultsPage />
              </Route>
            </Switch>

            <DataFetcherSwitch />
          </Router>
        </div>
      </SettingsProvider>
    </FriendListProvider>
  );
}

export default App;
