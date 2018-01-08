import {Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation, Input} from '@angular/core';
import {SkillGradeModel} from "../_models/skill-grade.model";
import {Subscription} from "rxjs/Subscription";
import {SkillGradesService} from "app/_services/skill-grades.service";
import {NgForm} from "@angular/forms";
import {SkillModel} from "../_models/skill.model";

@Component({
  selector: 'app-skill-grades',
  templateUrl: './skill-grades.component.html',
  styleUrls: ['./skill-grades.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class SkillGradesComponent implements OnInit, OnDestroy {
  @Input() skills: SkillModel[];
  @ViewChild('cancelAdd') closeBtnAdd: ElementRef;
  @ViewChild('cancelEdit') closeBtnEdit: ElementRef;
  skillGrades: SkillGradeModel[];
  selectedSkillGrade: SkillGradeModel;
  selectedSkill: SkillModel;
  subscription: Subscription;

  constructor(private skillGradesService: SkillGradesService) { }

  ngOnInit() {
    this.skillGradesService.getSkillGrades();
    this.subscription = this.skillGradesService.skillGradesObserver.subscribe(
      (data: SkillGradeModel[]) => {
        this.skillGrades = data;
      }
    )
  }
  onSubmit(form: NgForm){
    this.selectedSkillGrade.code = form.value.code;
    this.selectedSkillGrade.name = form.value.name;
    this.selectedSkillGrade.description = form.value.description;
    this.selectedSkillGrade.numerical = form.value.numerical;
    this.selectedSkillGrade.grade = form.value.grade;
    this.selectedSkillGrade.idSkill = this.selectedSkill;

    this.skillGradesService.updateSkillGrade(this.selectedSkillGrade);
    this.closeEditModal();
  }

  onSubmitAdd(form: NgForm) {
    const newSkillGrade = new SkillGradeModel(
      null,
      form.value.code,
      form.value.name,
      form.value.description,
      form.value.grade,
      form.value.numerical,
      this.selectedSkill,
      null,
      new Date,
      null,
      new Date
    );
    this.skillGradesService.addSkillGrade(newSkillGrade);
    this.closeAddModal();
    form.reset();

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  removeSkillGrade(skillGrade: SkillGradeModel){
    this.skillGradesService.removeSkillGrade(skillGrade);
  }

  private closeAddModal(): void {
    this.closeBtnAdd.nativeElement.click();
  }
  private closeEditModal(): void {
    this.closeBtnEdit.nativeElement.click();
  }
}
