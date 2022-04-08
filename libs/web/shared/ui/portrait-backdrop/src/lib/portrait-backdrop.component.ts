/* eslint-disable @angular-eslint/no-host-metadata-property */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import { animationFrameScheduler, filter, fromEvent, merge, of, scheduled } from 'rxjs';
import { repeat } from 'rxjs/operators';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

class Wave {
  phase = 0;
  offset = 0;
  frequency = 0.001;
  amplitude = 1;

  constructor(e: Partial<Pick<Wave, 'phase' | 'offset' | 'frequency' | 'amplitude'>>) {
    this.init(e || {});
  }

  init(e: Partial<Pick<Wave, 'phase' | 'offset' | 'frequency' | 'amplitude'>>) {
    this.phase = e.phase || 0;
    this.offset = e.offset || 0;
    this.frequency = e.frequency || 0.001;
    this.amplitude = e.amplitude || 1;
  }

  update() {
    this.phase += this.frequency;
    return this.offset + Math.sin(this.phase) * this.amplitude;
  }
}

class Line {
  spring = 0.1;
  friction = 0.01;
  nodes: Node[] = [];

  constructor(e: { spring: number }, private pos: { x: number; y: number }) {
    this.init(e || {});
  }

  init(e: { spring: number }) {
    this.spring = e.spring + 0.1 * Math.random() - 0.05;
    this.friction = E.friction + 0.01 * Math.random() - 0.005;
    this.nodes = [];
    for (let i = 0; i < E.size; i++) {
      const t = new Node();
      t.x = this.pos.x;
      t.y = this.pos.y;
      this.nodes.push(t);
    }
  }

  update() {
    let spring = this.spring;
    let node = this.nodes[0];

    node.vx += (this.pos.x - node.x) * spring;
    node.vy += (this.pos.y - node.y) * spring;

    let prevNode: Node;
    for (let i = 0; i < this.nodes.length; i++) {
      node = this.nodes[i];

      if (0 < i) {
        prevNode = this.nodes[i - 1];
        node.vx += (prevNode.x - node.x) * spring;
        node.vy += (prevNode.y - node.y) * spring;
        node.vx += prevNode.vx * E.dampening;
        node.vy += prevNode.vy * E.dampening;
      }

      node.vx *= this.friction;
      node.vy *= this.friction;
      node.x += node.vx;
      node.y += node.vy;
      spring *= E.tension;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    let currNode,
      nextNode,
      x = this.nodes[0].x,
      y = this.nodes[0].y;

    ctx.beginPath();
    ctx.moveTo(x, y);

    let i;
    for (i = 1; i < this.nodes.length - 2; i++) {
      currNode = this.nodes[i];
      nextNode = this.nodes[i + 1];
      x = 0.5 * (currNode.x + nextNode.x);
      y = 0.5 * (currNode.y + nextNode.y);
      ctx.quadraticCurveTo(currNode.x, currNode.y, x, y);
    }
    currNode = this.nodes[i];
    nextNode = this.nodes[i + 1];
    ctx.quadraticCurveTo(currNode.x, currNode.y, nextNode.x, nextNode.y);

    ctx.stroke();
    ctx.closePath();
  }
}

class Node {
  x = 0;
  y = 0;
  vy = 0;
  vx = 0;
}

const E = {
  friction: 0.5,
  trails: 20,
  size: 50,
  dampening: 0.25,
  tension: 0.98,
};

@UntilDestroy()
@Component({
  selector: 'asb-portrait-backdrop',
  templateUrl: './portrait-backdrop.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block relative',
  },
})
export class PortraitBackdropComponent implements AfterViewInit {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private lines: Line[] = [];
  private pos = { x: 0, y: 0 };
  private wave = new Wave({
    phase: Math.random() * 2 * Math.PI,
    amplitude: 85,
    frequency: 0.0015,
    offset: 285,
  });

  ngAfterViewInit(): void {
    this.renderCanvas();
  }

  onResize(entries: ResizeObserverEntry[]) {
    this.ctx.canvas.width = document.body.offsetWidth;
    this.ctx.canvas.height = entries[0].contentRect.height;
  }

  private renderCanvas() {
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    this.bindMouseMove();
  }

  private bindMouseMove() {
    merge(
      fromEvent<TouchEvent>(document, 'touchmove'),
      fromEvent<MouseEvent>(document, 'mousemove')
    )
      .pipe(untilDestroyed(this))
      .subscribe((e) => {
        if (e instanceof TouchEvent) {
          this.pos.x = e.touches[0].pageX;
          this.pos.y = e.touches[0].pageY;
        } else {
          this.pos.x = e.clientX;
          this.pos.y = e.clientY;
        }
      });

    fromEvent<TouchEvent>(document, 'touchstart')
      .pipe(
        filter((e) => e.touches.length === 1),
        untilDestroyed(this)
      )
      .subscribe((e) => {
        this.pos.x = e.touches[0].pageX;
        this.pos.y = e.touches[0].pageY;
      });

    this.lines = [];
    for (let i = 0; i < E.trails; i++) {
      this.lines.push(new Line({ spring: 0.45 + (i / E.trails) * 0.025 }, this.pos));
    }

    // render lines
    scheduled(of(0), animationFrameScheduler)
      .pipe(repeat(), untilDestroyed(this))
      .subscribe(() => {
        this.ctx.globalCompositeOperation = 'source-over';
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        this.ctx.globalCompositeOperation = 'lighter';
        this.ctx.strokeStyle = 'hsla(' + Math.round(this.wave.update()) + ',90%,50%,0.25)';
        this.ctx.lineWidth = 1;

        for (let i = 0; i < E.trails; i++) {
          const line = this.lines[i];
          line.update();
          line.draw(this.ctx);
        }
      });
  }
}
