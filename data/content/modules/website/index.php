<!DOCTYPE html>
<html lang="es">
    <head>
		<?php $this->include_file_global("/head.php"); ?>
        <title>Portal B2B - SERVICIOS AMBIENTALES Y FORESTALES MONTEVERDE LTDA </title>                               
    </head>
    <body>
		<?php $this->include_file_global("/scripts.php"); ?>
		<div class="body-page-vue" id="app">
			<div>
				<div v-bind:class="get_class_pages_container()" >
					<component-sidebar-left></component-sidebar-left>
					<div class="page-content">
						<component-navigation-top></component-navigation-top>
						<div>
							<?php $this->include_file_global("/breadcrumb.php"); ?>
						</div>
						<div>
							<div class="page-title">
								<h2></h2>
							</div>
							<router-view></router-view>
						</div>
					</div>            
				</div>
			</div>
			<?php $this->include_file_global("/preloads.php"); ?>
        </div>
		<style scope="app">
			.page-container {
				height: calc(100vh);
				overflow: auto;
			}
			
			.content-frame-right {
				height: auto !important;
			}
						
			.form-group .input-group-addon {
				color: #666;
			}
			
			.form-control[disabled], .form-control[readonly] {
				color: #000;
			}
		</style>
		<?php $this->include_file_global("/navigation.php"); ?>
		<?php $this->include_file_global("/sidebar.php"); ?>
		<?php $this->include_file_global("/login.php"); ?>
		<!-- // <script type="text/javascript" src="/js/main-mvltda.js?version=1"></script> -->
<script type="text/javascript">
<?php 
$this->include_file("{$this->path_principal}js/main-mvltda.js");
 ?>
</script>


    </body>
</html>