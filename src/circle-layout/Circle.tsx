import React, { useEffect, useRef } from 'react';
import { Circle as CanvasCircle, Group } from 'react-konva';
import useImage from 'use-image';

import { CANVAS_SIZE } from './constants';

import { CircleProps } from './interfaces';

const dtor = (degrees: number) => (degrees * Math.PI) / 180;

const getCoordinates = (position: number, radius: number) => {
  return {
    x: radius * Math.cos(dtor(position)) + CANVAS_SIZE / 2,
    y: radius * Math.sin(dtor(position)) + CANVAS_SIZE / 2,
  };
};

// const clipFunc =

const Circle: React.FC<CircleProps> = ({
  renderItem,
  layout,
  index: circleIndex,
}) => {
  const { radius, itemRadius, itemPositions } = layout;

  return (
    <>
      <CanvasCircle
        radius={radius}
        x={CANVAS_SIZE / 2}
        y={CANVAS_SIZE / 2}
        stroke='white'
      />

      {itemPositions.map((position, index) => {
        const { x, y } = getCoordinates(position, radius);
        return renderItem({
          x,
          y,
          radius: itemRadius,
          index,
          circleIndex,
        });
      })}
    </>
  );
};

Circle.displayName = 'Circle';

export default Circle;
