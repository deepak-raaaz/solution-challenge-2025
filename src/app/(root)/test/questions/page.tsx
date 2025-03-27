import { Suspense } from "react";
import QuestionsPage from "@/components/pages/home/QuestionPage";
const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QuestionsPage />
    </Suspense>
  );
};

export default page;