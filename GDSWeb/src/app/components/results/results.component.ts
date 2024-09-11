import { Component } from '@angular/core';
import { ResultService } from '../../services/result.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent {

  key: any = null;
  result: any = null;
  error: string = '';

  constructor(private resultService: ResultService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['key']) {
        this.key = +params['key']
        this.getResult();
      }
    })
  }

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