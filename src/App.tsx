import './App.css';
import { CircleLayout } from './circle-layout';
import { RedPandaRenderer } from './item-renderers/RedPandaRenderer';

function App() {
  return (
    <div className='App'>
      <CircleLayout
        circles={[
          { numberOfItems: 6 },
          { numberOfItems: 12 },
          { numberOfItems: 12 },
          { numberOfItems: 12 },
        ]}
        renderItem={RedPandaRenderer}
      />
    </div>
  );
}

export default App;
