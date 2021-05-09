import React from 'react';

import './App.css';

import Content from './Content';
import {
  LayoutContextProvider,
  ImageStoreProvider,
  FriendListProvider,
} from './models';

function App() {
  return (
    <FriendListProvider>
      <ImageStoreProvider>
        <LayoutContextProvider>
          <div className='App'>
            <Content />
          </div>
        </LayoutContextProvider>
      </ImageStoreProvider>
    </FriendListProvider>
  );
}

export default App;
