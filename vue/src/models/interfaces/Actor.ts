export interface Actor {
    id: string;
    createdBy: string;
    isValidated: boolean;
    images: File[];
    name: string;
    acronym: string;
    type_id: number;
    country_id: number;
    foundation_date: Date;
    description: string;
    logo: string;
    contact_name: string;
    contact_picture: string;
    phone: string;
    address: string;
    email: string;
    website: string;
    fb: string;
    linkedin: string;
    twitter: string;
    instagram: string;
    latitude: number;
    longitude: number;
    active: boolean;
    closing_date: Date | null;
    last_update: Date;
    reference: string;
  }
  