<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="relative bg-white p-6 rounded-lg w-3/4 max-w-2xl">
      <button
          class="absolute top-4 right-4 text-gray-700 text-2xl hover:text-gray-900 z-50"
          @click="closeModal"
      >
        ✕
      </button>

      <div class="text-center">
        <img :src="country.flags.png" alt="Flag" class="mx-auto w-32 h-auto mb-4" />
        <h2 class="text-2xl font-semibold mb-4">{{ country.name?.official }}</h2>
      </div>
      <div class="space-y-2">
        <p><strong>Native Name:</strong> {{ country.name.nativeName?.eng?.official || 'N/A' }}</p>
        <p><strong>Alternative Names:</strong> {{ country.altSpellings.join(', ') }}</p>
        <p><strong>2 Char Code:</strong> {{ country.cca2 }}</p>
        <p><strong>3 Char Code:</strong> {{ country.cca3 }}</p>
        <p><strong>Calling Codes:</strong> {{ country.idd?.root }}{{ country.idd?.suffixes?.join(', ') }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    country: {
      type: Object,
      required: true,
    },
  },
  emits: ['close'],
  methods: {
    closeModal() {
      this.$emit('close');
    },
  },
});
</script>
