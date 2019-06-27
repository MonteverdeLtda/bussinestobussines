<template id="page-accounts-view">
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
						<div class="tab-content">
							<div class="tab-pane active" id="tab-first">
								<div class="panel-heading">
									<h3 class="panel-title"><strong>Información</strong> Básica</h3>
									<ul class="panel-controls">
										<li>
											<router-link data-toggle="tooltip" data-placement="bottom" title="Modificar Cuenta" tag="a" :to="{ name: 'page-accounts-edit', params: { account_id: post.id } }" class="panel-remove">
												<span class="fas fa-pencil-alt"></span>
											</router-link>
										</li>
									</ul>
								</div>
								<div class="panel-body">
									<form role="form" class="form-horizontal" >
										<div class="form-group">
											<label class="col-md-3 col-xs-12 control-label">Tipo de Cliente</label>
											<div class="col-md-6 col-xs-12">
												<div class="input-group">
													<span class="input-group-addon"><span class="fas fa-fingerprint"></span></span>
													<input readonly="" type="text" class="form-control" name="type" v-model="post.type.name" />
												</div>
											</div>
										</div>
										
										<div class="form-group">
											<label class="col-md-3 col-xs-12 control-label">Tipo de Documento de Identificación</label>
											<div class="col-md-6 col-xs-12">
												<div class="input-group">
													<span class="input-group-addon"><span class="fas fa-fingerprint"></span></span>
													<input type="text" class="form-control" name="identification_type" v-model="post.identification_type.name" />
												</div>
											</div>
										</div>
										
										<div class="form-group">
											<label class="col-md-3 col-xs-12 control-label"># de Identificación / DNI</label>
											<div class="col-md-6 col-xs-12">    
												<div class="input-group">
													<span class="input-group-addon"><span class="fas fa-fingerprint"></span></span>
													<input type="text" class="form-control" name="identification_number" v-model="post.identification_number" />
												</div>
											</div>
										</div>
										
										<div class="form-group">
											<label class="col-md-3 col-xs-12 control-label">Titular o Nombre Comercial</label>
											<div class="col-md-6 col-xs-12">    
												<div class="input-group">
													<span class="input-group-addon"><span class="fas fa-signature"></span></span>
													<input type="text" class="form-control" name="names" v-model="post.names" />
												</div>
											</div>
										</div>
										
										<div class="form-group">
											<label class="col-md-3 col-xs-12 control-label">Dirección Principal</label>
											<div class="col-md-6 col-xs-12">
												<div class="input-group">
													<span class="input-group-addon"><span class="fa fa-map-marker"></span></span>
													<input type="text" class="form-control" name="address_principal" v-model="post.address_principal" />
												</div>
											</div>
										</div>
										
										<div class="form-group">
											<label class="col-md-3 col-xs-12 control-label">Departamento</label>
											<div class="col-md-6 col-xs-12">
												<div class="input-group">
													<span class="input-group-addon"><span class="fa fa-map-marker"></span></span>
													<input type="text" class="form-control" name="address_principal_department" v-model="post.address_principal_department.name" />
												</div>
											</div>
										</div>
										
										<div class="form-group">
											<label class="col-md-3 col-xs-12 control-label">Ciudad</label>
											<div class="col-md-6 col-xs-12">
												<div class="input-group">
													<span class="input-group-addon"><span class="fa fa-map-marker"></span></span>
													<input type="text" class="form-control" name="address_principal_department" v-model="post.address_principal_city.name" />
												</div>
											</div>
										</div>
										
										<div class="form-group">
											<label class="col-md-3 col-xs-12 control-label">Direccion de Facturación</label>
											<div class="col-md-6 col-xs-12">    
												<div class="input-group">
													<span class="input-group-addon"><span class="fa fa-map-marker"></span></span>
													<input type="text" class="form-control" name="address_invoices" v-model="post.address_invoices" />
												</div>
											</div>
										</div>
										
										<div class="form-group">
											<label class="col-md-3 col-xs-12 control-label">Departamento</label>
											<div class="col-md-6 col-xs-12">
												<div class="input-group">
													<span class="input-group-addon"><span class="fa fa-map-marker"></span></span>
													<input type="text" class="form-control" name="address_invoices_department" v-model="post.address_invoices_department.name" />
												</div>
											</div>
										</div>
										
										<div class="form-group">
											<label class="col-md-3 col-xs-12 control-label">Ciudad</label>
											<div class="col-md-6 col-xs-12">
												<div class="input-group">
													<span class="input-group-addon"><span class="fa fa-map-marker"></span></span>
													<input type="text" class="form-control" name="address_invoices_department" v-model="post.address_invoices_city.name" />
												</div>
											</div>
										</div>
										
										<div class="form-group">
											<label class="col-md-3 col-xs-12 control-label">Teléfono Fijo</label>
											<div class="col-md-6 col-xs-12">
												<div class="input-group">
													<span class="input-group-addon"><span class="fa fa-map-marker"></span></span>
													<input type="text" class="form-control" name="phone" v-model="post.phone" />
												</div>
											</div>
										</div>
										
										<div class="form-group">
											<label class="col-md-3 col-xs-12 control-label">Teléfono Móvil</label>
											<div class="col-md-6 col-xs-12">
												<div class="input-group">
													<span class="input-group-addon"><span class="fa fa-map-marker"></span></span>
													<input type="text" class="form-control" name="mobile" v-model="post.mobile" />
												</div>
											</div>
										</div>
									</form>
								</div>
							</div>
							<div class="tab-pane" id="tab-second">
								
							</div>
							<div class="tab-pane" id="tab-third">
								<div class="panel-heading">
									<h3 class="panel-title">Solicitudes</h3>
									<ul class="panel-controls">
										<li>
											<router-link tag="a" :to="{ name: 'page-accounts-add' }" class="panel-plus" title="Añadir Contacto" data-toggle="tooltip" data-placement="bottom">
												<span class="fas fa-user-plus"></span>
											</router-link>
										</li>
										
										<li><a @click="find()" class="panel-refresh" title="Actualizar" data-toggle="tooltip" data-placement="bottom"><span class="fa fa-refresh"></span></a></li>
										
									</ul>                                
								</div>
								<div class="panel-body">
									<table class="table table-hover table-bordereds datatable-requests">
										<thead>
											<tr>
												<th></th>
												<th></th>
											</tr>
										</thead>
										<tbody>
										</tbody>
									</table>
								</div>
							</div>
						</div>
						<!-- //
						<div class="panel-footer">
							<button class="btn btn-primary pull-right">Save Changes <span class="fa fa-floppy-o fa-right"></span></button>
						</div>
						-->
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
