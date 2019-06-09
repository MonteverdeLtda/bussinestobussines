<!-- START CONTENT FRAME -->
<style scope="page-media-gallery-pictures">
.container{
    margin-top:20px;
}
.image-preview-input {
    position: relative;
	overflow: hidden;
	margin: 0px;    
    color: #333;
    background-color: #fff;
    border-color: #ccc;    
}
.image-preview-input input[type=file] {
	position: absolute;
	top: 0;
	right: 0;
	margin: 0;
	padding: 0;
	font-size: 20px;
	cursor: pointer;
	opacity: 0;
	filter: alpha(opacity=0);
}
.image-preview-input-title {
    margin-left:2px;
}
</style>

<template id="page-media-gallery-pictures">
	<div>
		<div class="content-frame">
			<!-- START CONTENT FRAME TOP -->
			<div class="content-frame-top">
				<div class="page-title">
					<h2><span class="fa fa-image"></span> Galería de Imagenes</h2>
				</div>
				<div class="pull-right">
					<button class="btn btn-primary"><span class="fa fa-upload"></span> Upload</button>
					<button class="btn btn-default content-frame-right-toggle"><span class="fa fa-bars"></span></button>
				</div>
			</div>
			
			<!-- START CONTENT FRAME RIGHT -->
			<div class="content-frame-right">
				<div class="block">
					<div class="input-group image-preview">
						<input type="text" class="form-control image-preview-filename" disabled="disabled"> <!-- don't give a name === doesn't send on POST/GET -->
						<span class="input-group-btn">
							<!-- image-preview-clear button -->
							<button type="button" class="btn btn-default image-preview-clear" style="display:none;">
								<span class="glyphicon glyphicon-remove"></span> Clear
							</button>
							<!-- image-preview-input -->
							<div class="btn btn-default image-preview-input">
								<span class="glyphicon glyphicon-folder-open"></span>
								<span class="image-preview-input-title">Browse</span>
								<input type="file" accept="image/png, image/jpeg, image/gif" name="input-file-preview"/> <!-- rename it -->
							</div>
						</span>
					</div>
					<button class="btn btn-default">
						<span class="glyphicon glyphicon-plus"></span> Añadir
					</button>
				</div>
				<!-- //
				<h4>Groups:</h4>
				<div class="list-group border-bottom push-down-20">
					<a href="#" class="list-group-item active">All <span class="badge badge-primary">12</span></a>
					<a href="#" class="list-group-item">Nature <span class="badge badge-success">7</span></a>
					<a href="#" class="list-group-item">Music <span class="badge badge-danger">3</span></a>
					<a href="#" class="list-group-item">Space <span class="badge badge-info">2</span></a>
					<a href="#" class="list-group-item">Girls <span class="badge badge-warning">3</span></a>
				</div>
				<h4>Tags:</h4>
				<ul class="list-tags">
					<li><a href="#"><span class="fa fa-tag"></span> amet</a></li>
					<li><a href="#"><span class="fa fa-tag"></span> rutrum</a></li>
					<li><a href="#"><span class="fa fa-tag"></span> nunc</a></li>
					<li><a href="#"><span class="fa fa-tag"></span> tempor</a></li>
					<li><a href="#"><span class="fa fa-tag"></span> eros</a></li>
					<li><a href="#"><span class="fa fa-tag"></span> suspendisse</a></li>
					<li><a href="#"><span class="fa fa-tag"></span> dolor</a></li>
				</ul>
				-->
			</div>
			<!-- END CONTENT FRAME RIGHT -->
		
			<!-- START CONTENT FRAME BODY -->
			<div class="content-frame-body content-frame-body-left">
				<div class="gallery" id="gallery-container">
					<a v-for="picture in posts" class="gallery-item" :href="'/api/media/?w=380&picture=' + picture.id" :title="picture.name" data-gallery>
						<div class="image">                              
							<img :src="'/api/media/?w=250&picture=' + picture.id" :title="picture.name" alt="Nature Image 1"/>
							<ul class="gallery-item-controls">
								<li><label class="check"><input type="checkbox" class="icheckbox"/></label></li>
								<li><span class="gallery-item-remove"><i class="fa fa-times"></i></span></li>
							</ul>
						</div>
						<div class="meta">
							<strong>{{ picture.name }}</strong>
							<span>{{ picture.type }}</span>
						</div>                                
					</a>
				</div>
			</div>
		</div>
	</div>
</template>