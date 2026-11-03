import { Component } from "@angular/core";
import { DatePipe } from "@angular/common";
import { RouterLink } from "@angular/router";
import { publishedPosts } from "../../data/posts";

@Component({
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {
  readonly posts = publishedPosts;
}
