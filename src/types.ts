export interface Enquiry {
  id: string;
  fullName: string;
  mobile: string;
  email: string;
  interestArea: string;
  message: string;
  submittedAt: string;
  status: 'pending' | 'contacted' | 'resolved';
}

export interface Donation {
  id: string;
  donorName: string;
  email: string;
  panCard?: string;
  amount: number;
  cause: string;
  paymentMethod: string;
  timestamp: string;
  transactionId: string;
}

export interface Notice {
  id: string;
  date: string;
  title: string;
  description: string;
  category: 'general' | 'critical' | 'event' | 'admission';
}

export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  eligibility: string;
  details: string[];
}

export interface Sector {
  id: string;
  title: string;
  description: string;
  detailedDescription?: string;
  iconName: string; // Used to determine which Lucide icon to render
}
