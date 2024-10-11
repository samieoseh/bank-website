
export interface AuthContextType {
  authenticated: boolean;
  waitAuthCheck: boolean;
  loading: boolean;
  user: UserType | null;
  error: string | null;
  login:  (username: string, password: string) => Promise<void>;
  logout: () => void;
}


export interface UserType {
  username: string;
  password: string;
}