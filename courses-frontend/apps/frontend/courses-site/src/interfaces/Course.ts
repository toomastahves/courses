import { Coordinator } from "./Coordinator";
import { User } from "./User";

export interface Course {
    id?: string;
    name: string;
    description: string;
    study_load: number;
    level: string;
    start_date: string;
    course_length_in_days: number;
    end_date?: string;
    primary_coordinator_id: string;
    primary_coordinator?: User;
    coordinators?: Coordinator[]
}
