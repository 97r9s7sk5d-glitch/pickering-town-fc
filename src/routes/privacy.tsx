import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";
import { club } from "@/content/club";
import { privacySections } from "@/content/legal";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () =>
    seo({
      title: "Privacy & cookies",
      path: "/privacy",
      description: `How ${club.name} handles personal information and cookies on this website.`,
    }),
  component: () => (
    <LegalPage
      title="Privacy & cookies"
      intro="What information this website collects, why, and the choices you have."
      sections={privacySections}
    />
  ),
});
