<template>
  <form @submit.prevent="createUrl">
    <label>
      URL <input type="text" v-model="urlInput">
    </label>
    <button type="submit">Submit</button>
    <p v-for="url in urls" :key="url.id">
      <router-link :to="`/${url.shortUrl}`">{{ url.shortUrl }}</router-link>
      → {{ url.originalUrl }}
    </p>
  </form>
</template>

<script>
import { URL_QUERY, URL_MUTATION } from '../graphql';
import nanoid from 'nanoid';

export default {
  data() {
    return {
      urlInput: '',
      urls: []
    };
  },
  apollo: {
    urls: {
      query: URL_QUERY
    },
  },
  methods: {
    async createUrl() {
      await this.$apollo.mutate({
        mutation: URL_MUTATION,
        variables: {
          originalUrl: this.urlInput,
          shortUrl: nanoid()
        },
        update: (store, { data: { createURL } }) => {
          const data = store.readQuery({ query: URL_QUERY });
          data.urls.push(createURL);
          store.writeQuery({ query: URL_QUERY, data });
        },
      });
      this.urlInput = '';
    }
  }
};
</script>
