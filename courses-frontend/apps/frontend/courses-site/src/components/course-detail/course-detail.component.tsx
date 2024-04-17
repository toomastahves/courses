import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AppDispatch, RootState } from '../../store/store';
import SpinnerComponent from '../spinner/spinner.component';
import { fetchCourseById, fetchCourses, updateCourse } from '../../store/coursesReducer';
import { Box, Button, MenuItem, TextField, Typography } from '@mui/material';
import { Course } from '../../interfaces/Course';
import {
  CourseNameErrorMessage,
  DescriptionErrorMessage,
  DurationInDaysErrorMessage,
  PrimaryCoordinatorErrorMessage,
  StudyLoadErrorMessage,
  isCourseNameValid,
  isDescriptionValid,
  isDurationInDaysValid,
  isPrimaryCoordinatorValid,
  isStudyLoadValid
} from '../../validators/course.validators';
import dayjs, { Dayjs } from 'dayjs';
import { DefaultStudyLevel, StudyLevelList } from '../../const/StudyLevelList';
import { DatePicker } from '@mui/x-date-pickers';
import './course-detail.component.styles.scss';
import { User } from '../../interfaces/User';
import { fetchUsers } from '../../store/usersReducer';

export function CourseDetailComponent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const usersState = useSelector((state: RootState) => state.users);
  const { courseDetails, isLoading } = useSelector((state: RootState) => state.courses);

  const [courseName, setCourseName] = useState('');
  const [courseNameError, setCourseNameError] = useState(false);
  const [courseNameHelperText, setCourseNameHelperText] = useState('');

  const [description, setDecription] = useState('');
  const [descriptionError, setDescriptionError] = useState(false);
  const [descriptionHelperText, setDescriptionHelperText] = useState('');

  const [studyLoad, setStudyLoad] = useState('');
  const [studyLoadError, setStudyLoadError] = useState(false);
  const [studyLoadHelperText, setStudyLoadHelperText] = useState('');

  const [studyLevel, setStudyLevel] = useState(DefaultStudyLevel);
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());

  const [durationInDays, setDurationInDays] = useState('');
  const [durationInDaysError, setDurationInDaysError] = useState(false);
  const [durationInDaysHelperText, setDurationInDaysErrorHelperText] = useState('');

  const [primaryCoordinator, setPrimaryCoordinator] = useState('');
  const [primaryCoordinatorError, setPrimaryCoordinatorError] = useState(false);
  const [primaryCoordinatorHelperText, setPrimaryCoordinatorHelperText] = useState('');

  const [localCourseDetails, setLocalCourseDetails] = useState<Course | null | undefined>(null);

  useEffect(() => {
    if (!localCourseDetails && id) dispatch(fetchCourseById(id));
    setLocalCourseDetails(courseDetails);
    setCourseName(courseDetails?.name ?? '');
    setDecription(courseDetails?.description ?? '');
    setStudyLevel(courseDetails?.level ?? DefaultStudyLevel);
    setStudyLoad(String(courseDetails?.study_load));
    setStartDate(dayjs(courseDetails?.start_date));
    setDurationInDays(String(courseDetails?.course_length_in_days));
    setPrimaryCoordinator(String(courseDetails?.primary_coordinator?.id ?? ''));
  }, [dispatch, id, courseDetails, localCourseDetails]);

  if (isLoading || usersState.isLoading) {
    return <SpinnerComponent open={true} />;
  }

  if (!usersState.users) dispatch(fetchUsers());

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setCourseNameError(false);
    setCourseNameHelperText('');
    if (!isCourseNameValid(courseName)) {
      setCourseNameError(true);
      setCourseNameHelperText(CourseNameErrorMessage);
    }

    setDescriptionError(false);
    setDescriptionHelperText('');
    if (!isDescriptionValid(description)) {
      setDescriptionError(true);
      setDescriptionHelperText(DescriptionErrorMessage);
    }

    setStudyLoadError(false);
    setStudyLoadHelperText('');
    if (!isStudyLoadValid(studyLoad)) {
      setStudyLoadError(true);
      setStudyLoadHelperText(StudyLoadErrorMessage);
    }

    setDurationInDaysError(false);
    setDurationInDaysErrorHelperText('');
    if (!isDurationInDaysValid(durationInDays)) {
      setDurationInDaysError(true);
      setDurationInDaysErrorHelperText(DurationInDaysErrorMessage);
    }

    setPrimaryCoordinatorError(false);
    setPrimaryCoordinatorHelperText('');
    if (!isPrimaryCoordinatorValid(primaryCoordinator)) {
      setPrimaryCoordinatorError(true);
      setPrimaryCoordinatorHelperText(PrimaryCoordinatorErrorMessage);
    }

    const isFormValid =
      isCourseNameValid(courseName) &&
      isDescriptionValid(description) &&
      isStudyLoadValid(studyLoad) &&
      isDurationInDaysValid(durationInDays) &&
      isPrimaryCoordinatorValid(primaryCoordinator);

    if (isFormValid) {
      await dispatch(
        updateCourse({
          id,
          name: courseName,
          description,
          study_load: Number(studyLoad),
          level: studyLevel,
          start_date: dayjs(startDate).format('YYYY-MM-DD'),
          course_length_in_days: Number(durationInDays),
          primary_coordinator_id: Number(primaryCoordinator)
        })
      );
      await dispatch(fetchCourses());
      navigate('/courses');
    }
  };

  return (
    <div>
      <div className="courses-add-header">
        <Typography gutterBottom variant="h5" component="div">
          Course details
        </Typography>
      </div>
      <Box component="form" noValidate onSubmit={handleSubmit}>
        <div>
          <div style={{ padding: '10px' }}>
            <TextField
              required
              fullWidth
              id="courseName"
              label="Course name"
              name="courseName"
              value={courseName}
              autoComplete="course-name"
              error={courseNameError}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCourseName(e.target.value)}
              helperText={courseNameHelperText}
            />
          </div>
          <div style={{ padding: '10px' }}>
            <TextField
              required
              fullWidth
              id="description"
              label="Description"
              name="description"
              value={description}
              autoComplete="description"
              multiline={true}
              maxRows={5}
              minRows={5}
              error={descriptionError}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDecription(e.target.value)}
              helperText={descriptionHelperText}
            />
          </div>
          <div style={{ padding: '10px' }}>
            <TextField
              required
              fullWidth
              type="number"
              id="studyLoad"
              label="Study Load"
              name="studyLoad"
              value={studyLoad}
              autoComplete="studyLoad"
              error={studyLoadError}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStudyLoad(e.target.value)}
              helperText={studyLoadHelperText}
            />
          </div>
          <div style={{ padding: '10px' }}>
            <TextField
              required
              fullWidth
              id="studyLevel"
              name="studyLevel"
              select
              label="Study Level"
              value={studyLevel}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStudyLevel(e.target.value)}
            >
              {StudyLevelList.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div style={{ padding: '10px' }}>
            <DatePicker
              className="datepicker"
              value={startDate}
              defaultValue={dayjs()}
              onChange={(val) => setStartDate(val)}
              format="DD.MM.YYYY"
              disablePast
              maxDate={dayjs().add(1, 'year')}
            />
          </div>
          <div style={{ padding: '10px' }}>
            <TextField
              required
              fullWidth
              type="number"
              id="durationInDays"
              label="Duration In Days"
              name="durationInDays"
              value={durationInDays}
              autoComplete="durationInDays"
              error={durationInDaysError}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDurationInDays(e.target.value)}
              helperText={durationInDaysHelperText}
            />
          </div>
          <div style={{ padding: '10px' }}>
            <TextField
              required
              fullWidth
              id="primaryCoordinator"
              name="primaryCoordinator"
              select
              label="Primary Coordinator"
              error={primaryCoordinatorError}
              value={primaryCoordinator}
              helperText={primaryCoordinatorHelperText}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrimaryCoordinator(e.target.value)}
            >
              {usersState.users?.map((user: User) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div style={{ padding: '10px' }}>
            <Button sx={{ width: '100%' }} variant="contained" type="submit">
              Update
            </Button>
          </div>
        </div>
      </Box>
    </div>
  );
}

export default CourseDetailComponent;
