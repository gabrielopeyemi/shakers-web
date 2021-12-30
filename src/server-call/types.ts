export enum ServerCallVerbs {
  Get = 'get',
  Post = 'post',
}

export interface ServerCallProps {
  data?: any;
  url: any;
  params?: any;
}

export interface ServerResponse {
  success: boolean;
  dataReturned?: any;
  error?: string;
}
