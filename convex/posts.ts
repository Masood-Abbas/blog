import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { authComponent } from "./betterAuth/auth";

export const createPost = mutation({
  args: { title: v.string(), body: v.string(), image: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new Error("Unauthorized");
    }
    const blogArticale = await ctx.db.insert("posts", {
      title: args.title,
      body: args.body,
    //   image: args.image,
      authorId: user._id,
    });
    return blogArticale;
  },
});

export const getPosts = query({
    args:{},
    handler: async(ctx)=>{
        const posts = await ctx.db.query("posts").order("desc").collect()
        return posts;
    }
})
