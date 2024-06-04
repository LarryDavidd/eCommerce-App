import type { Address } from '@/pages/UserProfilePage/model/useUserData';
import Client from '@/shared/api/client/Client';
import { type Customer, type ErrorResponse, type MyCustomerUpdate, type MyCustomerUpdateAction } from '@commercetools/platform-sdk';
import type { ClientResponse } from '@commercetools/sdk-client-v2';

enum Countries {
  'Russia' = 'RU',
  'United States' = 'US',
  'United Kingdom' = 'GB'
}

class ProfileApi {
  constructor() {}

  public async addNewCustomerAddress(newAddressData: Address, version: number, refresh_token: string) {
    const client = Client.getInstance().clientWithRefreshTokenFlow(refresh_token);

    return await client
      .me()
      .post({
        body: {
          version: version,
          actions: [
            {
              action: 'addAddress',
              address: {
                streetName: newAddressData.street,
                postalCode: newAddressData.postalCode,
                city: newAddressData.city,
                country: Countries[newAddressData.country]
              }
            }
          ]
        }
      })
      .execute()
      .then((data) => data as ClientResponse<Customer>)
      .catch((err) => JSON.parse(JSON.stringify(err.body)) as ClientResponse<ErrorResponse>);
  }

  public async setTagsToNewAddress(newAddressData: Address, version: number, refresh_token: string, id: string) {
    const client = Client.getInstance().clientWithRefreshTokenFlow(refresh_token);
    const updateActions: MyCustomerUpdateAction[] = [];

    if (newAddressData.isBilling) {
      updateActions.push({
        action: 'addBillingAddressId',
        addressId: id
      });
    }

    if (newAddressData.isShipping) {
      updateActions.push({
        action: 'addShippingAddressId',
        addressId: id
      });
    }

    if (newAddressData.isBillingDefault) {
      updateActions.push({
        action: 'setDefaultBillingAddress',
        addressId: id
      });
    }

    if (newAddressData.isShippingDefault) {
      updateActions.push({
        action: 'setDefaultShippingAddress',
        addressId: id
      });
    }

    return await client
      .me()
      .post({
        body: {
          actions: updateActions,
          version
        }
      })
      .execute()
      .then((data) => data as ClientResponse<Customer>)
      .catch((err) => JSON.parse(JSON.stringify(err.body)) as ClientResponse<ErrorResponse>);
  }

  public async removeAddress(version: number, addressId: string, refresh_token: string) {
    const client = Client.getInstance().clientWithRefreshTokenFlow(refresh_token);

    const response = await client
      .me()
      .post({
        body: {
          version,
          actions: [
            {
              action: 'removeAddress',
              addressId
            }
          ]
        }
      })
      .execute()
      .then((data) => data as ClientResponse<Customer>)
      .catch((err) => JSON.parse(JSON.stringify(err.body)) as ClientResponse<ErrorResponse>);
    return response;
  }

  public async updatePassword(version: number, currentPassword: string, newPassword: string, refresh_token: string) {
    const client = Client.getInstance().clientWithRefreshTokenFlow(refresh_token);

    return await client
      .me()
      .password()
      .post({
        body: {
          version,
          currentPassword,
          newPassword
        }
      })
      .execute()
      .then((data) => data as ClientResponse<Customer>)
      .catch((err) => JSON.parse(JSON.stringify(err.body)) as ClientResponse<ErrorResponse>);
  }
}

export default ProfileApi;
