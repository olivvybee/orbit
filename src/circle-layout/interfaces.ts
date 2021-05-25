import { Stage } from 'konva/types/Stage';
import React from 'react';

import { Friend } from '../models';

export interface CircleData {
  numberOfItems: number;
}

export interface CircleLayoutProps {
  circles: CircleData[];
  stageRef: React.LegacyRef<Stage>;
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
