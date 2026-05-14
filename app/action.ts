"use server";

import z from "zod";
import { postSchema } from "./schema/blog";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api"; 
import { redirect } from "next/navigation";
import { getToken } from "@/lib/auth-server";

export async function createBlogAction (values: z.infer<typeof postSchema>){
    const parsed = postSchema.safeParse(values)
    if(!parsed.success){
        throw new Error("something went wrong")
    }
    const token = await getToken()
    console.log(values)
    await fetchMutation(api.posts.createPost,{
        title:parsed.data.title,
        body:parsed.data.content,
        // image:parsed.data.image
    },{
        token
    })

    return redirect("/")
}