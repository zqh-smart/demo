<template>
	<div id="user">
		<el-form :inline="true" :model="titleForm" class="myform">
			<el-form-item label="标题">
				<el-input v-model="titleForm.title" placeholder="标题"> <i slot="prefix"
						class="el-input__icon el-icon-search"></i></el-input>
			</el-form-item>
			<el-form-item>
				<button type="button" class="query-btn" @click="query()">
					<i class="el-icon-search"></i>
					查询
				</button>
			</el-form-item>
		</el-form>

		<button type="button" class="add-btn" @click="addHandle">新增 +</button>
		<el-table :data="knowData" height="460" border style="width: 100%" :header-cell-style="{textAlign: 'center'}"
			:cell-style="{textAlign: 'center'}">
			<el-table-column prop="" label="" width="40">
				<template slot-scope="scope">
					<div class="item"></div>
				</template>
			</el-table-column>
			<el-table-column type="index" label="索引" width="60">
			</el-table-column>
			<el-table-column prop="title" label="标题" width="180">
			</el-table-column>
			<el-table-column label="图片" width="180">
				<template slot-scope="scope">
					<el-image style="width: 100px; height: 100px" :src="scope.row.thumb" fit="fill"></el-image>
				</template>
			</el-table-column>
			<el-table-column prop="intro" label="简述" width="300">
			</el-table-column>
			<el-table-column prop="collectNum" label="收藏数" width="80"></el-table-column>
			<el-table-column prop="discussNum" label="讨论数" width="80">
			</el-table-column>
			<el-table-column label="操作" width="296">
				<template slot-scope="scope">
					<el-button @click="crudHandle(scope.row)" type="text" icon="el-icon-edit" class="btn-item edit-btn">
						编辑</el-button>
					<el-button type="text" @click="deleteHandle(scope.row.id)" icon="el-icon-delete" class="btn-item">删除
					</el-button>
				</template>
			</el-table-column>
		</el-table>

		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
			:current-page="currentIndex" :page-sizes="[10,20,30]" :page-size="pageSize"
			layout="total, sizes, prev, pager, next, jumper" :total="totaldata" style="margin-top: 14px;">
		</el-pagination>

		<el-dialog title="添加知识" :visible.sync="addDialog" :width="'800px'">
			<el-form :model="policyInfo" :rules="rules" ref="userInfo" :inline="true" class="info-form">
				<el-form-item label="标题" prop="title">
					<el-input v-model="policyInfo.title" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="简述" prop="intro">
					<el-input v-model="policyInfo.intro" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="内容" prop="content">
					<el-input v-model="policyInfo.content" style="width: 600px;" type="textarea" autocomplete="off">
					</el-input>
				</el-form-item>
				<el-form-item label="图片" prop="thumb">
					<el-upload class="avatar-uploader" action="#" :show-file-list="false" :http-request="addthumb">
						<el-image v-if="policyInfo.thumb != ''" :src="policyInfo.thumb" class="avatar"
							style="width: 80px; height: 80px" fit="fill"></el-image>
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
				<el-form-item class="footer">
					<div class="btn-wrap">
						<el-button @click="cancleHandle()">取 消</el-button>
						<el-button type="primary" @click="addUserHandle('userInfo')">确 定</el-button>
					</div>

				</el-form-item>
			</el-form>
		</el-dialog>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				edit: false,
				addDialog: false,
				titleForm: {
					title: ''
				},
				knowData: [],
				policyInfo: {
					title: '',
					collectNum: 0,
					discussNum: 0,
					thumb: '',
					content: '',
					intro: '',
				},
				rules: {
					title: [{
						required: true,
						message: '请输入标题',
						trigger: 'blur'
					}, ],
					desc: [{
						required: true,
						message: '请输入简介',
						trigger: 'blur'
					}, ],
					content: [{
						required: true,
						message: '请输入内容',
						trigger: 'blur'
					}, ],
					thumb: [{
						required: true,
						message: '请输入内容',
						trigger: 'blur'
					}]
				},
				userData: null,
				totaldata: 0,
				pageSize: 9,
				currentIndex: 1,

			}
		},
		mounted() {
			this.getData();
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
				this.policyInfo.thumb = res.data.data.picture;
			},
			async getData() {
				const res = await this.$http.get(
					`/knowledge/queryAll?page=${this.currentIndex}&size=${this.pageSize}`)
				console.log(res);
				this.knowData = res.data.data.list;
				this.totaldata = res.data.data.total;
				console.log(this.knowData);

			},
			async query() {
				if (this.titleForm.title === '') {
					this.getData();
					return;
				}
				const res = await this.$http.get(`/knowledge/queryTitle?title=${this.titleForm.title}`)
				this.knowData = res.data.data.list;
				this.totaldata = res.data.data.total;
				console.log(this.policyData);
			},
			addHandle() {
				this.addDialog = !this.addDialog;
			},
			async crudHandle(data) {
				console.log(data);
				this.edit = true;
				this.addDialog = !this.addDialog;
				this.policyInfo = data;
			},
			async deleteHandle(id) {
				console.log(id);
				let username = JSON.parse(localStorage.getItem('info')).username;
				const res = await this.$http.get(`/knowledge/admin/delete?id=${id}`, {
					headers: {
						'username': `${username}`
					}
				});
				this.$message.success(res.data.msg)
				this.getData()
			},
			cancleHandle() {
				this.addDialog = !this.addDialog;
				this.policyInfo = {
					title: '',
					collectNum: 0,
					discussNum: 0,
					thumb: '',
					content: '',
					intro: '',
				}
			},
			handleSizeChange(val) {},
			handleCurrentChange(index) {
				console.log(this.currentIndex)
				this.currentIndex = index;
				console.log(this.currentIndex);
				this.getData();
			},
			addUserHandle(formName) {
				console.log(formName);
				this.$refs[formName].validate((valid) => {
					if (valid) {
						if (this.edit) {
							this.editPolicyInfo()
						} else {
							this.addPolicyInfo()
						}
						this.getData();
					} else {

					}
				});
			},
			//添加用户信息
			async addPolicyInfo() {
				let username = JSON.parse(localStorage.getItem('info')).username;
				const res = await this.$http.post(`/knowledge/admin/add`, this.policyInfo, {
					headers: {
						'username': `${username}`
					}
				});
				if (res.data.code === 0) {

					this.$message.success(res.data.msg);
				} else {
					this.$message.error(res.data.msg);
				}
				this.policyInfo = {
					title: '',
					collectNum: 0,
					discussNum: 0,
					thumb: '',
					content: '',
					intro: '',
				}
				this.addDialog = !this.addDialog;
			},
			//编辑用户信息
			async editPolicyInfo() {

				const res = await this.$http.post(`/knowledge/admin/update`, this.policyInfo);
				console.log(res);
				if (res.data.code === 0) {
					this.$message.success(res.data.msg);
				}else{
					this.$message.error(res.data.msg);
				}
				this.policyInfo = {
					title: '',
					collectNum: 0,
					discussNum: 0,
					thumb: '',
					content: '',
					intro: '',
				}
				this.edit = false;
				this.addDialog = !this.addDialog;
			}
		}
	}
</script>

<style scoped="scoped">
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

	.avatar-uploader {
		height: 80px;
		width: 80px;
		border: 1px solid #ccc;
		text-align: center;
		line-height: 80px;
	}
</style>
