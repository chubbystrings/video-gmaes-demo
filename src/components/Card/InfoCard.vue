<template>
  <div class="info-card">
    <div class="dark-side"></div>
    <div class="info-card-content">
      <div class="info-card-content-title">
        <h3>{{ name }}</h3>
        <small>{{ convertedDate }}</small>
      </div>
      <div class="info-card-content-main">
        <p>
          {{ truncatedSummary }}
        </p>
      </div>
    </div>
    <div class="info-card-badge">{{ RoundedRating }}</div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, watch } from "vue";
import { GAMES } from "@/store";
import { format } from "date-fns";
import { useContext } from "@/store";

export default defineComponent({
  props: {
    game: {
      type: Object as PropType<GAMES>,
      required: true,
    },
  },
  setup(props) {
    const { name, first_release_date, rating, summary } = props.game;
    const { state } = useContext();

    const RoundedRating = computed(() => (rating ? Math.round(rating) : 0));
    const convertedDate = computed(() => {
      if (first_release_date) {
        const newDate = new Date(first_release_date);
        return format(new Date(first_release_date), "MM/dd/yyyy");
      }

      return "";
    });

    const truncatedSummary = computed(() => {
      if (summary && summary.length >= 201) {
        return summary.substring(0, 200) + "...";
      }
      return summary;
    });

    const mobileView = computed(() => state.screen.isMobile);

    return {
      name,
      convertedDate,
      RoundedRating,
      truncatedSummary,
    };
  },
});
</script>
<style scoped>
.info-card {
  display: grid;
  grid-template-columns: auto;
  background-color: var(--card);
  height: 270px;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  transition: all 500ms ease-out;
  box-sizing: border-box;
  overflow: hidden;
  font-family: Mulish;
}

.info-card:hover {
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}

.dark-side {
  background-color: black;
  height: 135px;
}

.info-card-content {
  display: flex;
  flex-direction: column;
  padding: 10px 10px 10px 15px;
  box-sizing: border-box;
  height: 135px;
}

.info-card-badge {
  position: absolute;
  width: 30px;
  height: 30px;
  background: var(--button);
  display: grid;
  place-items: center;
  border-radius: 50%;
  right: 25px;
  top: 20px;
}
.info-card-content-main {
  padding: 10px 0 5px 0;
  box-sizing: border-box;
  overflow: hidden;
  max-height: 130px;
}
.info-card-content-main p {
  font-size: 10px;
}

.info-card-content-title small {
  font-size: 8px;
}

.info-card-content-title h3 {
  font-size: 15px;
}

@media only screen and (min-width: 725px) {
  .info-card {
    grid-template-columns: 1fr 7fr;
    height: 150px;
  }

  .dark-side {
    height: auto;
  }

  .info-card-badge {
    top: calc(50% - 30px);
  }

  .info-card-content {
    padding: 10px 100px 10px 15px;
    height: auto;
  }

  .info-card-content-main {
    padding: 5px 0 50px 0;
    box-sizing: border-box;
    overflow: hidden;
    max-height: 90px;
  }
  .info-card-content-main p {
    font-size: 13px;
  }

  .info-card-content-title small {
    font-size: 10px;
  }
}
</style>
