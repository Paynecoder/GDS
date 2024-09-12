// Author: Joshua Payne
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'
import { ResultService, ResultEntry } from '../../services/result.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent {

  constructor(private router: Router, private resultService: ResultService) {}

  currentQIndex = 0;
  answers: number[] = [];
  selectedAnswers: string[] = []; // Stores the 'yes' or 'no' selection for each question.
  points: number = 0;
  resultKey: number = 0;
  error: string = '';

  // Records the user's answer for the current question.
  recordAnswer(answer: 'yes' | 'no') {
    this.answers[this.currentQIndex] = this.questionMapping[this.currentQIndex][answer];
    this.selectedAnswers[this.currentQIndex] = answer;
  }

  // True if 'yes' False if 'no' for the current question.
  isSelected(answer: 'yes' | 'no'): boolean {
    return this.selectedAnswers[this.currentQIndex] === answer;
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

  // Calculates the user's progress through the test as a percentage.
  getProgress(): number {
    return ((this.currentQIndex + 1) / this.questions.length) * 100;
  }

  // Sum score of answers
  calculateResult(): number {
    return this.answers.reduce((acc, answer) => acc + answer, 0);
  }

  // Sends the result to the dotnet api and routes user to the results page with their information.
  submitForm() {
    this.points = this.calculateResult();
    this.resultService.submitResult(this.points).subscribe({
      next: (resultEntry: ResultEntry) => {
        this.resultKey = resultEntry.key;
        this.router.navigate(['/results'], { queryParams: {key: this.resultKey}}); // Retrieve key returned from http request and send user to results with it.
      },
      error: (err) => {
        this.error = 'Error posting results.';
      }
    });
  }

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

  // Mapping of answers ('yes' or 'no') to points for each question.
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

}