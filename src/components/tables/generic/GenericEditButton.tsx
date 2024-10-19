"use client"

import DataForm from '@/components/form/DataForm'
import BlogForm from '@/components/form/BlogForm'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import React, { useState } from 'react'
import BlogReviewsForm from '@/components/form/BlogReviewsForm'
import BirthdayPackagesForm from '@/components/form/BirthdayPackagesForm'
import ConfigForm from '@/components/form/ConfigForm'
import FAQForm from '@/components/form/FAQForm'
import LocationsForm from '@/components/form/LocationsForm'
import PromoForm from '@/components/form/PromoForm'

interface GenericEditButtonProps {
    form: string
    id: number
}

const GenericEditButton = ({ form, id }: GenericEditButtonProps) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <Dialog open={isOpen} onOpenChange={(v) => { if (!v) setIsOpen(v) }}>
            <DialogTrigger onClick={() => setIsOpen(true)} asChild>
                <Button variant="ghost" className=' w-full'>Edit</Button>
            </DialogTrigger>

            <DialogContent className='z-50 sm:w-full md:w-[1000px] w-[1000px]'>
                {form === "data" && <DataForm id={id} />}
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

export default GenericEditButton
