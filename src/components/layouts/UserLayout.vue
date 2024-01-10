<template>
    <div class="w-full relative top-0">
        <component-header></component-header>
        <slot></slot>

        <component-footer></component-footer>
    </div>
</template>
<script lang="ts" setup>
import ComponentHeader from '../includes/Header.vue';
import ComponentFooter from '../includes/Footer.vue';
</script>