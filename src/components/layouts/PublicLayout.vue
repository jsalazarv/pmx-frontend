<template>
  <router-view :key="$route.fullPath"></router-view>
</template>

<script>
export default {
  name: "PublicLayout",
};
</script>

<style scoped></style>
