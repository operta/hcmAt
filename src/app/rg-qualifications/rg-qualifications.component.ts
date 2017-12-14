import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {QualificationModel} from "../_models/qualification";
import {Subscription} from "rxjs/Subscription";
import {QualificationsService} from "../_services/qualifications.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-rg-qualifications',
  templateUrl: './rg-qualifications.component.html',
  styleUrls: ['./rg-qualifications.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RgQualificationsComponent implements OnInit {
  @ViewChild('cancelAdd') closeBtnAdd: ElementRef;
  @ViewChild('cancelEdit') closeBtnEdit: ElementRef;
  qualifications: QualificationModel[];
  selectedQualification: QualificationModel;
  subscription: Subscription;
  loading: boolean = false;

  constructor(private qualificationsService: QualificationsService) { }

  ngOnInit() {
    this.loading = true;
    this.qualificationsService.getQualifications();
    this.subscription = this.qualificationsService.qualificationsObserver.subscribe(
      (data : QualificationModel[]) => {
        this.qualifications = data;
        this.loading = false;
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
