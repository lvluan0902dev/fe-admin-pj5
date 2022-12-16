import { OrderItem } from "../order-item/order-item.model";

export interface Order {
    id: number,
    full_name: string,
    address: string,
    phone_number: string,
    email: string,
    status: number,
    created_at: string,
    updated_at: string,
    order_items: OrderItem[]
}
