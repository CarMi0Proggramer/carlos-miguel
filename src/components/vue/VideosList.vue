<template>
  <ul class="mt-6 flex flex-col gap-4 mb-12">
    <template v-if="isLoading">
      <VideoSkeleton />
      <VideoSkeleton />
      <VideoSkeleton />
      <VideoSkeleton />
      <VideoSkeleton />
    </template>
    <template v-else-if="error">
      <ErrorMessage
        :message="translations?.errorMessages.videosMessage ?? ''"
      />
    </template>
    <template v-else>
      <li v-for="(video, index) in videos" :key="index">
        <article
          class="group relative overflow-hidden rounded-md transition hover:contrast-110 before:left-1/2 before:bottom-0 before:-translate-x-1/2 before:size-full before:bg-neutral-900 before:absolute before:translate-y-full hover:before:translate-y-1/2 before:-z-10 before:transition before:duration-200 before:mask-t-from-70% has-focus-visible:outline-none has-focus-visible:contrast-110 has-focus-visible:before:translate-y-1/2 h-full"
        >
          <a
            class="rounded-md aspect-video flex flex-col"
            :href="`/${lang}/videos/${video.resourceId.videoId}`"
          >
            <div
              v-if="isRecentVideo(video.publishedAt)"
              class="absolute top-4 right-4 py-1 px-3 inline-flex gap-2 items-center rounded-full bg-neutral-900/50 border border-yellow-400 text-yellow-400 text-sm transition group-hover:opacity-0 group-hover:-translate-y-1 group-has-focus-visible:opacity-0 group-has-focus-visible:-translate-y-1"
            >
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                ></path>
              </svg>
              {{translations?.videos.newVideoButtonText}}
            </div>
            <div
              class="opacity-100 flex transition flex-col gap-2 flex-1"
            ></div>
            <img
              loading="lazy"
              class="absolute inset-0 -z-20 transform-gpu"
              :src="video.thumbnails.maxres.url"
              :alt="video.title"
            />
            <div
              class="flex flex-col items-start gap-2 transition translate-y-1 opacity-0 duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-has-focus-visible:opacity-100 group-has-focus-visible:translate-y-0 px-4 mb-3"
            >
              <h2 class="font-semibold text-base text-pretty text-white">
                {{ video.title }}
              </h2>
              <button
                class="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm px-4 py-2 rounded-lg shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  class="size-4"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                {{ translations?.videos.watchNowButtonText }}
              </button>
            </div>
          </a>
        </article>
      </li>
    </template>
  </ul>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { isRecentVideo } from "../../assets/ts/videos";
import { useVideos } from "../../composables/useVideos";
import { useTranslations, getLangFromUrl } from "../../i18n/utils";
import ErrorMessage from "./ErrorMessage.vue";
import VideoSkeleton from "./VideoSkeleton.vue";

const { isLoading, error, videos } = useVideos();
const lang = ref<ReturnType<typeof getLangFromUrl>>("es");
const translations = ref<ReturnType<typeof useTranslations>>();

onMounted(() => {
  const currentUrl = new URL(window.location.href);

  lang.value = getLangFromUrl(currentUrl);
  translations.value = useTranslations(lang.value);
});
</script>
