<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>
        <div>购物街</div>
      </template>
    </nav-bar>
     <tab-control 
    class="tab-control" 
    @tabClick="tabClick"
     :title="['流行','新款','精选']"
     ref="tabControl1"
     v-show="isTabFixed"
     />
    <scroll class="contentt"
     ref="scroll" 
     :probe-type="3"
      @scroll="contentScroll"
      @pullingUp="loadMore"
      
      >
    <swiper>
      <swiper-item v-for="(item, index) in banners" :key="index" class="s-item">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad" />
        </a>
      </swiper-item>
    </swiper>
    <recommend-view :recommends="recommends" />
    <feature/>
    <tab-control 
    @tabClick="tabClick"
     :title="['流行','新款','精选']"
     ref="tabControl2"
     />
    <good-list :goods="goods[currentType].list"/> 
    </scroll>
    
   <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { getHomeMultiData,getHomeGoods } from "network/home";
import { Swiper, SwiperItem } from "components/common/swiper";
import RecommendView from "./childComps/RecommendView";
import Feature from "./childComps/Feature.vue"
import TabControl from "components/content/tabControl/TabControl.vue"
import GoodList from "components/content/goods/GoodList.vue"
import Scroll from "components/common/scroll/Scroll.vue"
import BackTop from 'components/content/backTop/BackTop.vue';




export default {
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {
          page: 0,
          list: []
        },
        'new': {
          page: 0,
          list: []
        },
        'sell': {
          page: 0,
          list: []
        },
      },
      currentType: 'pop',
      tabOffsetTop: 0,
      isTabFixed: false,
      isShowBackTop: true,
      isLoad: false,
      saveY:0,
    };
  },

  components: {
    NavBar,
    Swiper,
    SwiperItem,
    RecommendView,
    Feature,
    TabControl,
    GoodList,
    Scroll,
    BackTop,
    BackTop,
  },
  created() {
    RecommendView; //1.请求多个数据
    this.getHomeMultiData()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
    //监听item中图片加载完成
    // this.$mybus.on('itemImageLoad',() => {
    //   console.log("-----");
    // })
    
  },
  mounted() {
   
    const refresh = this.debounce(this.$refs.scroll.refresh,500)
    this.$bus.$on('itemImageLoad',() => {
      refresh()
    //  this.$refs.scroll.refresh()
    })
  },
  activated() {
    // console.log("在home中" + this.$refs.scroll.getScrollY());
    this.$refs.scroll.scroll.scrollTo(0,this.saveY,1000)
    this.$refs.scroll.refresh()

  },
  deactivated() {
    // console.log("离开home");
    this.saveY = this.$refs.scroll.getScrollY()
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
    getHomeMultiData() {
        getHomeMultiData().then((res) => {
      // console.log(res);
      this.banners = res.data.data.banner.list;
      this.recommends = res.data.data.recommend.list;
    });
    },
     getHomeGoods(type) {
       const page = this.goods[type].page + 1
        getHomeGoods(type,page).then((res) => {
        console.log(res);
      this.goods[type].list.push(...res.data.data.list)
      this.goods[type].page += 1

      // this.$refs.scroll.finishPullUp()
        
      })
     },
     tabClick(index) {
      //  console.log(index);
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
     },
     backClick() {
      this.$refs.scroll.scroll.scrollTo(0,0,500);
     },
     contentScroll(position) {
      //  console.log(position);
      this.isShowBackTop = (-position.y) > 1000
      //根据position.y的值和tabOffsetTop进行对比决定是否吸顶
      this.isTabFixed = (-position.y) > this.tabOffsetTop
     },
     loadMore() {
        console.log("正在加载更多");
        this.getHomeGoods(this.currentType)
     },
     imageLoad() {
      if(!this.isLoad) {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
         this.isLoad = true
      }
     }
    

  }
};
</script>

<style>
#home {
  /* padding-top: 44px; */
  /* position: relative; */
  height: 100vh; 
}
.home-nav {
  background-color: pink;
  color: #fff;
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9; 使用了better-scroll不需要固定了*/
}
.s-item a img {
  width: 100%;
}
.tab-control {
 position: relative;
 top: -1px;
 z-index: 9;
}
.contentt {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
/* .contentt {
  height: calc(100% - 93px);
  margin-top: 44px;
  overflow: hidden;
} */


</style>