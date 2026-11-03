import { Component, computed, inject, input, signal } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-storybook-embed",
  standalone: true,
  templateUrl: "./storybook-embed.component.html",
  styleUrl: "./storybook-embed.component.scss",
})
export class StorybookEmbedComponent {
  // Author-controlled HTTPS URL to a separately hosted Storybook iframe.html story.
  readonly url = input.required<string>();
  readonly title = input.required<string>();
  readonly loaded = signal(false);
  private readonly sanitizer = inject(DomSanitizer);
  readonly storyUrl = computed(() => {
    try {
      const url = new URL(this.url());
      if (
        url.protocol !== "https:" ||
        !url.pathname.endsWith("/iframe.html") ||
        !url.searchParams.get("id") ||
        url.username ||
        url.password
      ) {
        return null;
      }
      return url.href;
    } catch {
      return null;
    }
  });
  readonly embedUrl = computed(() => {
    const url = this.storyUrl();
    // Only the validated, author-supplied Storybook URL is trusted, never article HTML.
    return url ? this.sanitizer.bypassSecurityTrustResourceUrl(url) : null;
  });
}
