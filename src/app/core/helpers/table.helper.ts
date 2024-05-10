import { IColumn } from '../interface/table.interface';
import { ITableActionButton, ITableRow } from '../interface/table.interface';
import {
  ActionButtonLabel,
  ActionButtonSeverity,
  ActionButtonType,
} from '../enum/action-button.enum';

export const CreateTableRow = (): ITableRow[] => [
  { name: '25', row: 25 },
  { name: '50', row: 50 },
  { name: '100', row: 100 },
];

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
    {
      label: ActionButtonLabel.edit,
      severity: ActionButtonSeverity.info,
      type: ActionButtonType.edit,
    },
    {
      label: ActionButtonLabel.remove,
      severity: ActionButtonSeverity.danger,
      type: ActionButtonType.delete,
    },
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
    {
      label: ActionButtonLabel.restore,
      severity: ActionButtonSeverity.info,
      type: ActionButtonType.restore,
    },
    {
      label: ActionButtonLabel.delete,
      severity: ActionButtonSeverity.danger,
      type: ActionButtonType.delete,
    },
  ];
};
