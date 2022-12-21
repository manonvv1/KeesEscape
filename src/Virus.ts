import CanvasUtil from './CanvasUtil.js';

export default class Virus {
  private image: HTMLImageElement;

  private posX: number;

  private posY: number;

  private speed: number;

  private random: number = Math.random();

  public constructor() {
    this.posY = Math.random() * 800;
    this.posX = 1400;
    this.speed = 0;
    const array = ['virus-1.png', 'virus-2.png'];
    const random = Math.random();
    if (random >= 0.1) {
      if (Math.random() > 0.5) {
        this.image = CanvasUtil.loadNewImage('./assets/virus-1.png');
      } else {
        this.image = CanvasUtil.loadNewImage('./assets/virus-2.png');
      }
    } else if (Math.random() > 0.5) {
      this.image = CanvasUtil.loadNewImage('./assets/virus-1.png');
    } else {
      this.image = CanvasUtil.loadNewImage('./assets/virus-2.png');
    }
  }

  /**
   *
   * @param elapsed
   */
  public update(elapsed: number): void {
    this.speed += 0.01;
    this.posX -= this.speed + 1;
    if (this.random <= 0.3) {
      this.posY -= 0.3;
    } else if (this.random > 0.3 && this.random <= 0.6) {
      this.posY += 0.3;
    } else {
      this.posY += 0;
    }
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
}
