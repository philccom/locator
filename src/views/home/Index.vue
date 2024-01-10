<template>
    <user-layout>
        <section class="w-full h-[30dvh] lg:h-[50dvh] bg-black relative">
            <img class="w-full h-full object-cover" src="/src/assets/images/radar.jpg" alt="banner">
            <div class="absolute w-full h-full top-0 left-0 flex flex-col justify-end">
                <div class="max-w-[1366px] px-4 py-10 lg:p-20 m-auto w-full">
                    <div class="flex items-center space-x-6 w-fit m-auto">
                        <div class="h-[3rem] lg:h-[64px] w-2 bg-primary-yellow"></div>
                        <div>
                            <p class="text-[2rem] leading-[2rem] lg:text-[64px] lg:leading-[64px] font-bold font-secondary text-white uppercase">STATION LOCATOR</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="bg-neutral-800 relative z-[1]">
            <div class="max-w-[1366px] px-4 py-10 lg:p-20 m-auto">
                <div class="flex lg:flex-row flex-col lg:space-x-6 bg-black p-4 rounded-xl shadow-xl">
                    <div class="w-full lg:w-[360px] h-[50vh] lg:h-[calc(100vh-140px)] bg-neutral-800 p-4 lg:order-1 order-2 relative">
                        <div class="flex flex-col space-y-2.5 mb-5">
                            <label for="search" class="text-primary-yellow font-bold text-lg">
                                SEARCH
                            </label>
                            <input 
                                type="text" 
                                id="search" 
                                name="search" 
                                placeholder="SEARCH HERE"
                                class="border bg-white placeholder:text-[#838383] px-4 py-2 rounded text-sm text-black focus:outline-0"
                                v-model="search" 
                            >
                        </div>
                        <div class="overflow-auto h-[calc(100%-102px)] scroll-custom">
                            <div class="flex flex-col space-y-3">
                                <div v-for="item in filteredList" @click="selectPersonnel(item)" class="personnel shadow-md w-full px-4 py-3 cursor-pointer group/item hover:bg-black transition rounded text-xs hover:text-primary-yellow"
                                    :class="activePersonnel == item.sys.id ? 'active bg-black text-primary-yellow' : 'bg-white text-black odd:bg-neutral-300'"
                                >
                                    <div class="flex w-full justify-end mb-4 items-center space-x-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                                            <path fill-rule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd" />
                                        </svg>
                                        <P class="font-bold">{{ item.fields.location }}</P>
                                    </div>
                                    <div class="flex items-center space-x-3 mb-1">
                                        <p>Codename:</p>
                                        <P class="font-bold">{{ item.fields.codename }}</P>
                                    </div>
                                    <div class="flex items-center space-x-3 mb-1">
                                        <P class="font-bold font-roboto uppercase text-base">{{ item.fields.fullname }}</P>
                                    </div>
                                    <div class="space-y-1 sub-details">
                                        <div class="flex items-center space-x-3">
                                            <p>NTC Callsign:</p>
                                            <P class="font-bold">{{ item.fields.callsign }}</P>
                                        </div>
                                        <div class="flex items-center space-x-3">
                                            <p>Numerical:</p>
                                            <P class="font-bold">{{ item.fields.numerical }}</P>
                                        </div>
                                    </div>
                                    <div class="border p-2 text-xs w-fit font-bold mt-4 ml-auto">
                                        <p>VIEW ON MAP</p>
                                    </div>
                                    
                                </div>
                                <div v-if="filteredList.length == 0">
                                    <p class="text-white">No result found</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="w-full lg:w-[calc(100%-380px)] h-[50vh] lg:h-[calc(100vh-140px)] lg:order-2 order-1 lg:mb-0 mb-6 relative">
                        <l-map :use-global-leaflet="false" class="z-[1]" ref="map" v-model:zoom="zoom" :center="[initLng, initLat]">
                            <l-tile-layer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                layer-type="base"
                                name="OpenStreetMap"
                            ></l-tile-layer>
                            <l-marker v-for="item, i in members" :key="i" :lat-lng="[item.fields.lng, item.fields.lat]">
                                <l-popup>
                                    <p><span class="uppercase font-bold text-sm">{{ item.fields.fullname }}</span></p>
                                    <p class="font-bold text-xs">{{ item.fields.location }}</p>
                                    <div class="mt-4 bg-neutral-100 text-black p-2">
                                        <p><span class="font-bold text-sm">Codename:</span> <span class="uppercase">{{ item.fields.codename }}</span></p>
                                        <p><span class="font-bold text-sm">NTC Callsign:</span> <span class="uppercase">{{ item.fields.callsign }}</span></p>
                                        <p><span class="font-bold text-sm">Numerical:</span> <span class="uppercase">{{ item.fields.numerical }}</span></p>
                                    </div>
                                </l-popup>
                                <l-icon
                                        :icon-size="[29, 41]"
                                        :icon-anchor="[17, 37]"
                                        icon-url="/locator/map-pin.png" >
                                </l-icon>
                            </l-marker>
                        </l-map>
                        
                        <button @click="initMap()" class="absolute top-4 right-4 z-10 focus:outline-0 hover:outline-0 hover:border-transparent hover:bg-primary-yellow hover:text-black">
                            RESET
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </user-layout>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import UserLayout from '../../components/layouts/UserLayout.vue';
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LPopup, LIcon } from "@vue-leaflet/vue-leaflet";

const search = ref('');
const initLng = ref<any>(14.571411829543315);
const initLat = ref<any>(121.01092453822817);
const activePersonnel = ref('');
const members = ref<any>([]);
const zoom = ref(12);
// const list = ref([
//     {
//         id:  '1',
//         fullname: 'John Dennis Bernardo',
//         callsign: 'DW3JUB',
//         codename: 'WARSHOCK',
//         numerical: '0123',
//         location: 'Marilao, Bulacan',
//         lng: '14.780508358829406',
//         lat: '120.98421976824208'
//     },
// ])

const initMap = () => {
    zoom.value = 11;
}

initMap();



const selectPersonnel = (item) => {
    initLng.value = item.fields.lng;
    initLat.value = item.fields.lat;
    zoom.value = 16;
    activePersonnel.value = item.sys.id;
}

const fetchMember = () => {
    axios
      .get('https://cdn.contentful.com/spaces/2l0neqyu5hf2/environments/master/entries?access_token=rlrBFHXIo8oJekURHa7jN0svYCFaW6VP7uIswAuui0A')
      .then((response) => {
        members.value = response.data.items;
      })
}


const filteredList = computed(() => {
    // return list.value.filter(item => item.fullname.toLowerCase().includes(search.value) )
    return members.value.filter(
        item => item.fields.fullname.toLowerCase().includes(search.value) || 
        item.fields.codename.toLowerCase().includes(search.value) ||
        item.fields.callsign.toLowerCase().includes(search.value) ||
        item.fields.location.toLowerCase().includes(search.value) ||
        item.fields.numerical.toLowerCase().includes(search.value)
    )
})

onMounted(() => {
    fetchMember();
})
</script>