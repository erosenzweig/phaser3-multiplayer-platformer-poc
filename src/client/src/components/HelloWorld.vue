<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>


<template>
  <div class="flex flex-grow justify-center items-center bg-gray-100 h-screen">
    <div class="d-pad flex p-2">
      <div class="d-pad flex justify-center items-center">
        <!-- Left Arrow -->
        <div class="w-11  overflow-hidden inline-block">
          <div class="h-16  bg-black -rotate-45 transform origin-top-right"></div>
        </div>
      </div>
      <div class="d-pad flex flex-col justify-center items-center p-5">
        <!-- Up Arrow -->
        <div class="w-16 overflow-hidden inline-block">
          <div class="h-11 w-11 bg-black rotate-45 transform origin-bottom-left"></div>
        </div>
        <div class="p-12"></div>
        <!-- Down Arrow -->
        <div class="w-16 overflow-hidden inline-block">
          <div class="h-11 w-11 bg-black -rotate-45 transform origin-top-left"></div>
        </div>
      </div>
      <div class="d-pad flex justify-center items-center">
        <div class="w-11  overflow-hidden inline-block">
          <div class="h-16  bg-black rotate-45 transform origin-top-left"></div>
        </div>
      </div>
    </div>
    <div class="buttons flex bg-gray-100 space-x-8 p-6">
      <div class="flex flex-col justify-center items-center items-stretch space-y-8 sm:space-y-4 w-24">
        <div class="button-x justify-center items-center items-stretch">
          <div class="bg-indigo-800 text-white font-bold rounded-lg border shadow-lg p-3">X</div>
        </div>
        <div class="button-a justify-center items-center">
          <div class="bg-indigo-800 text-white font-bold rounded-lg border shadow-lg p-3">A</div>
        </div>
      </div>
      <div class="flex flex-col justify-center items-center items-stretch space-y-8 sm:space-y-4 w-24">
        <div class="button-y justify-center items-center">
          <div class="bg-indigo-800 text-white font-bold rounded-lg border shadow-lg p-3">Y</div>
        </div>
        <div class="button-b justify-center items-center">
          <div class="bg-indigo-800 text-white font-bold rounded-lg border shadow-lg p-3">B</div>
        </div>
      </div>
    </div>
  </div>
</template>