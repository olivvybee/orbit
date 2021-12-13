import { useContext, useMemo, useRef } from 'react';
import { Stage } from 'konva/types/Stage';

import { CircleLayout } from '../circle-layout';
import { Configurator } from '../configurator';
import { FriendList, Settings } from '../models';
import { ResultDetails } from '../result-details';
import { distributeItems } from '../circle-layout/distribute-items';
import { calculateLayout } from '../circle-layout/calculate-layout';
import { LoadingScreen } from '../loading-screen';
import { ErrorScreen } from '../error-screen';

import { EXPORT_FILE_NAME } from './constants';

import './ResultsPage.css';
import { CANVAS_SIZE } from '../circle-layout/constants';

const ResultsPage = () => {
  const { friends, hiddenFriends, hideFriend, unhideFriends, error } =
    useContext(FriendList);
  const { circles } = useContext(Settings);

  const visibleFriends = friends.filter(
    (friend) =>
      !hiddenFriends.some((hiddenFriend) => hiddenFriend.id === friend.id)
  );

  const layout = useMemo(() => calculateLayout(circles), [circles]);
  const itemDistribution = useMemo(
    () => distributeItems(visibleFriends, circles),
    [visibleFriends, circles]
  );

  const onPressPerson = (id: string) => {
    const friendToHide = friends.find((friend) => friend.id === id);
    if (friendToHide) {
      hideFriend(friendToHide);
    }
  };

  const stageRef = useRef<Stage>(null);

  const exportImage = () => {
    if (!stageRef.current) {
      return;
    }

    const prevSize = stageRef.current.width();
    const prevScale = stageRef.current.scale();

    stageRef.current.width(CANVAS_SIZE);
    stageRef.current.height(CANVAS_SIZE);
    stageRef.current.scale({ x: 1, y: 1 });

    const url = stageRef.current.toDataURL();
    const a = document.createElement('a');
    a.download = EXPORT_FILE_NAME;
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    stageRef.current.width(prevSize);
    stageRef.current.height(prevSize);
    stageRef.current.scale(prevScale);
    stageRef.current.drawScene();
  };

  if (error) {
    return <ErrorScreen>{error}</ErrorScreen>;
  }

  if (!friends.length) {
    return <LoadingScreen />;
  }

  return (
    <div className='container-md' id='results-page'>
      <div className='row gy-4'>
        <div className='col '>
          <div id='results-wrapper'>
            <CircleLayout
              layout={layout}
              itemDistribution={itemDistribution}
              stageRef={stageRef}
              onPressPerson={onPressPerson}
            />
          </div>
        </div>

        <div className='col-md-4 d-flex flex-column align-items-center'>
          <div className='d-flex flex-row align-items-center mb-4'>
            <button
              type='button'
              id='reset-button'
              className='btn btn-primary me-4'
              onClick={unhideFriends}>
              Reset
            </button>

            <button
              type='button'
              id='export-button'
              className='btn btn-primary'
              onClick={exportImage}>
              Download image
            </button>
          </div>

          <div className='border border-primary p-3 rounded-3 mb-4'>
            Orbit is run by a single person. If you like the app, please
            consider{' '}
            <a
              href='https://ko-fi.com/olivvybee'
              target='_blank'
              rel='noreferrer'>
              buying her a coffee
            </a>
            .
          </div>

          <div className='w-100 accordion'>
            <Configurator />
            <ResultDetails itemDistribution={itemDistribution} />
          </div>
        </div>
      </div>
    </div>
  );
};

ResultsPage.displayName = 'ResultsPage';

export default ResultsPage;
