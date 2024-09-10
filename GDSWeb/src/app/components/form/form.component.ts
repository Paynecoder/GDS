import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent {

  constructor(private router: Router) {}

  questions = [
    'Are you basically satisfied with your life?',
    'Have you dropped many of your activities and interests?',
    'Do you feel that your life is empty?',
    'Do you often get bored?',
    'Are you in good spirits most of the time?',
    'Are you afraid that something bad is going to happen to you?',
    'Do you feel happy most of the time?',
    'Do you often feel helpless?',
    'Do you prefer to stay at home, rather than going out and doing things?',
    'Do you feel that you have more problems with memory than most?',
    'Do you think it is wonderful to be alive now?',
    'Do you feel worthless the way you are now?',
    'Do you feel full of energy?',
    'Do you feel that your situation is hopeless?',
    'Do you think that most people are better off than you are?'
  ]

  questionMapping = [
    { yes: 0, no: 1 },
    { yes: 1, no: 0 },
    { yes: 1, no: 0 },
    { yes: 1, no: 0 },
    { yes: 0, no: 1 },
    { yes: 1, no: 0 },
    { yes: 0, no: 1 },
    { yes: 1, no: 0 },
    { yes: 1, no: 0 },
    { yes: 1, no: 0 },
    { yes: 0, no: 1 },
    { yes: 1, no: 0 },
    { yes: 0, no: 1 },
    { yes: 1, no: 0 },
    { yes: 1, no: 0 }
  ];

  currentQIndex = 0;
  answers: number[] = []

  recordAnswer(answer: 'yes' | 'no') {
    this.answers[this.currentQIndex] = this.questionMapping[this.currentQIndex][answer];
  }

  nextQuestion() {
    if (this.currentQIndex < this.questions.length - 1) {
      this.currentQIndex++;
    }
  }

  prevQuestion() {
    if (this.currentQIndex > 0) {
      this.currentQIndex--;
    }
  }

  getProgress(): number {
    return ((this.currentQIndex + 1) / this.questions.length) * 100;
  }

  calculateResult(): number {
    return this.answers.reduce((acc, answer) => acc + answer, 0);
  }

  submitForm() {
    this.router.navigate(['/results']);
  }
}