<template>
  <div>
      <nav-bar class="nav-bar">
          <template v-slot:left>
              <div class="back" @click="backClick">
                  <img src="~assets/images/detail/back-line.svg" alt="">
              </div>
          </template>
      <template v-slot:center>
        <div class="title"> 
            <div v-for="(item,index) in titles" 
            :key="index" 
            :class="{active: index === currentIndex}"
            @click="titleClick(index)"
            >
            {{item}}
            </div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {

components: {
    NavBar,
  },
data() {
    return {
        titles:['商品','参数','评论','推荐'],
        currentIndex: 0,
    }
},
methods: {
    titleClick(index) {
        this.currentIndex = index
    },
    backClick() {
        // history.back()
        
        this.$router.go(-1)
        
    }
}
}
</script>

<style scoped>
.nav-bar {
    position: relative;
    z-index: 9;
    background: #fff;
}
.title {
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.active {
    color: hotpink;
}
.back img {
    /* background-color: red; */
    margin: 10px 0px 0px 15px;
    width: 24px;
    height: 24px;
}

</style>