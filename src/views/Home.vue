<template>
  <div>
    <Home />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Home from '@/components/HomeComponent.vue'; // @ is an alias to /src

export default defineComponent({
  components: {
    Home,
  },
});
</script>
