'use client'

import { trpc } from '@/app/_trpc/client'
import { Promo } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import React from 'react'
import { GenericTable } from './generic/GenericTable'
import { GenericColumnHeader } from './generic/GenericTableHeader'

interface PromoWithStrings extends Omit<Promo, "createdAt" | "updatedAt" | "startdate" | "enddate"> {
  createdAt: string;
  updatedAt: string;
  startdate: string;
  enddate: string;
}

const parsePromoDates = (data: PromoWithStrings[]): Promo[] => {
  return data.map((item) => ({
    ...item,
    createdAt: new Date(item.createdAt),
    updatedAt: new Date(item.updatedAt),
    startdate: new Date(item.startdate),
    enddate: new Date(item.enddate),
  }));
};

export const promoColumns: ColumnDef<Promo>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <GenericColumnHeader column={column} title="ID" />,
  },
  {
    accessorKey: 'location',
    header: ({ column }) => <GenericColumnHeader column={column} title="Location" />,
  },
  {
    accessorKey: 'promo',
    header: ({ column }) => <GenericColumnHeader column={column} title="Promo" />,
  },
  {
    accessorKey: 'img',
    header: ({ column }) => <GenericColumnHeader column={column} title="Image" />,
  },
  {
    accessorKey: 'description',
    header: ({ column }) => <GenericColumnHeader column={column} title="Description" />,
  },
  {
    accessorKey: 'startdate',
    header: ({ column }) => <GenericColumnHeader column={column} title="Start Date" />,
  },
  {
    accessorKey: 'enddate',
    header: ({ column }) => <GenericColumnHeader column={column} title="End Date" />,
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

const PromoTable = () => {
  const { data, isLoading, error, status } = trpc.getPromo.useQuery();

  if (status === 'error') {
    return <div>{error.message}</div>;
  }

  if (isLoading) return <div>Loading...</div>;

  if (!data && !isLoading) return <div>No Data Found</div>;

  const parsedData = parsePromoDates(data!);

  return <GenericTable columns={promoColumns} data={parsedData} />;
};

export default PromoTable;
