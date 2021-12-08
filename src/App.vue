<template>
<Loader v-if="isLoading" />
  <router-view v-slot="slotProps">
    <div class="container">
      <Header />
      <transition mode="out-in" name="route">
        <component :is="slotProps.Component"></component>
      </transition>
    </div>
  </router-view>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onBeforeUnmount, ref } from "vue";
import Header from "@/components/HeaderComponent.vue";
import Loader from '@/components/ui/Loader.vue';
import { useContext } from '@/store';
import { getScreenType } from '@/store/actions'


export default defineComponent({
  components: {
    Header,
    Loader
  },
  setup() {
    const { state, dispatch } = useContext()

    const isLoading = computed(() => state.loader);
    const isMobile = ref(false);
    const isTablet = ref(false);
    const isLaptop = ref(false);

    const handleResize = (e: Event) => {
        dispatch(getScreenType({
          isMobile: isMobile.value = (e as any).target.innerWidth <= 600,
          isTablet: isTablet.value = (e as any).target.innerWidth > 600 && (e as any).target.innerWidth < 1024,
          isLaptop: isLaptop.value = (e as any).target.innerWidth > 1024
        }))
      }

    onMounted(() => {
      window.addEventListener('resize', (e) => {
        handleResize(e)
        // console.log(isMobile.value)
        // console.log(state.screen.isMobile)
      })
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', handleResize)
    })

    return { isLoading }
  },
});
</script>

<style>


#nav a.router-link-exact-active {
  color: #42b983;
}

.route-enter-from,
.route-leave-to {
  opacity: 0;
}

.route-enter-active,
.route-leave-active {
  transition: all 0.3s ease-out;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
}
.container {
  padding: 0px;
}

@media only screen and (min-width: 1024px) {
  .container {
    padding: 20px 100px;
  }
}


</style>
