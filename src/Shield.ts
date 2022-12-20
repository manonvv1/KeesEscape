import CanvasUtil from './CanvasUtil.js';
import GameItem from './GameItem.js';

export default class Meteor extends GameItem {
  public constructor() {
    super();
    this.image = CanvasUtil.loadNewImage('./assets/bolt_gold.png');
    this.shieldModifier = 3;
  }

  public update(elapsed: number): void {
    this.posX -= 2;
  }
}
