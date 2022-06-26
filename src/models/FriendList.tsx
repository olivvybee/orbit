import { createContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export interface Friend {
  id: string;
  username: string;
  avatarUrl: string;
  score: number;
  avatarImg?: HTMLImageElement;
  url?: string;
}

interface FriendListShape {
  ownAvatarImg?: HTMLImageElement;
  setOwnAvatarImg: (img: HTMLImageElement) => void;
  friends: Friend[];
  setFriends: (friends: Friend[]) => void;
  hiddenFriends: string[];
  hideFriend: (friend: Friend) => void;
  unhideFriends: () => void;
  error?: string;
  setError: (error: string | undefined) => void;
}

export const FriendList = createContext<FriendListShape>({
  ownAvatarImg: undefined,
  setOwnAvatarImg: () => {},
  friends: [],
  setFriends: () => {},
  hiddenFriends: [],
  hideFriend: () => {},
  unhideFriends: () => {},
  setError: () => {},
});

export const FriendListProvider: React.FC = ({ children }) => {
  const [ownAvatarImg, setOwnAvatarImg] = useState<HTMLImageElement>();
  const [friends, setFriends] = useState<Friend[]>([]);
  const [hiddenFriends, setHiddenFriends] = useLocalStorage<string[]>(
    'orbitHiddenIDs',
    []
  );
  const [error, setError] = useState<string>();

  const hideFriend = (friend: Friend) =>
    setHiddenFriends([...hiddenFriends, friend.id]);

  const unhideFriends = () => setHiddenFriends([]);

  return (
    <FriendList.Provider
      value={{
        ownAvatarImg,
        setOwnAvatarImg,
        friends,
        setFriends,
        hiddenFriends,
        hideFriend,
        unhideFriends,
        error,
        setError,
      }}>
      {children}
    </FriendList.Provider>
  );
};

FriendListProvider.displayName = 'FriendListProvider';
