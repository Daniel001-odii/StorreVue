<template>
 <div class="st_stat" style="
                    display: flex;
                    flex-direction: row;
                    gap: 10px;
                    padding: 20px;
                    background: #fff;
                    min-width: 240px;
                    /* height: 65px; */
                    border-radius: 15px;
                    ">
                        <slot name="icon">icon</slot>
                        <div style="display: flex;
                        flex-direction: column;
                        align-items: flex-start;">
                            <span style="font-size: 20px; font-weight: 600;"><slot name="number">99</slot></span>
                            <div style="font-weight: 400; font-size: 16px;"><slot name="item">item name goes here</slot></div>
                        </div>
                    </div>
</template>
<style  scoped>
*{
    color: #8A8A8A;
}
</style>