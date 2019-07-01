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
									<form role="form" class="form-horizontal-">
										<div class="row">
											<div class="col-sm-6 col-md-4">
												<div class="form-group">
													<label class="col-xs-12 control-label">Tipo de Cliente</label>
													<div class="col-xs-12">
														<div class="input-group">
															<span class="input-group-addon"><span class="fas fa-briefcase"></span></span>
															<input readonly="" type="text" class="form-control" name="type" v-model="post.type.name" />
														</div>
														<span class="help-block">&nbsp;</span>
													</div>
												</div>
											</div>
											<div class="col-sm-6 col-md-4">
												<div class="form-group">
													<label class="col-xs-12 control-label">Tipo de Documento de Identificación</label>
													<div class="col-xs-12">
														<div class="input-group">
															<span class="input-group-addon"><span class="fas fa-address-card"></span></span>
															<input type="text" class="form-control" name="identification_type" v-model="post.identification_type.name" />
														</div>
														<span class="help-block">&nbsp;</span>
													</div>
												</div>
											</div>
											<div class="col-sm-12 col-md-4">
												<div class="form-group">
													<label class="col-xs-12 control-label"># de Identificación / DNI</label>
													<div class="col-xs-12">    
														<div class="input-group">
															<span class="input-group-addon"><span class="fas fa-fingerprint"></span></span>
															<input type="text" class="form-control" name="identification_number" v-model="post.identification_number" />
														</div>
														<span class="help-block">&nbsp;</span>
													</div>
												</div>
											</div>
											<div class="col-sm-12 col-md-12">
												<div class="form-group">
													<label class="col-xs-12 control-label">Titular o Nombre Comercial</label>
													<div class="col-xs-12">
														<div class="input-group">
															<span class="input-group-addon"><span class="fas fa-signature"></span></span>
															<input type="text" class="form-control" name="names" v-model="post.names" onkeyup="javascript:this.value=this.value.toUpperCase();" style="text-transform:uppercase;" />
														</div>
														<span class="help-block">&nbsp;</span>
													</div>
												</div>
											</div>
											<div class="col-sm-6 col-md-6">
												<div class="form-group">
													<label class="col-xs-12 control-label">Teléfono Fijo</label>
													<div class="col-xs-12">
														<div class="input-group">
															<span class="input-group-addon"><span class="fa fa-phone"></span></span>
															<input type="text" class="form-control mask_phone_ext" name="phone" v-model="post.phone" />
														</div>
														<span class="help-block">&nbsp;</span>
													</div>
												</div>
											</div>
											<div class="col-sm-6 col-md-6">
												<div class="form-group">
													<label class="col-xs-12 control-label">Teléfono Móvil</label>
													<div class="col-xs-12">
														<div class="input-group">
															<span class="input-group-addon"><span class="fa fa-mobile"></span></span>
															<input type="text" class="form-control mask_phone_mobile" name="mobile" v-model="post.mobile" />
														</div>
														<span class="help-block">&nbsp;</span>
													</div>
												</div>
											</div>
											<div class="col-sm-6 col-md-6">
												<div class="form-group">
													<label class="col-xs-12 control-label">Dirección Principal</label>
													
													<div class="col-xs-12">
														<div class="input-group">
															<input type="text" class="form-control" readonly="" v-model="address_principal.address_input" />
															<span class="input-group-btn">
																<button class="btn btn-secondary" type="button" data-toggle="modal" data-target="#modal_basic">...</button>
															</span>
														</div>
														<span class="help-block">&nbsp;</span>
													</div>
												</div>
											</div>
											<div class="col-sm-6 col-md-6">
												<div class="form-group">
													<label class="col-xs-12 control-label">Direccion de Facturación</label>
													
													<div class="col-xs-12">
														<div class="input-group">
															<input type="text" class="form-control" readonly="" v-model="address_invoices.address_input" />
															<span class="input-group-btn">
																<button class="btn btn-secondary" type="button" data-toggle="modal" data-target="#modal_basic">...</button>
															</span>
														</div>
														<span class="help-block">&nbsp;</span>
													</div>
												</div>
											</div>
										</div>
									</form>
								</div>
								<div class="panel-footer">
									{{ post }}
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
