type Color = "neutral" | "blue" | "red" | "yellow" | "green";

interface ImportMetaEnv {
  readonly PUBLIC_YOUTUBE_API_KEY: string;
  readonly PUBLIC_YOUTUBE_PLAYLIST_ID: string;
  readonly PUBLIC_YOUTUBE_CHANNEL_ID: string;
}

interface Channel {
  id: string;
  statistics: {
    subscriberCount: string;
  };
}

interface Video {
  title: string;
  description: string;
  publishedAt: string;
  resourceId: {
    videoId: string;
  };
  thumbnails: {
    maxres: {
      url: string;
    };
  };
}

interface VideoWithStatistics {
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    channelTitle: string;
    title: string;
    description: string;
    thumbnails: {
      maxres: {
        url: string;
      };
    };
  };
  statistics: {
    viewCount: string;
    likeCount?: string;
    commentCount?: string;
  };
}
