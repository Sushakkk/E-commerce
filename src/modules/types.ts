export interface IProduct {
    id: number;
    title: string;
    description: string;
    price: number;
    images: string[];
    category: { id: number, name: string };
  }
  