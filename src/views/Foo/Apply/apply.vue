<template>
	<div id="apply">
		<div v-if="myDate != null" class="">
			<el-table :data="myDate" border style="width: 100%" :header-cell-style="{textAlign: 'center'}"
				:cell-style="{textAlign: 'center'}">
				<el-table-column prop="createTime" label="申请时间" width="200">
				</el-table-column>
				<el-table-column prop="backTime" label="返乡时间" width="200">
				</el-table-column>
				<el-table-column prop="starting" label="出发地" width="80">
				</el-table-column>
				<el-table-column prop="ending" label="目的地" width="80">
				</el-table-column>
				<el-table-column prop="goaway" label="出行方式" width="80">
				</el-table-column>
				<!-- <el-table-column label="用户凭证" width="120">
					<template slot-scope="scope">
						<el-image style="width: 100px; height: 100px" :src="scope.row.proof" fit="fill"></el-image>
					</template>
				</el-table-column> -->
				<el-table-column label="申请状态" width="120">
					<template slot-scope="scope">
						<span>{{stateApply}}</span>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div v-else class="detail-form">
			<div class="form-item">
				<span class="input-label">申请人</span>
				<input class="my-input" type="text" disabled="" v-model="detailForm.handler" name="" />
			</div>
			<div class="form-item">
				<span class="input-label">返乡时间</span>
				<el-date-picker style="width: 200px;" v-model="detailForm.backTime" type="date" placeholder="选择日期时间">
				</el-date-picker>
			</div>
			<div class="form-item">
				<span class="input-label">出发地</span>
				<input class="my-input" type="text" v-model="detailForm.starting" name="" />
			</div>
			<div class="form-item">
				<span class="input-label">出行方式</span>
				<input class="my-input" type="text" v-model="detailForm.goaway" name="" />
			</div>
			<div class="form-item">
				<span class="input-label">目的地</span>
				<input class="my-input" type="text" v-model="detailForm.ending" name="" />
			</div>
		</div>
		<el-button v-show="!myDate" type="primary" class="btn" @click="addApply()">提交申请</el-button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				myDate: null,
				detailForm: {
					handler: '',
					initiator: '',
					backTime: '',
					starting: '',
					ending: '',
					goaway: ''
				},

				stateApply: '',
			}
		},
		mounted() {
			this.getDate();
			this.initDetailForm();
		},
		methods: {
			async getDate() {
				let id = JSON.parse(localStorage.getItem('info')).id;
				const res = await this.$http.get(`apply/queryMyRisk?uid=${id}&risk=0`);
				console.log(res);
				
				this.myDate = res.data.data.list
				console.log(this.myDate);
				if (this.myDate[0].state === 0) {
					this.stateApply = '未审批'
				} else if (this.myDate[0].state === 1) {
					this.stateApply = '审批通过'
				} else {
					this.stateApply = '驳回'
				}
			},
			async addApply() {
				console.log(this.detailForm.backTime);
				
				const res = await this.$http.post(`/apply/apply`, {
					initiator: this.detailForm.initiator,
					backTime: this.changeTime(this.detailForm.backTime),
					starting: this.detailForm.starting,
					ending: this.detailForm.ending,
					goaway: this.detailForm.goaway,
					handler: this.detailForm.handler
				});
				console.log(res);
				if (res.data.code === 0) {
					this.$message.success('申请提交成功，等待批准');
					this.getDate()
				}
			},
			initDetailForm() {

				let username = JSON.parse(localStorage.getItem('info')).username;
				let id = JSON.parse(localStorage.getItem('info')).id;
				this.detailForm.initiator = id;
				
				this.detailForm.handler = username;
			},
			changeTime(time) {

				let year = time.getFullYear()
				let month = time.getMonth() + 1
				let date = time.getDate()
				let hours = time.getHours()
				let minute = time.getMinutes()
				let second = time.getSeconds()

				if (month < 10) {
					month = '0' + month
				}
				if (date < 10) {
					date = '0' + date
				}
				if (hours < 10) {
					hours = '0' + hours
				}
				if (minute < 10) {
					minute = '0' + minute
				}
				if (second < 10) {
					second = '0' + second
				}
				return year + '-' + month + '-' + date + ' ' + hours + ':' + minute + ':' + second

			}
		}

	}
</script>

<style scoped="scoped">
	#apply {
		padding: 20px;
		position: relative;
	}

	.detail-form {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.form-item {
		display: flex;
		align-items: center;
		margin: 10px;
	}

	.form-item .input-label {
		margin-right: 5px;
	}

	.my-input {
		background: #fff;
		outline: none;
		border: 1px solid rgb(220, 223, 230);
		border-radius: 5px;
		padding: 4px 8px;
	}

	.btn {
		position: absolute;
		bottom: -80px;
		left: 400px;
	}
</style>
