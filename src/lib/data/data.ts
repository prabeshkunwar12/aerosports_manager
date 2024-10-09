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