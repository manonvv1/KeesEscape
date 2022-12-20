import CanvasUtil from './CanvasUtil.js';
import KeyListener from './KeyListener.js';
import Virus from './Virus.js';

export default class Player {
  private image: HTMLImageElement;

  private posX: number;

  private posY: number;

  private acceleration: number;

  public constructor(maxWidth: number, maxHeight: number) {
    this.image = CanvasUtil.loadNewImage('./assets/main-character.png');
    this.posY = maxHeight / 2;
    this.posX = 50;
    this.acceleration = 0;
  }

  public itemCollided(item: Virus): boolean {
    if (item.getPosY() >= this.posY - this.getHeight()
    && item.getPosY() <= this.posY + this.getHeight()
    && item.getPosX() >= this.posX - this.getWidth() / 2
    && item.getPosX() <= this.posX + this.getWidth()) {
      return true;
    }
    return false;
  }

  public getWidth(): number {
    return this.image.width;
  }

  public getHeight(): number {
    return this.image.height;
  }

  public moveUp(): void {
    if (this.acceleration < -14) {
      this.acceleration = -14;
    } else {
      this.acceleration -= 0.25;
    }
  }

  public moveDown(): void {
    if (this.acceleration > 14) {
      this.acceleration = 14;
    } else {
      this.acceleration += 0.25;
    }
  }

  public Update(elapsed: number): void {
    if (this.posY < -50) {
      this.posY = 800;
    }
    if (this.posY > 800) {
      this.posY = -50;
    }
    this.posY += this.acceleration;
  }

  public render(canvas: HTMLCanvasElement) {
    CanvasUtil.drawImage(canvas, this.image, 50, this.posY);
  }
}
