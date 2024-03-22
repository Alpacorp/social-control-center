export interface Customer {
  _id: string;
  name: string;
  comment: string;
}

export interface RowsData {
  _id: string;
  number: string;
  operator: string;
  comment: string;
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
