import { Portfolio } from "@/components/portfolio";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sabarna Das",
    url: "https://sabarna.dev",
    jobTitle: "Full-stack developer",
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Institute of Engineering & Management",
    },
    sameAs: ["https://github.com/Sabarna-dev", "https://www.linkedin.com/in/sabarna-das-692b34364"],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Portfolio />
    </main>
  );
}
