import { Component, OnInit, ViewChild, ElementRef, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Rx';

import { DataTableDirective } from 'angular-datatables';
import { Skill } from './skill';
import { SkillsService } from './skills.service';

declare  var $:any;

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  @ViewChild('editForm') editForm: ElementRef;
  @ViewChild('codeField') codeField: ElementRef;
  @ViewChild('nameField') nameField: ElementRef;
  @ViewChild('descriptionArea') descriptionArea: ElementRef;
  @ViewChild('fieldField') fieldField: ElementRef;
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  skills: Skill[] = [];
  selectedSkill: Skill = new Skill();
  isDeleteSkill: boolean = false;

  constructor(private router: Router, private skillsService: SkillsService) { }

  selectSkill(selectSkill: Skill) {
    if (this.selectedSkill === selectSkill) {
      this.showEditForm(this.selectedSkill, false);
    }
    else {
      this.selectedSkill = selectSkill;
      this.skillsService.skillSelected.emit(this.selectedSkill);
    }
  }

  showEditForm(editSkill: Skill, deleteSkill: boolean) {
    if (deleteSkill !== null) {
      this.isDeleteSkill = deleteSkill;
    }
    else {
      this.isDeleteSkill = false;
    }
    if (editSkill) {
      if (this.selectedSkill !== editSkill) {
        this.selectedSkill = editSkill;
        this.skillsService.skillSelected.emit(this.selectedSkill);
      }
      this.codeField.nativeElement.value = editSkill.code;
      this.nameField.nativeElement.value = editSkill.name;
      this.descriptionArea.nativeElement.value = editSkill.description;
      this.fieldField.nativeElement.value = editSkill.field;
    }
    else {
      if (this.selectedSkill !== null) {
        this.selectedSkill = null;
        this.skillsService.skillSelected.emit(this.selectedSkill);
      }
      this.codeField.nativeElement.value = '';
      this.nameField.nativeElement.value = '';
      this.descriptionArea.nativeElement.value = '';
      this.fieldField.nativeElement.value = '';
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

  saveSkill(id: number, code: string, name: string, description: string, field: string) {
    if (this.selectedSkill) {
      var editedSkill: Skill = new Skill();
      editedSkill.id = id;
      editedSkill.code = code;
      editedSkill.name = name;
      editedSkill.description = description;
      editedSkill.field = field;
      this.skillsService.update(editedSkill)
          .then(() => {
            this.updateSkillsArray(editedSkill); 
            this.closeEditForm();
          });
    }
    else {
      this.skillsService.create(code, name, description, field)
          .then(skill => {
            this.skills.push(skill);
            this.closeEditForm();
            this.rerender();
          });
    }
  }

  updateSkillsArray(editedSkill: Skill) {
    const findSkill = this.skills.find(skill => skill.id === editedSkill.id);
    if(findSkill) {
      findSkill.code = editedSkill.code;
      findSkill.name = editedSkill.name;
      findSkill.description = editedSkill.description;
      findSkill.field = editedSkill.field;
    }
  }

  delete(skill: Skill): void {
    this.skillsService
        .delete(skill.id)
        .then(() => {
          this.skills = this.skills.filter(h => h !== skill);
          if (this.selectedSkill === skill) { 
            this.selectedSkill = null; 
            this.skillsService.skillSelected.emit(this.selectedSkill);
            this.isDeleteSkill = false;
            this.closeEditForm();
            this.rerender();
          }
        });
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }
  
  ngOnInit() {
    /*this.dtOptions = {
      paginationType: 'full_numbers',
      displayLength: 2
    };*/
    this.dtOptions = {"columnDefs": [
            {
                "targets": 4,
                "visible": true,
                "searchable": false, 
                "orderable": false
            }
      ]
    };
    this.skillsService.getSkills().then(skills => {
        this.skills = skills;
        this.dtTrigger.next();
      });
  }
}
