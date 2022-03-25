<template>
	<div id="counsel">
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

		<button type="button" class="add-btn" @click="addNewDialog = !addNewDialog; activeTitle = '添加资讯'">新增 +</button>
		<el-table :data="policyData" height="400" border style="width: 100%" :header-cell-style="{textAlign: 'center'}"
			:cell-style="{textAlign: 'center'}">
			<el-table-column label="" width="40">
				<template slot-scope="scope">
					<div class="item"></div>
				</template>
			</el-table-column>
			<el-table-column type="index" label="索引" width="60">
			</el-table-column>
			<el-table-column prop="title" label="标题" width="116">
			</el-table-column>
			<el-table-column prop="img" label="图片" width="180">
				<template slot-scope="scope">
					<el-image style="width: 100px; height: 100px" :src="scope.row.thumb" fit="fill"></el-image>
				</template>
			</el-table-column>
			<el-table-column prop="intro" label="简述" width="200">
			</el-table-column>
			<el-table-column prop="hot" label="浏览热度" width="80"></el-table-column>
			<el-table-column label="操作" width="360">
				<template slot-scope="scope">
					<el-button @click="crudHandle(scope.row)" type="text" icon="el-icon-edit" class="btn-item edit-btn">
						编辑</el-button>
					<!-- <el-button @click="detailHandle(scope.row)" type="text" icon="el-icon-date"
						class="btn-item detail-btn">详情</el-button> -->
					<el-button type="text" @click="deleteHandle(scope.row.id)" icon="el-icon-delete" class="btn-item">删除
					</el-button>
				</template>
			</el-table-column>
		</el-table>

		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
			:current-page="currentIndex" :page-sizes="[10,20,30]" :page-size="10"
			layout="total, sizes, prev, pager, next, jumper" :total="totaldata" style="margin-top: 20px;">
		</el-pagination>

		<el-dialog :title="activeTitle" :visible.sync="addNewDialog" :width="'800px'">
			<el-form :model="newData" :rules="rules" ref="newData" :inline="true" class="info-form">
				<el-form-item label="标题" prop="title">
					<el-input v-model="newData.title" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="简述" prop="intro">
					<el-input v-model="newData.intro" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="内容" prop="content">
					<el-input v-model="newData.content" style="width: 600px;" type="textarea" autocomplete="off">
					</el-input>
				</el-form-item>
				<el-form-item label="图片" prop="thumb">
					<el-upload 
					class="avatar-uploader" action="#" 
						:show-file-list="false"  :http-request="addthumb">
						<el-image v-if="newData.thumb != ''"  :src="newData.thumb" class="avatar" style="width: 80px; height: 80px"
							fit="fill"></el-image>
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
				<el-form-item class="footer">
					<div class="btn-wrap">
						<el-button @click="cancleHandle">取 消</el-button>
						<el-button type="primary" @click="addNewHandle('newData')">确 定</el-button>
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
				activeTitle: '添加资讯',
				edit: false,
				titleForm: {
					title: ''
				},
				policyData: null,
				newData: {
					title: '',
					content: '',
					thumb: '',
					hot: 0,
					intro: '',
				},
				rules: {
					title: [{
						required: true,
						message: '请输入标题',
						trigger: 'blur'
					}, ],
					intro: [{
						required: true,
						message: '请输入简述',
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
				totaldata: 0,
				currentIndex: 1,
				addNewDialog: false
			}
		},
		mounted() {
			this.getNewData()
		},
		methods: {
			async getNewData() {
				const res = await this.$http.get(`news/queryAll?page=${this.currentIndex}&size=9`)
				this.policyData = res.data.data.list;
				this.totaldata = res.data.data.total;
				console.log(this.policyData);
			},
			async addthumb(data){
				console.log(1)
				let file = data.file;
				console.log(file);
				 let formData = new window.FormData();
				 console.log(2);;
				formData.append('file', file);
				const res = await this.$http.post(`/file/uploadPicture`, formData, {
					hearders: {
						'Content-Type': 'multipart/form-data' //注意这里
					}
				});
				console.log(res);
				this.newData.thumb = res.data.data.picture;
			},
			async query() {
				if(this.titleForm.title === ''){
					this.getNewData();
					return;
				}
				const res = await this.$http.get(`/news/queryTitle?title=${this.titleForm.title}`)
				this.policyData = res.data.data.list;
				this.totaldata = res.data.data.total;
				console.log(this.policyData);
			},
			crudHandle(data) {
				console.log(data);
				this.newData = data;
				this.addNewDialog = true;
				this.edit = true;
				this.activeTitle = '编辑资讯'
			},
			async deleteHandle(id) {
				const res = await this.$http.get(`/news/admin/delete?id=${id}`);
				if(res.data.code === 0){
					this.$message.success(res.data.msg);
				}else{
					this.$message.error(res.data.msg);
				}
				this.getNewData()
			},
			detailHandle(data) {
				console.log(data);
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				this.currentIndex = val;
				this.getNewData()
			},
			addNewHandle(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						console.log(this.newData)
						let res
						let username = JSON.parse(localStorage.getItem('info')).username;
						
						if (this.edit) {
							console.log(1)
							res = await this.$http.post(`/news/admin/update`, this.newData);
						} else {
							res = await this.$http.post(`/news/admin/add`, this.newData);
						}

						console.log(res);
						if (res.data.code === 0) {
							this.$message.success(res.data.msg);
							this.newData = {
									title: '',
									intro: '',
									content: '',
									thumb: '',
									hot: 0,
								},
								this.getNewData()
						}else{
							console.log(this.newData,'error');
							this.$message.error(res.data.msg);
						}
						this.edit = false;
						this.addNewDialog = false;
						this.getNewData()
					} else {

					}
				});
			},
			cancleHandle() {
				this.addNewDialog = false;
				this.newData = {
					title: '',
					content: '',
					thumb: '',
					hot: 0,
					intro: '',
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.item {
		width: 10px;
		height: 10px;
		background-color: #fd834d;
		border-radius: 2px;
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
		margin: 0 100px;
		margin-top: 20px;
		margin-bottom: -30px;
		width: 600px;
		display: flex;
		justify-content: space-around;
	}

	.btn-item {
		padding: 6px 14px;
		background-color: #FD834D;
		color: #fff;
	}

	.edit-btn {
		background-color: #4F7D94;
		/* margin-right: 40px; */
	}

	.detail-btn {}
	
	.avatar-uploader {
		height: 80px;
		width: 80px;
		border: 1px solid #ccc;
		text-align: center;
		line-height: 80px;
	}
</style>
