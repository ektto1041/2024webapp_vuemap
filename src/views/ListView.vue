<template>
  <div class="list-wrapper">
    <h3>주소 리스트</h3>
    <div class="list-container">
      <ListItem v-for="(item, i) of listData" :key="i" :item="item" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import ListItem from '../components/ListItem.vue';
import store from '../store/store';
import { useRouter } from 'vue-router';

const router = useRouter();

const listData = ref([]);

onMounted(() => {
  if (store.state.user.name.length <= 0 || store.state.data.length < 1) router.push('/');
  else {
    listData.value = [...store.state.data].sort((a, b) => a.addr.localeCompare(b.addr));
  }
});
</script>

<style lang="scss" scoped>
.list-wrapper {
  padding-top: 1rem;

  h3 {
    width: 95%;
    max-width: 50rem;
    margin: 0 auto;
    font-size: 1.5rem;
    padding-left: 1rem;
    color: $color-sub;
    margin-bottom: 1rem;
  }

  .list-container {
    width: 95%;
    max-width: 50rem;
    max-height: calc(100vh - 3rem - $nav-height - 2rem);
    background-color: white;
    margin: 0 auto;
    border-radius: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    overflow-y: auto;
  }
}
</style>
