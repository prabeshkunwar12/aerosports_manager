'use client'

import { trpc } from '@/app/_trpc/client'
import { BirthdayPackages } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import React from 'react'
import { GenericTable } from './GenericTable'
import { GenericColumnHeader } from './GenericTableHeader'

interface BirthdayPackagesWithStrings extends Omit<BirthdayPackages, "createdAt" | "updatedAt"> {
  createdAt: string;
  updatedAt: string;
}

const parseBirthdayPackagesDates = (data: BirthdayPackagesWithStrings[]): BirthdayPackages[] => {
  return data.map((item) => ({
    ...item,
    createdAt: new Date(item.createdAt),
    updatedAt: new Date(item.updatedAt),
  }));
};

export const birthdayPackagesColumns: ColumnDef<BirthdayPackages>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <GenericColumnHeader column={column} title="ID" />,
  },
  {
    accessorKey: 'location',
    header: ({ column }) => <GenericColumnHeader column={column} title="Location" />,
  },
  {
    accessorKey: 'plantitle',
    header: ({ column }) => <GenericColumnHeader column={column} title="Plan Title" />,
  },
  {
    accessorKey: 'category',
    header: ({ column }) => <GenericColumnHeader column={column} title="Category" />,
  },
  {
    accessorKey: 'price',
    header: ({ column }) => <GenericColumnHeader column={column} title="Price" />,
  },
  {
    accessorKey: 'period',
    header: ({ column }) => <GenericColumnHeader column={column} title="Period" />,
  },
  {
    accessorKey: 'includes',
    header: ({ column }) => <GenericColumnHeader column={column} title="Includes" />,
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

const BirthdayPackagesTable = () => {
  const { data, isLoading, error, status } = trpc.getBirthdayPackages.useQuery();

  if (status === 'error') {
    return <div>{error.message}</div>;
  }

  if (isLoading) return <div>Loading...</div>;

  if (!data && !isLoading) return <div>No Data Found</div>;

  const parsedData = parseBirthdayPackagesDates(data!);

  return <GenericTable columns={birthdayPackagesColumns} data={parsedData} />;
};

export default BirthdayPackagesTable;
