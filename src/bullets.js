export class BulletPool {
  constructor(size = 220) { this.items = Array.from({ length: size }, () => ({ active: false, x: 0, y: 0, vx: 0, vy: 0, r: 3, color: '#56eaff', damage: 1, enemy: false })); }
  spawn(x, y, vx, vy, options = {}) { const b = this.items.find(item => !item.active); if (!b) return; Object.assign(b, { active: true, x, y, vx, vy, r: options.r || 3, color: options.color || '#56eaff', damage: options.damage || 1, enemy: !!options.enemy }); }
  update(dt, w, h) { for (const b of this.items) if (b.active) { b.x += b.vx * dt; b.y += b.vy * dt; if (b.y < -35 || b.y > h + 35 || b.x < -35 || b.x > w + 35) b.active = false; } }
  draw(ctx) { ctx.save(); for (const b of this.items) if (b.active) { ctx.shadowBlur = b.enemy ? 14 : 18; ctx.shadowColor = b.color; ctx.fillStyle = b.color; ctx.beginPath(); if (b.enemy) { ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2); } else { ctx.roundRect(b.x - b.r * .65, b.y - b.r * 2, b.r * 1.3, b.r * 4, b.r); } ctx.fill(); } ctx.restore(); }
  clear() { for (const b of this.items) b.active = false; }
}
