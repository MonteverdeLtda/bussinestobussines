<template id="page-users-list">
	<div>		
		<div class="page-content-wrap">
			<div class="row">
				<div class="col-md-12">
					<div class="panel panel-default">
						<div class="panel-heading">                                
							<h3 class="panel-title">Usuarios</h3>
							<ul class="panel-controls">
								<li>
									<router-link tag="a" :to="{ name: 'page-users-add' }" class="panel-plus" title="Añadir Cuenta" data-toggle="tooltip" data-placement="bottom">
										<span class="fas fa-user-plus"></span>
									</router-link>
								</li>
								<li><a @click="find()" class="panel-refresh" title="Actualizar" data-toggle="tooltip" data-placement="bottom"><span class="fa fa-refresh"></span></a></li>
								<!-- //
								<li>
									<router-link tag="a" :to="{ name: 'page-contacts-list-accounts' }" class="panel-plus" title="Contactos X cuenta" data-toggle="tooltip" data-placement="bottom">
										<i class="fas fa-funnel-dollar"></i>
									</router-link>
								</li>
								-->
								<li>
									<router-link tag="a" :to="{ name: 'page-dashboard' }" class="panel-remove" title="Cerrar" data-toggle="tooltip" data-placement="bottom">
										<span class="fa fa-times"></span>
									</router-link>
								</li>
							</ul>                                
						</div>
						<div class="panel-body table-responsive">
							<table class="table table-hover table-bordereds datatable">
								<thead>
									<tr>
										<th>Usuario</th>
										<th>Nombres</th>
										<th>Primer Apellido</th>
										<th>Segundo Apellido</th>
										<th>Teléfono</th>
										<th>Teléfono Móvil</th>
										<th>E-Mail</th>
										<th>Permisos</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									<!--
									<tr v-for="post in posts">
										<td>{{ post.id }}</td>
										<td>{{ post.username}}</td>
										<td>{{ post.names }}</td>
										<td>{{ post.surname }}</td>
										<td>{{ post.second_surname }}</td>
										<td>{{ post.phone }}</td>
										<td>{{ post.mobile }}</td>
										<td>{{ post.mail }}</td>
										<td>{{ post.permissions }}</td>
										<td>
											<router-link data-toggle="tooltip" data-placement="top" title="Ver Cuenta" tag="button" :to="{ name: 'page-accounts-view', params: { account_id: post.id } }" class="btn btn-default btn-rounded btn-xs">
												<i class="fas fa-eye"></i>
											</router-link>
											<router-link data-toggle="tooltip" data-placement="top" title="Modificar Cuenta" tag="button" :to="{ name: 'page-accounts-edit', params: { account_id: post.id } }" class="btn btn-info btn-rounded btn-xs">
												<i class="fas fa-pencil-alt"></i>
											</router-link>
											<button data-toggle="tooltip" data-placement="top" title="Eliminar Cuenta" class="btn btn-danger btn-rounded btn-xs" @click="delete_row(post.id);">
												<i class="fas fa-trash"></i>
											</button>
										</td>
									</tr>
									-->
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>