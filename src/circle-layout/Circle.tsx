import React, { useContext, useEffect, useRef } from 'react';
import { Circle as CanvasCircle, Group } from 'react-konva';
import useImage from 'use-image';
import { ImageStore } from '../models/ImageStore';

import { CANVAS_SIZE } from './constants';

import { CircleProps } from './interfaces';

const dtor = (degrees: number) => (degrees * Math.PI) / 180;

const getCoordinates = (position: number, radius: number) => {
  return {
    x: radius * Math.cos(dtor(position)) + CANVAS_SIZE / 2,
    y: radius * Math.sin(dtor(position)) + CANVAS_SIZE / 2,
  };
};

const Circle: React.FC<CircleProps> = ({ layout, items }) => {
  const { radius, itemRadius, itemPositions } = layout;

  return (
    <>
      <CanvasCircle
        radius={radius}
        x={CANVAS_SIZE / 2}
        y={CANVAS_SIZE / 2}
        stroke='white'
      />

      {items.map((item, index) => {
        const position = itemPositions[index];
        const { x, y } = getCoordinates(position, radius);

        const baseProps = {
          radius: itemRadius,
          x,
          y,
          stroke: 'black',
        };

        const image = item.avatarImg;

        if (!image || !image.naturalWidth) {
          return <CanvasCircle {...baseProps} fill='seagreen' />;
        }

        const scaleX = (2 * itemRadius) / image.naturalWidth;
        const scaleY = (2 * itemRadius) / image.naturalHeight;

        return (
          <CanvasCircle
            radius={itemRadius}
            fillPatternImage={image}
            fillPatternOffsetX={itemRadius}
            fillPatternOffsetY={itemRadius}
            fillPatternScaleX={scaleX}
            fillPatternScaleY={scaleY}
            stroke='black'
            x={x}
            y={y}
          />
        );
      })}
    </>
  );
};

Circle.displayName = 'Circle';

export default Circle;
