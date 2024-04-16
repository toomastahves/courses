import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { fetchCourses } from '../../store/coursesReducer';
import SpinnerComponent from '../spinner/spinner.component';
import './course-list.component.styles.scss';

export default function CourseListComponent() {
  const { courses, isLoading } = useSelector((state: any) => state.courses);
  const dispatch: any = useDispatch();
  const navigate = useNavigate();

  if (!courses) dispatch(fetchCourses());

  if (isLoading) {
    return <SpinnerComponent open={isLoading} />;
  }

  if (!courses) {
    return 'No Courses';
  }

  function handleRowClick(id: string) {
    navigate(`/courses/details/${id}`);
  }

  return (
    <div>
      <div className="courses-header">
        <Typography variant="h6" component="div">
          Courses
        </Typography>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">Start date</TableCell>
              <TableCell align="left">End date</TableCell>
              <TableCell align="left">Course length in days</TableCell>
              <TableCell align="left">Level</TableCell>
              <TableCell align="left">Study load</TableCell>
              <TableCell align="left">Primary coordinator</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses?.map((course: any) => (
              <TableRow
                hover={true}
                onClick={() => handleRowClick(course.id)}
                key={course.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left">{course.name}</TableCell>
                <TableCell align="left">{course.description}</TableCell>
                <TableCell align="left">
                  {new Date(course.start_date).toLocaleString('et-EE', {
                    timeZone: 'Europe/Tallinn',
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit'
                  })}
                </TableCell>
                <TableCell align="left">
                  {new Date(course.end_date).toLocaleString('et-EE', {
                    timeZone: 'Europe/Tallinn',
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit'
                  })}
                </TableCell>
                <TableCell align="left">
                  {course.course_length_in_days}
                </TableCell>
                <TableCell align="left">{course.level}</TableCell>
                <TableCell align="left">{course.study_load}</TableCell>
                <TableCell align="left">
                  {course.primary_coordinator.name}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}