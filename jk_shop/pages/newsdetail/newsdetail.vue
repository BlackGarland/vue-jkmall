<template>
	<view class="news_detail">
		<view class="news_title">
			{{newsDetail.title}}
		</view>
		<view class="info">
			<text>发表时间：{{newsDetail.add_time|formatDate}}</text>
			<text>浏览：{{newsDetail.click}}</text>
		</view>
		<view class="content">
			<!-- #ifdef MP-WEIXIN -->
			<rich-text :nodes="newsDetail.content"></rich-text>
			<!-- #endif -->
			<!-- #ifdef MP-ALIPAY -->
			<rich-text :nodes="htmlNodes"></rich-text>
			<!-- #endif -->
		</view>
	</view>
</template>

<script>
	import {
		myRequest
	} from '@/utils/zgrequest.js'
	import parse from '@/utils/htmlparser.js';
	export default {
		data() {
			return {
				newsDetail: {},
				htmlNodes: []
			}
		},
		filters: {
			formatDate(data) {
				const date = new Date(data)
				console.log(date)
				const day = date.getMonth().toString().padStart(2, '0') + '-' + date.getDay().toString().padStart(2, '0')
				return date.getFullYear() + '-' + day
			}
		},
		//从url中获取页面跳转的参数
		onLoad(options) {
			this.getNewsDetail(options.id)
		},
		methods: {
			async getNewsDetail(id) {
				const res = await myRequest({
					url: '/api/getnew/' + id
				})
				this.newsDetail = res.message[0]

				//#ifdef MP-ALIPAY
				//支付宝小程序rich-text不支持字符串，需要是nodes数组
				this.htmlNodes = parse(this.newsDetail.content)
				//#endif
				

			}
		}
	}
</script>

<style lang="scss">
	.news_detail {
		padding: 15rpx;

		.news_title {
			text-align: center;
			font-size: 35rpx;
			font-weight: 800;
			padding: 15rpx;
		}

		.info {
			font-size: 28rpx;
			display: flex;
			justify-content: space-between;
			padding: 15rpx;
		}

		.content {
			padding: 15rpx;
			font-size: 28rpx;
			color: gray;
		}
	}
</style>
