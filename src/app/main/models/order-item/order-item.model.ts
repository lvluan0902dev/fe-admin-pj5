export interface OrderItem {
    id: number,
    order_id: number,
    product_id: number,
    product_option_id: number,
    product_name: string,
    option_name: string,
    option_price: number,
    quantity: number,
    created_at: string,
    updated_at: string
}
