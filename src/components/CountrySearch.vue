<template>
  <input
      type="text"
      v-model="query"
      @input="onInput"
      placeholder="Search for a country..."
      class="w-full p-2 border rounded"
  />
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';

export default defineComponent({
  setup(_, { emit }) {
    const query = ref('');

    const onInput = () => {
      emit('search', query.value);
    };

    return {
      query,
      onInput,
    };
  },
});
</script>
