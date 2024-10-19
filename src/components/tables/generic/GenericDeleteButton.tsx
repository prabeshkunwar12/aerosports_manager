"use client"

import { trpc } from '@/app/_trpc/client'
import { Button } from '@/components/ui/button' 
// import React, { useState } from 'react'
import { toast } from 'sonner'

interface GenericDeleteButtonProps {
    id: number
    form: string
}

const GenericDeleteButton = ({ id, form }: GenericDeleteButtonProps) => {
    // // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // const [deletedItem, setDeletedItem] = useState<any | null>(null);

    const utils = trpc.useUtils()

    // const { mutate:createItem  } = trpc.createData.useMutation({
    //     onSuccess: () => {
    //         utils.invalidate()
    //         toast("Item Retored!", {
    //             description: "The Item has been successfully restored!"
    //         })
    //         setDeletedItem(null)
    //     },
    //     onError: (err) => {
    //         utils.invalidate()
    //         toast("Item Failed To Retore!", {
    //             description: err.message
    //         })
    //         setDeletedItem(null)
    //     }
    // })

    const { mutate:deleteItem, isPending } = trpc.deleteData.useMutation({
        onSuccess: (data) => {
            if (data) {
                // setDeletedItem(data)
                utils.invalidate()
                toast("Item Deleted!", {
                    description: "Item has been successfully deleted!",
                    // action: {
                    //   label: "Undo",
                    //   onClick: () => createItem(deletedItem)
                    // },
                })
            } else {
                toast("Failed to delete item!", {
                    description: "Try again, task failed due to server problems!",
                    action: {
                      label: "Undo",
                      onClick: () => console.log("Undo"),
                    },
                })
            }
        },
        onError: () => {
            toast("Failed to Delete Item!", {
                description: "Operation failed due to server error",
            })
        },
    })

    const onClick = (event?: React.BaseSyntheticEvent) => {
        event?.preventDefault()
        switch(form){
            case "data": {
                deleteItem({id});
            }
        }
        
    }

    return (
        <Button className='w-full' onClick={onClick} disabled={isPending} variant="ghost">Delete</Button>
    )
}

export default GenericDeleteButton
