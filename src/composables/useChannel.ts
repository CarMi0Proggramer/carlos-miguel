import { ref } from "vue";
import { youtubeApiUrl } from "../constants";

export function useChannel() {
  const isLoading = ref(true);
  const error = ref<Error | null>(null);
  const channel = ref<Channel | null>(null);

  const params = new URLSearchParams({
    key: import.meta.env.PUBLIC_YOUTUBE_API_KEY,
    id: import.meta.env.PUBLIC_YOUTUBE_CHANNEL_ID,
    part: "statistics",
  });

  fetch(`${youtubeApiUrl}/channels?${params.toString()}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.items.length) {
        channel.value = data.items[0];
        return;
      }

      error.value = new Error("Channel not found");
    })
    .catch((err) => {
      error.value = err;
    })
    .finally(() => {
      isLoading.value = false;
    });

  return { isLoading, error, channel };
}
