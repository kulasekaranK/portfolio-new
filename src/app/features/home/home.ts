import { Component, HostListener } from '@angular/core';
import { Navbar } from "../../shared/ui/navbar/navbar";

@Component({
  selector: 'app-home',
  imports: [Navbar],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  mouseX = 0;
  mouseY = 0;
  scrollY = 0;

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  }

  @HostListener('window:scroll', [])
  onScroll() {
    this.scrollY = window.scrollY;
  }

  parallax(depth: number): string {
    const x = (this.mouseX - window.innerWidth / 2) * depth;
    const y = (this.mouseY - window.innerHeight / 2) * depth;
    const scrollOffset = this.scrollY * depth * 0.5; // tweak multiplier for speed
    return `translate3d(${x}px, ${y - scrollOffset}px, 0)`;
  }
}
