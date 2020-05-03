export interface NewUserInterface {
  fullName: string;
  username: string;
  password: string;
  confirm?: string;
  email: string;
  role?: number;
  phone: string;
}

export interface UserInterface extends NewUserInterface {}
