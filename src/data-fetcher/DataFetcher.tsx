import { useContext, useEffect } from 'react';

import { FriendList, ImageStore } from '../models';

import { DataFetcherProps } from './interfaces';

export const DataFetcher: React.FC<DataFetcherProps> = ({
  username,
  dataProvider,
}) => {
  const { setFriends } = useContext(FriendList);

  useEffect(() => {
    const fetch = async () => {
      const friends = await dataProvider(username);
      if (friends) {
        const promises: Promise<void>[] = [];
        const friendsWithImages = friends.map((friend) => {
          const imageElement = document.createElement('img');
          imageElement.src = friend.avatarUrl;
          const promise = new Promise<void>((resolve) => {
            if (imageElement.naturalWidth > 0) {
              console.log('resolving, already loaded');
              resolve();
            }
            imageElement.onload = () => resolve();
          });
          promises.push(promise);

          return { ...friend, avatarImg: imageElement };
        });
        await Promise.all(promises);

        setFriends(friendsWithImages);
      }
    };

    fetch();
  }, [dataProvider, username, setFriends]);

  return null;
};
