import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  NgModule,
  OnDestroy,
} from "@angular/core"
import autoAnimate, { AutoAnimateOptions, AnimationController } from "../index"

@Directive({
  selector: "[auto-animate]",
})
export class AutoAnimateDirective implements AfterViewInit, OnDestroy {
  @Input() options?: Partial<AutoAnimateOptions>
  private controller?: AnimationController

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    this.controller = autoAnimate(this.el.nativeElement, this.options || {})
  }

  ngOnDestroy(): void {
    this.controller?.destroy?.()
    this.controller = undefined
  }
}

@NgModule({
  declarations: [AutoAnimateDirective],
  exports: [AutoAnimateDirective],
})
export class AutoAnimateModule {}
