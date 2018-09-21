<template>
  <el-tabs v-model="editableTabsValue2" type="card" closable @tab-remove="removeTab" class="fixed">
    <el-tab-pane
      v-for="(item) in editableTabs2"
      :key="item.name"
      :label="item.title"
      :name="item.name"
      @click="selectCard(item.name)"
    >
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import base from 'globalUtils/base'
export default {
  data () {
    return {
      editableTabsValue2: '1',
      editableTabs2: [{
        title: '白板1',
        name: '1'
      }],
      tabIndex: 1
    }
  },
  mounted () {
    base.data = {
      editableTabsValue2: '1'
    }
  },
  methods: {
    addTab (targetName) {
      let newTabName = ++this.tabIndex + ''
      this.editableTabs2.push({
        title: '白板' + newTabName,
        name: newTabName
      })
      this.editableTabsValue2 = newTabName
      this.tabIndex = +newTabName
    },
    removeTab (targetName) {
      let tabs = this.editableTabs2
      let activeName = this.editableTabsValue2
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }
      this.editableTabsValue2 = activeName
      this.$emit('changeActive', activeName)
      this.editableTabs2 = tabs.filter(tab => tab.name !== targetName)
    },
    selectCard (id) {
      base.emit('TAB_CHANGE', id)
      this.editableTabsValue2 = id
      this.tabIndex = +id
    }
  }
}
</script>
<style scoped>
.fixed{
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 200;
  background-color: #fff;
  height: 40px;
}
</style>
