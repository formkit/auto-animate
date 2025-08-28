import {
  Directive,
  ElementRef,
  effect,
  input,
} from "@angular/core";
import autoAnimate, { AutoAnimateOptions } from "../index"


@Directive({
  selector: '[auto-animate]',
  standalone: true,
})

export class AutoAnimateDirective {
  readonly options = input<Partial<AutoAnimateOptions>>({});

  constructor(el: ElementRef) {
    effect(() => {
      autoAnimate(el.nativeElement, this.options());
    });
  }
}
