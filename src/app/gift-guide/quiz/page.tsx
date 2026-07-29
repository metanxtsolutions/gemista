import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { StyleQuiz } from "@/components/quiz/style-quiz";

export const metadata: Metadata = {
  title: "Jewellery Style Quiz",
  description: "Answer three quick questions and we'll match you with the perfect Gemista collection.",
  alternates: { canonical: "/gift-guide/quiz" },
};

export default function QuizPage() {
  return (
    <div>
      <PageHeader
        eyebrow="60-Second Quiz"
        title="Find Your Match"
        description="Answer a few quick questions and we'll recommend a collection they'll love."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Gift Guide", href: "/gift-guide" },
          { label: "Style Quiz" },
        ]}
      />
      <div className="container-gem py-14">
        <StyleQuiz />
      </div>
    </div>
  );
}
