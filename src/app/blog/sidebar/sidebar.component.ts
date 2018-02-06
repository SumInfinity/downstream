import { Component, OnDestroy, OnInit } from '@angular/core';
import { WordpressService } from '../../wordpress.service';
import { Post } from '../../post';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
    public posts: Post[] = [];
    public blog: any;
    private subscription: Subscription;
    constructor(private wordpress: WordpressService) { }

    ngOnInit() {
        this.subscription = this.wordpress.getPosts(1, 20).subscribe(
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
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
