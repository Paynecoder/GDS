import { Component } from '@angular/core';
import { ResultService } from '../../services/result.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent {

  key: number = 0;
  result: any = null;
  error: string = '';

  constructor(private resultService: ResultService) { }

  getResult() {
    if (this.key) {
      this.resultService.getResult(this.key).subscribe({
        next: (result: any) => {
          this.result = result;
          this.error = '';
        },
        error: (err) => {
          this.error = 'Score not found :('
          this.result = null;
        }
      })
    }
  }
}