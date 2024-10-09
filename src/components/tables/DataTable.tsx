'use client'

import { trpc } from '@/app/_trpc/client'
import { Data } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import React from 'react'
import { GenericTable } from './GenericTable'
import { GenericColumnHeader } from './GenericTableHeader'
interface DataWithStrings extends Omit<Data, "createdAt" | "updatedAt"> {
    createdAt: string;
    updatedAt: string;
  }

const parseDates = (data: DataWithStrings[]): Data[] => {
    return data.map((item) => ({
      ...item,
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt),
    }));
};

export const columns: ColumnDef<Data>[] = [
    {
      accessorKey: 'id',
      header: ({ column }) => <GenericColumnHeader column={column} title="ID" />,
    },
    {
      accessorKey: 'location',
      header: ({ column }) => <GenericColumnHeader column={column} title="Location" />,
    },
    {
      accessorKey: 'pageid',
      header: ({ column }) => <GenericColumnHeader column={column} title="Page ID" />,
    },
    {
      accessorKey: 'isactive',
      header: ({ column }) => <GenericColumnHeader column={column} title="Is Active" />,
    },
    {
      accessorKey: 'desc',
      header: ({ column }) => <GenericColumnHeader column={column} title="Description" />,
    },
    {
      accessorKey: 'parentid',
      header: ({ column }) => <GenericColumnHeader column={column} title="Parent ID" />,
    },
    {
      accessorKey: 'path',
      header: ({ column }) => <GenericColumnHeader column={column} title="Path" />,
    },
    {
      accessorKey: 'pagetype',
      header: ({ column }) => <GenericColumnHeader column={column} title="Page Type" />,
    },
    {
      accessorKey: 'title',
      header: ({ column }) => <GenericColumnHeader column={column} title="Title" />,
    },
    {
      accessorKey: 'metatitle',
      header: ({ column }) => <GenericColumnHeader column={column} title="Meta Title" />,
    },
    {
      accessorKey: 'metadescription',
      header: ({ column }) => <GenericColumnHeader column={column} title="Meta Description" />,
    },
    {
      accessorKey: 'seosection',
      header: ({ column }) => <GenericColumnHeader column={column} title="SEO Section" />,
    },
    {
      accessorKey: 'icon',
      header: ({ column }) => <GenericColumnHeader column={column} title="Icon" />,
    },
    {
      accessorKey: 'booknowurl',
      header: ({ column }) => <GenericColumnHeader column={column} title="Book Now URL" />,
    },
    {
      accessorKey: 'video',
      header: ({ column }) => <GenericColumnHeader column={column} title="Video" />,
    },
    {
      accessorKey: 'smallimage',
      header: ({ column }) => <GenericColumnHeader column={column} title="Small Image" />,
    },
    {
      accessorKey: 'smalltext',
      header: ({ column }) => <GenericColumnHeader column={column} title="Small Text" />,
    },
    {
      accessorKey: 'headerimage',
      header: ({ column }) => <GenericColumnHeader column={column} title="Header Image" />,
    },
    {
      accessorKey: 'imageTitle',
      header: ({ column }) => <GenericColumnHeader column={column} title="Image Title" />,
    },
    {
      accessorKey: 'section1',
      header: ({ column }) => <GenericColumnHeader column={column} title="Section 1" />,
    },
    {
      accessorKey: 'sectionImage',
      header: ({ column }) => <GenericColumnHeader column={column} title="Section Image" />,
    },
    {
      accessorKey: 'section2',
      header: ({ column }) => <GenericColumnHeader column={column} title="Section 2" />,
    },
    {
      accessorKey: 'section2Image',
      header: ({ column }) => <GenericColumnHeader column={column} title="Section 2 Image" />,
    },
    {
      accessorKey: 'Seoheader',
      header: ({ column }) => <GenericColumnHeader column={column} title="SEO Header" />,
    },
    {
      accessorKey: 'ruleyes',
      header: ({ column }) => <GenericColumnHeader column={column} title="Rule Yes" />,
    },
    {
      accessorKey: 'ruleno',
      header: ({ column }) => <GenericColumnHeader column={column} title="Rule No" />,
    },
    {
      accessorKey: 'warnings',
      header: ({ column }) => <GenericColumnHeader column={column} title="Warnings" />,
    },
    {
      accessorKey: 'booknowlink',
      header: ({ column }) => <GenericColumnHeader column={column} title="Book Now Link" />,
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
  
const DataTable = () => {
    const { data, isLoading, error, status } = trpc.getData.useQuery();
    if(status==='error'){
        <div>
            {error.message}
        </div>
    } 
    if(isLoading) return (
        <div>
            loading...
        </div>
    )
    if(!data &&!isLoading) return(
        <div>
            No Data Found;
        </div>
    )
    const parsedData = parseDates(data!);
    return (
        <GenericTable columns={columns} data={parsedData} />
    )
}

export default DataTable
