<template id="page-contacts-list">
	<div>		
		<div class="page-content-wrap">
			<div class="row">
				<div class="col-md-12">
					<div class="panel panel-default">
						<div class="panel-heading">                                
							<h3 class="panel-title">Contactos</h3>
							<ul class="panel-controls">
								<li>
									<router-link tag="a" :to="{ name: 'page-contacts-add' }" class="panel-plus" title="Añadir Contacto" data-toggle="tooltip" data-placement="bottom">
										<span class="fas fa-user-plus"></span>
									</router-link>
								</li>
								<li><a @click="find()" class="panel-refresh" title="Actualizar" data-toggle="tooltip" data-placement="bottom"><span class="fa fa-refresh"></span></a></li>
								<li>
									<router-link tag="a" :to="{ name: 'page-contacts-list-accounts' }" class="panel-plus" title="Contactos X cuenta" data-toggle="tooltip" data-placement="bottom">
										<i class="fas fa-funnel-dollar"></i>
									</router-link>
								</li>
								<li>								
									<router-link tag="a" :to="{ name: 'page-dashboard' }" class="panel-remove" title="Cerrar" data-toggle="tooltip" data-placement="bottom">
										<span class="fa fa-times"></span>
									</router-link>
								</li>
							</ul>                                
						</div>
						<div class="panel-body table-responsive">
							<table class="table table-hover table-bordered datatable">
								<thead>
									<tr>
										<th>Doc.</th>
										<th># Identificacion</th>
										<th>Nombres</th>
										<th>Apellidos</th>
										<th>T. Fijo</th>
										<th>T. Móvil</th>
										<th>E-Mail</th>
										<th class="col-md-4">Direccion</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									<!-- 
									<tr v-for="post in posts">
										<td>{{ post.id }}</td>
										<td>{{ post.identification_type.code }}</td>
										<td>{{ post.identification_number }}</td>
										<td>{{ post.first_name }} {{ post.second_name }}</td>
										<td>{{ post.surname }} {{ post.second_surname }}</td>
										<td>{{ post.phone }}</td>
										<td>{{ post.phone_mobile }}</td>
										<td>{{ post.mail }}</td>
										<td>{{ post.address }}</td>
										<td>
											<router-link data-toggle="tooltip" data-placement="top" title="Ver Contacto" tag="button" :to="{ name: 'page-contacts-view', params: { contact_id: post.id } }" class="btn btn-default btn-rounded btn-xs">
												<i class="fas fa-eye"></i>
											</router-link>
											<router-link data-toggle="tooltip" data-placement="top" title="Modificar Contacto" tag="button" :to="{ name: 'page-contacts-edit', params: { contact_id: post.id } }" class="btn btn-info btn-rounded btn-xs">
												<i class="fas fa-pencil-alt"></i>
											</router-link>
											<button data-toggle="tooltip" data-placement="top" title="Eliminar Contacto" class="btn btn-danger btn-rounded btn-xs" @click="delete_row(post.id);">
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