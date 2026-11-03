import { Component } from "@angular/core";
import { CodeBlockComponent } from "../../shared/code-block/code-block.component";
import { CounterDemoComponent } from "../../examples/counter-demo/counter-demo.component";

@Component({
  standalone: true,
  imports: [CodeBlockComponent, CounterDemoComponent],
  templateUrl: "./keeping-angular-simple.component.html",
  styleUrl: "./keeping-angular-simple.component.scss",
})
export class AngularPostComponent {
  readonly counterCode = `readonly count = signal(0);

increment(): void {
  this.count.update(value => value + 1);
}`;
}
