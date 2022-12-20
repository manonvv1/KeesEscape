import { Game } from "./GameLoop.js";
import GameItem from "./GameItem.js";
import Player from "./Player.js";
import CanvasUtil from "./CanvasUtil.js";
import KeyListener from "./KeyListener.js";
import Virus from "./Virus.js";
import Shield from "./Shield.js";

export default class SpaceEscape extends Game {
  private canvas: HTMLCanvasElement;

  private player: Player;

  private items: GameItem[];

  private keyListener: KeyListener;

  private timePassed: number;

  private timeToNextItem: number;

  private shieldsLeft: number;

  private gamePaused: number;

  public constructor(canvas: HTMLCanvasElement) {
    super();
    this.canvas = canvas;
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    this.keyListener = new KeyListener();
    this.player = new Player(this.canvas.width, this.canvas.height);
    this.items = [];
    this.timeToNextItem = 0;
    this.timePassed = 0;
    this.shieldsLeft = 20;
  }

  public processInput(): void {
    if (this.keyListener.isKeyDown("ArrowUp")) {
      this.player.moveUp();
    }
    if (this.keyListener.isKeyDown("ArrowDown")) {
      this.player.moveDown();
    }
    if (this.keyListener.isKeyDown("KeyP")) {
      this.gamePaused = 1;
    } else {
      this.gamePaused = 0;
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
      if (this.shieldsLeft >= 1) {
        this.player.Update(elapsed);

        this.timePassed += elapsed;

        if (this.timePassed >= 400) {
          this.timePassed = 0;
          this.shieldsLeft -= 0.33;
          if (Math.random() >= 0.2) {
            this.items.push(new Virus());
          } else {
            this.items.push(new Shield());
          }
        }

        this.items.forEach((item) => {
          if (this.player.itemCollided(item)) {
            this.shieldsLeft += item.getShieldModifier();
            this.items.splice(this.items.indexOf(item), 1);
          }
          item.update(elapsed);
        });
        this.timeToNextItem += Math.floor(elapsed) / 1000;

        return true;
      }
      return false;
    }
    return true;
  }

  /**
   * Render all the elements in the screen. Called from GameLoop
   */
  public render(): void {
    if (this.gamePaused === 0) {
      CanvasUtil.clearCanvas(this.canvas);

      this.player.render(this.canvas);

      this.items.forEach((item) => {
        item.render(this.canvas);
      });

      CanvasUtil.writeTextToCanvas(
        this.canvas,
        `Shields left: ${Math.floor(this.shieldsLeft)}`,
        50,
        50,
        "center",
        "Arial",
        20,
        "white"
      );
      CanvasUtil.writeTextToCanvas(
        this.canvas,
        `Played time: ${Math.floor(this.timeToNextItem)}`,
        50,
        90,
        "center",
        "Arial",
        20,
        "white"
      );
      if (this.shieldsLeft <= 1) {
        CanvasUtil.writeTextToCanvas(
          this.canvas,
          "Game over",
          900,
          500,
          "right",
          "Arial",
          90,
          "white"
        );
      }
    }
  }
}
