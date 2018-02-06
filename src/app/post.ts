export class Post {
    public title: string;
    public slug: string;
    public excerpt: string;
    public media: string;
    public content: string;
    public author?: string;

    static fromWordpress(post: any) {
        console.log(post);
        let refined = new this;
        refined.title = post.title.rendered;
        refined.slug = post.slug;
        refined.excerpt = post.excerpt.rendered;
        refined.author = post._embedded.author[0].name;
        refined.content = post.content.rendered;
        if (post._embedded['wp:featuredmedia'][0].media_details) {
            refined.media = post._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url;
        }
        return refined;
    }
}
