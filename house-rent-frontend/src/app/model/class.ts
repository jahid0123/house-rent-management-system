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


