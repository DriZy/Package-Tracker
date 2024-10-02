export interface User {
  _id?: string;
  username: string;
  password?: string;
  token?: string;
  // role: 'admin' | 'driver' | 'customer';
}
