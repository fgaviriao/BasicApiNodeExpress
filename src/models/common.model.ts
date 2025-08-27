export interface IDeleteRequest {
  id: string;
  userId: string;
}

export interface IEditRequest {
  id: string;
  userId: string;
}

export interface ICreateRequest {
  userId: string | null;
}

export interface IFindRequest {
  userId: string;
  page: number;
  limit: number;
  skip: number;
  sort: string;
}

export interface IFindOneRequest {
  id: string;
  userId: string;
}
