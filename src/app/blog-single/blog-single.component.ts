import { Component, OnDestroy, OnInit } from '@angular/core';
import { WordpressService } from '../wordpress.service';
import { Post } from '../post';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-blog-single',
    templateUrl: './blog-single.component.html',
    styleUrls: ['./blog-single.component.css']
})
export class BlogSingleComponent implements OnInit, OnDestroy {
    public post: Post;
    public comments: any[];
    public postId: string;
    private subscription: Subscription;
    private subscription1: Subscription;
    constructor(private wordpress: WordpressService, private activeRoute: ActivatedRoute) { }

    ngOnInit() {
        this.postId = this.activeRoute.snapshot.params['id'];
        this.subscription = this.wordpress.getPost(this.postId).subscribe( (singlePost) => {
          console.log(singlePost.json());
            this.post = Post.fromWordpress(singlePost.json()[0]);
        });
        this.subscription1 = this.wordpress.getComments(this.postId).subscribe( (comments) => {
            console.log(comments.json());
            this.comments = comments.json();
        });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
