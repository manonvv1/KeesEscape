import { Game } from './GameLoop.js';
import Player from './Player.js';
import CanvasUtil from './CanvasUtil.js';
import KeyListener from './KeyListener.js';
import Virus from './Virus.js';
import Kees from './Kees.js';

export default class KeesEscape extends Game {
  private canvas: HTMLCanvasElement;

  private player: Player;

  private items: Virus[];

  private kees: Kees;

  private keyListener: KeyListener;

  private timePassed: number;

  private timeToNextItem: number;

  private virusCount: number;

  private gamePaused: number;

  public constructor(canvas: HTMLCanvasElement) {
    super();
    this.canvas = canvas;
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    this.keyListener = new KeyListener();
    this.player = new Player(this.canvas.width, this.canvas.height);
    this.kees = new Kees(this.canvas.width, this.canvas.height);
    this.items = [];
    this.timeToNextItem = 0;
    this.timePassed = 0;
    this.virusCount = 0;
    this.gamePaused = 0;
  }

  /**
   *
   */
  public processInput(): void {
    if (this.keyListener.isKeyDown('ArrowUp')) {
      this.player.moveUp();
    }
    if (this.keyListener.isKeyDown('ArrowDown')) {
      this.player.moveDown();
    }
  }

  /**
   * Update game state. Called from the GameLoop
   *
   * @param elapsed time elapsed from the GameLoop
   * @returns true if the game should continue
   */
  public update(elapsed: number): boolean {
    if (this.gamePaused === 0) {
      this.player.Update(elapsed);
      this.kees.update(elapsed);

      this.timePassed += Math.floor(elapsed);
      if (this.timePassed >= 300 && this.timeToNextItem < 18) {
        this.timePassed = 0;
        if (Math.random() >= 0.2 && this.timeToNextItem < 18) {
          this.items.push(new Virus());
        }
      }

      this.items.forEach((item) => {
        if (this.player.itemCollided(item)) {
          this.virusCount += 1;
          this.items.splice(this.items.indexOf(item), 1);
        }
        item.update(elapsed);
      });
      this.timeToNextItem += Math.floor(elapsed) / 1000;
      return true;
    }
    return false;
  }

  /**
   * Render all the elements in the screen. Called from GameLoop
   */
  public render(): void {
    if (this.gamePaused === 0) {
      CanvasUtil.clearCanvas(this.canvas);

      this.player.render(this.canvas);

      CanvasUtil.writeTextToCanvas(
        this.canvas,
        `Amount of viruses caught: ${Math.floor(this.virusCount)}`,
        200,
        60,
        'center',
        'SF Pixelate',
        20,
        'white',
      );
      CanvasUtil.writeTextToCanvas(
        this.canvas,
        `Played time: ${Math.floor(this.timeToNextItem)}`,
        200,
        90,
        'center',
        'SF Pixelate',
        20,
        'white',
      );
      if (this.virusCount >= 10) {
        this.gamePaused = 1;
        console.log(this.gamePaused);
        CanvasUtil.writeTextToCanvas(
          this.canvas,
          'Game over',
          1000,
          400,
          'right',
          'SF Pixelate',
          90,
          'white',
        );
      }
      if (this.timeToNextItem >= 20) {
        this.kees.render(this.canvas);
      }

      if (this.timeToNextItem < 20) {
        this.items.forEach((item) => {
          item.render(this.canvas);
        });
      }
    }
  }
}
