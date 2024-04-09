export interface Action {
  _id: string;
  idprofile: string;
  idprofileold: string;
  socialmedia: string;
  urlmention: string;
  customer: string;
  typeaction: string;
  createdAt: Date;
}

export interface RowsData {
  _id: string;
  idprofile: string;
  idprofileold: string;
  socialmedia: string;
  urlmention: string;
  customer: string;
  typeaction: string;
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
