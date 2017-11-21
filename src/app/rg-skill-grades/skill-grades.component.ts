import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Rx';

import { DataTableDirective } from 'angular-datatables';
import { SkillGrade } from './skill-grade';
import { SkillGradesService } from './skill-grades.service';
import { SkillsService } from '../services/skills.service';


@Component({
  selector: 'app-skill-grades',
  templateUrl: './skill-grades.component.html',
  styleUrls: ['./skill-grades.component.css']
})

export class SkillGradesComponent implements OnInit {
  ngOnInit() {

  }
}
