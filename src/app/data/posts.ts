import { Type } from "@angular/core";

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  published: boolean;
  readingMinutes: number;
  loadContent: () => Promise<Type<unknown>>;
}

// Metadata only. Article templates and examples load when a reader opens a post.
export const posts: readonly Post[] = [
  {
    slug: "a-small-place-on-the-internet",
    title: "A small place on the internet.",
    excerpt:
      "Every project starts somewhere. This one starts with a blank page, a little curiosity, and a place to share what I learn.",
    date: "2026-11-02",
    category: "Personal",
    published: false,
    readingMinutes: 1,
    loadContent: () =>
      import("../posts/a-small-place-on-the-internet/a-small-place-on-the-internet.component").then(
        (m) => m.WelcomePostComponent,
      ),
  },
  {
    slug: "keeping-angular-simple",
    title: "Keeping Angular simple.",
    excerpt:
      "Standalone components, a few routes, and room to grow. A small site is a good reminder that you don’t always need more.",
    date: "2026-10-28",
    category: "Angular",
    published: true,
    readingMinutes: 2,
    loadContent: () =>
      import("../posts/keeping-angular-simple/keeping-angular-simple.component").then(
        (m) => m.AngularPostComponent,
      ),
  },
  {
    slug: "notes-worth-keeping",
    title: "Write the note you wish you’d found.",
    excerpt:
      "The best time to document a tricky problem is while you still remember what made it tricky.",
    date: "2026-10-21",
    category: "Learning",
    published: false,
    readingMinutes: 1,
    loadContent: () =>
      import("../posts/notes-worth-keeping/notes-worth-keeping.component").then(
        (m) => m.NotesPostComponent,
      ),
  },
];

export const publishedPosts = posts.filter((post) => post.published === true);
