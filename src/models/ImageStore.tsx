import React, { createContext, useState } from 'react';

interface ImageStoreShape {
  addImage: (id: string, url: string) => void;
  images: {
    [id: string]: HTMLImageElement;
  };
}

export const ImageStore = createContext<ImageStoreShape>({
  addImage: () => {},
  images: {},
});

export const ImageStoreProvider: React.FC = ({ children }) => {
  const [images, setImages] = useState<{ [id: string]: HTMLImageElement }>({});

  const addImage = (id: string, url: string) => {
    // const element = document.createElement('img');
    // element.src = url;
    // setImages({ ...images, [id]: element });
  };

  return (
    <ImageStore.Provider value={{ images, addImage }}>
      {children}
    </ImageStore.Provider>
  );
};

ImageStoreProvider.displayName = 'ImageStoreProvider';
