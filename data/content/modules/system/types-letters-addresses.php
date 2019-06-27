<template id="page-system-types-letters-addresses">
	<div>
		<div class="page-content-wrap">
			<div class="row">
				<div class="col-md-12">
					<div class="panel panel-default">
						<div class="panel-heading">
							<h3 class="panel-title"><strong>Sistema</strong> Letras para Direcciones</h3>
							<ul class="panel-controls">
								<li><a @click="$router.go(-1)" class="panel-remove"><span class="fa fa-times"></span></a></li>
							</ul>
						</div>
						<div class="panel-body">
							<div class="row">
								<div class="col-sm-8">
									<div class="panel panel-default">
										<div class="panel-heading">
											<h3 class="panel-title"><strong>Lista</strong> Completa</h3>
											<ul class="panel-controls">
												<li><a @click="$router.go(-1)" class="panel-remove"><span class="fa fa-times"></span></a></li>
											</ul>
										</div>
										<div class="panel-body">
											<table class="table table-bordered">
												<thead>
													<tr>
														<th>Id</th>
														<th>Nombre</th>
														<th></th>
													</tr>
												</thead>
												<tbody>
													<tr v-for="(item, i) in list">
														<td>{{ item.id }}</td>
														<td>{{ item.name }}</td>
														<td>
															<button @click="openEdit(i)" class="btn btn-sm btn-info">
																<i class="fas fa-pencil-alt"></i>
															</button>
															<button @click="delete_element(item.id)" class="btn btn-sm btn-danger">
																<i class="fas fa-trash"></i>
															</button>
														</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="panel panel-default">
										<div class="panel-heading">
											<h3 class="panel-title"><strong>Añadir</strong> </h3>
										</div>
										<div class="panel-body">
											<div class="form-group">
												<label class="col-md-2 control-label">Nombre</label>
												<div class="col-md-10">
													<input type="text" class="form-control" v-model="create.name" />
												</div>
											</div>
											<div class="form-group">
												<button type="button" @click="create_element()" class="btn btn-success">Añadir</button>
											</div>
										</div>
									</div>
									<div class="panel panel-default" v-if="edit_enabled === true">
										<div class="panel-heading">
											<h3 class="panel-title"><strong>Modificar</strong> </h3>
											<ul class="panel-controls">
												<li><a class="panel-refresh" @click="closeEdit()"><span class="fa fa-times"></span></a></li>
											</ul>
										</div>
										<div class="panel-body">
											<div class="form-group">
												<label class="col-md-2 control-label">Nombre</label>
												<div class="col-md-10">
													<input type="text" class="form-control" v-model="edit.name" />
												</div>
											</div>
											<div class="form-group">
												<button type="button" @click="edit_element()" class="btn btn-success">Modificar</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>