<template>
	<div id="banner">
		<button type="button" class="add-btn" @click="addNewDialog = !addNewDialog; activeTitle = '添加图片'">新增 +</button>
		<el-table :data="bannerList" stripe style="width: 100%" border height="600">
			<el-table-column prop="date" label="图片" width="180">
				<template slot-scope="scope">
					<el-image style="width: 100px; height: 100px" :src="scope.row.image" fit="fill"></el-image>
				</template>
			</el-table-column>
			</el-table-column>
			<el-table-column label="操作" width="360">
				<template slot-scope="scope">
					<el-button @click="updateBanner(scope.row)" type="text" icon="el-icon-edit" class="btn-item edit-btn">
						编辑</el-button>
					<el-button type="text" @click="deleteBanner(scope.row)" icon="el-icon-delete" class="btn-item">删除
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
				<el-form-item label="图片" prop="image">
					<el-upload 
					class="avatar-uploader" action="#" 
						:show-file-list="false"  :http-request="addthumb">
						<el-image v-if="newData.image != ''"  :src="newData.image" class="avatar" style="width: 80px; height: 80px"
							fit="fill"></el-image>
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
				<el-form-item class="footer">
					<div class="btn-wrap">
						<el-button @click="addNewDialog = false">取 消</el-button>
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
				bannerList: [],
				addNewBanner: null,
				activeTitle: '添加图片',
				newData: {
					image: '',
				},
				addNewDialog: false,
				rules: {
					image: [{
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
			this.getBannerData()
		},
		methods: {
			//获取轮播图数据
			async getBannerData() {
				const res = await this.$http.get(`/banner/queryAll?page=${this.currentIndex}&size=8`);
				console.log(res);
				this.bannerList = res.data.data.list;
				this.totaldata = res.data.data.total;
			},
			//删除轮播图
			async deleteBanner(data) {
				console.log(data);
				const res = await this.$http.get(`/banner/admin/delete?id=${data.id}`);
				if(res.data.code === 0){
					this.$message.success(res.data.msg);
				}else{
					this.$message.error(res.data.msg);
				}
				this.getBannerData();
				
			},
			//修改轮播图
			async updateBanner(data) {
				console.log(data);
				this.newData = data;
				this.addNewDialog = true;
				this.activeTitle = '编辑图片'
			},
			async addthumb(data){
				
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
				this.newData.image = res.data.data.picture;
				console.log(this.newData.image,'图片路径')
			},
			//添加并更新数据
			addNewHandle(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						if(this.newData.image === ''){
							this.$message.error('请添加图片');
							return;
						}
						let res;
						if(this.activeTitle === '添加图片'){
							res = await this.$http.post(`/banner/admin/add`,this.newData);
						}else{
							res = await this.$http.post(`/banner/admin/update`,this.newData);
						}
						 
						console.log(res);
						if(res.data.code === 0){
							this.$message.success(res.data.msg);
						}else{
							this.$message.error(res.data.msg);
						}
						this.addNewDialog = false;
						this.getBannerData();
					}
				});
			},
			//改变 size
			handleSizeChange(){
				
			},
			//改变index
			handleCurrentChange(val){
				this.currentIndex = val;
				this.getBannerData();
			}
		}
	}
</script>

<style scoped="scoped">
	#banner{
		padding: 20px;
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
	.avatar-uploader {
		height: 80px;
		width: 80px;
		border: 1px solid #ccc;
		text-align: center;
		line-height: 80px;
	}
</style>
