export interface IBlogPost {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  author: string;
  date: string;
  tags: string[];
  categoryId: string | null;
}

export interface ICreateBlogPostResponse {
  blogPost: IBlogPost;
}

export interface IGetAllBlogPostsResponse {
  blogPosts: IBlogPost[];
}
