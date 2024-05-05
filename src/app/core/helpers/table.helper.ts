import { IColumn } from '../interface/table.interface';
import { ITableActionButton } from '../interface/table.interface';

export const CreateUserTableColumn = (): IColumn[] => {
  return [
    { field: 'name', header: 'Full Name' },
    { field: 'username', header: 'Username' },
    { field: 'email', header: 'Email' },
    { field: 'userType', header: 'User Type' },
    { field: 'createdAt', header: 'Created Date' },
  ];
};

export const CreateUserActionButton = (): ITableActionButton[] => {
  return [
    { label: 'Edit', severity: 'info', type: 'edit' },
    { label: 'Remove', severity: 'danger', type: 'delete' },
  ];
};

export const CreateArchiveTableColumn = (): IColumn[] => {
  return [
    { field: 'name', header: 'Full Name' },
    { field: 'username', header: 'Username' },
    { field: 'userType', header: 'User Type' },
    { field: 'email', header: 'Email' },
    { field: 'deletedAt', header: 'Deleted Date' },
  ];
};

export const CreateArchiveActionButton = (): ITableActionButton[] => {
  return [
    { label: 'Restore', severity: 'info', type: 'restore' },
    { label: 'Delete', severity: 'danger', type: 'delete' },
  ];
};
