import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare const Swal: any;

@Component({
  selector: 'app-ai-content',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-content.component.html',
  styleUrls: ['./ai-content.component.css']
})
export class AiContentComponent {
  activeGenerator: 'lesson-plan' | 'exam-questions' | 'circular-notice' | 'summary' = 'lesson-plan';

  prompt = {
    subject: 'Physics',
    grade: 'Grade 10',
    topic: 'Electromagnetic Induction & Faraday Laws',
    targetQuestions: 5,
    generatedOutput: ''
  };

  isGenerating = false;

  generateAI(): void {
    this.isGenerating = true;
    setTimeout(() => {
      this.isGenerating = false;
      if (this.activeGenerator === 'lesson-plan') {
        this.prompt.generatedOutput = `### AI Lesson Plan: ${this.prompt.topic} (${this.prompt.grade})
- **Learning Objectives**: Understand magnetic flux, Faraday's First and Second Laws, and Lenz's Law of induced EMF.
- **Pedagogy & Demonstrations**: Bar magnet moving inside solenoid coil connected to galvanometer.
- **Formative Assessment**: 3 quiz checkpoints during 45-minute lesson.
- **Homework Assignment**: Calculate induced EMF when flux changes by 0.5 Weber in 0.02 seconds.`;
      } else if (this.activeGenerator === 'exam-questions') {
        this.prompt.generatedOutput = `### AI Generated Question Bank (${this.prompt.topic})
1. **MCQ (1 Mark)**: What is the unit of magnetic flux? (a) Tesla (b) Weber (c) Henry (d) Gauss [Ans: b]
2. **Short Answer (2 Marks)**: State Lenz's Law and explain how it conserves energy.
3. **Numerical (3 Marks)**: A coil of 200 turns has a magnetic flux change of 0.04 Wb in 0.1 s. Calculate the induced electromotive force.`;
      } else {
        this.prompt.generatedOutput = `### Institutional Circular Draft
**Subject**: Upcoming Academic Enrichment & Workshop on ${this.prompt.topic}
Dear Parents and Students,
Please be informed that a specialized hands-on laboratory session for ${this.prompt.grade} will be conducted this Thursday. All students must bring their physics notebooks.`;
      }
      Swal.fire({
        title: 'AI Generation Complete!',
        text: 'Generated pedagogical content is ready to copy or insert into Lesson Plan / Question Bank.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });
    }, 1200);
  }

  copyOutput(): void {
    navigator.clipboard.writeText(this.prompt.generatedOutput);
    Swal.fire('Copied to Clipboard!', '', 'success');
  }
}
