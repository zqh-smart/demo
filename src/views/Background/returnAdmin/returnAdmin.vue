<template>
	<div id="return">
		<el-form :inline="true" :model="userform" class="myform">
			<el-form-item label="标题">
				<el-input v-model="userform.username" placeholder="标题"> <i slot="prefix"
						class="el-input__icon el-icon-search"></i></el-input>
			</el-form-item>
			<el-form-item>
				<button type="button" class="query-btn">
					<i class="el-icon-search"></i>
					查询
				</button>
			</el-form-item>
		</el-form>
		<el-table :data="allData" height="460" border style="width: 100%" :header-cell-style="{textAlign: 'center'}"
			:cell-style="{textAlign: 'center'}">
			<el-table-column prop="" label="" width="40">
				<template slot-scope="scope">
					<div class="item"></div>
				</template>
			</el-table-column>
			<el-table-column type="index" label="索引" width="40">
			</el-table-column>
			<el-table-column prop="initiator" label="申请人" width="140">
			</el-table-column>
			<el-table-column prop="starting" label="出发地" width="140">
			</el-table-column>
			<el-table-column prop="ending" label="目的地" width="140">
			</el-table-column>
			<el-table-column prop="backTime" label="返乡时间" width="200">
			</el-table-column>
			<el-table-column label="是否发烧" width="120">
				<template slot-scope="scope">
					<div>{{scope.row.hasFever === 1 ? '是' : '否'}}</div>
				</template>
			</el-table-column>
			<el-table-column prop="goaway" label="出行方式" width="120"></el-table-column>
			<el-table-column prop="createTime" label="申请时间" width="200"></el-table-column>
			<!-- <el-table-column label="目的地凭证" width="120">
				<template slot-scope="scope">
					<el-image style="width: 100px; height: 100px" :src="scope.row.proof" fit="fill"></el-image>
				</template>
			</el-table-column> -->
			<el-table-column label="操作" width="296">
				<template slot-scope="scope">
					<div class="btn-list-wrap">
						<el-button v-show="scope.row.state === 1" disabled="" type="text" class="btn-item btn1">已批准
						</el-button>
						<el-button v-show="scope.row.state === 2" disabled="" type="text" class="btn-item btn3">已驳回
						</el-button>
						<el-button v-show="scope.row.state === 0" @click="crudHandle(scope.row)" type="text"
							class="btn-item btn1">批准</el-button>
						<el-button @click="detailHandle(scope.row.id)" type="text" class="btn-item btn2">详情</el-button>
						<el-button v-show="scope.row.state === 0" type="text" @click="deleteHandle(scope.row.id)"
							class="btn-item btn3">驳回</el-button>
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
							<el-option v-for="item in feverOptions" :key="item.value" :label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<!-- <el-form-item label="目的地凭证">
						<el-upload class="avatar-uploader" action="#" :show-file-list="false" :http-request="addthumb">
							<el-image v-if="detailForm.proof != ''" :src="detailForm.proof" class="avatar"
								style="width: 200px; height: 120px" fit="fill"></el-image>
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item> -->
					<el-form-item label="申请时间">
						<el-date-picker style="width: 400px;" v-model="detailForm.createTime" type="datetime"
							placeholder="选择日期时间">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="处理人">
						<el-input v-model="detailForm.handler" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="是否预警">
						<el-select v-model="detailForm.risk" placeholder="请选择">
							<el-option v-for="item in options" :key="item.value" :label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="处理意见">
						<el-input v-model="detailForm.opinion" type="textarea" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="处理时间">
						<el-date-picker style="width: 206px;" v-model="detailForm.dealTime" type="datetime"
							placeholder="选择日期时间">
						</el-date-picker>
					</el-form-item>
				</el-form>
				<span class="dialog-footer">
					<el-button type="primary" @click="savehandle">保存</el-button>
				</span>
			</div>
		</div>
		<el-dialog title="友情提示" :visible.sync="deleteDialog" width="30%">
			<div style="margin-bottom: 30px; color: red; font-size: 20px; text-align: center;">你确定要驳回该申请</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="deleteDialog = false">取 消</el-button>
				<el-button type="primary" @click="deletedata()">确 定</el-button>
			</span>
		</el-dialog>

		<el-dialog title="是否批准" :visible.sync="approvalDialog" width="30%">
			<div style="margin-bottom: 30px; color: red; font-size: 20px; text-align: center;">你确定要批准该申请</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="approvalDialog = false">取 消</el-button>
				<el-button type="primary" @click="approval()">确 定</el-button>
			</span>
		</el-dialog>


	</div>
</template>

<script>
	export default {
		data() {
			return {
				feverOptions: [{
						value: 1,
						label: '是'
					},
					{
						value: 0,
						label: '否'
					}
				],
				options: [{
					value: 0,
					label: '无风险'
				}, {
					value: 1,
					label: '低风险'
				}, {
					value: 2,
					label: '中风险'
				}, {
					value: 3,
					label: '高风险'
				}],
				time: '',
				dialogVisible: false,
				approvalDialog: false,
				detailForm: null,
				userform: {
					username: '',
					eamil: '',
				},
				totaldata: 0,
				currentIndex: 1,
				size: 9,
				allData: [],
				deleteDialog: false,
				deleteId: '',
				aprovalInfo: null,
			}
		},
		mounted() {
			this.getAllData()
		},
		methods: {
			async addthumb(data) {
				console.log(data)
				let file = data.file
				console.log(file);
				let formData = new window.FormData();
				formData.append('file', file);
				const res = await this.$http.post(`/file/uploadPicture`, formData, {
					hearders: {
						'Content-Type': 'multipart/form-data' //注意这里
					}
				});
				console.log(res);
				this.detailForm.proof = res.data.data.picture;
				console.log(this.detailForm.proof)
			},
			async getAllData() {
				const res = await this.$http.get(`/apply/queryAll?page=${this.currentIndex}&size=${this.size}`);
				console.log(res);
				this.allData = res.data.data.list;
				this.totaldata = res.data.data.total;
				console.log(this.allData);
			},
			query() {
				console.log(1);
			},
			addHandle() {

			},
			//打开批准 对话框
			crudHandle(data) {
				console.log(data);
				this.aprovalInfo = {
					id: data.id,
					risk: data.risk,
					opinion: data.opinion
				}

				this.approvalDialog = true;
			},
			//批准申请
			async approval() {
				const handler = JSON.parse(localStorage.getItem('info')).username;
				console.log(this.aprovalInfo);
				const res = await this.$http.get(
					`/apply/deal?id=${this.aprovalInfo.id}&handler=${handler}&risk=${this.aprovalInfo.risk}&opinion=${this.aprovalInfo.opinion}&state=1`
				)
				console.log(res);
				if (res.data.code === 0) {
					this.$message.success(res.data.msg);
				}
				this.getAllData()
				this.approvalDialog = false;
				this.aprovalInfo = {}
			},

			//打开 驳回 对话框
			deleteHandle(id) {
				this.deleteId = id;
				this.deleteDialog = true;
				console.log(this.deleteDialog, this.deleteId)
			},
			//驳回申请
			async deletedata() {
				const res = await this.$http.get(`/apply/admin/delete?id=${this.deleteId}`);
				console.log(res);
				if (res.data.code === 0) {
					this.$message.success(res.data.msg);
				}
				this.getAllData()
				this.deleteDialog = false
				this.deleteId = '';
			},

			//查询申请 详情 信息  并打开详情对话框
			async detailHandle(id) {
				console.log(id);


				const res = await this.$http.get(`/apply/query?id=${id}`);
				console.log(res);

				this.detailForm = res.data.data.info;
				this.dialogVisible = true;
				if (this.detailForm.opinion == "undefined") {
					this.detailForm.opinion = '';
				}
				console.log(this.detailForm);



			},
			//改变 每页条数
			handleSizeChange(val) {
				this.size = val;
				this.getAllData();
				console.log(this.size);
			},
			//改变 页码
			handleCurrentChange(val) {
				this.currentIndex = val;
				this.getAllData();
				console.log(this.size)
			},
			// 更新详情 信息   并更新 当前页面的信息
			async savehandle() {
				console.log(this.detailForm);
				if(this.detailForm.dealTime){
					this.detailForm.dealTime = this.changeTime(this.detailForm.dealTime)
				}
				const res = await this.$http.post(`/apply/admin/update?`, this.detailForm);
				console.log(res);
				if (res.data.code === 0) {
					this.$message.success(res.data.msg);
				} else {
					this.$message.error(res.data.msg);
				}
				this.getAllData()
				this.dialogVisible = false
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

<style>
	#return {
		position: relative;
	}

	.myform {
		margin-bottom: 20px;
	}

	.dialog-wrap {
		z-index: 999;
	}

	.mask-wrap {
		position: absolute;
		top: 0;
		cursor: pointer;
		width: 100%;
		height: 100%;
		border: 1px solid #ccc;
		background-color: #ccc;
		opacity: 0.2;
	}

	.dialog-content {
		position: absolute;
		width: 900px;
		height: 560px;
		z-index: 999;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
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

	.btn-item {
		padding: 6px 14px;
		background-color: #FD834D;
		color: #fff;
	}

	.edit-btn {
		background-color: #4F7D94;
		margin-right: 40px;
	}

	.el-form-item {
		margin-bottom: 10px !important;
	}

	.dialog-content .el-input,
	.dialog-content .el-input__inner {
		height: 25px !important;
		/* line-height: 25px; */
	}

	.dialog-content .el-input__icon {
		height: 40px !important;
	}

	.btn-item {
		padding: 6px 14px;
		color: #fff;
	}

	.btn-list-wrap {
		display: flex;
		justify-content: space-between;
	}

	.btn1 {
		background-color: #FD834D;
	}

	.btn2 {
		background-color: #38f;
	}

	.btn3 {
		background-color: #f40;
	}
</style>
