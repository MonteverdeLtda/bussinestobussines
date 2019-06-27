<template id="page-accounts-add">
	<div>
		<div class="page-content-wrap">
			<div class="row">
				<div class="col-md-1">
				</div>
				<div class="col-md-10">
					<div class="panel panel-default">
						<div class="panel-heading">
							<h3 class="panel-title"><strong>Añadir</strong> Cuenta</h3>
							<ul class="panel-controls">
								<li>
									<router-link tag="a" :to="{ name: 'page-accounts-list' }" class="panel-remove" title="Cerrar" data-toggle="tooltip" data-placement="bottom">
										<span class="fa fa-times"></span>
									</router-link>
								</li>
							</ul>
						</div>
						<form id="jvalidate" role="form" class="form-horizontal" action="javascript:alert('Form #validate2 submited');">
							<div class="panel-body">
								<!-- // Parametros -->
								<div class="form-group">
									<label class="col-md-3 col-xs-12 control-label">Tipo de Cliente</label>
									<div class="col-md-6 col-xs-12">
										<select class="form-control select" name="type" data-v-model="type" data-live-search="true">
											<option value=""></option>
										</select>
										<span class="help-block">Este campo es obligatorio.</span>
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-3 col-xs-12 control-label">Tipo de Documento de Identificación</label>
									<div class="col-md-6 col-xs-12">
										<select class="form-control select" name="identification_type" data-v-model="identification_type" data-live-search="true">
											<option value=""></option>
										</select>
										<span class="help-block">Este campo es obligatorio.</span>
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-3 col-xs-12 control-label"># de Identificación / DNI</label>
									<div class="col-md-6 col-xs-12">                                            
										<div class="input-group">
											<span class="input-group-addon"><span class="fas fa-fingerprint"></span></span>
											<input type="text" class="form-control" name="identification_number" v-model="post.identification_number" />
										</div>
										<span class="help-block">Este campo es obligatorio.</span>
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-3 col-xs-12 control-label">Titular o Nombre Comercial</label>
									<div class="col-md-6 col-xs-12">                                            
										<div class="input-group">
											<span class="input-group-addon"><span class="fas fa-signature"></span></span>
											<input type="text" class="form-control" name="names" v-model="post.names" />
										</div>                                            
										<span class="help-block">Este campo es obligatorio.</span>
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-3 col-xs-12 control-label">Dirección Principal</label>
									<div class="col-md-6 col-xs-12">
										<div class="input-group">
											<span class="input-group-addon"><span class="fa fa-map-marker"></span></span>
											<input type="text" class="form-control" name="address_principal" v-model="post.address_principal" />
										</div>                                            
										<!-- // <span class="help-block">This is sample of text field</span> -->
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-3 col-xs-12 control-label">Departamento</label>
									<div class="col-md-6 col-xs-12">                                                                                            
										<select class="form-control select" data-v-model="address_principal_department" name="address_principal_department" v-model="post.address_principal_department" data-live-search="true">
											<option value=""></option>
										</select>
										<span class="help-block">Este campo es obligatorio.</span>
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-3 col-xs-12 control-label">Ciudad</label>
									<div class="col-md-6 col-xs-12">                                                                                            
										<select class="form-control select" data-v-model="address_principal_city" name="address_principal_city" v-model="post.address_principal_city" data-live-search="true">
											<option value=""></option>
										</select>
										<span class="help-block">Este campo es obligatorio.</span>
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-3 col-xs-12 control-label">Direccion de Facturación</label>
									<div class="col-md-6 col-xs-12">                                            
										<div class="input-group">
											<span class="input-group-addon"><span class="fa fa-map-marker"></span></span>
											<input type="text" class="form-control" name="address_invoices" v-model="post.address_invoices" />
										</div>                                            
										<!-- // <span class="help-block">This is sample of text field</span> -->
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-3 col-xs-12 control-label">Departamento</label>
									<div class="col-md-6 col-xs-12">
										<select class="form-control select" data-v-model="address_invoices_department" name="address_invoices_department" v-model="post.address_invoices_department" data-live-search="true">
											<option value=""></option>
										</select>
										<span class="help-block">Este campo es obligatorio.</span>
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-3 col-xs-12 control-label">Ciudad</label>
									<div class="col-md-6 col-xs-12">
										<select class="form-control select" data-v-model="address_invoices_city" name="address_invoices_city" v-model="post.address_invoices_city" data-live-search="true">
											<option value=""></option>
										</select>
										<span class="help-block">Este campo es obligatorio.</span>
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-3 col-xs-12 control-label">Teléfono Fijo</label>
									<div class="col-md-6 col-xs-12">
										<div class="input-group">
											<span class="input-group-addon"><span class="fa fa-phone"></span></span>
											<input type="text" class="form-control mask_phone_ext" name="phone" v-model="post.phone" />
										</div>                                            
										<!-- // <span class="help-block">This is sample of text field</span> -->
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-3 col-xs-12 control-label">Teléfono Móvil</label>
									<div class="col-md-6 col-xs-12">
										<div class="input-group">
											<span class="input-group-addon"><span class="fa fa-phone"></span></span>
											<input type="text" class="form-control mask_phone" name="mobile" v-model="post.mobile" />
										</div>                                            
										<!-- // <span class="help-block">This is sample of text field</span> -->
									</div>
								</div>
								
							</div>
								
							<div class="panel-body">
								<p class="list-group">
									<div class="list-group alert" id="messageBox"></div>
								</p>
							</div>
							
							<div class="panel-footer">								
								<button class="btn btn-primary pull-right" type="submit">Añadir Cuenta</button>
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