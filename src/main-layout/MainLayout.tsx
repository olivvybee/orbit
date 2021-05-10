import { useContext } from 'react';

import { CircleLayout } from '../circle-layout';
import { Configurator } from '../configurator';
import { FriendList, Settings } from '../models';

import './MainLayout.css';

const MainLayout = () => {
  const { friends, error } = useContext(FriendList);
  const { circles } = useContext(Settings);

  if (error) {
    return <div className='error'>{error}</div>;
  }

  if (!friends.length) {
    return <div className='loading'>Loading...</div>;
  }

  return (
    <div id='main-layout'>
      <CircleLayout circles={circles} />
      <div id='spacer' />
      <Configurator />
    </div>
  );
};

MainLayout.displayName = 'MainLayout';

export default MainLayout;
