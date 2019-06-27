<template id="page-departments-list">
	<div>		
		<div class="page-content-wrap">
			<div class="row">
				<div class="col-md-12">
					<div class="panel panel-default">
						<div class="panel-heading">                                
							<h3 class="panel-title">Departamentos</h3>
							<ul class="panel-controls">
								<li>
									<router-link tag="a" :to="{ name: 'page-departments-add' }" class="panel-plus" title="Añadir Departamento" data-toggle="tooltip" data-placement="bottom">
										<span class="fas fa-user-plus"></span>
									</router-link>
								</li>
								<li><a @click="find()" class="panel-refresh" title="Actualizar" data-toggle="tooltip" data-placement="bottom"><span class="fa fa-refresh"></span></a></li>
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
										<th>Nombre</th>
										<th>Encargados del Departamento</th>
										<th>Ingreso</th>
										<th>Salida</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="post in posts">
										<td>{{ post.name }}</td>
										<td>
											<span v-for="manage in post.departments_manager" v-if="post.departments_manager != null && post.departments_manager.length > 0">
												{{ manage.employee.first_name }} 
												{{ manage.employee.second_name }} 
												{{ manage.employee.surname }} 
												{{ manage.employee.second_surname }} 
											</span>
										</td>
										<td>
											<span v-for="manage in post.departments_manager" v-if="post.departments_manager != null && post.departments_manager.length > 0">
												{{ manage.from_date }}
											</span>
										</td>
										<td>
											<span v-for="manage in post.departments_manager" v-if="post.departments_manager != null && post.departments_manager.length > 0">
												{{ manage.to_date }}
											</span>											
										</td>
										<td>
											<router-link data-toggle="tooltip" data-placement="top" title="Modificar Departamento" tag="button" :to="{ name: 'page-departments-edit', params: { department_id: post.id } }" class="btn btn-info btn-rounded btn-xs">
												<i class="fas fa-pencil-alt"></i>
											</router-link>
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