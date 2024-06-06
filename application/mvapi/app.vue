<script setup>
  import {ref} from 'vue';
  import axios from 'axios';
  import { STATIONS } from '/services/fetchStations.js';

  const selectedStation = ref(null);
  const stations = ref([]);
  const data = ref(null);
  const isLoading = ref(false);

  const groupStationsByType = (stations) => {
    const groups = {};

    for (const [id, station] of Object.entries(STATIONS)) {
      const types = station.type.split('/');
      
      for (const type of types) {
          if (!groups[type]) {
              groups[type] = [];
          }
          groups[type].push({ label: station.name, value: id });
      }
    } 
    return Object.entries(groups).map(([label, items]) => ({ label, items }));
  };

  const getSchedule = async (id) => {
    try {
      isLoading.value = true;
      const response = await axios.post("http://localhost:3001/getSchedule", {
        id: id
      });
      data.value = response.data;
      isLoading.value = false;
    } catch (error) {
      console.error(error);
      // Manejar errores aquí si es necesario
      throw error;
    }
  };

stations.value = groupStationsByType(STATIONS);

const title = ref('MetroValencia Horarios');
const description = ref('Mejor aplicación para ver qué metro pasa en la parada seleccionada');

useHead({
  title,
  meta: [
    {
      name: 'description',
      content: description,
    },
    {
      rel: 'manifest',
      href: 'manifest.json',
    },
  ],
});

</script>

<template>
  <link rel="manifest" crossorigin="use-credentials" href="manifest.json" />

    <div class="text-center text-xl md:text-2xl m-2 mt-10">METROVALENCIA HORARIOS</div>
    <div class="w-full flex justify-center pt-10">
      <Dropdown v-model="selectedStation" :disabled="isLoading" @change="getSchedule(selectedStation.value)" filter :options="stations" optionLabel="label" optionGroupLabel="label" optionGroupChildren="items" placeholder="Selecciona una parada" class="w-[80%] md:w-[80%]">
        <template #optiongroup="slotProps">
            <div class="flex align-items-center">
              <svg v-if="slotProps.option.label == 'Metro'" class="w-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M96 0C43 0 0 43 0 96V352c0 48 35.2 87.7 81.1 94.9l-46 46C28.1 499.9 33.1 512 43 512H82.7c8.5 0 16.6-3.4 22.6-9.4L160 448H288l54.6 54.6c6 6 14.1 9.4 22.6 9.4H405c10 0 15-12.1 7.9-19.1l-46-46c46-7.1 81.1-46.9 81.1-94.9V96c0-53-43-96-96-96H96zM64 128c0-17.7 14.3-32 32-32h80c17.7 0 32 14.3 32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V128zM272 96h80c17.7 0 32 14.3 32 32v96c0 17.7-14.3 32-32 32H272c-17.7 0-32-14.3-32-32V128c0-17.7 14.3-32 32-32zM64 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm288-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
              <svg v-else class="w-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M86.8 48c-12.2 0-23.6 5.5-31.2 15L42.7 79C34.5 89.3 19.4 91 9 82.7S-3 59.4 5.3 49L18 33C34.7 12.2 60 0 86.8 0H361.2c26.7 0 52 12.2 68.7 33l12.8 16c8.3 10.4 6.6 25.5-3.8 33.7s-25.5 6.6-33.7-3.7L392.5 63c-7.6-9.5-19.1-15-31.2-15H248V96h40c53 0 96 43 96 96V352c0 30.6-14.3 57.8-36.6 75.4l65.5 65.5c7.1 7.1 2.1 19.1-7.9 19.1H365.3c-8.5 0-16.6-3.4-22.6-9.4L288 448H160l-54.6 54.6c-6 6-14.1 9.4-22.6 9.4H43c-10 0-15-12.1-7.9-19.1l65.5-65.5C78.3 409.8 64 382.6 64 352V192c0-53 43-96 96-96h40V48H86.8zM160 160c-17.7 0-32 14.3-32 32v32c0 17.7 14.3 32 32 32H288c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32H160zm32 192a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm96 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"/></svg>
              <div>{{ slotProps.option.label }}</div>
            </div>
        </template>
    </Dropdown>
    </div>
    <div>
      <!-- <span> <img class="w-8" src="https://www.metrovalencia.es/wp-content/themes/metrovalencia/images/lineas/icono--linea-1.svg" alt="Línea 1"> </span>
      <span> <img class="w-8" src="https://www.metrovalencia.es/wp-content/themes/metrovalencia/images/lineas/icono--linea-2.svg" alt="Línea 2"> </span>
      <span> <img class="w-8" src="https://www.metrovalencia.es/wp-content/themes/metrovalencia/images/lineas/icono--linea-3.svg" alt="Línea 3"> </span>
      <span> <img class="w-8" src="https://www.metrovalencia.es/wp-content/themes/metrovalencia/images/lineas/icono--linea-4.svg" alt="Línea 4"> </span>
      <span> <img class="w-8" src="https://www.metrovalencia.es/wp-content/themes/metrovalencia/images/lineas/icono--linea-5.svg" alt="Línea 5"> </span>
      <span> <img class="w-8" src="https://www.metrovalencia.es/wp-content/themes/metrovalencia/images/lineas/icono--linea-6.svg" alt="Línea 6"> </span>
      <span> <img class="w-8" src="https://www.metrovalencia.es/wp-content/themes/metrovalencia/images/lineas/icono--linea-7.svg" alt="Línea 7"> </span>
      <span> <img class="w-8" src="https://www.metrovalencia.es/wp-content/themes/metrovalencia/images/lineas/icono--linea-8.svg" alt="Línea 8"> </span>
      <span> <img class="w-8" src="https://www.metrovalencia.es/wp-content/themes/metrovalencia/images/lineas/icono--linea-9.svg" alt="Línea 9"> </span>
      <span> <img class="w-8" src="https://www.metrovalencia.es/wp-content/themes/metrovalencia/images/lineas/icono--linea-10.svg" alt="Línea 10"> </span> -->
    </div>

    <Card v-if = selectedStation class="mt-5 w-[80%] m-auto">
          
          <template #title>
            <Skeleton v-if="isLoading" width="10rem" height="1.5rem" class="mb-2" borderRadius="16px"></Skeleton>
            <p v-else >{{ selectedStation.label }}</p>
        </template>
        <template #content>
          <OrderList v-model="data" listStyle="height:auto" dataKey="id" :dragdrop="false" class="non-interactive-orderlist cursor-default">
            <template #item="slotProps">
              <div v-if="isLoading">
                <Skeleton height="2rem" class="mb-2"></Skeleton>
              </div>
              <div v-else class="flex flex-wrap p-2 align-items-center gap-3 cursor-default non-selectable">
                <div class="flex-1 flex flex-column gap-2">
                  <span> <img class="w-8" :src="slotProps.item.icon" alt="Línea"> </span>
                  <span class="font-bold">{{ slotProps.item.stationName }}</span>
                </div>
                <div class="flex align-items-right gap-2">
                  <span>{{ slotProps.item.time }}</span>
                </div>
              </div>
            </template>
          </OrderList>
        </template>
    </Card>

</template>




<style>
.p-dropdown-filter-container{
  width: 50% !important;
  margin: auto;
}

.p-dropdown-filter {
  border: 0.1rem solid lightgray !important;
  padding: 0.2rem !important;
}

.non-interactive-orderlist .p-orderlist-controls {
  display: none;
}

.non-interactive-orderlist .p-orderlist .p-orderlist-list {
  pointer-events: none;
}

.non-selectable {
  user-select: none;
  background-color: transparent !important;
}

/* Desactivar la selección y el color de fondo para elementos seleccionados */
.non-interactive-orderlist .p-orderlist-item.p-highlight,
.non-interactive-orderlist .p-orderlist-item.p-highlight:hover {
  background-color: transparent !important;
  color: inherit !important;
}

</style>