import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {
@HostListener('document:mousemove', ['$event'])
onMouseMove(event: MouseEvent) {
  const layers = document.querySelectorAll<HTMLElement>('.parallax-layer');
  const x = (event.clientX - window.innerWidth / 2) / window.innerWidth;
  const y = (event.clientY - window.innerHeight / 2) / window.innerHeight;

  layers.forEach((layer) => {
    const depth = parseFloat(layer.dataset['depth'] || '0.05');
    const translateX = x * depth * 100;
    const translateY = y * depth * 100;
    layer.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
  });
}


}
