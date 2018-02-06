import { Component, OnInit } from '@angular/core';
import { WordpressService } from '../wordpress.service';
import { Post } from '../post';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
    public blog: any[];
    public posts: Post[] = [];
    constructor(private wordpress: WordpressService) { }

    ngOnInit() {
        this.wordpress.getPosts(1, 20).subscribe(
            (res) => {
                this.blog = res.json();
                this.useModels();
            }
        );
    }

    useModels() {
        for (let post of this.blog) {
            this.posts.push(Post.fromWordpress(post));
        }
    }

}
