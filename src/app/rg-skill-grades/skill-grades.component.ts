import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Rx';

import { DataTableDirective } from 'angular-datatables';
import { Skill } from '../rg-skills/skill'
import { SkillGrade } from './skill-grade';
import { SkillGradesService } from './skill-grades.service';
import { SkillsService } from '../rg-skills/skills.service';

declare  var $:any;

@Component({
  selector: 'app-skill-grades',
  templateUrl: './skill-grades.component.html',
  styleUrls: ['./skill-grades.component.css']
})

export class SkillGradesComponent implements OnInit {
  @ViewChild('editForm') editForm: ElementRef;
  @ViewChild('codeField') codeField: ElementRef;
  @ViewChild('nameField') nameField: ElementRef;
  @ViewChild('descriptionArea') descriptionArea: ElementRef;
  @ViewChild('gradeField') gradeField: ElementRef;
  @ViewChild('numericalField') numericalField: ElementRef;
  @ViewChild('addButton') addButton: ElementRef;
  @ViewChild('tableDiv') tableDiv: ElementRef;
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  skillGrades: SkillGrade[] = [];
  selectedSkillGrade: SkillGrade = new SkillGrade();
  isDeleteSkillGrade: boolean = false;
  selectedSkill: Skill;

  constructor(private router: Router, private skillGradesService: SkillGradesService, 
      private skillsService: SkillsService) { }

  /*ngOnChanges() {
    if (this.selectedSkill.id) {
      this.skillGradesService.getSkillGrades(this.selectedSkill).then(skillGrades => {
        this.skillGrades = skillGrades;
        this.rerender();
      });
      console.log('SG component change: ' + this.selectedSkill.id);
    }
    console.log('SG component change: null');
  }*/

  onSkillSelected(selectedSkill: Skill) {
    if (selectedSkill) {
      this.selectedSkill = selectedSkill;
      this.skillGradesService.getSkillGrades(this.selectedSkill).then(skillGrades => {
        this.skillGrades = skillGrades;
        this.rerender();
      });
    }
    else {
      this.selectedSkill = null;
      this.skillGrades = [];
      this.rerender();
    }
    this.enableDisableAdd();
    console.log('onSkillSelected');
  }

  enableDisableAdd() {
    if (this.selectedSkill) {
      this.addButton.nativeElement.disabled = false;
      this.tableDiv.nativeElement.hidden = false;
    }
    else {
      this.addButton.nativeElement.disabled = true;
      this.tableDiv.nativeElement.hidden = true;
    }
  }

  selectSkillGrade(selectSkillGrade: SkillGrade) {
    if (this.selectedSkillGrade === selectSkillGrade) {
      this.showEditForm(this.selectedSkillGrade, false);
    }
    else {
      this.selectedSkillGrade = selectSkillGrade;
    }
  }

  showEditForm(editSkillGrade: SkillGrade, deleteSkillGrade: boolean) {
    if (deleteSkillGrade !== null) {
      this.isDeleteSkillGrade = deleteSkillGrade;
    }
    else {
      this.isDeleteSkillGrade = false;
    }
    if (editSkillGrade) {
      this.selectedSkillGrade = editSkillGrade;
      this.codeField.nativeElement.value = editSkillGrade.code;
      this.nameField.nativeElement.value = editSkillGrade.name;
      this.descriptionArea.nativeElement.value = editSkillGrade.description;
      this.gradeField.nativeElement.value = editSkillGrade.grade;
      this.numericalField.nativeElement.value = editSkillGrade.numerical
    }
    else {
      this.selectedSkillGrade = null;
      this.codeField.nativeElement.value = '';
      this.nameField.nativeElement.value = '';
      this.descriptionArea.nativeElement.value = '';
      this.gradeField.nativeElement.value = '';
      this.numericalField.nativeElement.value = '';
    }
    $.magnificPopup.open({
        items: {
            src: this.editForm.nativeElement
        },
        type: 'inline',
        closeOnBgClick: false,

    });
    return false;
  }

  closeEditForm() {
    $.magnificPopup.close();
    return false;
  }

  saveSkill(id: number, code: string, name: string, description: string, grade: number, numerical: string) {
    if (this.selectedSkill.id) {
      if (this.selectedSkillGrade) {
        var editedSkillGrade: SkillGrade = new SkillGrade();
        editedSkillGrade.id = id;
        editedSkillGrade.code = code;
        editedSkillGrade.name = name;
        editedSkillGrade.description = description;
        editedSkillGrade.grade = grade;
        editedSkillGrade.numerical = numerical;
        editedSkillGrade.idSkill = this.selectedSkill.id;
        this.skillGradesService.update(this.selectedSkill, editedSkillGrade)
            .then(() => {
              this.updateSkillsArray(editedSkillGrade); 
              this.closeEditForm();
            });
      }
      else {
        this.skillGradesService.create(code, name, description, grade, numerical, this.selectedSkill.id)
            .then(skillGrade => {
              this.skillGrades.push(skillGrade);
              this.closeEditForm();
              this.rerender();
            });
      }
    }
  }

  updateSkillsArray(editedSkillGrade: SkillGrade) {
    const findSkillGrade = this.skillGrades.find(skillGrade => skillGrade.id === editedSkillGrade.id);
    if(findSkillGrade) {
      findSkillGrade.code = editedSkillGrade.code;
      findSkillGrade.name = editedSkillGrade.name;
      findSkillGrade.description = editedSkillGrade.description;
      findSkillGrade.grade = editedSkillGrade.grade;
      findSkillGrade.numerical = editedSkillGrade.numerical;
    }
  }

  delete(skillGrade: SkillGrade): void {
    this.skillGradesService
        .delete(this.selectedSkill, skillGrade.id)
        .then(() => {
          this.skillGrades = this.skillGrades.filter(h => h !== skillGrade);
          if (this.selectedSkillGrade === skillGrade) { 
            this.selectedSkillGrade = null; 
            this.isDeleteSkillGrade = false;
            this.closeEditForm();
            this.rerender();
          }
        });
  }

  rerender(): void {
    if (this.dtElement.dtInstance) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next();
      });
    }
    else {
      this.dtTrigger.next();
    }
  }

  destroyTable() {
    if (this.dtElement.dtInstance) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
    }
  }
  
  ngOnInit() {
    this.dtOptions = {"columnDefs": [
            {
                "targets": 5,
                "visible": true,
                "searchable": false, 
                "orderable": false
            }
      ],
      "language": {
        "emptyTable": "There is no Grades for selected Skill"
      }
    };
    this.skillsService.skillSelected
      .subscribe(
        (selectedSkill: Skill) => {
          this.onSkillSelected(selectedSkill);
        }
      );
    this.enableDisableAdd();
  }
}
