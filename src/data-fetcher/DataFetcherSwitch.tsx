import { Switch, Route } from 'react-router-dom';
import { RedPandaDataProvider, TwitterDataProvider } from '../data-providers';
import { DataFetcher } from './DataFetcher';

const DataFetcherSwitch = () => (
  <Switch>
    <Route path='/twitter/:username'>
      {({ match }) => (
        <DataFetcher
          dataProvider={TwitterDataProvider}
          username={match?.params.username || ''}
        />
      )}
    </Route>

    <Route>
      <DataFetcher dataProvider={RedPandaDataProvider} username='' />
    </Route>
  </Switch>
);

DataFetcherSwitch.displayName = 'DataFetcherSwitch';

export default DataFetcherSwitch;
