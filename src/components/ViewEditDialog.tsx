import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'

interface ViewEditDialogProps {
    value: string
}

const ViewEditDialog = ({value}:ViewEditDialogProps) => {
    if(!value) return null
    return (
        <Dialog>
            <DialogTrigger>{value.length>15 ? (value.substring(0,15) + " ..."):(value)}</DialogTrigger>
            <DialogContent>
            <DialogHeader>
                <DialogTitle>value</DialogTitle>
                <DialogDescription>
                    {value}
                </DialogDescription>
            </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default ViewEditDialog
