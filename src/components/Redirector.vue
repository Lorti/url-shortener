<template>
  <div>Redirecting to {{ originalUrl }} …</div>
</template>

<script>
import { URL_QUERY } from '../graphql';

export default {
  name: 'redirector',
  props: ['url'],
  data() {
    return {
      urls: [],
      originalUrl: ''
    };
  },
  apollo: {
    myUrls: {
      query: URL_QUERY,
      result({ data: { urls } }) {
        const url = urls.find(x => x.shortUrl === this.url);
        if (url) {
          let originalUrl = url.originalUrl;
          if (url.originalUrl.indexOf('https') !== 0) {
            originalUrl = `https://${url.originalUrl}`;
          }
          this.originalUrl = originalUrl;
          window.location = originalUrl;
        } else {
          this.$router.push('/');
        }
      }
    },
  },
};
</script>
