import React, { useContext } from 'react';
import { Settings } from '../models';

const Configurator = () => {
  const { circles, addCircle, removeCircle, setNumberOfItems } = useContext(
    Settings
  );

  return (
    <div className='configurator'>
      <div className='buttons'>
        <button onClick={removeCircle}>-</button>
        <button onClick={addCircle}>+</button>
      </div>
      {circles.map((circle, index) => (
        <input
          type='range'
          min={3}
          max={50}
          value={circle.numberOfItems}
          onChange={(e) => setNumberOfItems(index, Number(e.target.value))}
        />
      ))}
    </div>
  );
};

Configurator.displayName = 'Configurator';

export default Configurator;
