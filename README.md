# MeetMattZ.com

An Angular 21 blog built with standalone components. Includes a post list, lazy-loaded articles, an About page, and missing-page states.

## Run locally

Requires Node.js 20.19+, 22.12+, or 24+.

```sh
nvm install
nvm use
npm ci
npm start
npm run build
```

Open http://localhost:4200. Production output is in `dist/meetmattz/browser/`.

## Component structure

Every component has its own folder and matching `.component.ts`, `.component.html`, and `.component.scss` files:

- `src/app/app/`: site shell and navigation.
- `src/app/pages/`: home, About, article shell, and missing-page views.
- `src/app/posts/`: authored article components, one folder per article.
- `src/app/examples/`: reusable, working Angular examples.
- `src/app/shared/`: code blocks and Storybook embeds.
- `src/app/data/posts.ts`: post metadata and lazy import functions only.

Component styles are encapsulated. `src/styles.scss` contains the shared theme, reset, and typography, including prose styles that must apply across article component boundaries. Angular CLI component generation defaults to external HTML and SCSS in a component folder.

## Write an article

Articles are Angular templates rather than strings of paragraphs. This is a good fit for a developer blog with live Angular examples: templates support headings, links, lists, images, code blocks, and real components without a Markdown compiler or runtime HTML compilation. Article templates are trusted source code reviewed and built with the site; never compile templates supplied by readers.

1. Create a folder under `src/app/posts/your-slug/` with a standalone component and separate HTML/SCSS files. Import any example or shared components it uses.
2. Write the article body in its HTML file. The article shell supplies the title, author, date, excerpt, and footer.
3. Add metadata to `src/app/data/posts.ts`, including `readingMinutes` and a lazy content import:

```ts
{
  slug: 'your-slug',
  title: 'Your article',
  excerpt: 'A short introduction.',
  date: '2026-11-02',
  category: 'Angular',
  published: true,
  readingMinutes: 3,
  loadContent: () => import('../posts/your-slug/your-slug.component')
    .then(m => m.YourPostComponent),
}
```

Set `published: false` to hide a post from the homepage and show the post-not-found view at its URL. Set it back to `true` to publish it. The homepage count includes published posts only. This controls visibility in the app; unpublished source and metadata can still be included in the static build.

Keep the newest metadata first. Reading time is editorial metadata rather than a count of the compiled template. The article is available at `/blog/your-slug`; its code and local examples load only when the article is opened. Loading failures have a retry action.

See `src/app/posts/keeping-angular-simple/` for an article with a working signal-based counter and a code sample. Keep code samples as TypeScript string properties and bind them to `app-code-block`; Angular template braces and HTML syntax inside the sample are then displayed as code. Highlight.js supports TypeScript, HTML, SCSS, JSON, and Bash; other language labels fall back to plain text. Highlighted HTML passes through Angular’s normal sanitization.

```html
<app-counter-demo />
<app-code-block
  language="typescript"
  filename="counter-demo.component.ts"
  [code]="counterCode"
/>
```

For larger examples, keep the demo as its own component so it can also be imported into Storybook later. If writing volume eventually favors Markdown, add a build-time Markdown pipeline with explicit component placeholders; raw Markdown inserted with `innerHTML` cannot instantiate Angular components. MDX is primarily associated with React and is not a drop-in Angular authoring solution.

## Embed Storybook

Use local Angular examples for site-owned demonstrations. Use the `StorybookEmbedComponent` for components maintained in a separately hosted Storybook. Import it in an article, then use:

```html
<app-storybook-embed
  title="Button: primary variant"
  url="https://your-storybook.example/iframe.html?id=button--primary&viewMode=story"
/>
```

Replace that placeholder URL with your actual published story. The embed validates an HTTPS `iframe.html` URL with a story ID, loads only after the reader clicks, uses a sandbox and no-referrer policy, and provides a direct Storybook link. Use only author-reviewed, trusted Storybook hosts. The Storybook host must permit iframe embedding through its framing headers; authentication can also prevent embedding. A Storybook server is not installed or deployed by this project, and the sample article intentionally has no fictitious embed.

## Personalize and host

Edit `src/app/pages/about/about.component.html` to personalize the About page. The included articles are sample content.

Deploy the production output to a static host. Configure an SPA fallback to `index.html` so direct visits and refreshes on `/about` and `/blog/:slug` work. The domain name in the branding does not configure or publish MeetMattZ.com.
