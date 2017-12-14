
import {Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from "@angular/core";
import {JobApplicationStatusModel} from "../_models/jobApplicationStatus.model";
import {Subscription} from "rxjs/Subscription";
import {JobApplicationStatusesService} from "../_services/jobApplicationStatuses.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-at-job-application-statuses',
  templateUrl: './at-job-application-statuses.component.html',
  styleUrls: ['./at-job-application-statuses.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AtJobApplicationStatusesComponent implements OnInit, OnDestroy {
  @ViewChild('cancel') closeBtn: ElementRef;
  @ViewChild('cancelEdit') closeBtnEdit: ElementRef;
  statuses: JobApplicationStatusModel[];
  selectedStatus: JobApplicationStatusModel;
  subscription: Subscription;
  add: boolean;
  loading: boolean = false;

  pages = [];
  resultCount = 15;
  page = 1;



  constructor(private jobApplicationStatusService: JobApplicationStatusesService) { }

  ngOnInit() {
    this.add = false;
    this.loading = true;
    this.jobApplicationStatusService.getJobApplicationStatuses();
    this.subscription = this.jobApplicationStatusService.jobApplicationStatusObserver.subscribe(
      (data : JobApplicationStatusModel[]) => {
        this.statuses = data;
        this.loading = false;
        this.pages = [];
        let numIndex = 1;
        for (let i = 0; i < this.statuses.length; i++) {
          if (i % this.resultCount === 0) {
            this.pages.push({num: numIndex});
            numIndex = numIndex + 1;
          }
        }
      }
    )
  }

  refresh() {
    // this.loading=true;
    // this.jobApplicationStatusService.getJobApplicationStatuses();
    // this.loading=false;
  }
  onSubmit(form: NgForm){
    this.selectedStatus.code = form.value.code;
    this.selectedStatus.name = form.value.name;
    this.selectedStatus.description = form.value.description;
    this.jobApplicationStatusService.updateJobApplicationStatus(this.selectedStatus);
    this.closeEditModal();
  }

  onSubmitAdd(form: NgForm){
    var newStatus = new JobApplicationStatusModel(
      null,
      form.value.code,
      form.value.name,
      form.value.description,
      null,
      new Date,
      null,
      new Date
    );
    this.jobApplicationStatusService.addJobApplicationStatus(newStatus);
    this.closeModal();
    form.reset();

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  removeJobApplicationStatus(template: JobApplicationStatusModel){
    this.jobApplicationStatusService.removeJobApplicationStatus(template);
  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }
  private closeEditModal(): void {
    this.closeBtnEdit.nativeElement.click();
  }

  setPage(num: number) {
    this.page = num;
  }
  start() {
    return this.resultCount * this.page - this.resultCount;
  }
  end() {
    return this.resultCount * this.page;
  }

}

