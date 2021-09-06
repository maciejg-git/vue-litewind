<template>
  <router-view/>
</template>

<style>
.tooltip-anim-in {
  animation: fadeIn 0.3s;
}

.tooltip-anim-out {
  animation: fadeOut 0.3s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    /* transform: scale(0); */
    /* top: 20px; */
  }

  to {
    opacity: 1;
    /* transform: scale(1); */
    /* top: 0px; */
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
    /* transform: scale(1); */
    /* top: 0px; */
  }

  to {
    opacity: 0;
    /* transform: scale(0); */
    /* top: 20px; */
  }
}
</style>
