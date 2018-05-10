import { Component, OnInit } from '@angular/core';
import { WordpressService } from '../wordpress.service';
import { Post } from '../post';
import { forEach } from '@angular/router/src/utils/collection';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  public blog: any[];
  public posts: Post[] = [];
  public pageId: number;

  constructor(private wordpress: WordpressService, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.pageId = this.activeRoute.snapshot.params['pageId'];
    if (this.pageId < 1) {
      this.pageId = 0;
    }
    this.wordpress.getPosts(this.pageId, 20);
  }

  useModels() {
    for (let post of this.blog) {
      this.posts.push(Post.fromWordpress(post));
    }
  }

}
