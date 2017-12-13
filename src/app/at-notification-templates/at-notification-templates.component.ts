import {Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {NotificationTemplateModel} from "../_models/notificationTemplate.model";
import {Subscription} from "rxjs/Subscription";
import {NotificationTemplatesService} from "../_services/notificationTemplate.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-at-notification-templates',
  templateUrl: './at-notification-templates.component.html',
  styleUrls: ['./at-notification-templates.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AtNotificationTemplatesComponent implements OnInit, OnDestroy {
  @ViewChild('cancel') closeBtn: ElementRef;
  @ViewChild('cancelEdit') closeBtnEdit: ElementRef;
  templates: NotificationTemplateModel[];
  selectedTemplate: NotificationTemplateModel;
  subscription: Subscription;
  add: boolean;


  constructor(private notificationTemplatesService: NotificationTemplatesService) { }

  ngOnInit() {
    this.add = false;
    this.notificationTemplatesService.getNotificationTemplates();
    this.subscription = this.notificationTemplatesService.notificationTemplatesObserver.subscribe(
      (data : NotificationTemplateModel[]) => {
        this.templates = data;
        console.log(this.templates);
      }
    )
  }
  onSubmit(form: NgForm){
    this.selectedTemplate.code = form.value.code;
    this.selectedTemplate.subject = form.value.subject;
    this.selectedTemplate.template = form.value.template;
    this.notificationTemplatesService.updateNotificationTemplate(this.selectedTemplate);
    this.closeEditModal();
  }

  onSubmitAdd(form: NgForm){
    var newTemplate = new NotificationTemplateModel(
      null,
      form.value.code,
      form.value.subject,
      form.value.template,
      null,
      new Date,
      null,
      new Date
    );

    this.notificationTemplatesService.addNotificationTemplate(newTemplate);
    this.closeModal();
    form.reset();

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  removeNotificationTemplate(template: NotificationTemplateModel){
    this.notificationTemplatesService.removeNotificationTemplate(template);
  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }
  private closeEditModal(): void {
    this.closeBtnEdit.nativeElement.click();
  }

}

