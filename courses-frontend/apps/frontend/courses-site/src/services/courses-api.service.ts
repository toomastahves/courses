import { environment } from '../environments/environment';
import { client } from './client';

export const ApiService = {
  async createCourse(courseDto: any) {
    return await client.post(
      `${environment.NX_REST_API}/api/v1/courses`,
      courseDto,
      {
        headers: { Accept: 'application/json' }
      }
    );
  },

  async updateCourse(courseDto: any) {
    return await client.put(
      `${environment.NX_REST_API}/api/v1/courses`,
      courseDto,
      {
        headers: { Accept: 'application/json' }
      }
    );
  },

  async getCourseList() {
    try {
      return await client.get(`${environment.NX_REST_API}/api/v1/courses`, {
        headers: { Accept: 'application/json' }
      });
    } catch (err: any) {
      console.log(err);
    }
  },

  async deleteCourse(id: string) {
    try {
      return await client.delete(
        `${environment.NX_REST_API}/api/v1/courses/${id}`,
        {
          headers: { Accept: 'application/json' }
        }
      );
    } catch (err: any) {
      console.log(err);
    }
  },

  async getCourseDetails(id: string) {
    try {
      return await client.get(
        `${environment.NX_REST_API}/api/v1/courses/${id}`,
        {
          headers: { Accept: 'application/json' }
        }
      );
    } catch (err: any) {
      console.log(err);
    }
  }
};
