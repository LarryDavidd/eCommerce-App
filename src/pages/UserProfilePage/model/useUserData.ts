export interface UserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  addresses: AddressSDK[];
  dateOfBirth: string;
  defaultShippingAddressId: string;
  defaultBillingAddressId: string;
  shippingAddressIds: string[];
  billingAddressIds: string[];
}

export interface AddressSDK {
  id: string;
  streetName: string;
  postalCode: string;
  city: string;
  country: string;
}

export interface Address {
  id: string;
  street: string;
  postalCode: string;
  city: string;
  country: string;
  isBilling: boolean;
  isShipping: boolean;
  isBillingDefault: boolean;
  isShippingDefault: boolean;
}

export enum Country {
  UnitedStates = 'United States',
  Russia = 'Russia'
}

export type Personal = {
  name: string;
  surname: string;
  email: string;
  password: string;
  dateOfBirth: Date;
};

export const transformDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export function mapCountryToCode(country: string) {
  switch (country) {
    case 'United States':
      return 'US';
    case 'Russia':
      return 'RU';
    default:
      return country;
  }
}
export function ConvertDataForServer(personal: Personal, addresses: Address[]): UserData {
  // если не будет дефолтного, то null
  let defaultShippingAddressId = null;
  let defaultBillingAddressId = null;
  const shippingAddressIds: string[] = [];
  const billingAddressIds: string[] = [];
  const addressArray: AddressSDK[] = [];
  addresses.forEach((address) => {
    const addressObj: AddressSDK = {
      id: address.id,
      streetName: address.street,
      postalCode: address.postalCode,
      city: address.city,
      country: mapCountryToCode(address.country)
    };
    addressArray.push(addressObj);
    if (address.isShipping) shippingAddressIds.push(address.id);
    if (address.isBilling) billingAddressIds.push(address.id);
    if (address.isBillingDefault) defaultBillingAddressId = address.id;
    if (address.isShippingDefault) defaultShippingAddressId = address.id;
  });
  return {
    id: '',
    password: '',
    email: personal.email,
    firstName: personal.name,
    lastName: personal.surname,
    dateOfBirth: transformDate(personal.dateOfBirth),
    defaultShippingAddressId: defaultShippingAddressId,
    defaultBillingAddressId: defaultBillingAddressId,
    shippingAddressIds: shippingAddressIds,
    billingAddressIds: billingAddressIds,
    addresses: addressArray
  };
}

export function useUserData(userData: UserData) {
  const personal = {
    name: userData.firstName,
    surname: userData.lastName,
    email: userData.email,
    password: userData.password,
    dateOfBirth: new Date(userData.dateOfBirth)
  };

  const addresses = userData.addresses.map((address) => {
    const { streetName, ...rest } = address;
    return {
      ...rest,
      street: streetName, // Используем street вместо streetName
      country: mapCountry(address.country),
      isShippingDefault: address.id === userData.defaultShippingAddressId,
      isBillingDefault: address.id === userData.defaultBillingAddressId,
      isShipping: userData.shippingAddressIds.includes(address.id),
      isBilling: userData.billingAddressIds.includes(address.id)
    };
  });

  return { personal, addresses };
}

export function mapCountry(country: string): Country {
  switch (country) {
    case 'US':
      return Country.UnitedStates;
    case 'RU':
      return Country.Russia;
    default:
      return country as Country;
  }
}
