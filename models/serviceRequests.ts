export type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface ApiRouteType {
  method: Method;
  url: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface DefaultAxiosResponse<T = any> {
  status?: boolean;
  message: string;
  data?: T;
}

export interface Pagination {
  pagination: {
    count: number;
    total: number;
    nextPage: number | null;
    currentPage: number | null;
  };
}

export interface PageParams {
  page?: number;
  offset?: number;
}
