import {Component, ViewContainerRef} from '@angular/core';
import {ToastsManager} from 'ng2-toastr';
import {TranslateService, TranslateStaticLoader} from 'ng2-translate';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css'
  ]
})



export class AppComponent {
  title = 'app';

  constructor(private translate: TranslateService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

  }


}
