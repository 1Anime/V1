import { DiscussionEmbed } from "disqus-react";

const DisqusComments = ({ post }) => {
  const { asPath } = useRouter();
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const url = `${origin}${asPath}`;
  const { theme } = useTheme();

  return (
    <div>
      <DiscussionEmbed
        shortname="aniwatchcommunity"
        config={{
          url,
          identifier: url,
          title: `${post.title} - Episode ${post.episode}`,
          language: "en_US",
          sso: { name: "1Anime" },
          colorScheme: theme === "dark" ? "dark" : "light",
        }}
        key={theme} // Add this line to handle theme changes
      />
    </div>
  );
};

export default DisqusComments;
