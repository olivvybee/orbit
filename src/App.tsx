import './App.css';

import Content from './Content';
import { LayoutContextProvider, FriendListProvider } from './models';

function App() {
  return (
    <FriendListProvider>
      <LayoutContextProvider>
        <div className='App'>
          <Content />
        </div>
      </LayoutContextProvider>
    </FriendListProvider>
  );
}

export default App;
