import { useContext, useEffect } from 'react';

import { FriendList } from '../models';

import { DataFetcherProps } from './interfaces';

export const DataFetcher: React.FC<DataFetcherProps> = ({
  username,
  dataProvider,
}) => {
  const { setOwnAvatarImg, setFriends, setError } = useContext(FriendList);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { ownData, friends } = await dataProvider(username);

        const ownAvatarUrl = ownData.avatarUrl;

        if (ownAvatarUrl && friends) {
          const promises: Promise<void>[] = [];

          const ownAvatarImg = document.createElement('img');
          ownAvatarImg.src = ownAvatarUrl;
          const promise = new Promise<void>((resolve) => {
            if (ownAvatarImg.naturalWidth > 0) {
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
          setError(undefined);
        } else {
          if (ownData.private) {
            setError('User is private.');
          } else {
            setError("Couldn't load data. Please try again later.");
          }
        }
      } catch (err) {
        setError("Couldn't load data. Please try again later.");
      }
    };

    fetch();
  }, [dataProvider, username, setFriends, setOwnAvatarImg, setError]);

  return null;
};
