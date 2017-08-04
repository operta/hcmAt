import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

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

  constructor() { }

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

  ngOnInit() {
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
