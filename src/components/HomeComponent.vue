<template>
  <div class="content-body">
    <FilterCard />
    <div>
      <transition name="fade">
        <h2 v-if="searchIsEmpty">Oops No Result Found :)</h2>
      </transition>
      <transition-group
        name="list"
        tag="div"
        class="info-card-wrapper"
        v-if="!searchIsEmpty"
      >
        <InfoCard v-for="game in paginatedGames" :key="game.id" :game="game" />
      </transition-group>
    </div>
    <div
      class="btn-wrapper"
      v-if="paginatedGames.length >= 10 && !searchIsEmpty"
    >
      <button :disabled="!prev" @click="prevPage">Prev</button>
      <button :disabled="!next" @click="nextPage">Next</button>
      <div>
        <p>Page {{ page }} of {{ pages }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, ComputedRef, watch } from "vue";
import { useContext } from "@/store";
import FilterCard from "@/components/Card/FilterCard.vue";
import InfoCard from "@/components/Card/InfoCard.vue";
import { loadGames } from "@/store/actions";

export default defineComponent({
  components: {
    FilterCard,
    InfoCard,
  },
  setup() {
    const page = ref(1);
    const numberPerPage = ref(10);
    const { state, dispatch } = useContext();

    if (state.games.length === 0) {
      dispatch(loadGames());
    }

    const games = computed(() => state.games);
    const filteredGames = computed(() => state.searchedGames);
    const searchIsEmpty = computed(() => state.searchIsEmpty);

    const nextPage = () => page.value++;
    const prevPage = () => page.value--;

    const pages: ComputedRef<number> = computed(() =>
      Math.ceil(
        games.value.length > 0 ? games.value.length / numberPerPage.value : 1
      )
    );
    const paginatedGames = computed(() => {
      if (filteredGames.value.length > 0) {
        const start = (page.value - 1) * numberPerPage.value;
        const stop = page.value * numberPerPage.value;
        return filteredGames.value.length
          ? filteredGames.value.slice(start, stop)
          : [];
      }
      const start = (page.value - 1) * numberPerPage.value;
      const stop = page.value * numberPerPage.value;
      return games.value.length ? games.value.slice(start, stop) : [];
    });

    const prev = computed(() => page.value !== 1);
    const next = computed(() => pages.value > 1 && page.value < pages.value);

    watch(pages, () => {
      window.scrollTo(0, 0);
    });

    return {
      state,
      games,
      paginatedGames,
      prev,
      next,
      nextPage,
      prevPage,
      pages,
      page,
      searchIsEmpty,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list-enter-active,
.list-leave-active,
.list-move {
  transition: 500ms cubic(0.64, 0.26, 0.08, 0.03);
  transition-property: opacity, transform;
}

.list-enter-active {
  opacity: 0;
  transform: translateY(50px) scaleY(0.5);
}

.list-enter-to {
  opacity: 1;
  transform: translateX(0) scaleY(1);
}

.list-leave-active {
  position: absolute;
  opacity: 0;
}

/* .fade-enter-from {
  opacity: 0;
} */
.fade-enter-from,
.route-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease-out;
}

.fade-leave-active {
  position: absolute;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
.info-card-wrapper {
  /* display: flex;
  flex-direction: column; */
  display: grid;
  row-gap: 20px;
  position: relative;
  height: 90vh;
  margin-bottom: 50px;
  overflow-x: scroll;
  grid-template-rows: repeat(10, 1fr);
}
.content-body {
  /* display: grid;
  justify-content: center; */
  margin: 10px auto;
  position: relative;
  box-sizing: border-box;
  padding: 10px;
  row-gap: 20px;
}

.page-info-text {
  position: absolute;
  bottom: 70px;
  left: 50%;
  width: 125px;
}

.page-info-text p {
  text-align: center;
}

.btn-wrapper {
  position: absolute;
  bottom: 5px;
  left: 15px;
  display: flex;
  gap: 10px;
  align-items: center;
}

.btn-wrapper button {
  cursor: pointer;
  background: var(--button);
  color: var(--text);
  width: 60px;
  height: 40px;
  background-color: var(--button);
  border: none;
  cursor: pointer;
  outline: none;
  transition: 0.6s;
}

.btn-wrapper button:disabled {
  cursor: not-allowed;
  background: var(--text);
}

@media only screen and (min-width: 1024px) {
  .content-body {
    display: grid;
    grid-template-columns: 0.5fr 3fr;
    grid-gap: 20px;
    margin-top: 10px;
    padding: 0px;
  }
  .btn-wrapper {
    left: 50%;
  }
}

@media only screen and (min-width: 726px) and (max-width: 1023px) {
  .content-body {
    display: grid;
    margin-top: 10px;
    grid-template-columns: 1fr;
    justify-items: center;
    row-gap: 20px;
  }

  .btn-wrapper {
    left: calc(50% - 50px);
  }
}
</style>
