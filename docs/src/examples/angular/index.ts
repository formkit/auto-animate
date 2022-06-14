const angularDirectiveMain = {
  angular: {
    ext: "angular",
    language: "typescript",
    example: `import { NgModule } from '@angular/core';
import { AutoAnimateModule } from '@formkit/auto-animate/angular'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AutoAnimateModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
`,
  },
}

const angularDirectiveApp = {
  angular: {
    ext: "angular",
    language: "html",
    example: `import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: \`
    <ul auto-animate>
      <li *ngFor="let item of items">{{item}}</li>
    </ul>
    <button (click)="this.items.push('🍒 Cherry')">Add Cherry</button>
  \`
})
export class AppComponent {
  items: string[] = ['🍎 Apple', '🍌 Banana', '🍓 Strawberry'];
}`,
  },
}
export { angularDirectiveMain, angularDirectiveApp }
