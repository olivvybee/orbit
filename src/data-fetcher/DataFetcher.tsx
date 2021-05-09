import { useContext, useEffect } from 'react';

import { FriendList } from '../models';

import { DataFetcherProps } from './interfaces';

export const DataFetcher: React.FC<DataFetcherProps> = ({
  username,
  dataProvider,
}) => {
  const { setOwnAvatarImg, setFriends } = useContext(FriendList);

  useEffect(() => {
    const fetch = async () => {
      const { ownAvatarUrl, friends } = await dataProvider(username);
      if (ownAvatarUrl && friends) {
        const promises: Promise<void>[] = [];

        const ownAvatarImg = document.createElement('img');
        ownAvatarImg.src = ownAvatarUrl;
        const promise = new Promise<void>((resolve) => {
          if (ownAvatarImg.naturalWidth > 0) {
            console.log('resolving, already loaded');
            resolve();
          }
          ownAvatarImg.onload = () => resolve();
        });
        promises.push(promise);

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

        setOwnAvatarImg(ownAvatarImg);
        setFriends(friendsWithImages);
      }
    };

    fetch();
  }, [dataProvider, username, setFriends, setOwnAvatarImg]);

  return null;
};
