import { DataSchema } from "@/lib/schema";
import { privateProcedure } from "./trpc";
import { z } from "zod";
import { db } from "@/lib/db";

export const mutations = {
    //route to create data
    createData: privateProcedure.input(DataSchema).mutation(async ({ input }) => {
        const data = await db.data.create({
            data:{
                ...input,
            },
        });
        return data;
    }),

    //route to update data
    updateData: privateProcedure.input(DataSchema).mutation(async ({ input }) => {
        const {id ,...rest} = input;
        const data = await db.data.update({
            data: rest,
            where:{
                id
            }
        });
        return data;
    }),
    
    //route to delete data
    deleteData: privateProcedure.input(z.object({id:z.number()})).mutation(async ({input})=> {
        const { id } = input
    
        const data = await db.data.delete({
            where: {
                id
            }
        })
        return data
    }),
}