
import {Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from "@angular/core";
import {JobApplicationStatusModel} from "../_models/jobApplicationStatus.model";
import {Subscription} from "rxjs/Subscription";
import {JobApplicationStatusesService} from "../_services/jobApplicationStatuses.service";
import {NgForm} from "@angular/forms";
import {PaginationService} from "../_services/pagination.service";

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

  start: number;
  end: number;


  constructor(private paginationService: PaginationService, private jobApplicationStatusService: JobApplicationStatusesService) { }

  ngOnInit() {
    this.add = false;
    this.loading = true;
    this.jobApplicationStatusService.getJobApplicationStatuses();
    this.subscription = this.jobApplicationStatusService.jobApplicationStatusObserver.subscribe(
      (data : JobApplicationStatusModel[]) => {
        this.statuses = data;
        this.loading = false;

        this.paginationService.setPages(this.statuses.length);
        this.start = this.paginationService.start();
        this.paginationService.startObserver.subscribe(
          start => this.start = start
        )
        this.end = this.paginationService.end();
        this.paginationService.endObserver.subscribe(
          end => this.end = end
        );
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
    this.paginationService.setPages(0);
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
}

