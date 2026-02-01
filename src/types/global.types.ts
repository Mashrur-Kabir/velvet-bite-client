export interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

export type ServiceResponse<T> = {
  data: T | null;
  error: { message: string } | null;
};
