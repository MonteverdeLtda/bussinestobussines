<template id="page-accounts-view">
	<div>
		<div class="page-content-wrap">
			<div class="row">
				<div class="col-md-1">
				</div>
				<div class="col-md-10">
					<div class="panel panel-default">
						<div class="panel-heading">
							<h3 class="panel-title"><strong>Viendo</strong> Cuenta</h3>
							<ul class="panel-controls">
								<li>
									<router-link data-toggle="tooltip" data-placement="bottom" title="Modificar Cuenta" tag="a" :to="{ name: 'page-accounts-edit', params: { account_id: post.id } }" class="panel-remove">
										<span class="fas fa-pencil-alt"></span>
									</router-link>
								</li>
								<li>
									<router-link tag="a" :to="{ name: 'page-accounts-list' }" class="panel-remove">
										<span class="fa fa-times"></span>
									</router-link>
								</li>
							</ul>
						</div>
						<form role="form" class="form-horizontal" >
							<div class="panel-body">
								<br>
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
									<label class="col-md-3 col-xs-12 control-label">Representante Legal</label>
									<div class="col-md-6 col-xs-12">
										<div class="input-group">
											<span class="input-group-addon"><span class="fas fa-fingerprint"></span></span>
											<input type="text" class="form-control" name="represent_legal" v-model="post.represent_legal.first_name" />
										</div>
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-3 col-xs-12 control-label">Contacto Principal</label>
									<div class="col-md-6 col-xs-12">
										<div class="input-group">
											<span class="input-group-addon"><span class="fas fa-fingerprint"></span></span>
											<input type="text" class="form-control" name="contact" v-model="post.contact.first_name" />
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
								<br>
							</div>
						</form>
					</div>
				</div>
				<div class="col-md-1">
				</div>
			</div>
		</div>
	</div>
</template>