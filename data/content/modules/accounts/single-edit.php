<template id="page-accounts-edit">
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
						<div class="panel-heading">
							<h3 class="panel-title"><strong>Modificar</strong> Cuenta</h3>
							<ul class="panel-controls">
								<li>
									<a data-toggle="tooltip" data-placement="bottom" title="Eliminar Cuenta" @click="delete_row(post.id);">
										<i class="fas fa-trash"></i>
									</a>
								</li>
								<li>
									<router-link tag="a" :to="{ name: 'page-accounts-view', params: { account_id: post.id } }" class="panel-remove" title="Cerrar" data-toggle="tooltip" data-placement="bottom">
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
											<input type="text" class="form-control" readonly="" v-model="address_principal.address_input" />
											<span class="input-group-btn">
												<button class="btn btn-secondary" type="button" data-toggle="modal" data-target="#modal_basic">...</button>
											</span>
										</div>
										<span class="help-block">&nbsp;</span>
									</div>
								</div>
						
								<div class="form-group">
									<label class="col-md-3 col-xs-12 control-label">Dirección Principal</label>
									
									<div class="col-md-6 col-xs-12">
										<div class="input-group">
											<input type="text" class="form-control" readonly="" v-model="address_principal.address_input" />
											<span class="input-group-btn">
												<button class="btn btn-secondary" type="button" data-toggle="modal" data-target="#modal_basic">...</button>
											</span>
										</div>
										<span class="help-block">&nbsp;</span>
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-3 col-xs-12 control-label">Teléfono</label>
									<div class="col-md-6 col-xs-12">                                            
										<div class="input-group">
											<span class="input-group-addon"><span class="fas fa-fingerprint"></span></span>
											<input type="text" class="form-control mask_phone_ext" name="phone" v-model="post.phone" />
										</div>
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-3 col-xs-12 control-label">Móvil</label>
									<div class="col-md-6 col-xs-12">                                            
										<div class="input-group">
											<span class="input-group-addon"><span class="fas fa-fingerprint"></span></span>
											<input type="text" class="form-control mask_phone" name="mobile" v-model="post.mobile" />
										</div>
									</div>
								</div>
							</div>
								
							<div class="panel-body">
								<p class="list-group">
									<div class="list-group alert" id="messageBox"></div>
								</p>
							</div>
							
							<div class="panel-footer">								
								<button class="btn btn-primary pull-right" type="submit">Guardar</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>