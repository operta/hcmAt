import { Directive, HostBinding, OnInit, HostListener} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})

export class DropdownDirective implements OnInit {
  @HostBinding('class.open') open: boolean;

  ngOnInit() {
    this.open = false;
  }

  @HostListener('click') toggleOpen() {
    console.log('click na button' + this.open);
    this.open = !this.open;
  }

  @HostListener('mouseleave') close(){
    this.open = false;
  }
}
