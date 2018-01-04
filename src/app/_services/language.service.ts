import {Injectable} from "@angular/core";
import {TranslateService} from "ng2-translate";
import {Subject} from "rxjs/Subject";

@Injectable()
export class LanguageService {
  language = 'en';
  languageObservable= new Subject<string>();

  constructor(private translate: TranslateService) {

  }

  getDateFormat() {
    if (this.language === 'en') {
      return 'dd/MM/yyyy';
    } else if (this.language === 'ar') {
      return 'yyyy.MM.dd';
    }
  }

  getLanguage() {
    this.languageObservable.next(this.language);
    return this.language;
  }

  changeLanguage(language) {
    this.language = language;
    this.languageObservable.next(this.language);
    if (this.language === 'en') {
      const html: NodeListOf<HTMLHtmlElement> = document.getElementsByTagName('html');
      this.translate.use('en');
      html[0].setAttribute('dir', '');
    } else {
      const html: NodeListOf<HTMLHtmlElement> = document.getElementsByTagName('html');
      html[0].setAttribute('dir', 'rtl');
      this.translate.use('ar');
    }
  }

}
