import { useContext } from 'react';

import { CircleLayout } from '../circle-layout';
import { Configurator } from '../configurator';
import { FriendList, Settings } from '../models';

import './ResultsPage.css';

const ResultsPage = () => {
  const { friends, error } = useContext(FriendList);
  const { circles } = useContext(Settings);

  if (error) {
    return <div className='error'>{error}</div>;
  }

  if (!friends.length) {
    return <div className='loading'>Loading...</div>;
  }

  return (
    <div className='container-md' id='results-page'>
      <div className='row'>
        <div className='col'>
          <div id='results-wrapper'>
            <CircleLayout circles={circles} />
          </div>
        </div>
        <div className='col-md-4'>
          <Configurator />
        </div>
      </div>
    </div>
  );
};

ResultsPage.displayName = 'ResultsPage';

export default ResultsPage;
