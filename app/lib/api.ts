const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
  token?: string;
  email?: string;
  role?: string;
}

interface RequestOptions extends RequestInit {
  skipAuth?: boolean;
}

export async function apiCall<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const url = `${API_URL}${endpoint}`;
  const { skipAuth = false, ...fetchOptions } = options;
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(fetchOptions.headers as Record<string, string> || {}),
  };

  // Add JWT token if available and not skipped
  if (!skipAuth && typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      // Handle 401 Unauthorized
      if (response.status === 401 && typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
      return {
        error: data.error || data.message || 'An error occurred',
      };
    }

    return data;
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}

// ============ AUTHENTICATION ============
export async function login(email: string, password: string) {
  return apiCall('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    skipAuth: true,
  });
}

export async function logout() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }
}

// ============ USERS ============
export async function registerUser(email: string, password: string, name: string, role: string) {
  return apiCall('/users', {
    method: 'POST',
    body: JSON.stringify({ email, password, name, role }),
    skipAuth: true,
  });
}

export async function getUser(id: number) {
  return apiCall(`/users/${id}`, {
    method: 'GET',
  });
}

export async function updateUser(id: number, email: string, password: string) {
  return apiCall(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ id, email, password }),
  });
}

// ============ COURSES ============
export async function createCourse(name: string, description: string, teacherId: number) {
  return apiCall('/courses', {
    method: 'POST',
    body: JSON.stringify({ name, description, teacherId }),
  });
}

export async function getMyCourses(userId: number) {
  return apiCall(`/courses/my?userId=${userId}`, {
    method: 'GET',
  });
}

export async function updateCourse(id: number, name: string, description: string) {
  return apiCall(`/courses/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ name, description }),
  });
}

export async function deleteCourse(id: number) {
  return apiCall(`/courses/${id}`, {
    method: 'DELETE',
  });
}

// ============ STUDENTS ============
export async function getStudent(id: number) {
  return apiCall(`/students/${id}`, {
    method: 'GET',
  });
}

// ============ TEACHERS ============
export async function getTeacher(id: number) {
  return apiCall(`/teachers/${id}`, {
    method: 'GET',
  });
}

// ============ ENROLLMENTS ============
export async function enrollInCourse(studentId: number, courseId: number) {
  return apiCall('/enrollments', {
    method: 'POST',
    body: JSON.stringify({ studentId, courseId }),
  });
}

// ============ GRADES ============
export async function createGrade(studentId: number, courseId: number, grade: number) {
  return apiCall('/grades', {
    method: 'POST',
    body: JSON.stringify({ studentId, courseId, grade }),
  });
}

export async function getGrades(studentId?: number, courseId?: number) {
  const params = new URLSearchParams();
  if (studentId) params.append('studentId', studentId.toString());
  if (courseId) params.append('courseId', courseId.toString());
  const query = params.toString() ? `?${params.toString()}` : '';
  
  return apiCall(`/grades${query}`, {
    method: 'GET',
  });
}

// ============ TASKS ============
export async function createTask(courseId: number, title: string, description: string, dueDate: string) {
  return apiCall('/tasks', {
    method: 'POST',
    body: JSON.stringify({ courseId, title, description, dueDate }),
  });
}

export async function getTasks(courseId?: number) {
  const query = courseId ? `?courseId=${courseId}` : '';
  
  return apiCall(`/tasks${query}`, {
    method: 'GET',
  });
}

// ============ SKILLS ============
export async function createSkill(name: string, description: string) {
  return apiCall('/skills', {
    method: 'POST',
    body: JSON.stringify({ name, description }),
  });
}

export async function getSkills() {
  return apiCall('/skills', {
    method: 'GET',
  });
}

// ============ VACANCIES ============
export async function createVacancy(title: string, description: string, company: string, salary: number) {
  return apiCall('/vacancies', {
    method: 'POST',
    body: JSON.stringify({ title, description, company, salary }),
  });
}

export async function getVacancies() {
  return apiCall('/vacancies', {
    method: 'GET',
  });
}
