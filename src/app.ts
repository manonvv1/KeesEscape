import { GameLoop } from './GameLoop.js';
import KeesEscape from './KeesEscape.js';

const game = new KeesEscape(document.getElementById('game') as HTMLCanvasElement);

const gameLoop = new GameLoop(game);
window.addEventListener('load', () => {
  gameLoop.start();
});
