
export const BENGALURU_PINCODES: Record<string, string> = {
  '560043': 'Kalyan Nagar / Hennur',
  '560077': 'Kothanur',
  '560076': 'Bannerghatta Road',
  '560078': 'JP Nagar',
  '560064': 'Yelahanka',
  '560084': 'Lingarajapuram',
  '560068': 'Madiwala / BTM',
  '560032': 'RT Nagar',
  '560085': 'Banashankari 3rd Stage',
  '560005': 'Frazer Town',
  '560016': 'Ramamurthy Nagar',
  '560070': 'Banashankari 2nd Stage',
  '560079': 'Basaveshwara Nagar',
  '560100': 'Electronic City',
  '560010': 'Rajajinagar',
  '560036': 'KR Puram',
  '560060': 'Kengeri',
  '560001': 'MG Road / Central',
  '560040': 'Chandra Layout',
  '560038': 'Indiranagar',
  '560095': 'Koramangala',
  '560034': 'Koramangala',
  '560011': 'Jayanagar',
  '560041': 'Jayanagar',
  '560004': 'Basavanagudi',
  '560025': 'Richmond Town',
  '560003': 'Malleswaram',
  '560055': 'Malleswaram',
};

export function getAreaName(pincode: string | null): string {
  if (!pincode) return 'Unknown Area';
  return BENGALURU_PINCODES[pincode] || `Pincode ${pincode}`;
}
