<template>
  <div class="flex justify-between items-center mb-4">
    <a
      href="/videos"
      class="rounded-md px-4 py-2 bg-neutral-200 inline-flex gap-2 items-center text-neutral-900 dark:text-white font-semibold dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800"
    >
      <svg
        class="size-5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m15 19-7-7 7-7"
        />
      </svg>
      Regresar</a
    >
  </div>
  <template v-if="videoLoading || channelLoading">
    <VideoSkeleton />
    <VideoStatisticsSkeleton />
  </template>
  <template v-else-if="videoError || channelError">
    <ErrorMessage
      message="Error al cargar los datos, por favor, vuelva más tarde."
    />
  </template>
  <template v-else>
    <media-player
      class="w-full aspect-video bg-neutral-800 text-white overflow-hidden rounded-md"
      :title="video!.snippet.title"
      :src="`youtube/${video!.id}`"
      plays-inline
      auto-play
    >
      <media-provider>
        <media-poster
          class="absolute inset-0 block h-full w-full rounded-md opacity-0 transition-opacity data-[visible]:opacity-100 [&>img]:h-full [&>img]:w-full [&>img]:object-cover"
          :src="video!.snippet.thumbnails.maxres.url"
          :alt="video!.snippet.description"
        />
      </media-provider>
      <media-video-layout />
    </media-player>
    <div class="mt-4 flex flex-col gap-4">
      <div class="flex gap-3 items-center">
        <img
          src="/images/me.webp"
          alt="Carlos Miguel"
          class="rounded-full size-12 border-2 border-neutral-400 dark:border-white"
        />
        <div class="flex flex-col">
          <h2 class="text-xl font-bold leading-tight dark:text-white">
            Carlos Miguel
          </h2>
          <p
            class="text-sm font-medium leading-tight text-neutral-600 dark:text-neutral-400"
          >
            {{ channel!.statistics.subscriberCount }} suscriptores
          </p>
        </div>
      </div>
      <div
        class="flex flex-wrap gap-3 font-medium text-neutral-900 dark:text-white"
      >
        <div
          class="rounded-md text-sm bg-neutral-300 dark:bg-neutral-800 inline-flex items-center gap-2 px-4 py-2 transition-transform duration-300 hover:scale-105"
        >
          <svg
            class="size-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-width="2"
              d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
            />
            <path
              stroke="currentColor"
              stroke-width="2"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
          {{ video!.statistics.viewCount }} vistas
        </div>
        <div
          class="rounded-md text-sm bg-neutral-300 dark:bg-neutral-800 inline-flex items-center gap-2 px-4 py-2 transition-transform duration-300 hover:scale-105"
        >
          <svg
            class="size-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z"
            />
          </svg>

          {{ video!.statistics.likeCount ?? "0" }} likes
        </div>
      </div>
      <h2 class="text-xl font-bold dark:text-white">
        {{ video!.snippet.title }}
      </h2>
      <div
        v-html="formattedDescription"
        class="text-base font-medium text-neutral-600 dark:text-neutral-400 flex flex-col gap-2 overflow-hidden [&>a]:underline [&>a]:text-neutral-900 [&>a]:dark:text-neutral-300 [&>code]:overflow-x-auto [&>code]:flex"
      ></div>
    </div>
  </template>
</template>
<script setup lang="ts">
import "vidstack/bundle";
import ErrorMessage from "./ErrorMessage.vue";
import VideoSkeleton from "./VideoSkeleton.vue";
import VideoStatisticsSkeleton from "./VideoStatisticsSkeleton.vue";
import DOMPurify from "dompurify";
import { marked } from "marked";
import { computed } from "vue";
import { useVideo } from "../../composables/useVideo";
import { useChannel } from "../../composables/useChannel";

const props = defineProps<{ videoId: string }>();

const {
  isLoading: videoLoading,
  error: videoError,
  video,
} = useVideo(props.videoId);

const {
  isLoading: channelLoading,
  error: channelError,
  channel,
} = useChannel();

const formattedDescription = computed(() => {
  if (!video.value) return "";

  const text = marked(video.value.snippet.description, { async: false });
  return DOMPurify.sanitize(text);
});
</script>
