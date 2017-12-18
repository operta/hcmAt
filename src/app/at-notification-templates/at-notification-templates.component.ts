import {Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {NotificationTemplateModel} from "../_models/notificationTemplate.model";
import {Subscription} from "rxjs/Subscription";
import {NotificationTemplatesService} from "../_services/notificationTemplate.service";
import {NgForm} from "@angular/forms";
import {PaginationService} from "../_services/pagination.service";

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

  start: number;
  end: number;
  constructor(private paginationService: PaginationService, private notificationTemplatesService: NotificationTemplatesService) { }

  ngOnInit() {
    this.add = false;
    this.loading = true;
    this.notificationTemplatesService.getNotificationTemplates();
    this.subscription = this.notificationTemplatesService.notificationTemplatesObserver.subscribe(
      (data : NotificationTemplateModel[]) => {
        this.templates = data;
        this.loading = false;

        this.paginationService.setPages(this.templates.length);
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
  onSubmit(form: NgForm) {
    this.selectedTemplate.code = form.value.code;
    this.selectedTemplate.subject = form.value.subject;
    this.selectedTemplate.template = form.value.template;
    this.notificationTemplatesService.updateNotificationTemplate(this.selectedTemplate);
    this.closeEditModal();
  }

  onSubmitAdd(form: NgForm) {
    const newTemplate = new NotificationTemplateModel(
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
    this.paginationService.setPages(0);
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

