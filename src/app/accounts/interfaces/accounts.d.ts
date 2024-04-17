export interface Account {
  _id: string;
  idprofile: string;
  idprofileold: string;
  email: string;
  typeaccount: string;
  username: string;
  passaccount: string;
  status: string;
  comments: string;
  phone: number;
  revision: string;
}

export interface RowsData {
  _id: string;
  idprofile: string;
  idprofileold: string;
  email: string;
  typeaccount: string;
  username: string;
  passaccount: string;
  status: string;
  comments: string;
  phone: number;
  revision: string;
}

export interface Status {
  show: boolean;
  value: string;
  notification: string;
  res: "ok" | "error";
}

export interface Copied {
  success: boolean;
  value: string;
}
