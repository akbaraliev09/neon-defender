export class AudioSystem {
  constructor() { this.ctx = null; this.muted = false; }
  init() { if (!this.ctx) { const Ctx = window.AudioContext || window.webkitAudioContext; if (Ctx) this.ctx = new Ctx(); } if (this.ctx?.state === 'suspended') this.ctx.resume(); }
  tone(freq, endFreq, duration, type = 'sine', volume = .07, delay = 0) {
    if (this.muted || !this.ctx) return;
    const t = this.ctx.currentTime + delay, osc = this.ctx.createOscillator(), gain = this.ctx.createGain();
    osc.type = type; osc.frequency.setValueAtTime(freq, t); osc.frequency.exponentialRampToValueAtTime(Math.max(20, endFreq), t + duration);
    gain.gain.setValueAtTime(.001, t); gain.gain.exponentialRampToValueAtTime(volume, t + .008); gain.gain.exponentialRampToValueAtTime(.001, t + duration);
    osc.connect(gain); gain.connect(this.ctx.destination); osc.start(t); osc.stop(t + duration + .01);
  }
  noise(duration = .18, volume = .1, freq = 500) {
    if (this.muted || !this.ctx) return;
    const size = Math.floor(this.ctx.sampleRate * duration), buffer = this.ctx.createBuffer(1, size, this.ctx.sampleRate), data = buffer.getChannelData(0);
    for (let i = 0; i < size; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / size);
    const source = this.ctx.createBufferSource(), filter = this.ctx.createBiquadFilter(), gain = this.ctx.createGain();
    source.buffer = buffer; filter.type = 'lowpass'; filter.frequency.value = freq; gain.gain.value = volume; source.connect(filter); filter.connect(gain); gain.connect(this.ctx.destination); source.start();
  }
  play(name) { this.init(); if (name === 'shoot') this.tone(760, 250, .075, 'square', .018); if (name === 'explosion') { this.noise(.28, .09, 850); this.tone(130, 45, .3, 'sawtooth', .05); } if (name === 'hit') { this.noise(.12, .09, 1500); this.tone(160, 70, .15, 'triangle', .055); } if (name === 'power') { this.tone(420, 900, .16, 'sine', .065); this.tone(620, 1200, .18, 'sine', .05, .09); } if (name === 'gameover') { this.tone(280, 75, .65, 'triangle', .07); this.tone(190, 48, .8, 'sawtooth', .03, .12); } }
}
