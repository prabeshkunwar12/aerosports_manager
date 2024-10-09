'use client'

import { trpc } from '@/app/_trpc/client'
import { Config } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import React from 'react'
import { GenericTable } from './GenericTable'
import { GenericColumnHeader } from './GenericTableHeader'

interface ConfigWithStrings extends Omit<Config, "createdAt" | "updatedAt"> {
  createdAt: string;
  updatedAt: string;
}

const parseConfigDates = (data: ConfigWithStrings[]): Config[] => {
  return data.map((item) => ({
    ...item,
    createdAt: new Date(item.createdAt),
    updatedAt: new Date(item.updatedAt),
  }));
};

export const configColumns: ColumnDef<Config>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <GenericColumnHeader column={column} title="ID" />,
  },
  {
    accessorKey: 'location',
    header: ({ column }) => <GenericColumnHeader column={column} title="Location" />,
  },
  {
    accessorKey: 'key',
    header: ({ column }) => <GenericColumnHeader column={column} title="Key" />,
  },
  {
    accessorKey: 'value',
    header: ({ column }) => <GenericColumnHeader column={column} title="Value" />,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <GenericColumnHeader column={column} title="Created At" />,
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => <GenericColumnHeader column={column} title="Updated At" />,
  },
];

const ConfigTable = () => {
  const { data, isLoading, error, status } = trpc.getConfig.useQuery();

  if (status === 'error') {
    return <div>{error.message}</div>;
  }

  if (isLoading) return <div>Loading...</div>;

  if (!data && !isLoading) return <div>No Data Found</div>;

  const parsedData = parseConfigDates(data!);

  return <GenericTable columns={configColumns} data={parsedData} />;
};

export default ConfigTable;
