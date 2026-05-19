import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { fetchQuery } from "convex/nextjs";
import { Metadata } from "next";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { PostContent } from "./PostContent";

interface PostIdRouteProps {
  params: Promise<{
    postId: Id<"posts">;
  }>;
}

//  meta data
export async function generateMetadata({
  params,
}: PostIdRouteProps): Promise<Metadata> {
  const { postId } = await params;
  const post = await fetchQuery(api.posts.getPostById, { postId: postId });
  if (!post) {
    return {
      title: "post not found",
    };
  }
  return {
    title: post.title,
    description: post.body.slice(0, 149) + "...",
  };
}

function PostLoadingSkeleton() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-4">
      <Skeleton className="h-10 w-32" />
      <Skeleton className="h-64 w-full rounded-xl" />
      <Skeleton className="h-12 w-3/4" />
      <Skeleton className="h-6 w-1/2" />
      <Skeleton className="h-40 w-full" />
    </div>
  );
}

// main function
const PostIdRoute = ({ params }: PostIdRouteProps) => {
  return (
    <Suspense fallback={<PostLoadingSkeleton />}>
      <PostContent params={params} />
    </Suspense>
  );
};

export default PostIdRoute;
