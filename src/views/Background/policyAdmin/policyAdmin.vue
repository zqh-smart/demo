<template>
	<div id="policy">
		<el-form :inline="true" :model="policy" class="myform">
			<el-form-item label="标题">
				<el-input v-model="policy.title" placeholder="标题"> <i slot="prefix"
						class="el-input__icon el-icon-search"></i></el-input>
			</el-form-item>
			<el-form-item>
				<button type="button" class="query-btn"  @click="query()">
					<i class="el-icon-search"></i>
					查询
				</button>
			</el-form-item>
		</el-form>

		<button type="button" class="add-btn" @click="addHandle">新增 +</button>
		<el-table :data="policyData" height="400" border style="width: 100%" :header-cell-style="{textAlign: 'center'}"
			:cell-style="{textAlign: 'center'}">
			<el-table-column label="" width="40">
				<template slot-scope="scope">
					<div class="item"></div>
				</template>
			</el-table-column>
			<el-table-column type="index" label="索引" width="60">
			</el-table-column>
			<el-table-column prop="title" label="标题" width="140">
			</el-table-column>
			<el-table-column label="图片" width="140">
				<template slot-scope="scope">
					<el-image style="width: 100px; height: 100px" :src="scope.row.thumb" fit="fill"></el-image>
				</template>
			</el-table-column>
			<el-table-column prop="intro" label="简述" width="210">
			</el-table-column>
			<el-table-column prop="author" label="作者" width="140">
			</el-table-column>
			<el-table-column prop="markReader" label="已读人数" width="80"></el-table-column>
			<el-table-column prop="publishTime" label="发布日期" width="200"></el-table-column>
			<el-table-column label="操作" width="270">
				<template slot-scope="scope">
					<el-button @click="crudHandle(scope.row)" type="text" icon="el-icon-edit" class="btn-item edit-btn">
						编辑</el-button>
					<el-button type="text" @click="deleteHandle(scope.row.id)" icon="el-icon-delete" class="btn-item">删除
					</el-button>
				</template>
			</el-table-column>
		</el-table>

		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
			:current-page="currentIndex" :page-sizes="[10,20,30]" :page-size="10"
			layout="total, sizes, prev, pager, next, jumper" :total="totaldata" style="margin-top: 20px;">
		</el-pagination>

		<el-dialog title="添加政策" :visible.sync="addDialog" :width="'800px'">
			<el-form :model="newData" :rules="rules" ref="userInfo" :inline="true" class="info-form">
				<el-form-item label="标题" prop="title">
					<el-input v-model="newData.title" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="简介" prop="intro">
					<el-input v-model="newData.intro" type="text" autocomplete="off">
					</el-input>
				</el-form-item>
				<el-form-item label="作者" prop="author">
					<el-input v-model="newData.author" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="内容" prop="content">
					<el-input v-model="newData.content" style="width: 600px;" type="textarea" autocomplete="off">
					</el-input>
				</el-form-item>
				<el-form-item label="已读人数" prop="" v-if="newData.markReader!= undefined">
					<el-input v-model="newData.markReader" disabled="" autocomplete="off">
					</el-input>
				</el-form-item>
				<el-form-item label="发布日期" prop="" v-if="newData.publishTime != undefined">
					<el-input v-model="newData.publishTime" disabled="" style="width: 300px;" autocomplete="off">
					</el-input>
				</el-form-item>
				<el-form-item label="图片" prop="thumb">

					<el-upload class="avatar-uploader" action="#" :show-file-list="false" :http-request="addthumb">
						<el-image v-if="newData.thumb != ''" :src="newData.thumb" class="avatar"
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
				policy: {
					title: '',
				},
				policyData: [],
				newData: {
					title: '',
					intro: '',
					content: '',
					thumb: '',
					author: '',
				},
				rules: {
					title: [{
						required: true,
						message: '请输入标题',
						trigger: 'blur'
					}, ],
					intro: [{
						required: true,
						message: '请输入简介',
						trigger: 'blur'
					}, ],
					content: [{
						required: true,
						message: '请输入内容',
						trigger: 'blur'
					}, ],
					author: [{
						required: true,
						message: '请标明作者',
						trigger: 'blur'
					}, ],
					thumb: [{
						required: true,
						message: '请添加图片',
						trigger: 'blur'
					}, ],
				},
				totaldata: 0,
				currentIndex: 1,

			}
		},
		mounted() {
			this.getData()
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
				this.newData.thumb = res.data.data.picture;
			},
			async getData() {
				const res = await this.$http.get(`/policy/queryAll?page=${this.currentIndex}&size=9`);
				console.log(res);
				this.totaldata = res.data.data.total;
				this.policyData = res.data.data.list;
			},
			async query() {
				if(this.policy.title === ''){
					this.getData();
					return;
				}
				const res = await this.$http.get(`/policy/queryTitle?title=${this.policy.title}`)
				this.totaldata = res.data.data.total;
				this.policyData = res.data.data.list;
				console.log(this.policyData);
			},
			addHandle() {
				this.addDialog = true;
			},
			crudHandle(data) {
				this.addDialog = true;
				this.edit = true;
				console.log(data);
				this.newData = data;
				console.log(this.newData);
			},
			cancleHandle() {
				this.addDialog = false
				this.newData = {
					title: '',
					intro: '',
					content: '',
					thumb: '',
					author: '',
				}
			},
			async deleteHandle(id) {
				const res = await this.$http.get(`/policy/admin/delete?id=${id}`);
				this.$message.success(res.data.msg)
				console.log(111)
				this.getData()
			},
			detailHandle(data) {
				console.log(data);
			},
			handleSizeChange(val) {},
			handleCurrentChange(val) {
				this.currentIndex = val;
				this.getData()
			},
			addUserHandle(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						let res
						if (this.edit) {
							res = await this.$http.post(`/policy/admin/update`, this.newData);
						} else {
							res = await this.$http.post(`/policy/admin/add`, this.newData);
						}

						console.log(res);
						if (res.data.code === 0) {
							this.$message.success(res.data.msg);



						} else {
							this.$message.error(res.data.msg);
						}
						this.newData = {
							title: '',
							intro: '',
							content: '',
							thumb: '',
							author: '',
						}
						this.getData()
						this.edit = false;
						this.addDialog = false;
					} else {

					}
				});
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
