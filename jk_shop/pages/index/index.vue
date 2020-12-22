<template>
	<view class="home">
		<swiper class="swiper" indicator-dots :autoplay="true" :interval="2000" circular>
			<swiper-item v-for="item in swipers" :key="item.id">
				<image :src="item.img"></image>
			</swiper-item>
		</swiper>
		<uni-grid :column="4">
		    <uni-grid-item v-for="(item,index) in navs" :key="index">
		        <view :class="item.icons" @click="goNavigator(item)"></view>
		        <text>{{item.title}}</text>
		    </uni-grid-item>
		</uni-grid>
		<view class="hot_goods">
			<view class="tit">推荐商品</view>
			<goodsList :goods="goods"></goodsList>
		</view>
	</view>
</template>

<script>
	import uniBadge from "@/components/uni/uni-badge/uni-badge.vue";
	import uniGrid from "@/components/uni/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni/uni-grid-item/uni-grid-item.vue"
	
	import goodsList from "@/components/goodlist/goodlist.vue"
	import {
		myRequest
	} from '@/utils/zgrequest.js'
	export default {
		components: {
			uniBadge,
			uniGrid,
			uniGridItem,
			goodsList
		},
		data() {
			return {
				swipers: [],
				goods: [],
				navs: [{
						icons: "iconfont icon-ziyuan",
						title: "极客超市",
						path: "/pages/goods/goods"
					},
					{
						icons: "iconfont icon-tupian",
						title: "社区图片",
						path: "/pages/pics/pics"
					},
					{
						icons: "iconfont icon-guanyuwomen",
						title: "联系我们",
						path: "/pages/contact/contact"
					},
					{
						icons: "iconfont icon-shipin",
						title: "学习视频",
						path: "/pages/videos/videos"
					}
				]
			}
		},
		created() {
			this.getSwipers();
			this.getGoods();
		},
		methods: {
			async getSwipers() {
				const res = await myRequest({
					method: 'GET',
					url: '/api/getlunbo'
				})
				this.swipers = res.message
			},
			async getGoods() {
				const res = await myRequest({
					url: '/api/getgoods?pageindex=1'
				})
				this.goods = res.message
			},
			goNavigator(item) {
			    console.log("goNavigator",item)
			    uni.navigateTo({
			        url:item.path
			    })
			}
		}
	}
</script>

<style lang="scss">
	.home {
		swiper {
			height: 380rpx;

			image {
				width: 750rpx;
				height: 380rpx;
			}
		}

		.uni-grid {
			text-align: center;

			.uni-grid-item {
				.iconfont {
					background: pink;
					line-height: 120rpx;
					width: 120rpx;
					height: 120rpx;
					border-radius: 90px;
					margin: 10px auto;
					font-size: 25px;
				}
			}
		}

		.hot_goods {
			background: #eee;

			.tit {
				border-top: 2px solid #eee;
				border-bottom: 2px solid #eee;
				margin-top: 20px;
				margin-bottom: 3px;
				color: blue;
				height: 50px;
				line-height: 50px;
				text-align: center;
				letter-spacing: 20px;
				background: #fff;
			}

			.goods_list {
				display: flex;
				padding: 0 15rpx;
				justify-content: space-between;
				overflow: hidden;
				flex-wrap: wrap;

				.goods_item {
					width: 355rpx;
					margin-bottom: 15rpx;
					background: #fff;
					padding: 10px;
					box-sizing: border-box;

					image {
						height: 150px;
						width: 100%;
						mix-width: 160px;
						margin: 10px auto;
					}

					.price {
						font-size: 18px;
						color: red;
						padding: 8px 0;

						text:nth-child(2) {
							color: #ccc;
							text-decoration: line-through;
							margin-left: 10px;
							font-size: 13px;
						}
					}

					.name {
						font-size: 14px;

					}
				}
			}
		}
	}
</style>
