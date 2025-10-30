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
  private cleanupFunctions: (() => void)[] = [];
  private rafId: number | null = null;
  
  ngAfterViewInit() {
    // Hide default cursor
    // this.document.body.style.cursor = 'none';
    
    // Setup hover detection with better performance
    this.setupHoverDetection();
    
    // Add smooth cursor movement
    this.smoothCursorMovement();
  }
  
  ngOnDestroy() {
    // Cleanup event listeners
    this.cleanupFunctions.forEach(cleanup => cleanup());
    
    // Show default cursor back
    this.document.body.style.cursor = 'auto';
    
    // Cancel animation frame
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
  }
  
  private setupHoverDetection() {
    // Enhanced selectors for better hover detection
    const hoverableSelectors = [
      'a', 'button', 'input', 'textarea', 'select',
      '.hoverable', '.btn', '.link', '.clickable',
      '[role="button"]', '[tabindex]', '.cursor-pointer'
    ];
    
    const elements = this.document.querySelectorAll(hoverableSelectors.join(', '));
    
    elements.forEach((el: any) => {
      const mouseEnterHandler = () => {
        this.isHovering.set(true);
        el.style.transform = 'scale(1.02)';
        el.style.transition = 'transform 0.2s ease';
      };
      
      const mouseLeaveHandler = () => {
        this.isHovering.set(false);
        el.style.transform = 'scale(1)';
      };
      
      el.addEventListener('mouseenter', mouseEnterHandler);
      el.addEventListener('mouseleave', mouseLeaveHandler);
      
      // Store cleanup functions
      this.cleanupFunctions.push(() => {
        el.removeEventListener('mouseenter', mouseEnterHandler);
        el.removeEventListener('mouseleave', mouseLeaveHandler);
      });
    });
  }
  
  private smoothCursorMovement() {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    
    const animate = () => {
      const lerp = (start: number, end: number, factor: number) => 
        start + (end - start) * factor;
      
      currentX = lerp(currentX, targetX, 0.15);
      currentY = lerp(currentY, targetY, 0.15);
      
      this.x.set(currentX);
      this.y.set(currentY);
      
      this.rafId = requestAnimationFrame(animate);
    };
    
    // Update target position on mouse move
    const mouseMoveHandler = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
    };
    
    this.document.addEventListener('mousemove', mouseMoveHandler);
    this.cleanupFunctions.push(() => {
      this.document.removeEventListener('mousemove', mouseMoveHandler);
    });
    
    animate();
  }
  
  @HostListener('document:mousedown')
  onClickDown() {
    this.isClicking.set(true);
    
    // Add haptic feedback simulation
    this.createClickRipple();
    
    // Reset click state after animation
    setTimeout(() => this.isClicking.set(false), 300);
  }
  
  @HostListener('document:mouseup')
  onClickUp() {
    // Quick reset for responsive feel
    setTimeout(() => this.isClicking.set(false), 100);
  }
  
  private createClickRipple() {
    const ripple = this.document.createElement('div');
    ripple.className = 'cursor-ripple';
    ripple.style.cssText = `
      position: fixed;
      top: ${this.y() - 10}px;
      left: ${this.x() - 10}px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(239, 68, 68, 0.4) 0%, transparent 70%);
      pointer-events: none;
      z-index: 9998;
      animation: ripple-expand 0.6s ease-out forwards;
    `;
    
    const style = this.document.createElement('style');
    style.textContent = `
      @keyframes ripple-expand {
        0% {
          transform: scale(1);
          opacity: 1;
        }
        100% {
          transform: scale(8);
          opacity: 0;
        }
      }
    `;
    
    this.document.head.appendChild(style);
    this.document.body.appendChild(ripple);
    
    // Cleanup after animation
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    }, 600);
  }
  

}
