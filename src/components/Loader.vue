<template>
<div class="st_loader_container">
    <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
    <div class="st_loader_text">Loading...</div>
</div>
</template>
<script>
export default{

}
</script>
<style>
.st_loader_container{
    height: 100dvh;
    width: 100%;
    position: absolute;
    top: 0;
    z-index: 99999;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ffffff;
    gap: 5px;
    /* color: #fff; */
}
</style>