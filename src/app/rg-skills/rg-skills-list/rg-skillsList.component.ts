import { Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';

import { SkillModel} from '../../models/skill.model';
import { SkillsService } from '../../services/skills.service';


@Component({
  selector: 'app-skills',
  templateUrl: './rg-skillsList.component.html',
  styleUrls: ['./rg-skillsList.component.css']
})
export class RgSkillsListComponent implements OnInit {

  skills: SkillModel[];
  skillsForm: FormGroup;

  constructor(private router: Router, private skillsService: SkillsService) { }

  ngOnInit() {
    this.initForm();
    this.initSkills();
  }

  initForm() {
    this.skillsForm = new FormGroup({
      'code': new FormControl(''),
      'name': new FormControl(''),
      'description': new FormControl(''),
      'fieldOfSkill': new FormControl('')
    })
  }

  initSkills() {
    this.skillsService.getSkills().subscribe(
      (data: SkillModel[]) => {
        this.skills = data;
      }
    );
  }

}
