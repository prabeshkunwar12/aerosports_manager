'use client'

import { trpc } from '@/app/_trpc/client'
import { Blog } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import React from 'react'
import { GenericTable } from './generic/GenericTable'
import { GenericColumnHeader } from './generic/GenericTableHeader'

interface BlogWithStrings extends Omit<Blog, "createdAt" | "updatedAt"> {
  createdAt: string;
  updatedAt: string;
}

const parseBlogDates = (data: BlogWithStrings[]): Blog[] => {
  return data.map((item) => ({
    ...item,
    createdAt: new Date(item.createdAt),
    updatedAt: new Date(item.updatedAt),
  }));
};

export const blogColumns: ColumnDef<Blog>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <GenericColumnHeader column={column} title="ID" />,
  },
  {
    accessorKey: 'location',
    header: ({ column }) => <GenericColumnHeader column={column} title="Location" />,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => <GenericColumnHeader column={column} title="Title" />,
  },
  {
    accessorKey: 'category',
    header: ({ column }) => <GenericColumnHeader column={column} title="Category" />,
  },
  {
    accessorKey: 'tags',
    header: ({ column }) => <GenericColumnHeader column={column} title="Tags" />,
  },
  {
    accessorKey: 'shortdesc',
    header: ({ column }) => <GenericColumnHeader column={column} title="Short Description" />,
  },
  {
    accessorKey: 'format',
    header: ({ column }) => <GenericColumnHeader column={column} title="Format" />,
  },
  {
    accessorKey: 'image',
    header: ({ column }) => <GenericColumnHeader column={column} title="Image" />,
  },
  {
    accessorKey: 'video',
    header: ({ column }) => <GenericColumnHeader column={column} title="Video" />,
  },
  {
    accessorKey: 'postdate',
    header: ({ column }) => <GenericColumnHeader column={column} title="Post Date" />,
  },
  {
    accessorKey: 'views',
    header: ({ column }) => <GenericColumnHeader column={column} title="Views" />,
  },
  {
    accessorKey: 'author',
    header: ({ column }) => <GenericColumnHeader column={column} title="Author" />,
  },
  {
    accessorKey: 'htmldesc',
    header: ({ column }) => <GenericColumnHeader column={column} title="HTML Description" />,
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

const BlogTable = () => {
  const { data, isLoading, error, status } = trpc.getBlog.useQuery();

  if (status === 'error') {
    return <div>{error.message}</div>;
  }

  if (isLoading) return <div>Loading...</div>;

  if (!data && !isLoading) return <div>No Data Found</div>;

  const parsedData = parseBlogDates(data!);

  return <GenericTable columns={blogColumns} data={parsedData} />;
};

export default BlogTable;
