interface IVariant {
  type: string;
  value: string;
}

interface Iinventory {
  quantity: number;
  inStock: boolean;
}

export interface IProduct {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: IVariant[];
  inventory: Iinventory;
}
