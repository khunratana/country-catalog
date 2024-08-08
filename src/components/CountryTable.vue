<template>
  <div class="p-4">
    <CountrySearch @search="onSearch" />
    <table class="min-w-full mt-4 bg-white shadow-md rounded-lg overflow-hidden">
      <thead>
      <tr class="bg-gray-200 text-gray-700">
        <th class="py-2 px-4 text-left cursor-pointer" @click="sortBy('name.official')">Country Name</th>
        <th class="py-2 px-4 text-left">Flag</th>
        <th class="py-2 px-4 text-left">2 Char Code</th>
        <th class="py-2 px-4 text-left">3 Char Code</th>
        <th class="py-2 px-4 text-left">Native Name</th>
        <th class="py-2 px-4 text-left">Alternative Names</th>
        <th class="py-2 px-4 text-left">Calling Codes</th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="country in paginatedCountries"
          :key="country.cca3"
          @click="selectCountry(country)"
          class="border-t hover:bg-gray-100 cursor-pointer"
      >
        <td class="py-2 px-4">{{ country.name.official }}</td>
        <td class="py-2 px-4">
          <img :src="country.flags.png" alt="Flag" class="w-8 h-auto" />
        </td>
        <td class="py-2 px-4">{{ country.cca2 }}</td>
        <td class="py-2 px-4">{{ country.cca3 }}</td>
        <td class="py-2 px-4">
          {{ country.name.nativeName?.eng?.official || 'N/A' }}
        </td>
        <td class="py-2 px-4">{{ country.altSpellings.join(', ') }}</td>
        <td class="py-2 px-4">{{ country.idd?.root }}{{ country.idd?.suffixes?.join(', ') }}</td>
      </tr>
      </tbody>
    </table>

    <Pagination
        :currentPage="currentPage"
        :totalPages="totalPages"
        @update:currentPage="updateCurrentPage"
    />

    <CountryModal
        v-if="selectedCountry"
        :country="selectedCountry"
        @close="selectedCountry = null"
    />
  </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent, onMounted } from 'vue';
import { fetchCountries } from '@/api/data-fetching';
import CountrySearch from './CountrySearch.vue';
import CountryModal from './CountryModal.vue';
import Pagination from './Pagination.vue';

export default defineComponent({
  components: {
    CountrySearch,
    CountryModal,
    Pagination,
  },
  setup() {
    const countries = ref<any[]>([]);
    const searchQuery = ref('');
    const currentPage = ref(1);
    const itemsPerPage = 25;
    const selectedCountry = ref<any | null>(null);
    const sortKey = ref('name.official');
    const sortOrder = ref('asc');

    onMounted(() => {
      fetchCountries().then((data) => {
        countries.value = data;
      });
    });

    const filteredCountries = computed(() => {
      return countries.value.filter((country) =>
          country.name.official.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    const sortedCountries = computed(() => {
      return filteredCountries.value.sort((a, b) => {
        const keyA = a[sortKey.value];
        const keyB = b[sortKey.value];
        if (keyA < keyB) return sortOrder.value === 'asc' ? -1 : 1;
        if (keyA > keyB) return sortOrder.value === 'asc' ? 1 : -1;
        return 0;
      });
    });

    const totalPages = computed(() => Math.ceil(sortedCountries.value.length / itemsPerPage));

    const paginatedCountries = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return sortedCountries.value.slice(start, end);
    });

    const onSearch = (query: string) => {
      searchQuery.value = query;
      currentPage.value = 1;
    };

    const selectCountry = (country: any) => {
      selectedCountry.value = country;
    };

    const sortBy = (key: string) => {
      if (sortKey.value === key) {
        sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
      } else {
        sortKey.value = key;
        sortOrder.value = 'asc';
      }
    };

    const updateCurrentPage = (page: number) => {
      currentPage.value = page;
    };

    return {
      searchQuery,
      currentPage,
      paginatedCountries,
      selectedCountry,
      totalPages,
      onSearch,
      selectCountry,
      sortBy,
      updateCurrentPage,
    };
  },
});
</script>
