import { environment } from '../environments/environment';
import { client } from './client';

export const ApiService = {
  async getUserList() {
    try {
      return await client.get(`${environment.NX_REST_API}/api/v1/users`, {
        headers: { Accept: 'application/json' }
      });
    } catch (err: any) {
      console.log(err);
    }
  }
};
