<template>
	<view class="pics">
		<!--左边栏scroll-view-->
		<scroll-view class="left" scroll-y>
			<view @click="leftClickHandle(index,item.id)" :class="active===index?'active':''" v-for="(item,index) in cates" :key="item.id">
				{{item.title}}
			</view>
		</scroll-view>
		<!--右边栏scroll-view-->
		<scroll-view class="right" scroll-y>
			<view class="item" v-for="item in secondData" :key="item.id">
				<!--预览图片-->
				<image @click="previewImg(item.img_url)" :src="item.img_url"></image>
				<text>{{item.title}}</text>
			</view>
			<text v-if="secondData.length === 0">暂无数据</text>
		</scroll-view>
	</view>
</template>


<script>
	import {
		myRequest
	} from '@/utils/zgrequest.js'
	export default {
		data() {
			return {
				//分类数据
				cates: [],
				//当前激活的分类
				active: 0,
				//分类详情数据
				secondData: []
			}
		},
		//获取分类数据
		created() {
			this.getPicsCate()
		},
		methods: {
			async getPicsCate() {
				const res = await myRequest({
					url: '/api/getimgcategory'
				})
				this.cates = res.message
				//默认让第一个分类选中
				this.leftClickHandle(0, this.cates[0].id)
			},
			//点击分类展开分类详情数据
			async leftClickHandle(index, id) {
				this.active = index
				// 获取右侧的数据
				const res = await myRequest({
					url: '/api/getimages/' + id
				})
				this.secondData = res.message
			},
			//预览图片
			previewImg(current) {
				//获取预览图片的数组
				const urls = this.secondData.map(item => {
					return item.img_url
				})
				//预览图片  current表示当前显示的图片，urls表示所有的图片数组
				uni.previewImage({
					current,
					urls
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.pics {
		height: 100%;
		display: flex;

		.left {
			width: 200rpx;
			height: 100%;
			border-right: 1px solid #eee;

			view {
				height: 60px;
				line-height: 60px;
				color: #333;
				text-align: center;
				font-size: 30rpx;
				border-top: 1px solid #eee;
			}

			.active {
				background: pink;
				color: #fff;
			}
		}

		.right {
			height: 100%;
			width: 520rpx;
			margin: 10rpx auto;

			.item {
				image {
					width: 520rpx;
					height: 520rpx;
					border-radius: 5px;
				}

				text {
					font-size: 30rpx;
					line-height: 60rpx;
				}
			}
		}
	}
</style>