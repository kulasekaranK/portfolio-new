import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { animate, stagger } from 'animejs';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
   mouseX = 0;
  mouseY = 0;
  scrollY = 0;

  @ViewChild('gridBg', { static: true }) gridBg!: ElementRef;
  @ViewChild('glow1', { static: true }) glow1!: ElementRef;
  @ViewChild('glow2', { static: true }) glow2!: ElementRef;
  @ViewChild('fogText', { static: true }) fogText!: ElementRef;

  ngAfterViewInit() {
    animate('.animate-fade-in', {
      opacity: [0, 1],
      translateY: [60, 0],
      easing: 'easeOutExpo',
      duration: 1000,
      delay: stagger(150),
    });

    animate('.animate-fade-in-delay-1', {
      opacity: [0, 1],
      translateY: [60, 0],
      easing: 'easeOutExpo',
      duration: 1000,
      delay: 300,
    });

    animate('.animate-fade-in-delay-2', {
      opacity: [0, 1],
      translateY: [60, 0],
      easing: 'easeOutExpo',
      duration: 1000,
      delay: 600,
    });

    animate('.animate-fade-in-delay-3', {
      opacity: [0, 1],
      translateY: [60, 0],
      easing: 'easeOutExpo',
      duration: 1000,
      delay: 900,
    });
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
    this.applyParallax();
  }

  @HostListener('window:scroll', [])
  onScroll() {
    this.scrollY = window.scrollY;
    this.applyParallax();
  }

  applyParallax() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const x = this.mouseX - centerX;
    const y = this.mouseY - centerY;
    const scroll = this.scrollY;

    animate(this.gridBg.nativeElement, {
      translateX: x * 0.01,
      translateY: y * 0.01 - scroll * 0.005,
      easing: 'easeOutQuad',
      duration: 200,
    });

    animate(this.glow1.nativeElement, {
      translateX: x * 0.03,
      translateY: y * 0.03 - scroll * 0.01,
      easing: 'easeOutQuad',
      duration: 200,
    });

    animate(this.glow2.nativeElement, {
      translateX: x * 0.02,
      translateY: y * 0.02 - scroll * 0.008,
      easing: 'easeOutQuad',
      duration: 200,
    });

    animate(this.fogText.nativeElement, {
      translateX: x * 0.08,
      translateY: y * 0.08 - scroll * 0.04,
      easing: 'easeOutQuad',
      duration: 200,
    });
  }
}
