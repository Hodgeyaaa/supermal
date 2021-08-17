<template>
  <div id="detail">
    <detail-nav-bar/>
    <scroll 
    class="content"
    ref="scroll"
    >
      
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goodsInfo"/>
      <detail-shop-info :shop="shopInfo"/>
      <detail-goods-info :detail-info="detailInfo"/>

      <detail-params-info :param-info="itemParams"/>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamsInfo from './childComps/DetailParamsInfo.vue'
import Scroll from 'components/common/scroll/Scroll'

import {getDetail, Goods} from 'network/detail'


export default {
  name: 'Detail',
  data() {
    return {
      iid: null,
      topImages: [],
      goodsInfo: {},
      shopInfo: {},
      detailInfo: {},
      itemParams: {}
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamsInfo,
    Scroll,
   
  },

  created() {
    this.iid = this.$route.params.iid
    console.log(this.$route.params.iid);
    getDetail(this.iid).then((res) => {
      console.log(res.data);
      const data = res.data.result;
      //轮播图数据
      this.topImages = data.itemInfo.topImages
      //创建商品的对象
      this.goodsInfo = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      //店铺信息
      this.shopInfo = data.shopInfo
      //详情
      this.detailInfo = data.detailInfo
      //参数信息
      this.itemParams = data.itemParams
    })
  },
  mounted() {
    const refresh = this.debounce(this.$refs.scroll.refresh,500)
    this.$bus.$on('detailImageLoad',() => {
      refresh()
    })
    this.$bus.$on('imgLoad',() => {
      refresh()
    })
  },
  methods: {
    debounce(func,delay) {
      let timer = null
      return function(...args) {
        if(timer) clearTimeout(timer)
        timer = setTimeout(() => {
          console.log('--------');
          func.apply(this,args)
          
        },delay)
      }
    },
    
    
  }
 

}
</script>

<style scoped>
#detail {
height: 100vh;
position: relative;
z-index: 1;
}
.content {
  background: #fff;
  height: calc(100% - 44px); 
  overflow: hidden; 
}
</style>