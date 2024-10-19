"use client"

import DataForm from '@/components/form/DataForm'
import BlogForm from '@/components/form/BlogForm'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import React, { useState } from 'react'
import BlogReviewsForm from '@/components/form/BlogReviewsForm'
import BirthdayPackagesForm from '@/components/form/BirthdayPackagesForm'
import ConfigForm from '@/components/form/ConfigForm'
import FAQForm from '@/components/form/FAQForm'
import LocationsForm from '@/components/form/LocationsForm'
import PromoForm from '@/components/form/PromoForm'

interface GenericCreateButtonProps {
    form: string
}

const GenericCreateButton = ({ form }: GenericCreateButtonProps) => {
    const [isOpen, setIsOpen] = useState(false)
    form = form.toLowerCase()
    return (
        <Dialog open={isOpen} onOpenChange={(v) => { if (!v) setIsOpen(v) }}>
            <DialogTrigger onClick={() => setIsOpen(true)} asChild>
                <Button className=''>Create</Button>
            </DialogTrigger>

            <DialogContent className='z-50'>
                <DialogTitle className='hidden'>Form</DialogTitle>
                {form === "data" && <DataForm onClose={()=>setIsOpen(false)} />}
                {form === "blog" && <BlogForm />}
                {form === "blog_reviews" && <BlogReviewsForm />}
                {form === "birthdayPackages" && <BirthdayPackagesForm />}
                {form === "config" && <ConfigForm />}
                {form === "faq" && <FAQForm />}
                {form === "location" && <LocationsForm />}
                {form === "promo" && <PromoForm />}
            </DialogContent>
        </Dialog>
    )
}

export default GenericCreateButton
