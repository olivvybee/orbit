export interface RendererParams {
  x: number;
  y: number;
  radius: number;
  index: number;
  circleIndex: number;
}

export type Renderer = (params: RendererParams) => React.ReactNode;
