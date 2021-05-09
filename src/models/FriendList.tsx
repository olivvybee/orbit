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
}

export const FriendList = createContext<FriendListShape>({
  ownAvatarImg: undefined,
  setOwnAvatarImg: () => {},
  friends: [],
  setFriends: () => {},
});

export const FriendListProvider: React.FC = ({ children }) => {
  const [ownAvatarImg, setOwnAvatarImg] = useState<HTMLImageElement>();
  const [friends, setFriends] = useState<Friend[]>([]);

  return (
    <FriendList.Provider
      value={{ ownAvatarImg, setOwnAvatarImg, friends, setFriends }}>
      {children}
    </FriendList.Provider>
  );
};

FriendListProvider.displayName = 'FriendListProvider';
