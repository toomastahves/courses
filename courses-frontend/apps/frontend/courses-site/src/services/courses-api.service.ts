import { environment } from '../environments/environment';
import { Course } from '../interfaces/Course';
import { client } from './client';

export const ApiService = {
  async createCourse(courseDto: Course) {
    try {
      return await client.post(`${environment.NX_REST_API}/api/v1/courses`, courseDto, {
        headers: { Accept: 'application/json' }
      });
    } catch (err: unknown) {
      console.log(err);
    }
  },

  async updateCourse(courseDto: Course) {
    try {
      return await client.put(`${environment.NX_REST_API}/api/v1/courses/${courseDto.id}`, courseDto, {
        headers: { Accept: 'application/json' }
      });
    } catch (err: unknown) {
      console.log(err);
    }
  },

  async getCourseList() {
    try {
      return await client.get(`${environment.NX_REST_API}/api/v1/courses`, {
        headers: { Accept: 'application/json' }
      });
    } catch (err: unknown) {
      console.log(err);
    }
  },

  async deleteCourse(id: string) {
    try {
      return await client.delete(`${environment.NX_REST_API}/api/v1/courses/${id}`, {
        headers: { Accept: 'application/json' }
      });
    } catch (err: unknown) {
      console.log(err);
    }
  },

  async getCourseDetails(id: string) {
    try {
      return await client.get(`${environment.NX_REST_API}/api/v1/courses/${id}`, {
        headers: { Accept: 'application/json' }
      });
    } catch (err: unknown) {
      console.log(err);
    }
  }
};
