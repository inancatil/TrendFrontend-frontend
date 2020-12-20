export interface ICategory {
  id: string;
  name: string;
  blogPosts: string[];
}
export interface ICreateCategoryResponse {
  category: ICategory;
}

export interface IGetAllCategoriesResponse {
  categories: ICategory[];
}

export interface IDeleteCategoryResponse {
  message: string;
  category: ICategory;
}
