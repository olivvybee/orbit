import { Friend } from '../models';

export interface CircleData {
  numberOfItems: number;
}

export interface CircleLayoutProps {
  circles: CircleData[];
}

export interface CircleLayout {
  radius: number;
  itemRadius: number;
  itemPositions: number[];
}

export interface CircleProps {
  layout: CircleLayout;
  items: Friend[];
}
