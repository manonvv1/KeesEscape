import CanvasUtil from './CanvasUtil.js';
import GameItem from './GameItem.js';

export default class Meteor extends GameItem {
  private random: number = Math.random();

  public constructor() {
    super();
    const array = ['meteor_brown_big.png', 'meteor_brown_small.png', 'meteor_grey_big.png', 'meteor_grey_small.png'];
    const random = Math.random();
    if (random >= 0.1) {
      if (Math.random() > 0.5) {
        this.image = CanvasUtil.loadNewImage('./assets/virus-1.png');
        this.shieldModifier = -1;
      } else {
        this.image = CanvasUtil.loadNewImage('./assets/virus-2.png');
        this.shieldModifier = -1;
      }
    } else if (Math.random() > 0.5) {
      this.image = CanvasUtil.loadNewImage('./assets/virus-1.png');
      this.shieldModifier = -5;
    } else {
      this.image = CanvasUtil.loadNewImage('./assets/virus-2.png');
      this.shieldModifier = -5;
    };

  }

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
}
