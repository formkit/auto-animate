import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  NgModule,
} from "@angular/core"
import autoAnimate, { AutoAnimateOptions } from "../index"

@Directive({
  selector: "[auto-animate]",
})
export class AutoAnimateDirective implements AfterViewInit {
  @Input() options: Partial<AutoAnimateOptions> = {}

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    autoAnimate(this.el.nativeElement, this.options)
  }
}

@NgModule({
  declarations: [AutoAnimateDirective],
  exports: [AutoAnimateDirective],
})
export class AutoAnimateModule {}
