import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Post } from './post';
import { Subject } from "rxjs/Subject";

@Injectable()
export class WordpressService implements OnInit {
  private wpApi = 'http://downstreamview.com/wordpress/wp-json/wp/v2/posts';
  public posts: Subject<any> = new Subject();
  public comments: Subject<any[]> = new Subject();
  constructor(private http: Http) { }
  ngOnInit(): void {
    
  }
  getPosts(page: number, span: number) {
    return this.http.get(this.wpApi, {
      params: {
        '_embed': true,
        'per_page': span,
        'page': page
      }
    }).subscribe((posts) => {
      this.posts.next(posts);
    });
  }
  getPost(postId: string) {
    return this.http.get(this.wpApi, {
      params: {
        '_embed': true,
        'slug': postId
      }
    }
    );
  }
  getComments(postId: string) {
    return this.http.get(this.wpApi + 'comments', {
      params: {
        'item_id': postId,
        '_sortField': 'comment_ID'
      }
    }
    );
  }

}
