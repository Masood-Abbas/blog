interface BlogIdPageProps {
  params: Promise<{ blogid: string }>;
}
const BlogId = async ({ params }: BlogIdPageProps) => {
const {blogid}= await params
  return <div>the blog blogid of page == {blogid}</div>;
};

export default BlogId;
