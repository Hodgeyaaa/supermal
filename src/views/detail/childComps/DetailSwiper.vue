<template>
  <div class="detail-swiper">
      <swiper class="wrap">
          <swiper-item v-for="(item,index) in topImages" :key="index">
              <img :src="item" alt="" @load="detailImageLoad">
          </swiper-item>
      </swiper>
  </div>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper/index.js'

export default {
    data() {
        return {

        }

    },
    props: {
        topImages: {
            type: Array,
            default() {
                return ['没有']
            }
        }
    },
  components: {
    Swiper,
    SwiperItem
    
  },
  mounted() {
      console.log(this.topImages);
  },
  methods: {
      detailImageLoad() {
          this.$bus.$emit('detailImageLoad')
      }
  }

}
</script>

<style scoped>
.wrap {
    height: 300px;
    overflow: hidden;
}

</style>