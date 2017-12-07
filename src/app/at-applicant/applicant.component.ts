import {Component, OnInit, ViewChild, ElementRef, ViewContainerRef} from '@angular/core';
import {UserService} from "../_services/user.service";
import {UserModel} from "../_models/user.model";
import {ApplicantsService} from "../_services/applicants.service";
import {ApplicantModel} from "../_models/applicant.model";
import {NgForm} from "@angular/forms";
import {RegionModel} from "../_models/region.model";
import {RegionsService} from "../_services/regions.service";
import {forEach} from "@angular/router/src/utils/collection";
import {QualificationModel} from "../_models/qualification";
import {QualificationsService} from "../_services/qualifications.service";
import {ToastsManager} from "ng2-toastr";
import {ApplicantSchoolsService} from "../_services/applicantSchools.service";
import {ApplicantSchoolModel} from "../_models/applicantSchool.model";
import {ApplicantExperienceModel} from "../_models/applicantExperience.model";

declare  var $:any;

@Component({
  selector: 'app-applicant',
  templateUrl: './applicant.component.html',
  styleUrls: ['./applicant.component.css',
    '../../../node_modules/ng2-toastr/bundles/ng2-toastr.min.css']
})
export class ApplicantComponent implements OnInit {

  userId: string;
  user: UserModel;
  applicant: ApplicantModel;
  isEditPersonal: boolean;
  addApplicant: boolean;
  addEducation: boolean;
  regions: RegionModel[];
  cities: RegionModel[];
  filteredCities: RegionModel[];
  countries: RegionModel[];
  filteredCountries: RegionModel[];
  selectedRegion: RegionModel;
  selectedCountry: RegionModel;
  selectedCity: RegionModel;
  qualifications: QualificationModel[];
  selectedQualification: QualificationModel;
  currentSchool: ApplicantSchoolModel;
  currentExperience: ApplicantExperienceModel;

  constructor(public toastr: ToastsManager,
              private userService: UserService,
              private applicantService: ApplicantsService,
              private regionsService: RegionsService,
              private qualificationsService: QualificationsService,
              private applicantSchoolsService: ApplicantSchoolsService) {
    this.isEditPersonal = false;
    this.addApplicant = false;
    this.addEducation = false;
  }


  ngOnInit() {

    this.userService.getUser().subscribe(
      (data: UserModel) =>{
        this.user = data;
        console.log(this.user);
        this.userId = data.id;
        this.getApplicant();
      },
      error => {
        console.log(error);
      }
    );

    this.regionsService.getCities().subscribe(
      (data: RegionModel[]) => this.cities = data);

    this.regionsService.getCountries().subscribe(
      (data: RegionModel[]) => this.countries = data);

    this.regionsService.getRRegions().subscribe(
      (data: RegionModel[]) => this.regions = data);

    this.qualificationsService.getQualifications().subscribe(
      (data: QualificationModel[]) => {
        this.qualifications = data;
      }
    );

  }


  onSubmit(form: NgForm) {
    if(this.applicant != null){
      this.applicant.name = form.value.name;
      this.applicant.surname = form.value.surname;
      this.applicant.middle_name = form.value.middle_name;
      this.applicant.maiden_name = form.value.maiden_name;
      this.applicant.gender = form.value.gender;
      this.applicant.birthdate = form.value.birthdate;
      this.applicant.marital_status = form.value.marital_status;
      this.applicant.address = form.value.address;
      this.applicant.id_city = this.selectedCity;
      this.applicant.id_country = this.selectedCountry;
      this.applicant.id_region = this.selectedRegion;
      this.applicant.id_qualification = this.selectedQualification;
      this.applicant.employed = form.value.employed;
      this.applicant.industry = form.value.industry;
      this.applicant.employment_position = form.value.employment_position;
      this.applicant.description = form.value.description;
      this.applicantService.updateApplicant(this.applicant);
    }
    else{
      var newApplicant = new ApplicantModel(
        null,
        form.value.name,
        form.value.surname,
        form.value.marital_status,
        form.value.middle_name,
        form.value.maiden_name,
        form.value.gender,
        form.value.birthdate,
        form.value.address,
        form.value.employed,
        form.value.description,
        form.value.employment_position,
        form.value.industry,
        null,
        null,
        null,
        new Date,
        null,
        new Date,
        this.selectedCity,
        this.selectedRegion,
        this.selectedCountry,
        this.user,
        this.selectedQualification
      );
      this.applicantService.addApplicant(newApplicant).subscribe(
        (data: ApplicantModel) => {
          console.log(data);
          this.getApplicant();
        }
      );

      //this.getApplicant();
      this.addApplicant = false;
    }
    this.isEditPersonal = false;
  }


  onClose(){
    this.addEducation = false;
  }

  getApplicant(){
    this.applicantService.getApplicant(this.userId).subscribe(
      (data: ApplicantModel) => {

        this.applicant = data;
        console.log(this.applicant);
        if(this.applicant != null){
          this.selectedRegion = this.applicant.id_region;
          this.selectedCountry = this.applicant.id_country;
          this.selectedCity = this.applicant.id_city;
          this.selectedQualification = this.applicant.id_qualification;
        }

      },
      error => {
        console.log(error);
      }
    );
  }

  public onSelectRegion(region) {
    this.filteredCountries = this.countries.filter((item) => item.id_parent.id == region.id);
    this.filteredCities = [];
  }

  public onSelectCountry(country){
    this.filteredCities = this.cities.filter((city) => city.id_parent.id == country.id);
  }

  getCurrentSchool(school){
    this.currentSchool = school;
    console.log(this.currentSchool);
  }

  getCurrentExperience(experience){
    this.currentExperience = experience;
    console.log(this.currentExperience);
  }



}
