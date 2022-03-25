module.exports = {
		devServer: {
			proxy: {
				'/api': {
					//目标路径
					target: 'http://127.0.0.1:9090/system/',
					changOrigin: true,
					pathRewrite: {
						// '^/api' : '/mock/534428'
						'^/api': ''

					},
				}
			}
		},
	}
