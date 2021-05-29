import { useContext } from 'react';

import { Settings } from '../models';

import { MIN_PEOPLE_PER_CIRCLE, MAX_PEOPLE_PER_CIRCLE } from './constants';

const Configurator = () => {
  const { circles, addCircle, removeCircle, setNumberOfItems } = useContext(
    Settings
  );

  const minusButtonDisabled = circles.length <= 1;
  const plusButtonDisabled = circles.length >= 9;

  return (
    <div className='border'>
      <h2>Customise circles</h2>

      <div className='mb-4'>
        <span className='fs-5'>Number of circles</span>
        <div className='d-flex align-items-center gx-3 mt-1'>
          <button
            type='button'
            className='btn btn-light'
            onClick={removeCircle}
            disabled={minusButtonDisabled}>
            -
          </button>
          <span className='mx-3'>{circles.length}</span>
          <button
            type='button'
            className='btn btn-light'
            onClick={addCircle}
            disabled={plusButtonDisabled}>
            +
          </button>
        </div>
      </div>

      <div className='mb-4'>
        <span className='fs-5'>People per circle</span>
        <div className='d-flex flex-column mt-1'>
          {circles.map((circle, index) => (
            <div className='mb-2'>
              <label htmlFor={`circle-${index}`} className='form-label'>
                <span className='fw-bold'>Circle {index + 1}:</span>{' '}
                {circle.numberOfItems}
              </label>
              <input
                id={`circle-${index}`}
                type='range'
                className='form-range'
                min={MIN_PEOPLE_PER_CIRCLE}
                max={MAX_PEOPLE_PER_CIRCLE}
                value={circle.numberOfItems}
                onChange={(e) =>
                  setNumberOfItems(index, Number(e.target.value))
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

Configurator.displayName = 'Configurator';

export default Configurator;
