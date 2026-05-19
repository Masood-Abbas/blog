import { Navbar } from "@/components/web/navbar";
import { Suspense } from "react";

const SharedLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Suspense fallback={<div className="h-16 bg-background/80" />}>
        <Navbar />
      </Suspense>
      {children}
    </>
  );
};

export default SharedLayout;
