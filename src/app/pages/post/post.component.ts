import {
  Component,
  OnDestroy,
  computed,
  inject,
  resource,
} from "@angular/core";
import { DatePipe, NgComponentOutlet } from "@angular/common";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { Title, Meta } from "@angular/platform-browser";
import { tap } from "rxjs";
import { publishedPosts } from "../../data/posts";

@Component({
  standalone: true,
  imports: [DatePipe, RouterLink, NgComponentOutlet],
  templateUrl: "./post.component.html",
  styleUrl: "./post.component.scss",
})
export class PostComponent implements OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly params = toSignal(
    this.route.paramMap.pipe(
      tap((params) => {
        const post = publishedPosts.find((post) => post.slug === params.get("slug"));
        this.title.setTitle(
          post ? post.title + " — MeetMattZ" : "Post not found — MeetMattZ",
        );
        this.meta.updateTag({
          name: "description",
          content:
            post?.excerpt ?? "This post could not be found on MeetMattZ.",
        });
      }),
    ),
    { initialValue: this.route.snapshot.paramMap },
  );
  readonly post = computed(() =>
    publishedPosts.find((post) => post.slug === this.params().get("slug")),
  );
  readonly content = resource({
    params: () => this.post(),
    loader: ({ params }) => params.loadContent(),
  });
  ngOnDestroy(): void {
    this.meta.updateTag({
      name: "description",
      content:
        "MeetMattZ.com — notes on code, building things, and learning along the way.",
    });
  }
}
