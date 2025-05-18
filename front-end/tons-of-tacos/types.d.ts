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
  token: string;
  ownerName: string;
};

type Order = {
  orderUid: string;
  customerUid: string;
  name: string;
  email: string;
  phone: string;
  orderTotal: number;
  orderItems: OrderItem[];
  created: string;
  ready: string;
  closed: string;
};

type AllMenuItems = {
  tacos: MenuItem[];
  sides: MenuItem[];
  toppings: MenuItem[];
  drinks: MenuItem[];
};

// type OrderEdit = {
//   orderUid: string;
//   customerName: string;
//   menuItemId: string;
//   quantity: number;
//   itemSize: string;
//   login: string;
//   orderItem: OrderItem;
// };
type OrderEdit = {
  orderUid: string;
  customer: Customer;
  menuItemId: string;
  quantity: number;
  itemSize: string;
  login: string;
  orderItem: OrderItem;
};

type Customer = {
  customerUid: string;
  name: string;
  phone: string;
  email: string;
};
