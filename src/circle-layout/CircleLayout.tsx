import React, { useMemo } from 'react';
import { Stage, Layer, Circle as CanvasCircle, Line } from 'react-konva';

import { calculateLayout } from './calculate-layout';
import { CANVAS_SIZE, CENTER_RADIUS } from './constants';
import { CircleLayoutProps } from './interfaces';

import Circle from './Circle';

const CircleLayout: React.FC<CircleLayoutProps> = ({ circles, renderItem }) => {
  const layout = useMemo(() => calculateLayout(circles), [circles]);

  return (
    <div className='circle-layout'>
      <Stage width={CANVAS_SIZE} height={CANVAS_SIZE}>
        <Layer>
          <CanvasCircle
            radius={CENTER_RADIUS}
            x={CANVAS_SIZE / 2}
            y={CANVAS_SIZE / 2}
            stroke='black'
            fill='seagreen'
          />
          {layout.map((circleLayout, circleIndex) => (
            <Circle
              index={circleIndex}
              layout={circleLayout}
              renderItem={renderItem}
            />
          ))}
        </Layer>
      </Stage>

      <pre>{JSON.stringify(layout, null, 2)}</pre>
    </div>
  );
};

CircleLayout.displayName = 'CircleLayout';

export default CircleLayout;
