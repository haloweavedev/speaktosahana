export type RawNgoRecord = {
  index: number;
  serialNumber: string;
  name: string;
  address: string;
  registration: {
    number: string;
    registeredWith: string;
    type: string;
    actName: string;
    city: string;
    state: string;
    date: string;
    darpanId: string;
    darpanRegistrationDate: string;
  };
  contact: {
    email: string;
    mobile: string;
    website: string | null;
  };
  primarySectors: string[];
  secondarySectors: string[];
  operationalStates: string;
  operationalDistrict: string;
  officeBearers: Array<{ name: string; designation: string }>;
};

export type Ngo = {
  id: string;
  serialNumber: string;
  name: string;
  address: string;
  registrationType: string;
  darpanId: string;
  contactEmail: string;
  contactWebsite: string | null;
  contactMobile: string;
  primarySectors: string[];
  secondarySectors: string[];
  operationalDistrict: string;
  registrationCity?: string | null;
  registrationState?: string | null;
  officeBearers: Array<{ name: string; designation: string }>;
};
