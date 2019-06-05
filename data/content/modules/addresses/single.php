<template id="page-addresses-view">
	<div>
		<div class="page-content-wrap">
			<div class="row">
				<div class="col-md-12">
					<div class="panel panel-default">
						<div class="panel-heading">
							<h3 class="panel-title"><strong>Viendo</strong> Dirección</h3>
							<ul class="panel-controls">
								<li>
									<router-link data-toggle="tooltip" data-placement="bottom" title="Modificar Dirección" tag="a" :to="{ name: 'page-contacts-edit', params: { contact_id: post.id } }" class="panel-remove">
										<span class="fas fa-pencil-alt"></span>
									</router-link>
								</li>
								<li>
									<router-link tag="a" :to="{ name: 'page-addresses-list' }" class="panel-remove">
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
									<div class="col-md-4">
										<p>
											<b>Dirección: </b>{{ post.display_name }}
											<br><b>Ciudad: </b>{{ post.city.name }}
											<br><b>Departamento: </b>{{ post.department.name }}
											<br><b>Latitud: </b>{{ post.lat }}
											<br><b>Longitud: </b>{{ post.lon }}
										</p>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
				<div class="col-md-4">
				</div>
			</div>
		</div>
	</div>
</template>