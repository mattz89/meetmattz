import { afterNextRender, Component } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  readonly year = new Date().getFullYear();

  constructor() {
    afterNextRender(() => {
      console.log(
        "%cWant to work with Matt?%c\nSoftware engineer. Angular, TypeScript, and design systems.\nLet's build something delightful.\n\nLearn more: " +
          new URL("/about", window.location.origin).href,
        "background: #252921; color: #d7e2ca; font-size: 32px; font-weight: 800; padding: 16px 24px; border-radius: 8px; line-height: 1.8;",
        "color: #567548; font-size: 14px; line-height: 1.8;",
      );
    });
  }
}
