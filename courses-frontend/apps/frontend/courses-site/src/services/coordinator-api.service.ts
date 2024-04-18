import { environment } from '../environments/environment';
import { Coordinator } from '../interfaces/Coordinator';
import { client } from './client';

export const ApiService = {
  async createCoordinator(coordinatorDto: Coordinator) {
    try {
      return await client.post(
        `${environment.NX_REST_API}/api/v1/courses/${coordinatorDto.course_id}/coordinators`,
        coordinatorDto,
        {
          headers: { Accept: 'application/json' }
        }
      );
    } catch (err: unknown) {
      console.log(err);
    }
  },

  async deleteCoordinator(coordinatorDto: Coordinator) {
    try {
      return await client.delete(
        `${environment.NX_REST_API}/api/v1/courses/${coordinatorDto.course_id}/coordinators/${coordinatorDto.id}`,
        {
          headers: { Accept: 'application/json' }
        }
      );
    } catch (err: unknown) {
      console.log(err);
    }
  }
};
