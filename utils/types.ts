export interface Items {
  id: string;
  sku: string;
  product_name: string;
  qty: string;
  price: string;
  unit: string;
  image: string | null;
  status: boolean;
  created_at: string;
  updated_at: string;
}

export interface ItemsWithKey extends Items {
  key: number;
}
