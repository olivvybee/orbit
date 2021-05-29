import React, { useContext } from 'react';
import { Stage, Layer, Circle as CanvasCircle, Rect, Text } from 'react-konva';
import Color from 'color';

import { FriendList, Settings } from '../models';

import Circle from './Circle';

import { CANVAS_SIZE, CENTER_RADIUS } from './constants';
import { CircleLayoutProps } from './interfaces';

const CircleLayout: React.FC<CircleLayoutProps> = ({
  layout,
  itemDistribution,
  stageRef,
}) => {
  const { ownAvatarImg } = useContext(FriendList);
  const { colours } = useContext(Settings);

  if (!ownAvatarImg) {
    console.log('Own avatar image missing');
    return null;
  }

  const scaleX = (2 * CENTER_RADIUS) / ownAvatarImg.naturalWidth;
  const scaleY = (2 * CENTER_RADIUS) / ownAvatarImg.naturalHeight;

  const backgroundColour = Color(colours.background);
  const watermarkColour = backgroundColour.isLight() ? '#282c34' : '#ffffff';

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
          <Text
            x={10}
            y={CANVAS_SIZE - 10 - 32}
            fontSize={32}
            text='orbit.livasch.com'
            fill={watermarkColour}
          />
        </Layer>
      </Stage>
    </div>
  );
};

CircleLayout.displayName = 'CircleLayout';

export default CircleLayout;
