// organize please

// menu
type Category = {
  name: string;
  description: string;
};

type AllMenuItems = {
  tacos: MenuItem[];
  sides: MenuItem[];
  toppings: MenuItem[];
  drinks: MenuItem[];
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

// cart
type Cart = {
  cartItems: CartItem[];
  total: number;
};
type CartItem = {
  id: string;
  menuId: string;
  itemName: string;
  quantity: number;
  size: string;
  price: string;
};

// order
type Order = {
  orderUid: string;
  customerUid: string;
  name: string;
  email: string;
  phone: string;
  orderItems: OrderItem[];
  orderTotal: number;
  created: string;
  ready: string;
  closed: string;
};

type OrderItem = {
  orderItemId: number;
  itemName: string;
  quantity: number;
  size: string;
  total: number;
};

type OrderEdit = {
  orderUid: string;
  customer: Customer;
  menuItemId: string;
  quantity: number;
  itemSize: string;
  login: string;
  orderItem: OrderItem;
};

// user
type CustomerInfoForm = {
  name: string;
};

type Valid = {
  valid: boolean;
  message: string;
};

type OwnerLogin = {
  accessToken: string;
  refreshToken: string;
  ownerName: string;
};

type Customer = {
  customerUid: string;
  name: string;
  phone: string;
  email: string;
};

// sales

type Sales = {
  date: string;
  numberOfSales: number;
  total: number;
};

// responses

type OrderRequestResponse = {
  status: number;
  body: Order | string;
};

type CustomerOrdersResponse = {
  status: number;
  body: Order[] | string;
};
