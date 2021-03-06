import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {JobApplicationInterviewModel} from "../../_models/jobApplicationInterview.model";
import {JobApplicationInterviewService} from "../../_services/jobApplicationInterview.service";

@Component({
  selector: 'app-at-job-application-interviews',
  templateUrl: './at-job-application-interviews.component.html',
  styleUrls: ['./at-job-application-interviews.component.css']
})
export class AtJobApplicationInterviewsComponent implements OnInit {
  @ViewChild('cancelGrade') closeBtn: ElementRef;
  model: any = {};
  @Input() interview: JobApplicationInterviewModel;

  constructor(private jobApplicationInterviewService: JobApplicationInterviewService) { }

  ngOnInit() {
  }

  onEdit() {
    this.interview.grade = this.model.grade;
    this.interview.description = this.model.description;
    this.jobApplicationInterviewService.updateInterview(this.interview);
    this.closeModal()
  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }


  getBar(grade: number) {
    // create switch for different grades
    if (!grade) {
      return 'css-bar-0';
    }
    if (grade === 0) {
      return 'css-bar-0';
    } else if (grade <= 5) {
      return 'css-bar-5';
    } else if (grade <= 10) {
      return 'css-bar-10';
    } else if (grade <= 15) {
      return 'css-bar-15';
    } else if (grade <= 20) {
      return 'css-bar-20';
    } else if (grade <= 25) {
      return 'css-bar-25';
    } else if (grade <= 30) {
      return 'css-bar-30';
    } else if (grade <= 35) {
      return 'css-bar-35';
    } else if (grade <= 40) {
      return 'css-bar-40';
    } else if (grade <= 45) {
      return 'css-bar-45';
    } else if (grade <= 50) {
      return 'css-bar-50';
    } else if (grade <= 55) {
      return 'css-bar-55';
    } else if (grade <= 60) {
      return 'css-bar-60';
    } else if (grade <= 65) {
      return 'css-bar-65';
    } else if (grade <= 70) {
      return 'css-bar-70';
    } else if (grade <= 75) {
      return 'css-bar-75';
    } else if (grade <= 80) {
      return 'css-bar-80';
    } else if (grade <= 85) {
      return 'css-bar-85';
    } else if (grade <= 90) {
      return 'css-bar-90';
    } else if (grade < 100) {
      return 'css-bar-95';
    } else if (grade === 100) {
      return 'css-bar-100';
    } else {
      return 'css-bar-0';
    }
  }
}
