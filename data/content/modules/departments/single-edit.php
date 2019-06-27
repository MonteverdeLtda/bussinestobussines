<template id="page-departments-edit">
	<div>
		<div class="page-content-wrap">
			<div class="row">
				<div class="col-md-12">
					<div class="panel panel-default">
						<div class="panel-heading">
							<h3 class="panel-title"><strong>Modificar</strong> Jefe de Departamento</h3>
							<ul class="panel-controls">
								<li>
									<a data-toggle="tooltip" data-placement="bottom" title="Eliminar Departamento" @click="delete_row(post.id);">
										<i class="fas fa-trash"></i>
									</a>
								</li>
								<li>
									<router-link tag="a" :to="{ name: 'page-departments-list', params: { } }" title="Añadir Jefe" data-toggle="tooltip" data-placement="top" class="panel-refresh">
										<span class="fa fa-times"></span>
									</router-link>
								</li>
								
							</ul>
						</div>
						<form id="jvalidate" role="form" class="form-horizontal" action="javascript:alert('Form #validate2 submited');">
							<div class="panel-body">
								<p class="list-group">
									<div class="list-group alert" id="messageBox"></div>
								</p>
								
								<div class="form-group">
									<label class="col-md-3 col-xs-12 control-label">Nombre del departamento</label>
									<div class="col-md-9 col-xs-12">
										<div class="input-group">
											<span class="input-group-addon"><span class="fas fa-fingerprint"></span></span>
											<input type="text" class="form-control" name="name" v-model="post.name" />
										</div>
										<!-- // <span class="help-block">This is sample of text field</span> -->
									</div>
								</div>
							</div>
							<div class="panel-footer">
								<button class="btn btn-primary pull-right" type="submit">Guardar</button>
							</div>
						</form>
					</div>
					
					<div class="panel panel-default">
						<div class="panel-heading">
							<h3 class="panel-title"><strong>Listado</strong> Encargados</h3>
							<ul class="panel-controls">
								<li>
									<router-link tag="a" :to="{ name: 'page-departments-managers-add', params: { department_id: $route.params.department_id } }" title="Añadir Jefe" data-toggle="tooltip" data-placement="top" class="panel-refresh">
										<span class="fa fa-plus-circle"></span>
									</router-link>
								</li>
							</ul>
						</div>
						<div class="panel-body">
							<table class="table table-hover table-bordereds datatable">
								<thead>
									<tr>
										<th>Empleado</th>
										<th>Fecha Entrada</th>
										<th>Fecha Salida</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="manage in departments_manager">
										<form id="jvalidate2" role="form" class="form-horizontal" action="javascript:alert('Form #validate2 submited');">
											<th>
												{{ manage.employee.first_name }} 
												{{ manage.employee.second_name }} 
												{{ manage.employee.surname }} 
												{{ manage.employee.second_surname }}
											</th>
											<th>{{ manage.from_date }}</th>
											<th>{{ manage.to_date }}</th>
											<th>
												
												<router-link tag="a" :to="{ name: 'page-departments-managers-edit', params: { manager_id: manage.id } }" title="Modificar" data-toggle="tooltip" data-placement="top" class="btn btn-info btn-rounded btn-xs">
													<span class="fa fa-pencil-alt"></span>
												</router-link>
												
											</th>
										</form>
									</tr>
								</tbody>
							</table>
						</div>
						<div class="panel-footer">
							
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>