import { DataSchema } from '@/lib/schema';
import { privateProcedure, router } from './trpc';
import { getBirthdayPackagesData, getBlogData, getBlogReviewsData, getConfigData, getData, getFAQData, getLocationsData, getPromoData } from '@/lib/data/data';
import { db } from '@/lib/db';
import { z } from 'zod';
 
export const appRouter = router({

    // Route for getting data from the Data model
    getData: privateProcedure.query(async () => {
        const data = await getData();
        if (data) return data;
        throw new Error('Failed to fetch data');
    }),

    // Route for getting data from the Blog model
    getBlog: privateProcedure.query(async () => {
        const data = await getBlogData();
        if (data) return data;
        throw new Error('Failed to fetch blog');
    }),

    // Route for getting data from the BlogReviews model
    getBlogReviews: privateProcedure.query(async () => {
        const data = await getBlogReviewsData();
        if (data) return data;
        throw new Error('Failed to fetch blog reviews');
    }),

    // Route for getting data from the Locations model
    getLocations: privateProcedure.query(async () => {
        const data = await getLocationsData();
        if (data) return data;
        throw new Error('Failed to fetch locations');
    }),

    // Route for getting data from the Config model
    getConfig: privateProcedure.query(async () => {
        const data = await getConfigData();
        if (data) return data;
        throw new Error('Failed to fetch config');
    }),

    // Route for getting data from the Promo model
    getPromo: privateProcedure.query(async () => {
        const data = await getPromoData();
        if (data) return data;
        throw new Error('Failed to fetch promo');
    }),

    // Route for getting data from the BirthdayPackages model
    getBirthdayPackages: privateProcedure.query(async () => {
        const data = await getBirthdayPackagesData();
        if (data) return data;
        throw new Error('Failed to fetch birthday packages');
    }),

    // Route for getting data from the FAQ model
    getFAQ: privateProcedure.query(async () => {
        const data = await getFAQData();
        if (data) return data;
        throw new Error('Failed to fetch FAQ');
    }),

    //route to create data
    createOrUpdateData: privateProcedure.input(DataSchema).mutation(async ({ input }) => {
        const {id ,...rest} = input;
        if(id){
            const data = await db.data.update({
                data: rest,
                where:{
                    id
                }
            });
            return data;
        }
    
        const data = await db.data.create({
            data: rest,
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
});

export type AppRouter = typeof appRouter;