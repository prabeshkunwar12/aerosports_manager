import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { db } from "../db"

export const getUserData = async () => {
    try {
        const { getUser } = getKindeServerSession();
        return await getUser();
    } catch {
        return null
    }
}

export const getData = async () => {
    try {
        const data = await db.data.findMany()
        return data
    } catch {
        return null
    }
}

// Get all data from Blog model
export const getBlogData = async () => {
    try {
        const data = await db.blog.findMany();
        return data;
    } catch {
        return null;
    }
};

// Get all data from BlogReviews model
export const getBlogReviewsData = async () => {
    try {
        const data = await db.blogReviews.findMany();
        return data;
    } catch {
        return null;
    }
};

// Get all data from Locations model
export const getLocationsData = async () => {
    try {
        const data = await db.locations.findMany();
        return data;
    } catch {
        return null;
    }
};

// Get all data from Config model
export const getConfigData = async () => {
    try {
        const data = await db.config.findMany();
        return data;
    } catch {
        return null;
    }
};

// Get all data from Promo model
export const getPromoData = async () => {
    try {
        const data = await db.promo.findMany();
        return data;
    } catch {
        return null;
    }
};

// Get all data from BirthdayPackages model
export const getBirthdayPackagesData = async () => {
    try {
        const data = await db.birthdayPackages.findMany();
        return data;
    } catch {
        return null;
    }
};

// Get all data from FAQ model
export const getFAQData = async () => {
    try {
        const data = await db.fAQ.findMany();
        return data;
    } catch {
        return null;
    }
};
