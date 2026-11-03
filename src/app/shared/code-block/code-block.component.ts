import { Component, computed, input } from "@angular/core";
import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";
import scss from "highlight.js/lib/languages/scss";
import json from "highlight.js/lib/languages/json";
import bash from "highlight.js/lib/languages/bash";

hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("html", xml);
hljs.registerLanguage("scss", scss);
hljs.registerLanguage("json", json);
hljs.registerLanguage("bash", bash);

@Component({
  selector: "app-code-block",
  standalone: true,
  templateUrl: "./code-block.component.html",
  styleUrl: "./code-block.component.scss",
})
export class CodeBlockComponent {
  readonly code = input.required<string>();
  readonly language = input("text");
  readonly filename = input("");
  readonly highlightedCode = computed(() => {
    const language = this.language();
    return hljs.getLanguage(language)
      ? hljs.highlight(this.code(), { language, ignoreIllegals: true }).value
      : null;
  });
}
