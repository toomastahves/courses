import { Box, Button, MenuItem, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { createCourse } from '../../store/coursesReducer';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import './course-add.component.styles.scss';
import { fetchUsers } from '../../store/usersReducer';
import { useNavigate } from 'react-router-dom';
import SpinnerComponent from '../spinner/spinner.component';

const studyLevelList = [
  {
    value: 'Bachelor',
    label: 'Bachelor'
  },
  {
    value: 'Master',
    label: 'Master'
  },
  {
    value: 'Doctoral',
    label: 'Doctoral'
  }
];

export function CourseAddComponent() {
  const navigate = useNavigate();
  const dispatch: any = useDispatch();

  const { users, isLoading } = useSelector((state: any) => state.users);

  const [courseName, setCourseName] = useState('');
  const [courseNameError, setCourseNameError] = useState(false);
  const [courseNameHelperText, setCourseNameHelperText] = useState('');

  const [description, setDecription] = useState('');
  const [descriptionError, setDescriptionError] = useState(false);
  const [descriptionHelperText, setDescriptionHelperText] = useState('');

  const [studyLoad, setStudyLoad] = useState('');
  const [studyLoadError, setStudyLoadError] = useState(false);
  const [studyLoadHelperText, setStudyLoadHelperText] = useState('');

  const [studyLevel, setStudyLevel] = useState('Bachelor');
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());

  const [durationInDays, setDurationInDays] = useState('');
  const [durationInDaysError, setDurationInDaysError] = useState(false);
  const [durationInDaysHelperText, setDurationInDaysErrorHelperText] =
    useState('');

  const [primaryCoordinator, setPrimaryCoordinator] = useState('');
  const [primaryCoordinatorError, setPrimaryCoordinatorError] = useState(false);
  const [primaryCoordinatorHelperText, setPrimaryCoordinatorHelperText] =
    useState('');

  if (isLoading) {
    return <SpinnerComponent open={isLoading} />;
  }

  if (!users) dispatch(fetchUsers());

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setCourseNameError(false);
    setCourseNameHelperText('');
    if (courseName === '' || courseName.length > 200) {
      setCourseNameError(true);
      setCourseNameHelperText(
        'Course name is mandatory, has to be shorter than 200 chars'
      );
    }

    setDescriptionError(false);
    setDescriptionHelperText('');
    if (description.length > 2000) {
      setDescriptionError(true);
      setDescriptionHelperText('Description has to be shorter than 2000 chars');
    }

    setStudyLoadError(false);
    setStudyLoadHelperText('');
    if (studyLoad === '' || Number(studyLoad) < 0 || Number(studyLoad) > 30) {
      setStudyLoadError(true);
      setStudyLoadHelperText(
        'Study load is mandatory, must be between 0 and 30'
      );
    }

    setDurationInDaysError(false);
    setDurationInDaysErrorHelperText('');
    if (
      durationInDays === '' ||
      Number(durationInDays) < 1 ||
      Number(durationInDays) > 265
    ) {
      setDurationInDaysError(true);
      setDurationInDaysErrorHelperText(
        'Duration is mandatory, must be between 0 and 365'
      );
    }

    setPrimaryCoordinatorError(false);
    setPrimaryCoordinatorHelperText('');
    if (primaryCoordinator === '') {
      setPrimaryCoordinatorError(true);
      setPrimaryCoordinatorHelperText('Primary coordinator must be selected');
    }

    if (
      !courseNameError &&
      !descriptionError &&
      !studyLoadError &&
      !durationInDaysError &&
      !primaryCoordinatorError
    ) {
      await dispatch(
        createCourse({
          name: courseName,
          description,
          study_load: Number(studyLoad),
          level: studyLevel,
          start_date: dayjs(startDate).format('YYYY-MM-DD'),
          course_length_in_days: Number(durationInDays),
          primary_coordinator_id: primaryCoordinator
        })
      );
      navigate('/courses');
    }
  };

  return (
    <div>
      <div className="courses-add-header">
        <Typography gutterBottom variant="h5" component="div">
          Create new course
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
              autoComplete="course-name"
              error={courseNameError}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCourseName(e.target.value)
              }
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
              autoComplete="description"
              multiline={true}
              maxRows={5}
              minRows={5}
              error={descriptionError}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDecription(e.target.value)
              }
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
              autoComplete="studyLoad"
              error={studyLoadError}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setStudyLoad(e.target.value)
              }
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setStudyLevel(e.target.value)
              }
            >
              {studyLevelList.map((option) => (
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
              autoComplete="durationInDays"
              error={durationInDaysError}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDurationInDays(e.target.value)
              }
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPrimaryCoordinator(e.target.value)
              }
            >
              {users?.map((user: any) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div style={{ padding: '10px' }}>
            <Button sx={{ width: '100%' }} variant="contained" type="submit">
              Add
            </Button>
          </div>
        </div>
      </Box>
    </div>
  );
}

export default CourseAddComponent;
