import { createContext, useState } from 'react';

export interface Friend {
  id: string;
  username: string;
  avatarUrl: string;
  score: number;
  avatarImg?: HTMLImageElement;
}

interface FriendListShape {
  friends: Friend[];
  setFriends: (friends: Friend[]) => void;
}

export const FriendList = createContext<FriendListShape>({
  friends: [],
  setFriends: () => {},
});

export const FriendListProvider: React.FC = ({ children }) => {
  const [friends, setFriends] = useState<Friend[]>([]);

  return (
    <FriendList.Provider value={{ friends, setFriends }}>
      {children}
    </FriendList.Provider>
  );
};

FriendListProvider.displayName = 'FriendListProvider';
