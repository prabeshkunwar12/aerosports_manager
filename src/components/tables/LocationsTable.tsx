'use client'

import { trpc } from '@/app/_trpc/client'
import { Locations } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import React from 'react'
import { GenericTable } from './generic/GenericTable'
import { GenericColumnHeader } from './generic/GenericTableHeader'

interface LocationsWithStrings extends Omit<Locations, "createdAt" | "updatedAt"> {
  createdAt: string;
  updatedAt: string;
}

const parseLocationsDates = (data: LocationsWithStrings[]): Locations[] => {
  return data.map((item) => ({
    ...item,
    createdAt: new Date(item.createdAt),
    updatedAt: new Date(item.updatedAt),
  }));
};

export const locationsColumns: ColumnDef<Locations>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <GenericColumnHeader column={column} title="ID" />,
  },
  {
    accessorKey: 'locations',
    header: ({ column }) => <GenericColumnHeader column={column} title="Locations" />,
  },
  {
    accessorKey: 'address',
    header: ({ column }) => <GenericColumnHeader column={column} title="Address" />,
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => <GenericColumnHeader column={column} title="Phone" />,
  },
  {
    accessorKey: 'map',
    header: ({ column }) => <GenericColumnHeader column={column} title="Map" />,
  },
  {
    accessorKey: 'locationid',
    header: ({ column }) => <GenericColumnHeader column={column} title="Location ID" />,
  },
  {
    accessorKey: 'hours',
    header: ({ column }) => <GenericColumnHeader column={column} title="Hours" />,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <GenericColumnHeader column={column} title="Email" />,
  },
  {
    accessorKey: 'desc',
    header: ({ column }) => <GenericColumnHeader column={column} title="Description" />,
  },
  {
    accessorKey: 'smallimage',
    header: ({ column }) => <GenericColumnHeader column={column} title="Small Image" />,
  },
  {
    accessorKey: 'tag',
    header: ({ column }) => <GenericColumnHeader column={column} title="Tag" />,
  },
  {
    accessorKey: 'rollerurl',
    header: ({ column }) => <GenericColumnHeader column={column} title="Roller URL" />,
  },
  {
    accessorKey: 'facebook',
    header: ({ column }) => <GenericColumnHeader column={column} title="Facebook" />,
  },
  {
    accessorKey: 'insta',
    header: ({ column }) => <GenericColumnHeader column={column} title="Instagram" />,
  },
  {
    accessorKey: 'twitter',
    header: ({ column }) => <GenericColumnHeader column={column} title="Twitter" />,
  },
  {
    accessorKey: 'tiktok',
    header: ({ column }) => <GenericColumnHeader column={column} title="Tiktok" />,
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

const LocationsTable = () => {
  const { data, isLoading, error, status } = trpc.getLocations.useQuery();

  if (status === 'error') {
    return <div>{error.message}</div>;
  }

  if (isLoading) return <div>Loading...</div>;

  if (!data && !isLoading) return <div>No Data Found</div>;

  const parsedData = parseLocationsDates(data!);

  return <GenericTable columns={locationsColumns} data={parsedData} />;
};

export default LocationsTable;
