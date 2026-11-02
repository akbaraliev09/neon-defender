import './style.css';
import { Game } from './game.js';

const game = new Game(document.getElementById('game'));
let last = 0;
function frame(now) { const dt = Math.min((now - last) / 1000 || 0, .04); last = now; game.update(dt); game.draw(); requestAnimationFrame(frame); }
requestAnimationFrame(frame);
