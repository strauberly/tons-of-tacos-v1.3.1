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
  orderItemId: number;
  itemName: string;
  quantity: number;
  size: string;
  total: number;
};

type OwnerLogin = {
  token: string | undefined;
  ownerName: string | undefined;
};

type Order = {
  orderUid: string;
  name: string;
  email: string;
  phone: string;
  orderTotal: number;
  orderItems: OrderItem[];
  created: string;
  ready: string;
  closed: string;
};
