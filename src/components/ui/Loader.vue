<template>
    <div class="backdrop">
        <div class="loader">
            LOADING GAMES..
        </div>
    </div>

</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {},
});
</script>
<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100000;
  display: grid;
  place-items: center;
  font-size: 20px;
  
}

.loader {
    animation: loadindin 900ms infinite;
}


@keyframes loadindin {
    from {
        transform: scale(0)
    }
    to {
        transform: scale(1)
    }
}
</style>
