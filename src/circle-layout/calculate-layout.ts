import { AVAILABLE_SPACE, CENTER_RADIUS, CIRCLE_SPACING } from './constants';
import { CircleData, CircleLayout } from './interfaces';

export const calculateLayout = (circles: CircleData[]): CircleLayout[] => {
  const numberOfCircles = circles.length;

  const maxItemRadius =
    (AVAILABLE_SPACE / numberOfCircles - CIRCLE_SPACING) / 2;

  return circles.map(({ numberOfItems }, index) => {
    const circleIndex = index + 1;

    const positionSpacing = 360 / numberOfItems;
    const itemPositions = [];
    for (let p = 0; p < 360; p += positionSpacing) {
      itemPositions.push(p - 90);
    }

    const radius =
      CENTER_RADIUS +
      circleIndex * CIRCLE_SPACING +
      (2 * circleIndex - 1) * maxItemRadius;

    const circumference = Math.PI * radius * 2 * 0.95;
    const itemRadius = Math.min(
      maxItemRadius,
      circumference / numberOfItems / 2
    );

    return {
      radius,
      itemRadius,
      itemPositions,
    };
  });
};
