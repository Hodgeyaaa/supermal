<template>
  <div class="goods">
      <good-list-item v-for="(item,index) in goods" :key="index" :goods-item="item"/>
  </div>
</template>

<script>
import GoodListItem from './GoodListItem.vue'
    
export default {
  components: { GoodListItem },

    props: {
        goods: {
            type: Array,
            default() {
                 return []
            }
        }
    }
}
</script>
    
<style>
    .goods {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		padding: 0 6px;
	}
</style>