type PointType = { x: number; y: number };

interface PointInterface {
  x: number;
  y: number;
}

type ThreeDeePointType = PointType & { z: number };

interface ThreeDeePointInterface extends PointInterface {
   z: number;
}

interface ThreeDeePointInterfaceTwo extends PointType {
  z: number;
}

class Pointer implements ThreeDeePointInterface {
  x: number;
  y: number;
  z: number;

  constructor() {
    this.x = 1;
    this.y = 1;
    this.z = 1;
  }
}
