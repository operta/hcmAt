import 'rxjs/add/operator/toPromise';

import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { SkillModel} from '../models/skill.model';

@Injectable()
export class SkillsService {
  private skillsUrl = 'http://localhost:8080/rgSkills';  //URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getSkills() {
    return this.http.get(this.skillsUrl).map(
      (data: Response) => {
        const skills: SkillModel[] = data.json();
        return skills;
      }
    );
  }
}
