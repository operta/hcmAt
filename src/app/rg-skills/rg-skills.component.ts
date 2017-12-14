import {Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {SkillsService} from "../_services/skills.service";
import {SkillModel} from "../_models/skill.model";
import {Subscription} from "rxjs/Subscription";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-rg-skills',
  templateUrl: './rg-skills.component.html',
  styleUrls: ['./rg-skills.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RgSkillsComponent implements OnInit, OnDestroy {
  @ViewChild('cancel') closeBtn: ElementRef;
  @ViewChild('cancelEdit') closeBtnEdit: ElementRef;
  skills: SkillModel[];
  selectedSkill: SkillModel;
  subscription: Subscription;
  add: boolean;
  loading: boolean = false;


  pages = [];
  resultCount = 15;
  page = 1;

  constructor(private skillsService: SkillsService) { }

  ngOnInit() {
    this.add = false;
    this.loading = true;
    this.skillsService.getSkills();
    this.subscription = this.skillsService.skillsObserver.subscribe(
      (data : SkillModel[]) => {
        this.skills = data;
        this.loading = false;
        this.pages = [];
        let numIndex = 1;
        for (let i = 0; i < this.skills.length; i++) {
          if (i % this.resultCount === 0) {
            this.pages.push({num: numIndex});
            numIndex = numIndex + 1;
          }
        }

      }
    )
  }
  onSubmit(form: NgForm){
    this.selectedSkill.code = form.value.code;
    this.selectedSkill.name = form.value.name;
    this.selectedSkill.description = form.value.description;
    this.selectedSkill.field = form.value.field;
    this.skillsService.updateSkill(this.selectedSkill);
    this.closeEditModal();
  }

  onSubmitAdd(form: NgForm){
    var newSkill = new SkillModel(
      null,
      form.value.code,
      form.value.name,
      form.value.description,
      form.value.field,
      null,
      new Date,
      null,
      new Date
    );

    this.skillsService.addSkill(newSkill);
    this.closeModal();
    form.reset();

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  removeSkill(skill: SkillModel){
    this.skillsService.removeSkill(skill);
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
