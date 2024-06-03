declare interface ApiUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  permissionsLevel: number;
}

declare interface ApiAuth {
  accessToken: string;
  accessExp: number;
  refreshToken: string;
  refreshExp: number;
}

declare interface ApiAcademicLevel {
  id: string;
  name: string;
}

declare interface ApiGrade {
  id: string;
  label: number;
  section: string;
  academicLevel: ApiAcademicLevel;
}

declare interface ApiSchedule {
  id: string;
  gradeId: string;
  lea: number;
}

declare interface ApiError {
  message: string | string[];
  error: string;
  statusCode: number;
}
