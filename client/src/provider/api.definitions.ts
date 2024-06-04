export interface ApiUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  permissionsLevel: number;
}

export interface ApiAuth {
  accessToken: string;
  accessExp: number;
  refreshToken: string;
  refreshExp: number;
}

export interface ApiAcademicLevel {
  id: string;
  name: string;
}

export interface ApiGrade {
  id: string;
  label: number;
  section: string;
  academicLevel: ApiAcademicLevel;
}

export interface ApiSchedule {
  id: string;
  gradeId: string;
  lea: number;
}

export interface ApiError {
  message: string | string[];
  error: string;
  statusCode: number;
}
