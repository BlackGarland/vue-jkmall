<template>
	<view class="goods">
		<swiper indicator-dots>
			<swiper-item v-for="item in lunboinfo" :key="item.src">
				<image :src="item.src"></image>
			</swiper-item>
		</swiper>
		<view class="good_info">
			<view class="price">
				<text>￥{{info.sell_price}}</text>
				<text>￥{{info.market_price}}</text>
			</view>
			<view class="goods_title">{{info.title}}</view>
			<view class="goods_title">货号：{{info.goods_no}}</view>
			<view class="goods_title">库存：{{info.stock_quantity}}</view>
		</view>
		<view class="good_detail">
			<view class="tit">详情介绍</view>
			<view class="content">
				<!-- #ifdef MP-WEIXIN -->
				<rich-text :nodes="content"></rich-text>
				<!-- #endif -->
				<!-- #ifdef MP-ALIPAY -->
				<rich-text :nodes="htmlNodes"></rich-text>
				<!-- #endif -->
			</view>
		</view>
		<view class="goods_nav">
		    <uni-goods-nav :fill="true" :button-group="buttonGroup"></uni-goods-nav>
		</view>
	</view>
</template>

<script>
	import {
		myRequest
	} from '@/utils/zgrequest.js'
	import {
		formatRichText
	} from '@/utils/format.js'
	import parse from '@/utils/htmlparser.js';
	import uniGoodsNav from '@/components/uni/uni-goods-nav/uni-goods-nav.vue'
	export default {
		components: {
			uniGoodsNav
		},
		data() {
			return {
				id: 0,
				lunboinfo: [],
				info: {},
				content: {},
				htmlNodes: [],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			}
		},
		onLoad(options) {
			this.id = options.id
			this.getDetail()
			this.getDetailInfo();
			this.getDetailContent();
		},
		methods: {
			async getDetail() {
				const res = await myRequest({
					url: '/api/getthumimages/' + this.id
				})
				this.lunboinfo = res.message
			},
			async getDetailInfo() {
				const res = await myRequest({
					url: '/api/goods/getinfo/' + this.id
				})
				this.info = res.message[0]
			},
			async getDetailContent() {
				const res = await myRequest({
					url: '/api/goods/getdesc/' + this.id
				})
				this.content = formatRichText(res.message[0].content)
				//#ifdef MP-ALIPAY
				//支付宝小程序rich-text不支持字符串，需要是nodes数组
				this.htmlNodes = parse(this.content)
				//#endif
			}
		}
	}
</script>

<style lang="scss">
	.goods {
		swiper {
			height: 700rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.good_info {
			padding: 10px;

			.price {
				font-size: 35rpx;
				color: pink;
				line-height: 80rpx;

				text:nth-child(2) {
					color: #ccc;
					font-size: 28rpx;
					text-decoration: line-through;
					margin-left: 20rpx;
				}
			}

			.goods_title {
				font-size: 32rpx;
				line-height: 60rpx;
			}
		}

		.good_detail {
			padding-bottom: 50px;

			.tit {
				font-size: 32rpx;
				padding-left: 10px;
				border-bottom: 1px solid #eee;
				line-height: 70rpx;
			}

			.content {
				padding: 10px;
				font-size: 28rpx;
				color: #333;
				line-height: 50rpx;
			}
		}
		.goods_nav {
		    position: fixed;
		    bottom:0;
		    width: 100%;
		}
	}
</style>
