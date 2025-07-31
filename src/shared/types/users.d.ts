export type User = {
  id: string;
  name: string;
  login: string;
  registration: string;
  role?: string;
  permission: "admin" | "operator";
};
