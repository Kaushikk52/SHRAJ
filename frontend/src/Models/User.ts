import { Blog } from "./Blog";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  token: string;
  role: UserRole;
  blogs:Blog[];
};

enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}
