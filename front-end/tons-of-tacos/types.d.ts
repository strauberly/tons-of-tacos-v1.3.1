// organize please
type Category = {
  name: string;
  description: string;
};

type MenuItem = {
  id: string;
  itemName: string;
  category: string;
  imageUrl: string;
  description: string;
  itemSize: string;
  unitPrice: number;
};

type CartItem = {
  id: string;
  menuId: string;
  itemName: string;
  quantity: number;
  size: string;
  price: string;
};

type Cart = {
  cartItems: CartItem[];
  total: number;
};

type CustomerInfoForm = {
  name: string;
};

type Valid = {
  valid: boolean;
  message: string;
};

type OrderItem = {
  itemName: string;
  unitPrice: number;
  quantity: number;
  size: string;
  total: number;
};
