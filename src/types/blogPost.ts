export interface IBlogPost {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  author: {
    id: string;
    name: string;
  };
  date: string;
  tags: {
    id: string;
    name: string;
  }[];
  categoryId: {
    id: string;
    name: string;
  } | null;
}

export interface ICreateBlogPostResponse {
  blogPost: IBlogPost;
}

export interface IGetAllBlogPostsResponse {
  blogPosts: IBlogPost[];
}
