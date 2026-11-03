import { Component, signal } from "@angular/core";

@Component({
  selector: "app-counter-demo",
  standalone: true,
  templateUrl: "./counter-demo.component.html",
  styleUrl: "./counter-demo.component.scss",
})
export class CounterDemoComponent {
  readonly count = signal(0);

  increment(): void {
    this.count.update((value) => value + 1);
  }

  reset(): void {
    this.count.set(0);
  }
}
