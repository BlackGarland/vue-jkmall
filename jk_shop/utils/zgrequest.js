const baseUrl = "http://localhost:8082"

export const myRequest = (options)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			method: options.method,
			data: options.data,
			url: baseUrl+options.url,
			success(res) {
				if(res.data.status !== 0) {
					return uni.showToast({
						title: '获取数据失败'
					})
				}
				resolve(res.data)
			},
			fail(err) {
				uni.showToast({
					title: '获取数据失败'
				})
				reject(err)
			}
		})
	})
}
