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


  constructor(private skillsService: SkillsService) { }

  ngOnInit() {
    this.add = false;
    this.skillsService.getSkills();
    this.subscription = this.skillsService.skillsObserver.subscribe(
      (data : SkillModel[]) => {
        this.skills = data;
        console.log(this.skills);
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

}
