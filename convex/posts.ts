import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { authComponent } from "./betterAuth/auth";
import { Doc } from "./_generated/dataModel";

// create the blog post data
export const createPost = mutation({
  args: {
    title: v.string(),
    body: v.string(),
    imageStorageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new Error("Unauthorized");
    }
    const blogArticale = await ctx.db.insert("posts", {
      title: args.title,
      body: args.body,
      imageStorageId: args.imageStorageId,
      authorId: user._id,
    });
    return blogArticale;
  },
});

// get the post data
export const getPosts = query({
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db.query("posts").order("desc").collect();
    return await Promise.all(
      posts.map(async (post) => {
        const resolvedImageUrl =
          post.imageStorageId !== undefined
            ? await ctx.storage.getUrl(post.imageStorageId)
            : null;

        return {
          ...post,
          imageUrl: resolvedImageUrl,
        };
      }),
    );
  },
});

// get a single post by id
// export const getPostById = query({
//   args: { id: v.id("posts") },
//   handler: async (ctx, args) => {
//     const post = await ctx.db.get(args.id);
//     if (!post) {
//       return null;
//     }
//     const resolvedImageUrl =
//       post.imageStorageId !== undefined
//         ? await ctx.storage.getUrl(post.imageStorageId)
//         : null;

//     return {
//       ...post,
//       imageUrl: resolvedImageUrl,
//     };
//   },
// });

// generate the image upload url

export const generateImageUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new Error("Unauthorized");
    }
    return await ctx.storage.generateUploadUrl();
  },
});

// get single blog data by id

export const getPostById = query({
  args: {
    postId: v.id("posts"),
  },
  handler: async (ctx, args) => {
    const post = await ctx.db.get(args.postId);
    if (!post) {
      return null;
    }
    const resolvedImageUrl =
      post?.imageStorageId !== undefined
        ? await ctx.storage.getUrl(post.imageStorageId)
        : null;
    return {
      ...post,
      imageUrl: resolvedImageUrl,
    };
  },
});

interface SearchResultsTypes {
  _id: string;
  title: string;
  body: string;
}

export const searchPosts = query({
  args: {
    term: v.string(),
    limit: v.number(),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 10;
    const results: Array<SearchResultsTypes> = [];
    const seen = new Set();

    const pushData = async (docs: Array<Doc<"posts">>) => {
      for (const doc of docs) {
        if (seen.has(doc._id)) continue;
        seen.add(doc._id);
        results.push({
          _id: doc._id,
          title: doc.title,
          body: doc.body,
        });
        if (results.length >= limit) break;
      }
    };

    const titleMatches = await ctx.db
      .query("posts")
      .withSearchIndex("search_title", (q) => q.search("title", args.term))
      .take(limit);

    await pushData(titleMatches);

    if (results.length < limit) {
      const bodyMatches = await ctx.db
        .query("posts")
        .withSearchIndex("search_body", (q) => q.search("body", args.term))
        .take(limit);
        await pushData(bodyMatches)
    }
    return results;
  },
});
