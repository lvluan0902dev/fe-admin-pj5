import { BlogCategory } from "../blog-category/blog-category.model";

export interface Blog {
    id: number,
    title: string,
    content: string,
    blog_category_id: number,
    blog_category: BlogCategory,
    status: number,
    created_at: string,
    updated_at: string
}
