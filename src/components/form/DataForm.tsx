"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader } from "../ui/card";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import * as z from "zod";
import { DataSchema } from "@/lib/schema";
import { Data } from "@prisma/client";
import { trpc } from "@/app/_trpc/client";
import { FormError, FormSuccess } from "./info";

const DataForm = ({ existingData }:{existingData:Data}) => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const form = useForm<z.infer<typeof DataSchema>>({
        resolver: zodResolver(DataSchema),
        defaultValues: {
            location: existingData?.location ?? "",
            pageid: existingData?.pageid ?? "",
            isactive: existingData?.isactive ?? null,
            desc: existingData?.desc ?? "",
            parentid: existingData?.parentid ?? "",
            path: existingData?.path ?? "",
            pagetype: existingData?.pagetype ?? "",
            title: existingData?.title ?? "",
            metatitle: existingData?.metatitle ?? "",
            metadescription: existingData?.metadescription ?? "",
            seosection: existingData?.seosection ?? "",
            icon: existingData?.icon ?? "",
            booknowurl: existingData?.booknowurl ?? "",
            video: existingData?.video ?? "",
            smallimage: existingData?.smallimage ?? "",
            smalltext: existingData?.smalltext ?? "",
            headerimage: existingData?.headerimage ?? "",
            imageTitle: existingData?.imageTitle ?? "",
            section1: existingData?.section1 ?? "",
            sectionImage: existingData?.sectionImage ?? "",
            section2: existingData?.section2 ?? "",
            section2Image: existingData?.section2Image ?? "",
            Seoheader: existingData?.Seoheader ?? "",
            ruleyes: existingData?.ruleyes ?? "",
            ruleno: existingData?.ruleno ?? "",
            warnings: existingData?.warnings ?? "",
            booknowlink: existingData?.booknowlink ?? "",
        }
    });

    const { mutate:createOrUpdateData, isPending } = trpc.createOrUpdateData.useMutation({
        onSuccess: (task) => {
            if(task) {
                setSuccess("Task successfully created")
            }
            else setError("Task Type Not Found")
            form.reset()
        },
        onError: (error) => {
            setError(error.message)
            console.log(error.message)
            form.reset()
        }
    })

    const onSubmit = (values: z.infer<typeof DataSchema>, event?: React.BaseSyntheticEvent) => {
        event?.preventDefault()
        createOrUpdateData(values)
    };

    return (
        <Card className="mx-auto mt-20 w-[600px] max-w-7xl md:p-10 bg-white/50">
            <CardHeader>
                <h2 className="text-lg font-semibold">{existingData ? "Edit Data" : "Create New Data"}</h2>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                            {/* Example of multiple fields. Adjust according to your needs. */}
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-md">Title</FormLabel>
                                        <FormControl>
                                            <Input 
                                                {...field} 
                                                value={field.value ?? ""}
                                                placeholder="Title" 
                                                disabled={isPending} 
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="metadescription"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-md">Meta Description</FormLabel>
                                        <FormControl>
                                            <Textarea 
                                                {...field} 
                                                value={field.value ?? ""}
                                                placeholder="Meta Description" 
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="booknowurl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-md">Book Now URL</FormLabel>
                                        <FormControl>
                                            <Input 
                                                {...field} 
                                                value={field.value ?? ""}
                                                placeholder="Book Now URL" 
                                                disabled={isPending} 
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="isactive"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-md">Is Active</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                value={field.value ?? ""}
                                                type="number"
                                                placeholder="1 for active, 0 for inactive"
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Add more fields similar to the ones above */}

                        </div>

                        <FormError message={error} />
                        <FormSuccess message={success} />
                        <Button disabled={isPending} type="submit">
                            {existingData ? "Update" : "Create"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default DataForm;
