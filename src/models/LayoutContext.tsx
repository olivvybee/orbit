import { createContext, useState } from 'react';

import { CircleData } from '../circle-layout/interfaces';

interface LayoutContextShape {
  circles: CircleData[];
  addCircle: () => void;
  removeCircle: () => void;
  setNumberOfItems: (index: number, numberOfItems: number) => void;
}

export const LayoutContext = createContext<LayoutContextShape>({
  circles: [],
  addCircle: () => {},
  removeCircle: () => {},
  setNumberOfItems: () => {},
});

export const LayoutContextProvider: React.FC = ({ children }) => {
  const [circles, setCircles] = useState<CircleData[]>([
    { numberOfItems: 6 },
    { numberOfItems: 12 },
    { numberOfItems: 12 },
  ]);

  const addCircle = () => setCircles([...circles, { numberOfItems: 12 }]);
  const removeCircle = () => setCircles(circles.slice(0, -1));
  const setNumberOfItems = (index: number, numberOfItems: number) =>
    setCircles([
      ...circles.slice(0, index),
      { numberOfItems },
      ...circles.slice(index + 1),
    ]);

  return (
    <LayoutContext.Provider
      value={{ circles, addCircle, removeCircle, setNumberOfItems }}>
      {children}
    </LayoutContext.Provider>
  );
};

LayoutContextProvider.displayName = 'LayoutContextProvider';
