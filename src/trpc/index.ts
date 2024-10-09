import * as z from 'zod'
import { TRPCError } from '@trpc/server';
import { db } from '@/lib/db';
import { privateProcedure, publicProcedure, router } from './trpc';
import { getData } from '@/lib/data/data';
 
export const appRouter = router({

    getData: publicProcedure.query(() =>{
        const data = getData();
        if(data) return data
    }),

//   createTask: privateProcedure.input(NewTaskFormSchema).mutation(async ({ctx, input})=> {
//     const { userId } = ctx
//     const { description, subTypeName, location, taskDateTime } = input

//     const typeName = await getTaskBySubTask(subTypeName)

//     if(!typeName) {
//       return null
//     }

//     if(new Date()>new Date(taskDateTime)) {
//       throw new Error('Date and time submitted is before the current date')
//     }

//     const task = await db.task.create({
//       data: {
//         description,
//         typeName,
//         subTypeName,
//         location,
//         status:$Enums.TaskStatus.POSTED,
//         consumerId:userId,
//         taskDateTime:taskDateTime
//       }
//     })
//     return task
//   }),

});

export type AppRouter = typeof appRouter;