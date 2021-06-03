import { Switch, Route } from 'react-router-dom';
import { RedPandaDataProvider, TwitterDataProvider } from '../data-providers';
import { DataFetcher } from './DataFetcher';

const DataFetcherSwitch = () => (
  <Switch>
    <Route path='/twitter/:username'>
      {({ match, location }) => {
        const params = new URLSearchParams(location.search);
        return (
          <DataFetcher
            dataProvider={TwitterDataProvider}
            username={match?.params.username || ''}
            params={{
              ignoreLikes: params.get('ignoreLikes') === 'true',
            }}
          />
        );
      }}
    </Route>

    <Route path='/pandas'>
      <DataFetcher dataProvider={RedPandaDataProvider} username='' />
    </Route>
  </Switch>
);

DataFetcherSwitch.displayName = 'DataFetcherSwitch';

export default DataFetcherSwitch;
