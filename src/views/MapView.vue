<template>
  <div class="map-container">
    <div :class="`map-box ${$store.state.user.name.length > 0 ? 'show' : 'hide'}`" />
    <span v-if="!canSave" class="loader"></span>
    <div :class="`username-box ${$store.state.user.name.length > 0 ? 'is-ready' : ''}`">
      <h3>내 이름은</h3>
      <input ref="username-input" type="text" maxlength="5" placeholder="OOO" @change="handleChangeUsername" />
    </div>
    <div
      v-if="canSave && $store.state.user.name.length > 0"
      :class="`address-box ${$store.state.user.name.length > 0 ? 'is-ready' : ''} ${isSamePos() ? '' : 'ready-ani'}`"
      @click="handleSaveAddress"
    >
      {{ selectedAddress }}
      <i v-if="!isSamePos()" class="fa-solid fa-cloud-arrow-up"></i>
      <i v-if="isSamePos()" class="fa-solid fa-cloud"></i>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, useTemplateRef, watch } from 'vue';
import store from '../store/store';

const usernameInput = useTemplateRef('username-input');

const map = ref(null);
const markerList = ref([]);
const iwList = ref([]);
const canSave = ref(false);
const selectedAddress = ref('');
const selectedPos = ref({});

watch(
  () => [store.state.data, map.value],
  (newValue, oldValue) => {
    console.log('change');
    console.log(newValue);
    console.log(oldValue);
    if (Boolean(newValue[1])) {
      markerList.value.forEach(marker => {
        marker.setMap(null);
      });
      iwList.value.forEach(iw => {
        iw.close();
      });

      markerList.value = [];
      iwList.value = [];

      const imageSrc = './marker.png';
      const imageSize = new kakao.maps.Size(64, 64);
      newValue[0].forEach(user => {
        console.log(user);

        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

        const marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(user.lat, user.lng),
          image: markerImage,
        });

        markerList.value.push(marker);

        marker.setMap(newValue[1]);

        const iwContent = `
          <div style="min-width: 150px; text-align: center; font-size: 1.5rem; line-height: 2rem; padding: 1rem; border-radius: 1rem; border: 2px solid white; box-shadow: 0 0 8px rgba(0, 0, 0, .3), 0 0 8px 8px white;">
            ${user.name}
          </div>
        `;

        const iw = new kakao.maps.InfoWindow({
          position: new kakao.maps.LatLng(user.lat, user.lng),
          content: iwContent,
          isRemovable: true,
        });

        iwList.value.push(iw);

        iw.open(newValue[1], marker);
      });
    }
  },
);

const handleChangeUsername = e => {
  if (e.target.value.length > 0) store.dispatch('login', e.target.value);
};

const drawMap = () => {
  navigator.geolocation.getCurrentPosition(pos => {
    const { latitude: lat, longitude: lng } = pos.coords;

    const options = {
      center: new kakao.maps.LatLng(lat, lng),
      level: 3,
    };

    map.value = new kakao.maps.Map(document.getElementsByClassName('map-box')[0], options);

    const imageSrc = './my-marker.png'; // 마커이미지의 주소입니다
    const imageSize = new kakao.maps.Size(96, 96); // 마커이미지의 크기입니다

    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    const marker = new kakao.maps.Marker({
      position: map.value.getCenter(),
      image: markerImage,
    });

    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.coord2Address(map.value.getCenter().getLng(), map.value.getCenter().getLat(), result => {
      selectedAddress.value = result[0].address.address_name;
      console.log(result[0].address.address_name);
      selectedPos.value = {
        lat: map.value.getCenter().getLat(),
        lng: map.value.getCenter().getLng(),
      };

      canSave.value = true;
    });

    marker.setMap(map.value);

    kakao.maps.event.addListener(map.value, 'click', function (mouseEvent) {
      canSave.value = false;
      const latlng = mouseEvent.latLng;

      marker.setPosition(latlng);

      geocoder.coord2Address(latlng.getLng(), latlng.getLat(), result => {
        selectedAddress.value = result[0].address.address_name;
        console.log(result[0].address.address_name);
        selectedPos.value = {
          lat: latlng.getLat(),
          lng: latlng.getLng(),
        };

        canSave.value = true;
      });
    });
  });
};

onMounted(() => {
  usernameInput.value.focus();
  drawMap();
  store.dispatch('getData');
});

const handleSaveAddress = () => {
  if (isSamePos()) return;
  store.dispatch('setData', {
    ...selectedPos.value,
    addr: selectedAddress.value,
  });
};

const isSamePos = () => {
  const username = store.state.user.name;

  if (username.length === 0) return false;

  const foundUser = store.state.data.find(user => user.name === username);

  if (Boolean(foundUser) && foundUser.addr === selectedAddress.value) {
    console.log('same');
    return true;
  } else return false;
};
</script>

<style lang="scss" scoped>
.map-container {
  position: relative;
  height: 100vh;

  .map-box {
    width: 100%;
    height: 100%;
    transition: all 0.5s;
  }

  .username-box {
    position: absolute;
    left: 5%;
    top: 2rem;
    z-index: 15;
    width: 100%;
    max-width: 800px;
    height: $username-input-height;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 1rem;
    padding: 1rem;
    transition: all 0.3s;
    user-select: none;

    &.is-ready {
      display: none;
    }

    h3 {
      font-size: 2rem;
    }

    input {
      width: 20rem;
      border: none;
      border-bottom: 4px solid $color-primary;
      background-color: rgba(0, 0, 0, 0);
      font-size: 3rem;
      outline: none;
      padding: 0 2rem;
      color: $color-sub;
    }
  }

  .address-box {
    position: absolute;
    left: 1rem;
    bottom: calc($nav-height + 1rem);
    min-width: 3rem;
    padding: 1rem;
    background-color: white;
    z-index: 15;
    border-radius: 1rem;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    gap: 0.5rem;
    line-height: 1.25rem;
    user-select: none;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background-color: $color-primary !important;
      color: white;
    }

    &.ready-ani {
      animation: ready-ani 3s infinite;
    }
  }

  @keyframes ready-ani {
    0% {
      background-color: white;
    }

    50% {
      background-color: $color-primary-80;
    }

    100% {
      background-color: white;
    }
  }

  .loader {
    position: absolute;
    left: calc(50% - 24px);
    top: calc(50% - 24px);
    z-index: 15;
    width: 48px;
    height: 48px;
    border: 5px solid $color-primary;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
