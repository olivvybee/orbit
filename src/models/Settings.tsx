import { createContext, useState } from 'react';

import { CircleData } from '../circle-layout/interfaces';

export interface SettingsShape {
  circles: CircleData[];
  addCircle: () => void;
  removeCircle: () => void;
  setNumberOfItems: (index: number, numberOfItems: number) => void;
  colours: {
    [key: string]: string;
  };
  setColour: (key: string, value: string) => void;
}

export const Settings = createContext<SettingsShape>({
  circles: [],
  addCircle: () => {},
  removeCircle: () => {},
  setNumberOfItems: () => {},
  colours: {},
  setColour: () => {},
});

export const SettingsProvider: React.FC = ({ children }) => {
  const [circles, setCircles] = useState<CircleData[]>([
    { numberOfItems: 10 },
    { numberOfItems: 20 },
    { numberOfItems: 30 },
  ]);

  const [colours, setColours] = useState({
    background: '#ceb4fd',
    circleBorders: '#282c34',
    connectingLines: '#282c34',
  });
  const setColour = (key: string, value: string) =>
    setColours({
      ...colours,
      [key]: value,
    });

  const addCircle = () => setCircles([...circles, { numberOfItems: 20 }]);
  const removeCircle = () => setCircles(circles.slice(0, -1));
  const setNumberOfItems = (index: number, numberOfItems: number) =>
    setCircles([
      ...circles.slice(0, index),
      { numberOfItems },
      ...circles.slice(index + 1),
    ]);

  return (
    <Settings.Provider
      value={{
        circles,
        addCircle,
        removeCircle,
        setNumberOfItems,
        colours,
        setColour,
      }}>
      {children}
    </Settings.Provider>
  );
};

SettingsProvider.displayName = 'SettingsProvider';
