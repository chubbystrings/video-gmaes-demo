<template>
  <div class="header">
    <router-link to="/"><h3 class="link-one">video games</h3></router-link>
    <router-link to="/contact"><h3 class="link-two">contact</h3></router-link>
    <Loader v-if="isSearching" />
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import Loader from '@/components/ui/ProgressBarLoadar.vue';
import { useContext } from '@/store'


export default defineComponent({
  components: {
    Loader
  },
  setup() {
    const { state } = useContext();
    const isSearching = computed(() => state.isSearching)


    return { isSearching}
    
  },
});
</script>
<style scoped>
.header {
  display: flex;
  flex-wrap: wrap;
  color: #fff;
  text-transform: uppercase;
  margin-bottom: 30px;
  font-family: "Montserrat", sans-serif;
  margin: 0 auto;
  font-size: 10px;
  padding: 35px 20px;
  box-sizing: border-box;
  font-size: 20px;
  position: relative;
  gap: 20px;
  flex-direction: column;
  width: 100%;
}

.header a.router-link-exact-active,
a.router-link-active {
  color: var(--text);
}

a.router-link-exact-active .link-one::before {
  content: "VIDEO";
  font-size: 50px;
  z-index: -100;
  position: absolute;
  opacity: 0.09;
  top: 10px;
  left: 30px;
}

a.router-link-exact-active .link-two::before {
  content: "Contact";
  z-index: -100;
  position: absolute;
  opacity: 0.09;
  top: 72px;
  left: 30px;
  font-size: 35px;
}

.link-one,
.link-two {
  margin-left: 50px;
}

@media only screen and (min-width: 1024px) {
  .header {
    /* grid-template-columns: 2fr 4fr; */
    gap: 5px;
    justify-content: start;
    text-align: left;
    font-size: 23px;
    box-sizing: border-box;
    flex-direction: row;
  }

  .link-one {
    margin-left: 35px;
  }
  .link-two {
    margin-left: 50px;
  }

  a.router-link-exact-active .link-one::before {
    top: 10px;
    left: 30px;
  }

  a.router-link-exact-active .link-two::before {
    top: 10px;
    left: 290px;
    font-size: 50px;
  }
}

@media only screen and (min-width: 726px) and (max-width: 1023px) {
  .header {
    left: 0;
    right: 0;
    font-size: 20px;
    /* width: 90%; */
    flex-direction: column;
    padding-left: 2px;
    margin: 0;
  }

  a.router-link-exact-active .link-two::before {
    top: 62px;
    left: 30px;
    font-size: 50px;
  }
}

@media only screen and (min-width: 400px) and (max-width: 725px) {
  .header {
    /* width: 355px; */
    /* width: 90%; */
    padding-left: 2px;
    margin: 0;
  }

  a.router-link-exact-active .link-two::before {
    top: 62px;
    left: 30px;
    font-size: 50px;
  }
}

@media only screen and (min-width: 250px) and (max-width: 399px) {
  .header {
    /* width: 250px; */
    /* width: 220px; */
    padding-left: 1px;
    margin: 0;
    /* width: 90%; */
  }

  a.router-link-exact-active .link-two::before {
    top: 72px;
    left: 30px;
    font-size: 35px;
  }
  a.router-link-exact-active .link-one::before {
    font-size: 35px;
  }
}
</style>
