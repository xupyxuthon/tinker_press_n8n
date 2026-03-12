export interface User {
  id: string
  email: string
  username: string
  avatar?: string
  preferences: {
    language: 'en' | 'zh' | 'ja'
    theme: 'light' | 'dark'
    notifications: boolean
  }
  role?: 'vip' | 'standard' | 'guest'
  createdAt: string
  updatedAt: string
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  error: string | null
}

export interface AuthFormData {
  email: string
  username?: string
  password: string
  confirmPassword?: string
}

export type AuthMode = 'login' | 'register' | 'forgot'
