<template>
	<div id="waring">
		<el-table :data="myDate" border style="width: 100%" :header-cell-style="{textAlign: 'center'}"
			:cell-style="{textAlign: 'center'}">
			<el-table-column prop="backTime" label="返乡时间" width="200">
			</el-table-column>
			<el-table-column prop="starting" label="出发地" width="80">
			</el-table-column>
			<el-table-column prop="ending" label="目的地" width="80">
			</el-table-column>
			<el-table-column prop="goaway" label="出行方式" width="80">
			</el-table-column>
			<el-table-column label="是否发烧" width="80">
				<template slot-scope="scope">
					<span>{{scope.row.hasFever === 0 ? '否': '是'}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="handler" label="处理人" width="80">
			</el-table-column>
			<el-table-column prop="dealTime" label="处理时间" width="200">
			</el-table-column>
			<el-table-column prop="opinion" label="处理意见" width="300">
			</el-table-column>
			<el-table-column label="预警状态" width="120">
				<template slot-scope="scope">
					<span>{{risk}}</span>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				myDate: null,
				risk: '',
			}
		},
		mounted() {
			this.getDate();
		},
		methods: {
			async getDate() {
				let id = JSON.parse(localStorage.getItem('info')).id;
				console.log(id)
				const res = await this.$http.get(`/apply/queryMyRisk?uid=${id}&risk=2`);
				console.log(res);
				if(res.data.data == undefined){
					return;
				}
				this.myDate = res.data.data.list;
				console.log(this.myDate);
				if (this.myDate[0].risk === 0) {
					this.risk = '无风险'
				} else if (this.myDate[0].risk === 1) {
					this.risk = '低风险'
				} else if (this.myDate[0].risk === 2) {
					this.risk = '中风险'
				} else {
					this.risk = '高风险'
				}
			},
		}
	}
</script>

<style scoped="scoped">
	#return {
		position: relative;
	}

	.dialog-wrap {
		z-index: 999;
	}

	.dialog-content {
		position: absolute;
		width: 900px;
		height: 560px;
		z-index: 999;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -45%);
		box-sizing: border-box;
		background-color: #fff;
		border: 20px solid #b8d8e7;
		padding: 20px 60px;

	}

	.detail-form {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.dialog-footer {
		position: absolute;
		bottom: 20px;
		left: 50%;
		transform: translateX(-50%);
	}

	.query-btn {
		background-color: #fd834d;
		padding: 10px 20px;
		border-radius: 5px;
		border: none;
		cursor: pointer;
		color: #fff;
		margin-left: 50px;
	}

	.query-btn:hover {
		background-color: #fd834d;
		transform: scale(1.05);
	}

	.add-btn {
		border: 1px solid #ccc;
		padding: 5px 20px;
		background-color: #fff;
		border-radius: 5px;
		margin-bottom: 20px;
		cursor: pointer;
	}

	.add-btn:hover {
		transform: scale(1.05);
	}

	.item {
		width: 10px;
		height: 10px;
		background-color: #fd834d;
		border-radius: 2px;
	}

	.info-form {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.footer {}

	.btn-wrap {
		/* border: 1px solid #ccc; */

		margin: 0 100px;
		margin-top: 20px;
		margin-bottom: -30px;
		width: 600px;
		display: flex;
		justify-content: space-between;
	}

	.btn-list-wrap {
		height: 60px;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.btn-item {
		padding: 10px 20px;
		height: 30px;
		background-color: #FD834D;
		color: #fff;
	}

	.btn1 {}

	.btn2 {}
</style>
