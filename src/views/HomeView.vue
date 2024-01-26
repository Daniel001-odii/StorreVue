<template>
<LeftNav/>
</template>

<script>
import LeftNav from '@/components/LeftNav.vue';
  export default {
    components:{LeftNav},
      mounted(){
        // if(localStorage.getItem("uselessToken")){
        //   this.$router.push('/dashboard')
        // }
      }
  }
</script>

<style scoped>
.st_hero_section{
  /* border: 1px solid red; */
  display: flex;
  flex-direction: row;
}

.st_hero_image{
  /* background: url('.../../assets/heroImage.png'); */
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  /* border: 1px solid red; */
  width: 500px;
  height: 600px !important;
}
  .st_hero_text{
    font-size: 90px;
    text-align: left;
  }

  .st_dl_apps{
    max-width: 350px;
    /* border: 1px solid red; */
  }

  .st_app_download{
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .st_hero_sub{
    text-align: left;
  }
  .st_hero_card{
    height: 300px;
    width: 100%;
    background: #efefef;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    text-align: left;
    padding: 30px;
  }
</style>