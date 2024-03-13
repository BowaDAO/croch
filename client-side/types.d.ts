type Product = {
  _id: string;
  title: string;
  availability: string;
  price: number;
  description: string;
  gender: string;
  tag: string;
  colors: string[];
  nationwideDelivery: boolean;
  owner: {
    _id: string;
    firstName: string;
    picture: string;
  };
  photos: string[];
  price: number;
  sizes: string[];
  primaryLocation: {
    minDeliveryDays: number;
    maxDeliveryDays: number;
  };
  otherLocations: {
    minDeliveryDays: number;
    maxDeliveryDays: number;
  };
};

type Order = {
  creativeId: string;
  customerId: string;
  items: {
    cummulativePrice: number;
    info: string;
    thumbNail: string;
    title: string;
    _id: string;
  }[];
  status: string;
  price: number;
  _id: string;
};

type Creative = {
  brandName: string;
  brandLogo: string;
  funFacts: string[];
  isAvailable: boolean;
  superCreative: boolean;
  personalDescription: string;
  yearsOfExperience: number;
  _id: string;
  accountSetupDone: boolean;
};

type CartItem = {
  info: {
    _id: mongoose.Types.ObjectId;
    price: number;
    owner: mongoose.Types.ObjectId;
  };

  title: String;

  thumbNail: String;

  count: number;

  cummulativePrice: number;
};

type Cart = {
  cartItems: CartItem[];
  totalPrice: number;
};

type Carts = {
  brandName: string;
  brandLogo: string;
  creativeId: string;
}[];

type SignupDataType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
};

type LoginData = {
  email: string;
  password: string;
};

type UpdatePassword = {
  oldPassword: string;
  newPassword: string;
};

type NotificationData = {
  message: string;
  receiver: string;
};

interface NotificationRes extends NotificationData {
  createdAt: string;
}

type Tag = {
  _id: string;
  label: string;
  icon: string;
};

type AccountType = {
  img: string | StaticImageData;
  value: string;
  iconWidth: any;
  iconHeight: any;
};

type ErrorResponse = {
  message: string;
};

type MessageResponse = {
  message: string;
};

type WishlistItem = {
  _id: string;
  owner: string;
  photos: strig[];
  title: string;
  availability: string;
  price: number;
};

type CreativeAccountSetupData = {
  brandName: string;
  logo: string;
  personalDescription: string;
  funFacts: string[];
  yearsOfExperience: string;
};
