export interface Course {
  code: string;
  title: string;
  color: string;
  marksObtained: number;
  totalMarks: number;
  previousMarks: number;
  updatedMarks: number;
  semester?: number;
  studyHours?: number;
  isNonStudent?: boolean;
  isCodingSubject?: boolean;
  attendance?: number;
  projectsBuilt?: number;
  codingContestsAttempted?: number;
}
