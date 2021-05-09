import { createContext, useState } from 'react';

export interface Friend {
  id: string;
  username: string;
  avatarUrl: string;
  score: number;
  avatarImg?: HTMLImageElement;
}

interface FriendListShape {
  ownAvatarImg?: HTMLImageElement;
  setOwnAvatarImg: (img: HTMLImageElement) => void;
  friends: Friend[];
  setFriends: (friends: Friend[]) => void;
  error?: string;
  setError: (error: string | undefined) => void;
}

export const FriendList = createContext<FriendListShape>({
  ownAvatarImg: undefined,
  setOwnAvatarImg: () => {},
  friends: [],
  setFriends: () => {},
  setError: () => {},
});

export const FriendListProvider: React.FC = ({ children }) => {
  const [ownAvatarImg, setOwnAvatarImg] = useState<HTMLImageElement>();
  const [friends, setFriends] = useState<Friend[]>([]);
  const [error, setError] = useState<string>();

  return (
    <FriendList.Provider
      value={{
        ownAvatarImg,
        setOwnAvatarImg,
        friends,
        setFriends,
        error,
        setError,
      }}>
      {children}
    </FriendList.Provider>
  );
};

FriendListProvider.displayName = 'FriendListProvider';
