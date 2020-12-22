<template>
	<view>
		<uni-list>
			<uni-list-item v-for="item in newsList" :key="item.title" :thumb="item.img_url" thumb-size="lg" @click="goDetail(item)">
				<view class="item">
					<view class="tit">{{item.title}}</view>
					<view class="info">
						<text>发表时间：{{item.add_time|formatDate }}</text>
						<text>浏览：{{item.click+123}}次</text>
					</view>
				</view>

			</uni-list-item>
		</uni-list>
	</view>
</template>
<script>
	import uniList from "@/components/uni/uni-list/uni-list.vue";
	import uniListItem from "@/components/uni/uni-list-item/uni-list-item.vue"
	import {
		myRequest
	} from '@/utils/zgrequest.js'
	export default {
		components: {
			uniList,
			uniListItem
		},
		filters: {
			formatDate(data) {
				const date = new Date(data)
				console.log(date)
				const day = date.getMonth().toString().padStart(2, '0') + '-' + date.getDay().toString().padStart(2, '0')
				return date.getFullYear() + '-' + day
			}
		},
		data() {
			return {
				newsList: []
			}
		},
		created() {
			this.getNewsList()
		},
		methods: {
			async getNewsList() {
				const res = await myRequest({
					url: '/api/getnewslist'
				})
				this.newsList = res.message
				console.log(this.newsList)
			},
			goDetail(item){
				console.log("goDetail")
				uni.navigateTo({
					url:`../newsdetail/newsdetail?id=${item.id}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.item {
		padding: 5px 10px;
		position: relative;

		.tit {
			font-size: 35rpx;
			font-weight: 800;
		}

		.info {
			font-size: 26rpx;
			margin-top: 20rpx;

			text:nth-child(2) {
				margin-left: 20px;
			}
		}
	}
</style>
