export interface IProduct {
    id: number;
    title: string;
    description: string;
    price: number;
    images: string[];
    category: { id: number, name: string };
  }
  

export interface IBasketProduct {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity?: number;
  }
  