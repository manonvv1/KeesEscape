import CanvasUtil from './CanvasUtil.js';

export default class Kees {
  private image: HTMLImageElement;

  private posX: number;

  private posY: number;

  private speed: number;

  public constructor() {
    this.image = CanvasUtil.loadNewImage('./assets/ships.png');
    this.posX = 1400;
    this.posY = Math.random() * 800;
    this.speed = 0;
  }

  /**
   *
   * @param canvas
   */
  public render(canvas: HTMLCanvasElement) {

  }
}
