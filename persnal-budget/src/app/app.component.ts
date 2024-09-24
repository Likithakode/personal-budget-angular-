import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroComponent } from './hero/hero.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { ArticleComponent } from './article/article.component';

@Component({
  selector: 'pb-root',
  standalone: true,
  imports: [RouterOutlet,HeroComponent,MenuComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'persnal-budget';
}
