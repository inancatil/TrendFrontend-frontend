export interface IBlogPost {
  title: string;
  content: string;
  imageUrl: string;
  author: string;
  date: string;
  tags: string[];
  categoryId: string;
}

export interface ICreateBlogPostResponse {
  blogPost: IBlogPost;
}

export interface IGetAllBlogPostsResponse {
  blogPosts: IBlogPost[];
}
