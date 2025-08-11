import { ref } from "vue";
import { youtubeApiUrl } from "../constants";

export function useVideos() {
	const isLoading = ref(true);
	const error = ref<Error | null>(null);
	const videos = ref<Video[]>([]);

	const params = new URLSearchParams({
		key: import.meta.env.PUBLIC_YOUTUBE_API_KEY,
		playlistId: import.meta.env.PUBLIC_YOUTUBE_PLAYLIST_ID,
		part: "snippet",
	});

	fetch(`${youtubeApiUrl}/playlistItems?${params.toString()}`)
		.then((res) => res.json())
		.then((data) => {
			videos.value = data.items.map((item: { snippet: Video }) => item.snippet);
		})
		.catch((err) => {
			error.value = err;
		})
		.finally(() => {
			isLoading.value = false;
		});

	return { isLoading, error, videos };
}
