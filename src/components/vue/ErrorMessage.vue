<template>
  <div
    class="animate-fade-in bg-gradient-to-r from-rose-100 to-pink-100 dark:from-rose-950/30 dark:to-pink-950/20 p-6 rounded-md shadow-md border border-rose-200 dark:border-rose-950">
    <div class="flex items-start gap-4">
      <div class="bg-rose-500 dark:bg-rose-600 text-white p-3 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <div>
        <h3 class="text-lg font-semibold text-rose-700 dark:text-rose-500">Oops! Algo salió mal</h3>
        <p class="text-rose-600 dark:text-rose-400 mb-2">{{ props.message }}</p>
        <button @click="reloadPage"
          class="mt-3 px-4 py-2 bg-rose-500 hover:bg-rose-600 dark:bg-rose-700 dark:hover:bg-rose-800 text-white rounded-md transition-colors text-sm font-medium">
          Recargar Página
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps<{ message: string }>();

function reloadPage() {
  location.reload();
}
</script>