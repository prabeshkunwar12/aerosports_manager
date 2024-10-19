import { publicProcedure } from "./trpc";
import { getBirthdayPackagesData, getBlogData, getBlogReviewsData, getConfigData, getData, getDataById, getDataWithLocation, getDataWithLocationAndPage, getFAQData, getLocationsData, getPromoData } from '@/lib/data/data';
import * as z from 'zod'

export const queries = {
    // Route for getting data from the Data model
    getData: publicProcedure.query(async () => {
        const data = await getData();
        if (data) return data;
        throw new Error('Failed to fetch data');
    }),

    getDataById: publicProcedure
    .input(z.object({ id: z.number().optional() }))
    .query(async ({ input }) => {
        if(input.id) {
            const data = await getDataById(input.id);
            if (data) return data;
        }
        return null;
    }),

    // Route for getting data from the Blog model
    getBlog: publicProcedure.query(async () => {
        const data = await getBlogData();
        if (data) return data;
        throw new Error('Failed to fetch blog');
    }),

    // Route for getting data from the BlogReviews model
    getBlogReviews: publicProcedure.query(async () => {
        const data = await getBlogReviewsData();
        if (data) return data;
        throw new Error('Failed to fetch blog reviews');
    }),

    // Route for getting data from the Locations model
    getLocations: publicProcedure.query(async () => {
        const data = await getLocationsData();
        if (data) return data;
        throw new Error('Failed to fetch locations');
    }),

    // Route for getting data from the Config model
    getConfig: publicProcedure.query(async () => {
        const data = await getConfigData();
        if (data) return data;
        throw new Error('Failed to fetch config');
    }),

    // Route for getting data from the Promo model
    getPromo: publicProcedure.query(async () => {
        const data = await getPromoData();
        if (data) return data;
        throw new Error('Failed to fetch promo');
    }),

    // Route for getting data from the BirthdayPackages model
    getBirthdayPackages: publicProcedure.query(async () => {
        const data = await getBirthdayPackagesData();
        if (data) return data;
        throw new Error('Failed to fetch birthday packages');
    }),

    // Route for getting data from the FAQ model
    getFAQ: publicProcedure.query(async () => {
        const data = await getFAQData();
        if (data) return data;
        throw new Error('Failed to fetch FAQ');
    }),

    // Define the tRPC procedure
    fetchMenuData: publicProcedure
    .input(z.object({ location: z.string().optional() })) // Optional 'location' input
    .query(async ({ input }) => {
        const data = await getDataWithLocation(input.location);
        // Create an object to hold the hierarchy
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const hierarchy: Record<string, any> = {};
        if (data){
            console.log(data.length)
            data.forEach(item => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { section1, section2, ruleno, ruleyes, ...restOfItem} = item
                hierarchy[item.path!.toLowerCase().trim()] = {...restOfItem, children: []}
            })
            data.forEach(item => {
                if (item.parentid && hierarchy[item.parentid.toLowerCase().trim()]) {
                    hierarchy[item.parentid.toLowerCase().trim()].children.push(hierarchy[item.path!.toLowerCase().trim()]);
                }
            });
            // Extract the root nodes
            const result = Object.values(hierarchy).filter(item => !item.parentid || !hierarchy[item.parentid]);
            return result;
        };
        throw new Error("Failed to fetch menu data");
    }),

    fetchMenuData1: publicProcedure
    .input(z.object({ location: z.string().optional() })) // Optional 'location' input
    .query(async ({ input }) => {
        const data = await getDataWithLocation(input.location);
        // Create an object to hold the hierarchy
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const hierarchy: Record<string, any> = {};
        if (data){
            data.forEach(item => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { section1, section2, ruleno, ruleyes, ...restOfItem} = item
                hierarchy[item.path!] = {...restOfItem, children: []}
            })
            data.forEach(item => {
                if (item.parentid && hierarchy[item.parentid]) {
                    hierarchy[item.parentid].children.push(hierarchy[item.path!]);
                }
            });
            // Extract the root nodes
            const result = Object.values(hierarchy).filter(item => !item.parentid || !hierarchy[item.parentid]);

            return result;
        };
        throw new Error("Failed to fetch menu data");
    }),

    fetchPageData: publicProcedure
    .input(z.object({ 
        location: z.string().optional(), 
        page: z.string().optional(), 
    })) 
    .query(async ({ input }) => {
        if(!input.page) return await getDataWithLocation(input.location)
        const data = await getDataWithLocationAndPage({page:input.page, location:input.location})
        if(data) {
            return data
        }
        throw new Error("Failed to fetch menu data");
    }),
}