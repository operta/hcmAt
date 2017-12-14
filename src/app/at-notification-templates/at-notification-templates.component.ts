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
  loading: boolean = false;

  pages = [];
  resultCount = 15;
  page = 1;

  constructor(private notificationTemplatesService: NotificationTemplatesService) { }

  ngOnInit() {
    this.add = false;
    this.loading = true;
    this.notificationTemplatesService.getNotificationTemplates();
    this.subscription = this.notificationTemplatesService.notificationTemplatesObserver.subscribe(
      (data : NotificationTemplateModel[]) => {
        this.templates = data;
        this.loading = false;

        this.pages = [];
        let numIndex = 1;
        for (let i = 0; i < this.templates.length; i++) {
          if (i % this.resultCount === 0) {
            this.pages.push({num: numIndex});
            numIndex = numIndex + 1;
          }
        }

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

