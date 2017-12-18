import {Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {QualificationModel} from "../_models/qualification";
import {Subscription} from "rxjs/Subscription";
import {QualificationsService} from "../_services/qualifications.service";
import {NgForm} from "@angular/forms";
import {PaginationService} from "../_services/pagination.service";

@Component({
  selector: 'app-rg-qualifications',
  templateUrl: './rg-qualifications.component.html',
  styleUrls: ['./rg-qualifications.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RgQualificationsComponent implements OnInit, OnDestroy {
  @ViewChild('cancelAdd') closeBtnAdd: ElementRef;
  @ViewChild('cancelEdit') closeBtnEdit: ElementRef;
  qualifications: QualificationModel[];
  selectedQualification: QualificationModel;
  subscription: Subscription;
  loading: boolean = false;

  start: number;
  end: number;


  constructor(private paginationService: PaginationService, private qualificationsService: QualificationsService) { }

  ngOnInit() {
    this.loading = true;
    this.qualificationsService.getQualifications();
    this.subscription = this.qualificationsService.qualificationsObserver.subscribe(
      (data: QualificationModel[]) => {
        this.qualifications = data;
        this.loading = false;

        this.paginationService.setPages(this.qualifications.length);
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
  onSubmit(form: NgForm){
    this.selectedQualification.code = form.value.code;
    this.selectedQualification.name = form.value.name;
    this.selectedQualification.description = form.value.description;
    this.qualificationsService.updateQualification(this.selectedQualification);
    this.closeEditModal();
  }

  onSubmitAdd(form: NgForm){
    console.log(form.value);
    var newQualification = new QualificationModel(
      null,
      form.value.code,
      form.value.name,
      form.value.description,
      null,
      new Date,
      null,
      new Date
    );
    console.log(newQualification);
    this.qualificationsService.addQualification(newQualification);
    this.closeAddModal();
    form.reset();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.paginationService.setPages(0);

  }

  removeQualification(qualification: QualificationModel){
    this.qualificationsService.removeQualification(qualification);
  }

  private closeAddModal(): void {
    this.closeBtnAdd.nativeElement.click();
  }
  private closeEditModal(): void {
    this.closeBtnEdit.nativeElement.click();
  }


}
