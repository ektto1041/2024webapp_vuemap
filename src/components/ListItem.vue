<template>
  <div class="list-item-container">
    <div class="content">
      <h3>{{ item.name }}</h3>
      <p>{{ item.addr }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  item: Object,
});
</script>

<style lang="scss" scoped>
.list-item-container {
  position: relative;
  width: 100%;
  min-height: 5rem;
  height: 10%;
  border-bottom: 1px solid $color-primary;

  .content {
    width: 100%;
    height: 100%;
    padding: 1rem;

    h3 {
      font-size: 2rem;
    }
  }
}
</style>
