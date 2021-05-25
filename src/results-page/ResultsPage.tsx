import { useContext, useRef } from 'react';
import { Stage } from 'konva/types/Stage';

import { CircleLayout } from '../circle-layout';
import { Configurator } from '../configurator';
import { FriendList, Settings } from '../models';

import { EXPORT_FILE_NAME } from './constants';

import './ResultsPage.css';

const ResultsPage = () => {
  const { friends, error } = useContext(FriendList);
  const { circles } = useContext(Settings);

  const stageRef = useRef<Stage>(null);

  const exportImage = () => {
    if (!stageRef.current) {
      return;
    }

    const url = stageRef.current.toDataURL();
    const a = document.createElement('a');
    a.download = EXPORT_FILE_NAME;
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (error) {
    return <div className='error'>{error}</div>;
  }

  if (!friends.length) {
    return <div className='loading'>Loading...</div>;
  }

  return (
    <div className='container-md' id='results-page'>
      <div className='row gy-2'>
        <div className='col'>
          <div id='results-wrapper'>
            <CircleLayout circles={circles} stageRef={stageRef} />
          </div>
        </div>

        <div className='col-md-4'>
          <button
            type='button'
            id='export-button'
            className='btn btn-primary'
            onClick={exportImage}>
            Download image
          </button>

          <Configurator />
        </div>
      </div>
    </div>
  );
};

ResultsPage.displayName = 'ResultsPage';

export default ResultsPage;
