<template id="page-events-staff-lists">
	<div>		
		<div class="page-content-wrap">
			<div class="row">
				<div class="col-md-12">
					<div class="panel panel-default">
						<div class="panel-heading">
							<h3 class="panel-title"><strong>Viendo</strong> Empleado</h3>
							<ul class="panel-controls">
								<li>
									<!-- //
									<router-link tag="a" :to="{ name: 'page-addresses-add' }" class="panel-plus" title="Añadir Cuenta" data-toggle="tooltip" data-placement="bottom">
										<span class="fas fa-user-plus"></span>
									</router-link>
									-->
								</li>
							</ul>
						</div>
						<div class="panel-body table-responsive">
							<component-navigation-top-pages-employees></component-navigation-top-pages-employees>
						</div>
					</div>
					
					<div class="panel panel-default">
						<div class="panel-heading">                                
							<h3 class="panel-title">Solicitudes</h3>
							<ul class="panel-controls">
								<li>
									<!-- //
									<router-link tag="a" :to="{ name: 'page-accounts-requests-add', params: { account_id: $route.params.employee_id } }" class="panel-remove" title="Añadir Solicitud" data-toggle="tooltip" data-placement="bottom">
										<span class="fas fa-plus-circle"></span>
									</router-link>
									-->
									<li>
										<a @click="addGroup()" class="panel-refresh" title="Actualizar" data-toggle="tooltip" data-placement="bottom">
											<i class="fas fa-user-plus"></i>
										</a>
									</li>
								</li>
							</ul>                                
						</div>
						<div class="panel-body table-responsive">
							<table class="table table-hover table-bordereds datatable">
								<thead>
									<tr>
										<th>Grupo</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="el in posts">
										<td>{{ el.group.name }}</td>
										<td>
											<button @click="delete_group(el.id)" data-toggle="tooltip" data-placement="top" title="Eliminar Grupo" class="btn btn-danger btn-rounded btn-xs">
												<i class="fas fa-times"></i>
											</button>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
