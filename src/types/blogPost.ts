export interface IBlogPost {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  author: {
    id: string;
    name: string;
  };
  date: Date;
  tags: {
    id: string;
    name: string;
  }[];
  category: {
    id: string;
    name: string;
  } | null;
  url: string;
  viewCount: string
}

export interface ISingleBlogPostResponse {
  blogPost: IBlogPost;
}

export interface IGetAllBlogPostsResponse {
  blogPosts: IBlogPost[];
}
