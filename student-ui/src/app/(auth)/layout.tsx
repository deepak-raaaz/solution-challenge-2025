"use client";
import Loader from "@/components/shared/loader";
import React, { Suspense } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {

    return (
        <Suspense fallback={<Loader/>}>
            {children}
        </Suspense>
    );
};

export default Layout;
