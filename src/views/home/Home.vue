<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>
        <div>购物街</div>
      </template>
    </nav-bar>
    <swiper>
      <swiper-item v-for="(item, index) in banners" :key="index" class="s-item">
        <a :href="item.link">
          <img :src="item.image" alt="" />
        </a>
      </swiper-item>
    </swiper>
    <recommend-view :recommends="recommends" />
    <feature/>
    <tab-control class="tab-control" :title="['流行','新款','精选']"/>
    <div>
      <h2>主页</h2>
      <h2>主页</h2>
      <h2>主页</h2>
      <h2>主页</h2>
      <h2>主页</h2>
      <h2>主页</h2>
      <h2>主页</h2>
      <h2>主页</h2>
      <h2>主页</h2>
      <h2>主页</h2>
      <h2>主页</h2>
      <h2>主页</h2>
      <h2>主页</h2>
      <h2>主页</h2>
      <h2>主页</h2>
      <h2>主页</h2>
      <h2>主页</h2>
      <h2>主页</h2>
      <h2>主页</h2>
      <h2>主页</h2>
      <h2>主页</h2>
      <h2>主页</h2>
      <h2>主页</h2>
      <h2>主页</h2>
      <h2>主页</h2>
      <h2>主页</h2>
      <h2>主页</h2>
      <h2>主页</h2>
      <h2>主页</h2>
      <h2>主页</h2>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { getHomeMultiData,getHomeGoods } from "network/home";
import { Swiper, SwiperItem } from "components/common/swiper";
import RecommendView from "./childComps/RecommendView";
import Feature from "./childComps/Feature.vue"
import TabControl from "components/content/tabControl/TabControl.vue"


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
      }
    };
  },

  components: {
    NavBar,
    Swiper,
    SwiperItem,
    RecommendView,
    Feature,
    TabControl
  },
  created() {
    RecommendView; //1.请求多个数据
    this.getHomeMultiData()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  methods: {
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
      // this.goods[type].list.push(...res.data)
      // this.goods[type].page += 1
        
    })
     }
  }
};
</script>

<style>
#home {
  padding-top: 44px;
}
.home-nav {
  background-color: pink;
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
}
.s-item a img {
  width: 100%;
}
.tab-control {
  position: sticky;
  top: 44px;
}

</style>