import CanvasUtil from './CanvasUtil.js';
import Virus from './Virus.js';
import Player from './Player.js';
import Shield from './Shield.js';

export default abstract class GameItem {
  protected image: HTMLImageElement;

  protected posX: number;

  protected posY: number;

  protected speed: number;

  protected shieldModifier: number;

  public constructor() {
    this.posY = Math.random() * 800;
    this.posX = 1400;
    this.speed = 0;
  }

  public abstract update(elapsed: number): void;

  public render(canvas: HTMLCanvasElement) {
    CanvasUtil.drawImage(canvas, this.image, this.posX, this.posY);
  }

  public getShieldModifier(): number {
    return this.shieldModifier;
  }

  public getPosX(): number {
    return this.posX;
  }

  public getPosY(): number {
    return this.posY;
  }
}
