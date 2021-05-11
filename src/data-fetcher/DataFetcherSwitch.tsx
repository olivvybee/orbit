import { Switch, Route } from 'react-router-dom';
import { RedPandaDataProvider, TwitterDataProvider } from '../data-providers';
import { DataFetcher } from './DataFetcher';

const DataFetcherSwitch = () => (
  <Switch>
    <Route path='/panda'>
      <DataFetcher dataProvider={RedPandaDataProvider} username='' />
    </Route>
    <Route path='/twitter/:username'>
      {({ match }) => (
        <DataFetcher
          dataProvider={TwitterDataProvider}
          username={match?.params.username || ''}
        />
      )}
    </Route>
  </Switch>
);

DataFetcherSwitch.displayName = 'DataFetcherSwitch';

export default DataFetcherSwitch;
