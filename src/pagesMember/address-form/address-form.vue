<script setup lang="ts">
import { ref } from 'vue'
// 表单数据
const form = ref({
  receiver: '', // 收货人
  contact: '', // 联系方式
  fullLocation: '', // 省市区(前端展示)
  provinceCode: '', // 省份编码(后端参数)
  cityCode: '', // 城市编码(后端参数)
  countyCode: '', // 区/县编码(后端参数)
  address: '', // 详细地址
  isDefault: 0, // 默认地址，1为是，0为否
})
// 获取页面参数
const query = defineProps<{
  id?: string
}>()
// 动态设置标题
uni.setNavigationBarTitle({ title: query.id ? '修改地址' : '新建地址' })

import { PostMemberAddressApi } from '@/services/address'
const handleSubmit = () => {
  form.value.provinceCode = multiIndex.value.join(',')
  PostMemberAddressApi(form.value).then((res) => {
    uni.showToast({
      title: '提交成功',
      icon: 'none',
    })
  })
}
const cityList = ref(['江苏省', '南京市'])
const multiArray = ref([
  ['亚洲', '欧洲'],
  ['中国', '日本'],
  ['北京', '上海', '广州'],
])
const multiIndex = ref([0, 0, 0])
const bindMultiPickerColumnChange = (ev) => {
  multiIndex.value[ev.detail.column] = ev.detail.value
  switch (ev.detail.column) {
    case 0: //拖动第1列
      switch (multiIndex.value[0]) {
        case 0:
          multiArray.value[1] = ['中国', '日本']
          multiArray.value[2] = ['北京', '上海', '广州']
          break
        case 1:
          multiArray.value[1] = ['英国', '法国']
          multiArray.value[2] = ['伦敦', '曼彻斯特']
          break
      }
      multiIndex.value.splice(1, 1, 0)
      multiIndex.value.splice(2, 1, 0)
      break
    case 1: //拖动第2列
      switch (
      multiIndex.value[0] //判断第一列是什么
      ) {
        case 0:
          switch (multiIndex.value[1]) {
            case 0:
              multiArray.value[2] = ['北京', '上海', '广州']
              break
            case 1:
              multiArray.value[2] = ['东京', '北海道']
              break
          }
          break
        case 1:
          switch (multiIndex.value[1]) {
            case 0:
              multiArray.value[2] = ['伦敦', '曼彻斯特']
              break
            case 1:
              multiArray.value[2] = ['巴黎', '马赛']
              break
          }
          break
      }
      multiIndex.value.splice(2, 1, 0)
      break
  }
}
const handlePicker = (ev) => {
  form.value.fullLocation =
    multiArray.value[0][ev.detail.value[0]] +
    multiArray.value[1][ev.detail.value[1]] +
    multiArray.value[2][ev.detail.value[2]]
}
const handleSwitch: UniHelper.SwitchOnChange = (ev) => {
  form.value.isDefault = ev.detail.value ? 1 : 0
}
</script>
<template>
  <view class="content">
    <form>
      <!-- 表单内容 -->
      <view class="form-item">
        <text class="label">收货人</text>
        <input class="input" placeholder="请填写收货人姓名" v-model="form.receiver" />
      </view>
      <view class="form-item">
        <text class="label">手机号码</text>
        <input class="input" placeholder="请填写收货人手机号码" v-model="form.contact" />
      </view>
      <view class="form-item">
        <text class="label">所在地区</text>
        <picker mode="multiSelector" @change="handlePicker" @columnchange="bindMultiPickerColumnChange"
          :value="multiIndex" :range="multiArray">
          <view v-if="form.fullLocation" style="background-color: white">
            {{ multiArray[0][multiIndex[0]] }}， {{ multiArray[1][multiIndex[1]] }}，
            {{ multiArray[2][multiIndex[2]] }}
          </view>
          <view v-else>请选择</view>
        </picker>
      </view>
      <view class="form-item">
        <text class="label">详细地址</text>
        <input class="input" placeholder="街道、楼牌号等信息" v-model="form.address" />
      </view>
      <view class="form-item">
        <label class="label">设为默认地址</label>
        <switch @change="handleSwitch" class="switch" color="#27ba9b" :checked="form.isDefault === 1" />
      </view>
    </form>
  </view>
  <!-- 提交按钮 -->
  <button class="button" @tap="handleSubmit">保存并使用</button>
</template>

<style lang="scss">
page {
  background-color: #f4f4f4;
}

.content {
  margin: 20rpx 20rpx 0;
  padding: 0 20rpx;
  border-radius: 10rpx;
  background-color: #fff;

  .form-item,
  .uni-forms-item {
    display: flex;
    align-items: center;
    min-height: 96rpx;
    padding: 25rpx 10rpx 40rpx;
    background-color: #fff;
    font-size: 28rpx;
    border-bottom: 1rpx solid #ddd;
    position: relative;
    margin-bottom: 0;

    // 调整 uni-forms 样式
    .uni-forms-item__content {
      display: flex;
    }

    .uni-forms-item__error {
      margin-left: 200rpx;
    }

    &:last-child {
      border: none;
    }

    .label {
      width: 200rpx;
      color: #333;
    }

    .input {
      flex: 1;
      display: block;
      height: 46rpx;
    }

    .switch {
      position: absolute;
      right: -20rpx;
      transform: scale(0.8);
    }

    .picker {
      flex: 1;
    }

    .placeholder {
      color: #808080;
    }
  }
}

.button {
  height: 80rpx;
  margin: 30rpx 20rpx;
  color: #fff;
  border-radius: 80rpx;
  font-size: 30rpx;
  background-color: #27ba9b;
}
</style>
