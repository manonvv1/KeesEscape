import CanvasUtil from './CanvasUtil.js';

export default class Kees {
  private image: HTMLImageElement;

  private posX: number;

  private posY: number;

  private speed: number;

  private acceleration: number;

  public constructor(maxWidth: number, maxHeight: number) {
    this.image = CanvasUtil.loadNewImage('./assets/kees.png');
    this.posY = maxHeight / 2;
    this.posX = 1400;
    this.speed = 0;
    this.acceleration = 0;
  }

  public getWidth(): number {
    return this.image.width;
  }

  public getHeight(): number {
    return this.image.height;
  }

  /**
   *
   * @param canvas
   */
  public render(canvas: HTMLCanvasElement) {
    CanvasUtil.drawImage(canvas, this.image, this.posX, this.posY);
  }

  public getPosX(): number {
    return this.posX;
  }

  public getPosY(): number {
    return this.posY;
  }

  public fire(): ShooterBullet {
    return new ShooterBullet(this.posX, this.posY);
  }
}
