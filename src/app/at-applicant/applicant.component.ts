import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {UserService} from "../_services/user.service";
import {UserModel} from "../_models/user.model";
import {ApplicantsService} from "../_services/applicants.service";
import {ApplicantModel} from "../_models/applicant.model";
import {NgForm} from "@angular/forms";
import {RegionModel} from "../_models/region.model";
import {RegionsService} from "../_services/regions.service";

declare  var $:any;

@Component({
  selector: 'app-applicant',
  templateUrl: './applicant.component.html',
  styleUrls: ['./applicant.component.css']
})
export class ApplicantComponent implements OnInit {
  @ViewChild('editForm') editForm: ElementRef;
  @ViewChild('editForm1') editForm1: ElementRef;
  @ViewChild('editForm2') editForm2: ElementRef;
  @ViewChild('editForm3') editForm3: ElementRef;

  userId: string;
  applicant: ApplicantModel;
  isEditPersonal: boolean;
  regions: RegionModel[];
  selectedRegion: RegionModel;
  selectedCountry: RegionModel;
  selectedCity: RegionModel;


  constructor(private userService: UserService, private applicantService: ApplicantsService, private regionsService: RegionsService) {
    this.isEditPersonal = false;

  }

  onSubmit(form: NgForm) {
    this.applicant.name = form.value.name;
    this.applicant.surname = form.value.surname;
    this.applicant.middle_name = form.value.middle_name;
    this.applicant.maiden_name = form.value.maiden_name;
    this.applicant.gender = form.value.gender;
    this.applicant.birthdate = form.value.birthdate;
    this.applicant.marital_status = form.value.marital_status;
    this.applicant.id_city = form.value.id_city;
    this.applicant.id_country = form.value.id_country;
    this.applicant.id_region = form.value.id_region;
    console.log(this.applicant);

    this.applicantService.updateApplicant(this.applicant).subscribe(
      result => console.log(result)
    );

    this.isEditPersonal = false;

    // console.log(this.vacancy);
    // this.subscriptionVacancy = this.vacancyService.updateVacancy(this.vacancy)
    //   .subscribe(
    //     result => console.log(result)
    //   );
    // //this.submitted = true;
    // this.onUpdate.emit();


  }



  showEditForm() {
    $.magnificPopup.open({
        items: {
            src: this.editForm.nativeElement
        },
        type: 'inline',
        closeOnBgClick: false,

    });
    return false;
  }

  showEditForm1() {
    $.magnificPopup.open({
        items: {
            src: this.editForm1.nativeElement
        },
        type: 'inline',
        closeOnBgClick: false,

    });
    return false;
  }

  showEditForm2() {
    $.magnificPopup.open({
        items: {
            src: this.editForm2.nativeElement
        },
        type: 'inline',
        closeOnBgClick: false,

    });
    return false;
  }

  showEditForm3() {
    $.magnificPopup.open({
        items: {
            src: this.editForm3.nativeElement
        },
        type: 'inline',
        closeOnBgClick: false,

    });
    return false;
  }

  getApplicant(){
    this.applicantService.getApplicant(this.userId).subscribe(
      (data: ApplicantModel) => {
        console.log(data);
        this.applicant = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit() {

    this.userService.getUser().subscribe(
      (data: UserModel) =>{
        this.userId = data.id;
        this.getApplicant();

      },
      error => {
        console.log(error);
      }
    );



    this.regionsService.getRegions().subscribe(
      (data: RegionModel[]) => {
        this.regions = data;
      }
    );


    $('#dataScroll').slimScroll({
        height: ''
    });
    $('#edit-div').slimScroll({
        height: ''
    });
    $('#edit-div1').slimScroll({
        height: ''
    });
    $('#edit-div2').slimScroll({
        height: ''
    });
    $('.check').each(function() {
        var ck = $(this).attr('data-checkbox') ? $(this).attr('data-checkbox') : 'icheckbox_minimal-red';
        var rd = $(this).attr('data-radio') ? $(this).attr('data-radio') : 'iradio_minimal-red';

        if (ck.indexOf('_line') > -1 || rd.indexOf('_line') > -1) {
            $(this).iCheck({
                checkboxClass: ck,
                radioClass: rd,
                insert: '<div class="icheck_line-icon"></div>' + $(this).attr("data-label")
            });
        } else {
            $(this).iCheck({
                checkboxClass: ck,
                radioClass: rd
            });
        }
    });

    $('.skin-polaris input').iCheck({
        checkboxClass: 'icheckbox_polaris',
        radioClass: 'iradio_polaris'
    });

    $('.skin-futurico input').iCheck({
        checkboxClass: 'icheckbox_futurico',
        radioClass: 'iradio_futurico'
    });

        $('.icolors li').click(function () {
            var self = $(this);

            if (!self.hasClass('active')) {
                self.siblings().removeClass('active');

                var skin = self.closest('.skin'),
                    c = self.attr('class') ? '-' + self.attr('class') : '',
                    ct = skin.data('color') ? '-' + skin.data('color') : '-red',
                    ct = (ct === '-black' ? '' : ct);

                var checkbox_default = 'icheckbox_minimal',
                    radio_default = 'iradio_minimal',
                    checkbox = 'icheckbox_minimal' + ct,
                    radio = 'iradio_minimal' + ct;

                if (skin.hasClass('skin-square')) {
                    checkbox_default = 'icheckbox_square';
                    radio_default = 'iradio_square';
                    checkbox = 'icheckbox_square' + ct;
                    radio = 'iradio_square' + ct;
                }
                ;

                if (skin.hasClass('skin-flat')) {
                    checkbox_default = 'icheckbox_flat';
                    radio_default = 'iradio_flat';
                    checkbox = 'icheckbox_flat' + ct;
                    radio = 'iradio_flat' + ct;
                }
                ;

                if (skin.hasClass('skin-line')) {
                    checkbox_default = 'icheckbox_line';
                    radio_default = 'iradio_line';
                    checkbox = 'icheckbox_line' + ct;
                    radio = 'iradio_line' + ct;
                }
                ;

                skin.find('.check').each(function () {
                    var e = $(this).hasClass('state') ? $(this) : $(this).parent();
                    var e_c = e.attr('class').replace(checkbox, checkbox_default + c).replace(radio, radio_default + c);
                    e.attr('class', e_c);
                });

                skin.data('color', self.attr('class') ? self.attr('class') : 'black');
                self.addClass('active');
            }
        });
  }

}
