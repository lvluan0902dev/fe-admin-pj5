export interface Product {
    id: number,
    product_category_id: number,
    product_brand_id: number,
    name: string,
    short_description: string,
    product_detail: string,
    how_to_use: string,
    ingredients: string,
    image_name: string,
    image_path: string,
    view_count: number,
    order_count: number,
    status: number,
    created_at: string,
    updated_at: string
}
