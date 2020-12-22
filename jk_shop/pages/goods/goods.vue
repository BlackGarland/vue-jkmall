<template>
	<view class="hot_goods">
		<view class="tit">推荐商品</view>
		<goods-list :goods="goods"></goods-list>
		<view class="over_line" v-if="flag">----------我是有底线的----------</view>
	</view>
</template>
<script>
	import goodsList from "@/components/goodlist/goodlist.vue"
	import {
		myRequest
	} from '@/utils/zgrequest.js'
	export default {
		components: {
			goodsList
		},
		data() {
			return {
				goods: [],
				pageindex:1,
				flag:false
			}
		},
		created() {
			this.getGoods()
		},
		methods: {
			async getGoods(){
			    const res = await myRequest({
			    	url: `/api/getgoods?pageindex=${this.pageindex}`
				})
				this.goods = [...this.goods, ...res.message]
			},
			onReachBottom() {
			    this.pageindex++
			    this.getGoods()
			    if (this.pageindex > 2){
			        this.flag = true
			    } 
			},
			onPullDownRefresh() {
			    this.goods = []
			    this.pageindex = 1
			    this.flag = false 
			    this.getGoods().then(()=>{
			        uni.stopPullDownRefresh()
			    })
			}
		}
	}
</script>

<style lang="scss">
.hot_goods{
	text-align: center;
	.tit{
		font-size: 20px;
		font-weight: bold;
		padding: 10px;
	}
	
}
</style>

