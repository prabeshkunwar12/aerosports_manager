import * as z from 'zod'
import { TRPCError } from '@trpc/server';
import { db } from '@/lib/db';
import { privateProcedure, router } from './trpc';
 
export const appRouter = router({

//   getConsumerTasks: privateProcedure.query(({ctx}) =>{
//     const {userId} = ctx
//     return getTasksByConsumerId(userId)
//   }),

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