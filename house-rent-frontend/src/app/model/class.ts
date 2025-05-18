export interface GetPostedProperty {
  id: number;
  category: string;
  title: string;
  description: string;
  isAvailable: boolean;
  rentAmount: number;
  datePosted: string; // ISO string from backend (LocalDateTime)
  availableFrom: string; // ISO string from backend (LocalDate)
  district: string;
  division: string;
  thana: string;
  section: string;
}

export interface GetAllCreditPackage{
  id: number;
  name: string;
  creditAmount: number;
  price: number;
}

export interface GetUserInfo{
  name: string;
  email: string;
  phone: string;
  creditBalance: number;
}

export interface Property {
  userID: number;
  category: string; // or enum
  title: string;
  description: string;
  address: string;
  contactPerson: string;
  contactNumber: string;
  area: string;
  availableFrom: string; // format: yyyy-MM-dd
  rentAmount: number;
  division: string;
  district: string;
  thana: string;
  section: string;
  roadNumber: string;
  houseNumber: string;
}


export interface MyPostedProperty {
  id: number;
  contactNumber: string;
  contactPerson: string;
  area: string;
  availableFrom: Date;
  category: string;
  title: string;
  description: string;
  isAvailable: boolean;
  rentAmount: number;
  datePosted: Date;
  division: string;
  district: string;
  thana: string;
  section: string;
  roadNumber: string;
  houseNumber: string;
  address: string;
}


export interface UpdateMyPostedProperty {
  postId: number;
  contactNumber: string;
  contactPerson: string;
  area: string;
  availableFrom: Date; // or Date if you're handling it as Date in Angular
  category: string; // adjust based on your actual Category enum
  title: string;
  description: string;
  rentAmount: number;
  division: string;
  district: string;
  thana: string;
  section: string;
  roadNumber: string;
  houseNumber: string;
  address: string;
}

export interface UnlockedPost {
  unlockId: number;
  postId: number;
  creditsUsed: number;
  dateUnlocked: string;
  contactNumber: string;
  contactPerson: string;
  area: string;
  availableFrom: string; // ISO Date
  category: string;
  title: string;
  description: string;
  isAvailable: boolean;
  rentAmount: number;
  adPostedDate: string; // ISO Date
  division: string;
  district: string;
  thana: string;
  section: string;
  roadNumber: string;
  houseNumber: string;
  address: string;
}


export interface MyPurchasePackageHistory {
  packageName: string;
  creditsPurchased: number;
  amountPaid: number;
  datePurchased: Date;
}

export interface AddCreditPackage {
  id: number;
  name: string;
  creditAmount: number;
  price: number; // Use number for BigDecimal in Angular
}



export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  phone: string;
  balanceCredits: number;
  createdAt: string; // use string for LocalDateTime when coming from backend
}


export interface RentPost {
  postId: number;
  userId: number;
  contactNumber: string;
  contactPerson: string;
  area: string;
  availableFrom: string; // ISO Date (e.g., "2025-06-01")
  category: string;      // e.g., "SUBLET"
  title: string;
  description: string;
  isAvailable: boolean;
  rentAmount: number;
  datePosted: string;    // ISO Date (e.g., "2025-05-15")
  division: string;
  district: string;
  thana: string;
  section: string;
  roadNumber: string;
  houseNumber: string;
  address: string;
}


