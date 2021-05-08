import React from 'react';

import { Renderer } from '../item-renderers/interfaces';

export interface CircleData {
  numberOfItems: number;
}

export interface CircleLayoutProps {
  circles: CircleData[];
  renderItem: Renderer;
}

export interface CircleLayout {
  radius: number;
  itemRadius: number;
  itemPositions: number[];
}

export interface CircleProps {
  renderItem: Renderer;
  layout: CircleLayout;
  index: number;
}
