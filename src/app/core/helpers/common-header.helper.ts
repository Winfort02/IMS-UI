import { HttpHeaders } from '@angular/common/http';
export const httpAuthorizationHeader = (
  token: string | null = null,
  contentType: Array<any> = []
) => {
  return {
    headers: new HttpHeaders({
      'Content-Type': contentType,
      authorization: `Bearer ${token}`,
    }),
  };
};
