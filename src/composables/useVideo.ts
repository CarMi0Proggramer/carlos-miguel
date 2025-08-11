import { ref } from "vue";
import { youtubeApiUrl } from "../constants";

export function useVideo(videoId: string) {
	const isLoading = ref(true);
	const error = ref<Error | null>(null);
	const video = ref<VideoWithStatistics | null>(null);

	const params = new URLSearchParams({
		key: import.meta.env.PUBLIC_YOUTUBE_API_KEY,
		id: videoId,
		part: "snippet,statistics",
	});

	fetch(`${youtubeApiUrl}/videos?${params.toString()}`)
		.then((res) => res.json())
		.then((data) => {
			if (data.items.length) {
				video.value = data.items[0];
				return;
			}

			error.value = new Error("Video not found");
		})
		.catch((err) => {
			error.value = err;
		})
		.finally(() => {
			isLoading.value = false;
		});

	return { isLoading, error, video };
}
