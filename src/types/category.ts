export interface ICategory {
  name: string;
  blogPosts: string[];
}
export interface ICreateCategoryResponse {
  category: ICategory;
}

export interface IGetAllCategoriesResponse {
  categories: ICategory[];
}
