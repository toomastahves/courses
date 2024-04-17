export const isCourseNameValid = (courseName: string) => {
  return courseName !== '' && courseName.length > 0 && courseName.length <= 200;
};

export const isDescriptionValid = (description: string) => {
  return description.length <= 2000;
};

export const isStudyLoadValid = (studyLoad: number | string) => {
  return studyLoad !== '' && Number(studyLoad) >= 0 && Number(studyLoad) <= 30;
};

export const isDurationInDaysValid = (durationInDays: number | string) => {
  return (
    durationInDays !== '' &&
    Number(durationInDays) > 0 &&
    Number(durationInDays) <= 365
  );
};

export const isPrimaryCoordinatorValid = (
  primaryCoordinator: number | string
) => {
  return primaryCoordinator !== '';
};

export const CourseNameErrorMessage = 'Course name is mandatory, has to be shorter than 200 chars';
export const DescriptionErrorMessage = 'Description has to be shorter than 2000 chars';
export const StudyLoadErrorMessage = 'Study load is mandatory, must be between 0 and 30';
export const DurationInDaysErrorMessage = 'Duration is mandatory, must be between 0 and 365';
export const PrimaryCoordinatorErrorMessage = 'Primary coordinator must be selected';
