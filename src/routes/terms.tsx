import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";
import { club } from "@/content/club";
import { termsSections } from "@/content/legal";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () =>
    seo({ title: "Terms of use", path: "/terms", description: `The terms of use for the ${club.name} website.` }),
  component: () => (
    <LegalPage title="Terms of use" intro="The ground rules for using this website." sections={termsSections} />
  ),
});
