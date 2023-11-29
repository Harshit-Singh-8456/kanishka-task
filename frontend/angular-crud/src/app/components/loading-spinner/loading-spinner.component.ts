import { Component, ElementRef, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent {
  private animationInterval: any;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    const balls = this.elementRef.nativeElement.querySelectorAll('.ball');

    // Function to create a looping animation frame
    const createLoopingFrame = (frameCount: any, duration: any, frameCallback: any) => {
      const interval = duration / frameCount;
      let currentFrame = 0;

      this.animationInterval = setInterval(() => {
        const frame = currentFrame % frameCount;
        frameCallback(frame, balls);
        currentFrame++;
      }, interval);
    };

    // Update the animation based on the current frame
    const updateAnimation = (frame: any, balls: any) => {
      balls.forEach((ball: any, index: any) => {
        const translateY = frame === index ? -20 : 0;
        ball.style.transform = `translateY(${translateY}px)`;
      });
    };

    // Create a 3-frame looping animation with a 2-second duration
    createLoopingFrame(3, 2000, updateAnimation);
  }

  ngOnDestroy() {
    // Clear the animation interval on component destruction to prevent memory leaks
    clearInterval(this.animationInterval);
  }
}
