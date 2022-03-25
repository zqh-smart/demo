<template>
	<div id="waring">
		<el-breadcrumb separator="/">
		  <el-breadcrumb-item :to="{ path: '/admin/background/about' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item>预警管理</el-breadcrumb-item>
		</el-breadcrumb>
		<el-table :data="allData" height="460" border style="width: 100%;margin-top: 20px;" :header-cell-style="{textAlign: 'center'}"
			:cell-style="{textAlign: 'center'}">
			<el-table-column prop="" label="*" width="40">
				<template slot-scope="scope">
					<div class="item"></div>
				</template>
			</el-table-column>
			<el-table-column prop="initiator" label="申请人" width="140">
			</el-table-column>
			<el-table-column prop="handler" label="处理人" width="140">
			</el-table-column>
			<el-table-column prop="dealTime" label="处理时间" width="300">
			</el-table-column>
			<el-table-column label="操作" width="400">
				<template slot-scope="scope">
					<div class="btn-list-wrap">
						<el-button @click="crudHandle(scope.row)" type="text" class="btn-item btn1">批准</el-button>
						<el-button @click="detailHandle(scope.row)" type="text" class="btn-item btn2">详情</el-button>
					</div>

				</template>
			</el-table-column>
		</el-table>

		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
			:current-page="currentIndex" :page-sizes="[9,18,27]" :page-size="size"
			layout="total, sizes, prev, pager, next, jumper" :total="totaldata" style="margin-top: 20px;">
		</el-pagination>

		<div class="dialog-wrap" v-if="dialogVisible">
			<div class="mask-wrap" @click="dialogVisible = false"></div>
			<div class="dialog-content">
				<el-form :model="detailForm" :inline="true" class="detail-form">
					<el-form-item label="申请人">
						<el-input v-model="detailForm.initiator" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="返乡时间">
						<el-input v-model="detailForm.backTime" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="出发地">
						<el-input v-model="detailForm.starting" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="出行方式">
						<el-input v-model="detailForm.goaway" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="目的地">
						<el-input v-model="detailForm.ending" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="是否发烧">
						<el-select v-model="detailForm.risk" placeholder="请选择">
							<el-option v-for="item in feverOptions" style="width: 160px;" :key="item.value" :label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="目的地凭证">
						<el-image v-model="detailForm.proof" style="width: 200px; height: 100px" fit="fill"></el-image>
					</el-form-item>
					<el-form-item label="申请时间">
						<el-date-picker style="width: 400px;" v-model="detailForm.createTime" type="datetime"
							placeholder="选择日期时间">
						</el-date-picker>
					</el-form-item>
				</el-form>
				<span class="dialog-footer">
					<el-button type="primary" @click="savehandle">保存</el-button>
				</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				time: '',
				dialogVisible: false,
				detailForm: null,
				userform: {
					username: '',
					eamil: '',
				},
				allData: [],
				totaldata: 0,
				currentIndex: 1,
				size: 9,
				detailData: {}
			}
		},
		mounted() {
			this.getAllData();
		},
		methods: {
			query() {
				console.log(1);
			},
			async getAllData() {
				const res = await this.$http.get(
					`/apply/admin/queryRiskAll?page=${this.currentIndex}&size=${this.size}`);
				console.log(res);
				this.totaldata = res.data.data.total;
				this.allData = res.data.data.list;
				console.log(this.allData)
			},
			addHandle() {

			},
			crudHandle(data) {
				console.log(data);
			},
			deleteHandle(data) {},
			detailHandle(data) {
				if (!this.dialogVisible) {
					this.dialogVisible = !this.dialogVisible;
					this.detailForm = data;
					console.log('detail');
				}
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},

			savehandle() {
				console.log('save');
				this.dialogVisible = false
			}

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
