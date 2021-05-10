import { useContext } from 'react';

import { CircleLayout } from './circle-layout';
import { Configurator } from './configurator';
import { FriendList, Settings } from './models';

const Content = () => {
  const { friends, error } = useContext(FriendList);
  const { circles } = useContext(Settings);

  if (error) {
    return <div className='error'>{error}</div>;
  }

  if (!friends.length) {
    return <div className='loading'>Loading...</div>;
  }

  return (
    <div className='content'>
      <CircleLayout circles={circles} />
      <Configurator />
    </div>
  );
};

Content.displayName = 'Content';

export default Content;
