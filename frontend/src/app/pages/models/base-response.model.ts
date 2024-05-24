export interface BaseResponseModel {
  code: number;
  status: string;
  msg: string;
  data: object[];
  time: Date;
}
