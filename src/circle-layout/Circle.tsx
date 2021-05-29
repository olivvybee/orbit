import React from 'react';
import { Circle as CanvasCircle } from 'react-konva';

import { CANVAS_SIZE } from './constants';

import { CircleProps } from './interfaces';

const dtor = (degrees: number) => (degrees * Math.PI) / 180;

const getCoordinates = (position: number, radius: number) => {
  return {
    x: radius * Math.cos(dtor(position)) + CANVAS_SIZE / 2,
    y: radius * Math.sin(dtor(position)) + CANVAS_SIZE / 2,
  };
};

const Circle: React.FC<CircleProps> = ({
  layout,
  items,
  borderColour,
  connectingLineColour,
}) => {
  const { radius, itemRadius, itemPositions } = layout;

  return (
    <>
      <CanvasCircle
        radius={radius}
        x={CANVAS_SIZE / 2}
        y={CANVAS_SIZE / 2}
        stroke={connectingLineColour}
        strokeWidth={1}
      />

      {items.map((item, index) => {
        const position = itemPositions[index];
        const { x, y } = getCoordinates(position, radius);

        const baseProps = {
          radius: itemRadius,
          x,
          y,
          stroke: borderColour,
          strokeWidth: 1,
        };

        const image = item.avatarImg;

        if (!image || !image.naturalWidth) {
          return <CanvasCircle {...baseProps} fill='seagreen' />;
        }

        const scaleX = (2 * itemRadius) / image.naturalWidth;
        const scaleY = (2 * itemRadius) / image.naturalHeight;

        return (
          <CanvasCircle
            key={item.id}
            {...baseProps}
            fillPatternImage={image}
            fillPatternOffsetX={itemRadius}
            fillPatternOffsetY={itemRadius}
            fillPatternScaleX={scaleX}
            fillPatternScaleY={scaleY}
          />
        );
      })}
    </>
  );
};

Circle.displayName = 'Circle';

export default Circle;
