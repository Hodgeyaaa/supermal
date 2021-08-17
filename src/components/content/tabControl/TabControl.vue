<template>
  <div class="tab-control">
      <div v-for="(item,index) in title" :key="index" @click="itemClick(index)"
       class="tab-control-item" :class="{active: index === currentIndex}">
          <span>{{item}}</span>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            currentIndex: 0
        }
    },
    props: {
        title: {
            type: Array,
            deault() {
                return []
            }
        }
    },
    methods: {
        itemClick(index) {
            // this.currentIndex = index
            this.$emit('tabClick',index)
        }
    }

}
</script>

<style>
    .tab-control {
        display: flex;
        text-align: center;
        background-color: #fff;
        
    }
    .tab-control-item {
        flex: 1;
        height: 40px;
        line-height: 40px;
    }
     .tab-control-item span {
         padding: 5px;
     }
    .active {
        color: hotpink;
    }
    .active span {
        border-bottom: 2px solid hotpink;
    }
</style>