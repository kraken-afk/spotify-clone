import { useRef, type ReactElement } from "react";
import { Link } from "~/routes";
import ResponsiveSwiper from "~/components/ui/ResponseiveSwiper";
import Card from "~/components/ui/Card";
import Section from "~/components/ui/Section";
import no_cover from "~/assets/no-cover.png";

interface PlaylistSectionProps {
  title: string;
  playlist: PlaylistItem[];
  className?: string;
}

export default function PlaylistSection({
  playlist,
  title,
  className
}: PlaylistSectionProps): ReactElement {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <Section ref={containerRef} className={className}>
      <h2 className="sub-title">{title}</h2>
      <ResponsiveSwiper isLoading={false} containerRef={containerRef}>
        {playlist.map((item) => (
          <Link key={item.id} to={`/playlist/${item.id}`}>
            <Card
              coverImage={item.images[0]?.url ?? no_cover}
              title={item.name}
              description={item.description}
            />
          </Link>
        ))}
      </ResponsiveSwiper>
    </Section>
  );
}
