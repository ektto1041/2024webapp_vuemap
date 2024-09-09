<template>
  <nav>
    <ul>
      <li>
        <router-link to="/"><i class="fa-solid fa-map-location-dot"></i></router-link>
      </li>
      <li>
        <router-link :to="`${$store.state.user.name.length > 0 ? '/list' : '/'}`"
          ><i class="fa-solid fa-list-ul"></i
        ></router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup></script>

<style lang="scss" scoped>
nav {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: $nav-height;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
  z-index: 10;

  ul {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    a {
      width: 3.5rem;
      height: 3.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 1rem;
      background-color: $color-primary;
      color: white;
      transition: all 0.3s;
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);

      i {
        transform: scale(1.2);
      }

      &:hover {
        width: 4rem;
        height: 4rem;
        transform: translateY(-1rem);
        background-color: white;
        color: $color-primary;
        box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.3);
      }
    }
  }
}
</style>
