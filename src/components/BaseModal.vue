<template>
  <transition name="modal-outer">
    <div
      v-show="modalActive"
      @click="modalActive=false"
      class="
        absolute
        w-full
        overflow-y-auto
        bg-black bg-opacity-50
        h-screen
        top-0
        left-0
        bottom-0
        right-0
        flex
        justify-center
        items-center
        sm-px-8
        px-4
        sm-py-10
        py-4
      "
    >
      <transition name="modal-inner">
        <div
        @click.stop
          v-if="modalActive"
          class="bg-white sm-px-6 px-8 sm-py-4 py-6 h-auto rounded"
          style="width:600px;"
        >
          <slot></slot>
          <button
            @click="$emit('close-modal')"
            class="text-white mt-6 bg-weather-primary py-2 px-6"
          >
            Close
          </button>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup>
defineEmits(["close-modal"]);
defineProps({
  modalActive: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
/* ----------modal transitions ---------- */
.modal-outer-enter-active,
.modal-outer-leave-active {
  transition: opacity 0.4s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}
.modal-outer-enter-from,
.modal-outer-enter-to {
  opacity: 0;
}

/* modal inner */
.modal-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}
.modal-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}
.modal-inner-leave-to {
  transform: scale(0.8);
}
</style>