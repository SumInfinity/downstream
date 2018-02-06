import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Post } from './post';

@Injectable()
export class WordpressService {
    private wpApi = 'http://downstreamview.com/wordpress/wp-json/wp/v2/posts';
    private posts: Post[];
    constructor(private http: Http) { }

    getPosts(page: number, span: number){
        return this.http.get(this.wpApi, { params: {
            '_embed': true,
            'per_page': span,
            'page': page}
        });
    }
    getPost(postId: string){
        return this.http.get(this.wpApi, { params: {
                '_embed': true,
                'slug': postId
            } }
        );
    }
    getComments(postId: string) {
        return this.http.get(this.wpApi + 'comments', { params : {
                'item_id': postId,
                '_sortField': 'comment_ID'
            } }
        );
    }

}
