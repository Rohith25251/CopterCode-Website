import { useState, useEffect } from "react";
import { client, urlFor } from "../lib/sanity";
import PageHeader from "../components/PageHeader";
import SEO from "../components/SEO";
import { Users, User, ArrowRight } from "lucide-react";


const Administration = () => {
  const [sanityData, setSanityData] = useState(null);

  useEffect(() => {
    const query = `*[_type == "administrationPage"][0]{
      ...,
      cmdImage { asset->{ url } },
      boardMembers[]{
        ...,
        image { asset->{ url } }
      }
    }`;

    client.fetch(query).then((data) => {
      if (data) {
        setSanityData({
          ...data,
          cmdImage: data.cmdImage?.asset?.url,
          boardMembers: data.boardMembers?.map(member => ({
            ...member,
            image: member.image?.asset?.url
          }))
        });
      }
    }).catch(console.error);
  }, []);

  const seoTitle = sanityData?.seo?.metaTitle || "Administration";
  const seoDesc =
    sanityData?.seo?.metaDescription ||
    "CopterCode Administration Team and Board Members";

  const heroTitle = sanityData?.heroTitle || "Administration";
  const heroSubtitle =
    sanityData?.heroSubtitle ||
    "Guided by vision, integrity, and a commitment to excellence.";

  const cmdName = sanityData?.cmdName || "Mr. Karthikeyan Sundharesan";
  const cmdRole = sanityData?.cmdRole || "Chairman & Managing Director";
  const cmdDesc =
    sanityData?.cmdDescription ||
    "Leading CopterCode with a focus on sustainable growth and diversified innovation. Mr. Karthikeyan continues the legacy of our founder by steering the organization towards new heights in technology, manufacturing, and services.";
  const cmdImage = sanityData?.cmdImage;

  const boardHeading = sanityData?.boardHeading || "Board Committee Members";
  const boardMembers = sanityData?.boardMembers || [
    { name: "Mrs. Shanthi Sundharesan", role: "Board Member" },
    { name: "Ms. Karthika Sundharesan", role: "Board Member" },
    { name: "Mr. Venkatesh Janakiraman", role: "Board Member" },
  ];

  const quote =
    sanityData?.quote ||
    '"The organization continues to pursue self-reliant, sustainable growth while honoring the legacy of its founder."';

  return (
    <div className="bg-background min-h-screen text-primary">
      <SEO
        title={sanityData?.seo?.metaTitle || "Administration & Leadership | CopterCode"}
        description={sanityData?.seo?.metaDescription || "Meet the leadership team behind CopterCode. Committed to operational excellence, stronger governance, and driving technological innovation across all sectors."}
        ogTitle="CopterCode Administration - Leading with Vision"
        ogDescription="Our administration is dedicated to integrity and sustainable growth. Learn about our governance structure and the team steering CopterCode towards the future."
        twitterTitle="Leadership at CopterCode"
        twitterDescription="Discover the minds guiding CopterCode's mission to engineer the unknown. Committed to excellence and innovation."
      />
      <PageHeader title={heroTitle} subtitle={heroSubtitle} />

      <section className="pt-10 pb-24">
        <div className="container mx-auto px-6 max-w-6xl">
          {/* CMD Section */}
          <div className="mb-24 text-center">
            {cmdImage ? (
              <div className="inline-block p-1 border border-accent/20 rounded-full bg-accent/5 mb-8 overflow-hidden">
                <img
                  src={cmdImage}
                  alt={cmdName}
                  className="w-48 h-48 object-cover rounded-full"
                />
              </div>
            ) : (
              <div className="inline-block p-4 border border-accent/20 rounded-full bg-accent/5 mb-8">
                <User size={64} className="text-accent" />
              </div>
            )}

            <h2 className="text-4xl font-display font-bold text-primary mb-2">
              {cmdName}
            </h2>
            <p className="text-xl text-accent font-medium tracking-widest uppercase mb-8">
              {cmdRole}
            </p>
            <p className="max-w-3xl mx-auto text-secondary text-lg leading-relaxed">
              {cmdDesc}
            </p>
          </div>

          {/* Board Members */}
          <div className="mb-16">
            <h3 className="text-2xl font-display font-bold text-primary text-center mb-12 flex items-center justify-center">
              <span className="w-12 h-px bg-border mr-4"></span>
              {boardHeading}
              <span className="w-12 h-px bg-border ml-4"></span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {boardMembers.map((member, i) => (
                <div
                  key={i}
                  className="bg-surface p-8 border border-border rounded-xl text-center hover:bg-surface-highlight transition-all duration-300 group shadow-lg"
                >
                  <div className="w-20 h-20 bg-background rounded-full mx-auto mb-6 flex items-center justify-center border border-border group-hover:scale-110 group-hover:border-accent/40 transition-all overflow-hidden">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Users
                        className="text-secondary group-hover:text-accent font-light transition-colors"
                        size={32}
                      />
                    )}
                  </div>
                  <h4 className="text-xl font-bold text-primary group-hover:text-accent mb-2 transition-colors">
                    {member.name}
                  </h4>
                  <p className="text-sm text-secondary uppercase tracking-widest transition-colors">
                    {member.role}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-20">
            <p className="text-secondary italic">{quote}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Administration;
