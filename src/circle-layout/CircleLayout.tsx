import React, { useContext, useEffect, useMemo, useRef } from 'react';
import { Stage, Layer, Circle as CanvasCircle, Line } from 'react-konva';

import { calculateLayout } from './calculate-layout';
import { CANVAS_SIZE, CENTER_RADIUS } from './constants';
import { CircleLayoutProps } from './interfaces';

import Circle from './Circle';
import { distributeItems } from './distribute-items';
import { FriendList } from '../models';

const CircleLayout: React.FC<CircleLayoutProps> = ({ circles }) => {
  const layerRef = useRef(null);

  const { friends } = useContext(FriendList);

  const layout = useMemo(() => calculateLayout(circles), [circles]);
  const itemDistribution = useMemo(() => distributeItems(friends, circles), [
    friends,
    circles,
  ]);

  useEffect(() => {
    if (friends.length > 0) {
      if (layerRef.current) {
        console.log(layerRef.current);
        (layerRef.current as any).batchDraw();
      }
    }
  }, [friends]);

  if (friends.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className='circle-layout'>
      <Stage width={CANVAS_SIZE} height={CANVAS_SIZE}>
        <Layer ref={layerRef}>
          <CanvasCircle
            radius={CENTER_RADIUS}
            x={CANVAS_SIZE / 2}
            y={CANVAS_SIZE / 2}
            stroke='black'
            fill='seagreen'
          />
          {layout.map((circleLayout, circleIndex) => (
            <Circle
              layout={circleLayout}
              items={itemDistribution[circleIndex]}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

CircleLayout.displayName = 'CircleLayout';

export default CircleLayout;
