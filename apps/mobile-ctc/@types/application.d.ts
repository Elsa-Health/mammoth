type AppUser = {
  // userId
  uid: string;

  // Ideally first name and last name
  name: string;

  // geo co-ordinates
  geo?: {
    latitude: number;
    longitude: number;
  };
};

type FieldName =
  | 'version'
  | 'id'
  | 'firstName'
  | 'lastName'
  | 'role'
  | 'telephone'
  | 'facilityName'
  | 'city'
  | 'facilityId';
