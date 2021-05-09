import { Friend } from '../models';
import { CircleData } from './interfaces';

export const distributeItems = (
  items: Friend[],
  circles: CircleData[]
): Friend[][] => {
  const distribution: Friend[][] = [];

  let remainingItems = [...items];
  circles.forEach((circle) => {
    const circleItems = remainingItems.slice(0, circle.numberOfItems);
    distribution.push(circleItems);
    remainingItems = remainingItems.slice(circle.numberOfItems);
  });

  return distribution;
};
