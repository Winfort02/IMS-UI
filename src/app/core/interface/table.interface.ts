export interface IColumn {
  field: string;
  header: string;
}

export interface ITableActionButton {
  label: string;
  severity: string;
  type: string;
}

export interface ITableRow {
  name: string;
  row: number;
}
