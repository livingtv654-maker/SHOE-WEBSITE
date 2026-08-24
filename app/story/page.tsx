import type { Metadata } from "next";
import StoryPage from "@/components/StoryPage";

export const metadata: Metadata = {
  title: "Our Story — RED",
  description: "How RED was born. Engineered for the fearless.",
};

export default function Story() {
  return <StoryPage />;
}
