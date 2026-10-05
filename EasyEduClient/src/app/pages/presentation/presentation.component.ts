import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-presentation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css']
})
export class PresentationComponent {
  currentSlide = 1;
  totalSlides = 6;

  nextSlide(): void {
    if (this.currentSlide < this.totalSlides) {
      this.currentSlide++;
    } else {
      this.currentSlide = 1;
    }
  }

  prevSlide(): void {
    if (this.currentSlide > 1) {
      this.currentSlide--;
    } else {
      this.currentSlide = this.totalSlides;
    }
  }

  goToSlide(slide: number): void {
    this.currentSlide = slide;
  }
}
