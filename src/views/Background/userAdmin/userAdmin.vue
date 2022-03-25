<template>
	<div id="user">
		<el-form :inline="true" :model="userform" class="myform">
			<el-form-item label="用户名">
				<el-input v-model="userform.username" placeholder="用户名"> <i slot="prefix"
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
		<el-table :data="userData" height="460" border style="width: 100%" :header-cell-style="{textAlign: 'center'}"
			:cell-style="{textAlign: 'center'}">
			<el-table-column prop="" label="" width="40">
				<template slot-scope="scope">
					<div class="item"></div>
				</template>
			</el-table-column>
			<el-table-column type="index" label="索引" width="60">
			</el-table-column>
			<el-table-column prop="nickname" label="昵称" width="180">
			</el-table-column>
			<el-table-column prop="username" label="用户名" width="180">
			</el-table-column>
			<el-table-column prop="role" label="角色" width="180">
			</el-table-column>
			<el-table-column prop="email" label="邮箱" width="180">
			</el-table-column>
			<el-table-column label="头像" width="180">
				<template slot-scope="scope">
					<el-image style="width: 100px; height: 100px" :src="scope.row.avatar" fit="fill"></el-image>
				</template>
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

		<el-dialog title="添加用户" :visible.sync="addUserDialog" :width="'800px'">
			<el-form :model="userinfo" :rules="rules" ref="userInfo" :inline="true" class="info-form">
				<el-form-item label="用户名" prop="username">
					<el-input v-model="userinfo.username" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="昵称" prop="nickname">
					<el-input v-model="userinfo.nickname" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" prop="email">
					<el-input v-model="userinfo.email" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="角色">
					<el-radio-group v-model="userinfo.role" style="width: 500px; margin-left: 15px;">
						<el-radio label="customer">用户</el-radio>
						<el-radio label="admin">管理员</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="密码">
					<el-input v-model="userinfo.password" :disabled="true" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item style="width: 400px;">
				</el-form-item>
				<el-form-item label="头像" prop="avatar">
					<el-upload class="avatar-uploader" action="#" :http-request="addAvatar" :show-file-list="false">
						<el-image v-if="userinfo.avatar != ''" :src="userinfo.avatar" class="avatar"
							style="width: 80px; height: 80px" fit="fill"></el-image>
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>

					</el-input>
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
				addUserDialog: false,
				userinfo: {
					username: '',
					nickname: '',
					email: '',
					role: 'customer',
					password: '123456',
					avatar: ''
				},
				rules: {
					username: [{
						required: true,
						message: '请输入用户名',
						trigger: 'blur'
					}, ],
					nickname: [{
						required: true,
						message: '请输入昵称',
						trigger: 'blur'
					}, ],
					email: [{
						required: true,
						message: '请输入邮箱',
						trigger: 'blur'
					}, ],
					avatar: [{
						required: true,
						message: '请输入邮箱',
						trigger: 'blur'
					}]
				},
				userform: {
					username: '',
				},
				userData: null,
				totaldata: 0,
				pageSize: 9,
				currentIndex: 1,
				isAdd: true,

			}
		},
		mounted() {
			this.getUserData();
		},
		methods: {
			//添加图片
			async addAvatar(data) {
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
				this.userinfo.avatar = res.data.data.picture;
			},
			async getUserData() {
				const res = await this.$http.get(
					`/user/admin/queryAll?page=${this.currentIndex}&size=${this.pageSize}`)
				console.log(res);
				const {
					list,
					total
				} = res.data.data;
				this.userData = list;
				this.totaldata = total;
				console.log(list)

			},
			async query() {
				console.log(this.userform.username);
				if (this.userform.username === '') {
					this.$message.error('请输入用户名')
					return;
				}
				const res = await this.$http.get(`/user/admin/queryUsername?username=${this.userform.username}`)
				console.log(res);
				this.userData = res.data.data.list;
			},
			addHandle() {
				this.isAdd = true;
				this.addUserDialog = !this.addUserDialog;
			},
			cancleHandle() {
				this.userinfo = {
					username: '',
					nickname: '',
					email: '',
					role: 'customer',
					password: '123456',
					avatar: ''
				}
				this.addUserDialog = false;
			},
			async crudHandle(data) {
				// console.log(data);
				this.addUserDialog = !this.addUserDialog;
				this.userinfo = data;
				this.isAdd = false;
			},
			async deleteHandle(id) {
				console.log(id);
				const res = await this.$http.get(`/user/admin/delete?id=${id}`);
				this.$message.success(res.data.msg)
				this.getUserData()
			},

			handleSizeChange(val) {
				this.userform.username = '';
			},
			handleCurrentChange(index) {
				this.userform.username = '';
				console.log(this.currentIndex)
				this.currentIndex = index;
				console.log(this.currentIndex);
				this.getUserData();
			},
			addUserHandle(formName) {
				console.log(formName);
				this.$refs[formName].validate((valid) => {
					if (valid) {
						
						
						if (!this.isAdd) {
							this.editUserInfo();
						} else {
							this.addUserInfo();
						}
					} else {

					}
				});
			},
			//添加用户信息
			async addUserInfo() {
				const res = await this.$http.post(`/user/admin/add`, this.userinfo);
				console.log(res);
				if (res.data.code === 0) {
					this.userinfo = {
						username: '',
						nickname: '',
						email: '',
						role: 'customer',
						password: '123456',
						avatar: ''
					}
					
					this.$message.success(res.data.msg);
					this.getUserData();
				}else{
					this.$message.error(res.data.msg);
				}
				this.addUserDialog = !this.addUserDialog
			},
			//编辑用户信息
			async editUserInfo() {
				const res = await this.$http.post(`/user/update`, this.userinfo);
				if (res.data.code === 0) {
					this.userinfo = {
						username: '',
						nickname: '',
						email: '',
						role: 'customer',
						password: '123456',
						avatar: ''
					}
					this.addUserDialog = !this.addUserDialog;
					this.$message.success(res.data.msg);
				}
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
