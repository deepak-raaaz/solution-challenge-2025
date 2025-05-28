"use client";
import Personalized from "@/components/pages/generate/personalize/personalize";
import React from "react";
import { useSelector } from "react-redux";


const Page: React.FC = () => {
  const {query} = useSelector((state:any) => state.localStorage); // Retrieve query from Redux store


  return (
    <div>
      {/* <h1>Learning Path</h1> */}
      <Personalized/>
      {/* {query ? (
      ) : (
        <p>No query provided yet.</p>
      )} */}
    </div>
  );
};

export default Page;