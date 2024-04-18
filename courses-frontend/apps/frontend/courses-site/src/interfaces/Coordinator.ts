import { User } from "./User";

export interface Coordinator {
  id?: string;
  user_id?: string;
  course_id?: string;
  user?: User;
}
