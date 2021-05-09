import { useContext } from 'react';

import { CircleLayout } from './circle-layout';
import { Configurator } from './configurator';
import { LayoutContext } from './models';
import { DataFetcher } from './data-fetcher';
import { RedPandaDataProvider } from './data-providers';

const Content = () => {
  const { circles } = useContext(LayoutContext);

  return (
    <div className='content'>
      <CircleLayout circles={circles} />
      <Configurator />
      <DataFetcher username='' dataProvider={RedPandaDataProvider} />
    </div>
  );
};

Content.displayName = 'Content';

export default Content;
