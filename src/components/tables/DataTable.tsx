'use client'

import { trpc } from '@/app/_trpc/client'
import React from 'react'

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
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 shadow-md">
            <thead>
                <tr>
                <th className="py-2 px-4 bg-gray-200 text-gray-700 font-bold">ID</th>
                <th className="py-2 px-4 bg-gray-200 text-gray-700 font-bold">Location</th>
                <th className="py-2 px-4 bg-gray-200 text-gray-700 font-bold">Page ID</th>
                <th className="py-2 px-4 bg-gray-200 text-gray-700 font-bold">Is Active</th>
                <th className="py-2 px-4 bg-gray-200 text-gray-700 font-bold">Description</th>
                <th className="py-2 px-4 bg-gray-200 text-gray-700 font-bold">Parent ID</th>
                <th className="py-2 px-4 bg-gray-200 text-gray-700 font-bold">Path</th>
                <th className="py-2 px-4 bg-gray-200 text-gray-700 font-bold">Page Type</th>
                <th className="py-2 px-4 bg-gray-200 text-gray-700 font-bold">Updated At</th>
                </tr>
            </thead>
            <tbody>
                {data?.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-100">
                        <td className="py-2 px-4 border-b">{item.id}</td>
                        <td className="py-2 px-4 border-b">{item.location ?? 'N/A'}</td>
                        <td className="py-2 px-4 border-b">{item.pageid ?? 'N/A'}</td>
                        <td className="py-2 px-4 border-b">{item.isactive ?? 'N/A'}</td>
                        <td className="py-2 px-4 border-b">{item.desc ?? 'N/A'}</td>
                        <td className="py-2 px-4 border-b">{item.parentid ?? 'N/A'}</td>
                        <td className="py-2 px-4 border-b">{item.path ?? 'N/A'}</td>
                        <td className="py-2 px-4 border-b">{item.pagetype ?? 'N/A'}</td>
                        <td className="py-2 px-4 border-b">{new Date(item.updatedAt).toLocaleDateString()}</td>
                    </tr>
                ))}
            </tbody>
            </table>
        </div>
    )
}

export default DataTable
