// Author: Joshua Payne
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

  key: any = null; // Key used to retrieve the result
  inputKey: any = ''; // Key from user input to prevent unwanted query
  result: any = null;

  constructor(private resultService: ResultService, private route: ActivatedRoute) { }

  // Fetch a result if a key is present on load
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['key']) {
        this.key = +params['key']
        this.getResult();
      }
    })
  }

  // Submits key for result retrieval on user input
  submitKey() {
    if (this.inputKey) {
      this.key = this.inputKey;
      this.getResult();
    }
  }

  // Fetches the result from the api using the key.
  getResult() {
    if (this.key) {
      this.resultService.getResult(this.key).subscribe({
        next: (result: any) => {
          this.result = result;
        },
        error: (err) => {
          this.result = null;
        }
      })
    }
  }

  // Deletes a result from the db by key.
  deleteResult() {
    if (this.key) {
      this.resultService.deleteResult(this.key).subscribe({
        next: (res: any) => {
          this.key = null;
          this.result = null;
          alert("result deleted")
        }
      })
    }
  }
}