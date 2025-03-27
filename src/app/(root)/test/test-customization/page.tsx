import TestCustomization from "@/components/pages/home/TestCustomization";
import { Suspense } from "react";


const TestCustomizationPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TestCustomization />
    </Suspense>
  );
};

export default TestCustomizationPage;