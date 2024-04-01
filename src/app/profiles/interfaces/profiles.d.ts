export interface Profile {
  _id: string;
  idold: string;
  profilename: string;
  profilelastname: string;
  gender: string;
  profession: string;
  birthdate: string;
  city: string;
}

export interface RowsData {
  _id: string;
  idold: string;
  profilename: string;
  profilelastname: string;
  gender: string;
  profession: string;
  birthdate: string;
  city: string;
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
