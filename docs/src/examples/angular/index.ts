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

    <div *ngFor="let story of stories; index as i">
      <div class="story-card" auto-animate>
        <h2>{{ story.title }}</h2>
        <div *ngIf="story.showStory">{{ story.story }}</div>
        <button (click)="story.showStory = !story.showStory">Toggle story</button>
      </div>
    </div>
  \`
})
export class AppComponent {
  stories = [
    {title: 'The Ant and The Grasshopper', showStory: false, story: "The ant and the grasshopper were good friends..."},
    {title: 'The Boy Who Cried Wolf', showStory: false, story: "There was once a shepherd boy who liked to play tricks..."},
  ];
}`,
  },
}
export { angularDirectiveMain, angularDirectiveApp }
