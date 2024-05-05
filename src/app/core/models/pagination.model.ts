export class PaginationModel {
  metaData: any[] = [];
  currentPage: number = 1;
  firstPage: number = 1;
  prevPage: number = 0;
  nextPage: number = 0;
  lastPage: number = 0;
  totalPages: number = 0;
  pageDetails: string = '';
}
