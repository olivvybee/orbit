import { Circle } from 'react-konva';
import useImage from 'use-image';

import { Renderer } from './interfaces';

export const RedPandaRenderer: Renderer = ({
  x,
  y,
  radius,
  index,
  circleIndex,
}) => {
  const chosenImage =
    circleIndex % 2 === index % 2 ? '/red-panda.jpg' : '/red-panda-flipped.jpg';

  const [panda] = useImage(chosenImage);

  const scaleX = panda ? (2 * radius) / panda.naturalWidth : 1;
  const scaleY = panda ? (2 * radius) / panda.naturalHeight : 1;

  return (
    <Circle
      radius={radius}
      fillPatternImage={panda}
      fillPatternOffsetX={radius}
      fillPatternOffsetY={radius}
      fillPatternScaleX={scaleX}
      fillPatternScaleY={scaleY}
      stroke='black'
      x={x}
      y={y}
    />
  );
};
