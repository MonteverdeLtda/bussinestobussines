
<template id="page-accounts-addresses-single-view">
	<div>		
		<div class="page-content-wrap">
			<div class="row">
				<div class="col-md-12">
					<div class="panel panel-default">
						<div class="panel-heading">
							<h3 class="panel-title"><strong>Viendo</strong> Cuenta</h3>
							<ul class="panel-controls">
								<li>
									<router-link tag="a" :to="{ name: 'page-accounts-list' }" class="panel-remove">
										<span class="fa fa-times"></span>
									</router-link>
								</li>
							</ul>
						</div>
						<div class="panel-body">
							<component-navigation-top-pages-accounts></component-navigation-top-pages-accounts>
						</div>
					</div>
					
					<div class="panel panel-default">
						<div class="panel-heading">
							<h3 class="panel-title"><strong>Viendo</strong> Dirección</h3>
							<ul class="panel-controls">
								<li>
									<router-link tag="a" :to="{ name: 'page-accounts-addresses-view', params: { account_id: $route.params.account_id } }" class="panel-remove">
										<span class="fa fa-times"></span>
									</router-link>
								</li>
							</ul>
						</div>
						<form role="form" class="form-horizontal" >
							<div class="panel-body">
								<div class="row">
									<div class="col-md-8">
										<div class="panel panel-default">
											<div id="vector_world_map" style="width: 100%; height: 300px"></div>	
										</div>
									</div>
									<div class="col-md-4 table-responsive">
										<table class="table table-bordered table-hover">
											<tr>
												<td>Dirección: </td>
												<td>{{ post.display_name }}</td>
											</tr>
											<tr>
												<td>Ciudad: </td>
												<td>{{ post.city.name }}</td>
											</tr>
											<tr>
												<td>Departamento: </td>
												<td>{{ post.department.name }}</td>
											</tr>
											<tr>
												<td>Latitud: </td>
												<td>{{ post.lat }}</td>
											</tr>
											<tr>
												<td>Longitud: </td>
												<td>{{ post.lon }}</td>
											</tr>
										</p>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
