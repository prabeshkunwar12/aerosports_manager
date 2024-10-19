"use client";
import { format } from "date-fns"
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import * as z from "zod";
import { PromoSchema } from "@/lib/schema"; // Define schema for Promo in lib/schema
import { Promo } from "@prisma/client";
import { trpc } from "@/app/_trpc/client";
import { FormError, FormSuccess } from "./info";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";

const PromoForm = ({ id, onClose }: { id?: number; onClose: () => void }) => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [existingData, setExistingData] = useState<Promo | null>(null);

    const { data, isLoading, isError } = trpc.getPromoById.useQuery({ id });

    const utils = trpc.useUtils();

    const form = useForm<z.infer<typeof PromoSchema>>({
        resolver: zodResolver(PromoSchema),
        defaultValues: {
            location: existingData?.location ?? "",
            promo: existingData?.promo ?? "",
            img: existingData?.img ?? "",
            description: existingData?.description ?? "",
            startdate: existingData?.startdate ?? new Date(),
            enddate: existingData?.enddate ?? new Date(),
        },
    });

    useEffect(() => {
        if (data) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { createdAt, updatedAt, startdate, enddate, ...restOfTheData } = data;
            setExistingData({ ...restOfTheData, startdate: new Date(startdate), enddate: new Date(enddate), createdAt: new Date(), updatedAt: new Date() });
            form.reset({...restOfTheData, startdate: new Date(startdate), enddate: new Date(enddate)});
        } else if (isError) {
            setError("Failed to fetch data.");
        }
    }, [data, form, isError]);

    const { mutate: createPromo, isPending: creationPending } = trpc.createPromo.useMutation({
        onSuccess: (data) => {
            if (data) {
                setSuccess("Promo successfully created");
                utils.invalidate();
                onClose();
                toast("Promo successfully Created!");
            } else {
                setError("Promo Creation failed");
            }
            form.reset();
        },
        onError: (error) => {
            setError(error.message);
            console.log(error.message);
            form.reset();
        },
    });

    const { mutate: updatePromo, isPending: updatePending } = trpc.updatePromo.useMutation({
        onSuccess: (data) => {
            if (data) {
                setSuccess("Promo successfully updated");
                utils.invalidate();
                toast("Promo successfully updated");
            } else {
                setError("Promo Update failed");
            }
            form.reset();
        },
        onError: (error) => {
            setError(error.message);
            console.log(error.message);
            form.reset();
        },
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmit = (values:z.infer<typeof PromoSchema>, event?: React.BaseSyntheticEvent) => {
        event?.preventDefault();
        if (id) updatePromo({...values});
        else createPromo({...values});
    };

    if (isLoading) return <Skeleton className="w-[100px] h-[20px] rounded-full" />;

    return (
        <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                <ScrollArea className="space-y-4 h-[70vh]">
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">Location</FormLabel>
                                <FormControl>
                                    <Input {...field} value={field.value ?? ""} placeholder="Location" disabled={creationPending || updatePending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="promo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">Promo</FormLabel>
                                <FormControl>
                                    <Input {...field} value={field.value ?? ""} placeholder="Promo" disabled={creationPending || updatePending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="img"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">Image URL</FormLabel>
                                <FormControl>
                                    <Input {...field} value={field.value ?? ""} placeholder="Image URL" disabled={creationPending || updatePending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">Description</FormLabel>
                                <FormControl>
                                    <Textarea {...field} value={field.value ?? ""} placeholder="Description" disabled={creationPending || updatePending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                      control={form.control}
                      name="startdate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Start Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-[240px] pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date < new Date()
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="enddate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>End Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-[240px] pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date < new Date()
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                </ScrollArea>

                <FormError message={error} />
                <FormSuccess message={success} />
                <Button disabled={creationPending || updatePending} type="submit">
                    {existingData ? "Update" : "Create"}
                </Button>
            </form>
        </Form>
    );
};

export default PromoForm;
