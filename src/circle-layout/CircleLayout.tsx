import React, { useContext, useMemo } from 'react';
import { Stage, Layer, Circle as CanvasCircle, Rect } from 'react-konva';

import { FriendList, Settings } from '../models';

import { calculateLayout } from './calculate-layout';
import { distributeItems } from './distribute-items';

import Circle from './Circle';

import { CANVAS_SIZE, CENTER_RADIUS } from './constants';
import { CircleLayoutProps } from './interfaces';

const CircleLayout: React.FC<CircleLayoutProps> = ({ circles, stageRef }) => {
  const { ownAvatarImg, friends } = useContext(FriendList);
  const { colours } = useContext(Settings);

  const layout = useMemo(() => calculateLayout(circles), [circles]);
  const itemDistribution = useMemo(() => distributeItems(friends, circles), [
    friends,
    circles,
  ]);

  if (!ownAvatarImg) {
    console.log('Own avatar image missing');
    return null;
  }

  const scaleX = (2 * CENTER_RADIUS) / ownAvatarImg.naturalWidth;
  const scaleY = (2 * CENTER_RADIUS) / ownAvatarImg.naturalHeight;

  return (
    <div id='circle-layout'>
      <Stage width={CANVAS_SIZE} height={CANVAS_SIZE} ref={stageRef}>
        <Layer>
          <Rect
            x={0}
            y={0}
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            fill={colours.background}
          />
          <CanvasCircle
            radius={CENTER_RADIUS}
            fillPatternImage={ownAvatarImg}
            fillPatternOffsetX={CENTER_RADIUS}
            fillPatternOffsetY={CENTER_RADIUS}
            fillPatternScaleX={scaleX}
            fillPatternScaleY={scaleY}
            stroke={colours.circleBorders}
            strokeWidth={1}
            x={CANVAS_SIZE / 2}
            y={CANVAS_SIZE / 2}
          />
          {layout.map((circleLayout, circleIndex) => (
            <Circle
              key={circleIndex}
              layout={circleLayout}
              items={itemDistribution[circleIndex]}
              borderColour={colours.circleBorders}
              connectingLineColour={colours.connectingLines}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

CircleLayout.displayName = 'CircleLayout';

export default CircleLayout;
