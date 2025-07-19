import { Component, DOCUMENT, effect, HostListener, inject, Signal, signal, WritableSignal } from '@angular/core';
import { SectionHeader } from "../../shared/ui/section-header/section-header";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skills',
  imports: [ CommonModule],
  templateUrl: './skills.html',
  styleUrl: './skills.css'
})
export class Skills {
  x = signal(0);
  y = signal(0);
  isHovering = signal(false);
  isClicking = signal(false);

  private document = inject(DOCUMENT);

  constructor() {
    // Track hover elements
    effect(() => {
      const links = this.document.querySelectorAll('a, button, .hoverable');
      links.forEach((el: any) => {
        el.addEventListener('mouseenter', () => this.isHovering.set(true));
        el.addEventListener('mouseleave', () => this.isHovering.set(false));
      });
    });
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.x.set(event.clientX);
    this.y.set(event.clientY);
  }

  @HostListener('document:mousedown')
  onClickDown() {
    this.isClicking.set(true);
    setTimeout(() => this.isClicking.set(false), 150);
  }
}
