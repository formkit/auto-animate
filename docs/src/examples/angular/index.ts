const angularDirectiveMain = {
  angular: {
    ext: "angular",
    language: "jsx",
    example: `import { Component } from '@angular/core';
import { AutoAnimateDirective } from '@formkit/auto-animate/angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AutoAnimateDirective],
  template: \`
    @for (story of stories; track story.title) {
      <div>
        <div class="story-card" auto-animate>
          <h2>{{ story.title }}</h2>
          @if (story.showStory) {
            <div>{{ story.story }}</div>
          }
          <button (click)="story.showStory = !story.showStory">Toggle story</button>
        </div>
      </div>
    }
  \`,
})
export class AppComponent {
  readonly stories = [
    {title: 'The Ant and The Grasshopper', showStory: false, story: "The ant and the grasshopper were good friends..."},
    {title: 'The Boy Who Cried Wolf', showStory: false, story: "There was once a shepherd boy who liked to play tricks..."},
  ];
}
`,
  },
}
export { angularDirectiveMain }
