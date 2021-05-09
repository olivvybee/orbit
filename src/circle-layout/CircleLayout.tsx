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

  const { ownAvatarImg, friends } = useContext(FriendList);

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

  if (friends.length === 0 || !ownAvatarImg) {
    return <div>Loading...</div>;
  }

  const scaleX = (2 * CENTER_RADIUS) / ownAvatarImg.naturalWidth;
  const scaleY = (2 * CENTER_RADIUS) / ownAvatarImg.naturalHeight;

  return (
    <div className='circle-layout'>
      <Stage width={CANVAS_SIZE} height={CANVAS_SIZE}>
        <Layer ref={layerRef}>
          <CanvasCircle
            radius={CENTER_RADIUS}
            fillPatternImage={ownAvatarImg}
            fillPatternOffsetX={CENTER_RADIUS}
            fillPatternOffsetY={CENTER_RADIUS}
            fillPatternScaleX={scaleX}
            fillPatternScaleY={scaleY}
            stroke='black'
            x={CANVAS_SIZE / 2}
            y={CANVAS_SIZE / 2}
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
