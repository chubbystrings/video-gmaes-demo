<template>
  <div class="loader-wrapper">
    <div class="bar-loader"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
   
  setup() {
      
  },
});
</script>
<style scoped>
.loader-wrapper {
  position: absolute;
  bottom: 0px;
  width: 90%;
  left: 20px;
}
.bar-loader {
  position: relative;
  width: 100%;
  height: 2px;
  border: 1px solid var(--primary);
  animation: turn 4s linear 1.75s infinite;
}
.bar-loader:before {
  content: "";
  display: block;
  position: absolute;
  width: 40%;
  height: 100%;
  background-color: var(--button);
  box-shadow: 10px 0px 15px 0px var(--button);
  animation: load 2s linear infinite;
}

@media only screen and (min-width: 1024px) {
    .loader-wrapper {
        width: 95%;
    }
}


@keyframes load {
  0% {
    left: 0%;
  }

  50% {
      left: 60%
  }

  80% {
      right: 0%;
  }

  100% {
    left: 0%;
  }
}
</style>
