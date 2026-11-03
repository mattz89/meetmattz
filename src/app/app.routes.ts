import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    title: "MeetMattZ — A developer’s notebook",
    loadComponent: () =>
      import("./pages/home/home.component").then((m) => m.HomeComponent),
  },
  {
    path: "about",
    title: "About — MeetMattZ",
    loadComponent: () =>
      import("./pages/about/about.component").then((m) => m.AboutComponent),
  },
  {
    path: "blog/:slug",
    loadComponent: () =>
      import("./pages/post/post.component").then((m) => m.PostComponent),
  },
  {
    path: "**",
    title: "Page not found — MeetMattZ",
    loadComponent: () =>
      import("./pages/not-found/not-found.component").then(
        (m) => m.NotFoundComponent,
      ),
  },
];
