"use client";
import Personalized from "@/components/pages/generate/personalize/personalize";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";


const Page: React.FC = () => {
  const { query } = useSelector((state: any) => state.localStorage); // Retrieve query from Redux store

  const router = useRouter();

  useEffect(() => {
    if (!query) {
      router.push("/generate"); 
    }
  }, [query, router]);

  return (
    <div>
      {query ? (
        <Personalized />
      ) : (
        <p>Redirecting to /generate.</p>
      )}
    </div>
  );
};

export default Page;