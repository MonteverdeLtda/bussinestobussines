<template id="page-accounts-add">
	<div>
		<div class="page-content-wrap">
			<div class="row">
				<div class="col-md-12">
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
						<form id="jvalidate" role="form" class="form-horizontal-" action="javascript:alert('Form #validate2 submited');">
							<div class="panel-body">
								<div class="row">
									<div class="col-sm-6 col-md-4">
										<div class="form-group">
											<label class="col-xs-12 control-label">Tipo de Cliente</label>
											<div class="col-xs-12">
												<select class="form-control select" name="type" data-v-model="type" data-live-search="true">
													<option value=""></option>
												</select>
												<span class="help-block">Este campo es obligatorio.</span>
											</div>
										</div>
									</div>
									<div class="col-sm-6 col-md-4">
										<div class="form-group">
											<label class="col-xs-12 control-label">Tipo de Documento de Identificación</label>
											<div class="col-xs-12">
												<select class="form-control select" name="identification_type" data-v-model="identification_type" data-live-search="true">
													<option value=""></option>
												</select>
												<span class="help-block">Este campo es obligatorio.</span>
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
												<span class="help-block">Este campo es obligatorio.</span>
											</div>
										</div>
									</div>
									
									<div class="col-sm-12 col-md-12">
										<div class="form-group">
											<label class="col-xs-12 control-label">Titular o Nombre Comercial</label>
											<div class="col-xs-12">                                            
												<div class="input-group">
													<span class="input-group-addon"><span class="fas fa-signature"></span></span>
													<input onkeyup="javascript:this.value=this.value.toUpperCase();" style="text-transform:uppercase;" type="text" class="form-control" name="names" v-model="post.names" />
												</div>                                            
												<span class="help-block">Este campo es obligatorio.</span>
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
													<input type="text" class="form-control mask_phone" name="mobile" v-model="post.mobile" />
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
														<button class="open-modal_basic btn btn-secondary" type="button" data-address-selected="address_principal" data-toggle="modal" data-target-not="#modal_basic">...</button>
													</span>
												</div>
												<span class="help-block">&nbsp;</span>
											</div>
										</div>
									</div>
									
									<div class="col-sm-6 col-md-6">
										<div class="form-group">
											<label class="col-xs-12 control-label">Dirección de Facturacion</label>
											<div class="col-xs-12">
												<div class="input-group">
													<input type="text" class="form-control" readonly="" v-model="address_invoices.address_input" />
													<span class="input-group-btn">
														<button class="open-modal_basic btn btn-secondary" type="button" data-address-selected="address_invoices" data-toggle="modal" data-target-not="#modal_basic">...</button>
													</span>
												</div>
												<span class="help-block">&nbsp;</span>
											</div>
										</div>
									</div>
								
								</div>
							</div>
							
							<div class="panel-footer">
								<p class="list-group pull-left">
									<div class="list-group alert" id="messageBox"></div>
								</p>
								<button class="btn btn-primary pull-right" type="submit">Añadir Cuenta</button>
							</div>
							<div class="panel-footer">
								{{ post }}
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
		
		
        <div class="modal" id="modal_basic" tabindex="-1" role="dialog" aria-labelledby="largeModalHead" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
					<form id="jvalidate2" role="form" class="form-horizontal-" action="javascript:alert('Form #validate3 submited');">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
							<h4 class="modal-title" id="largeModalHead">Normalizar Direccion (Principal)</h4>
						</div>
						<div class="modal-body">
							<div class="row">
								<div class="col-sm-12">
									<div class="col-sm-12 col-md-12">
										<input type="hidden" class="form-control" name="address_selected" v-model="address_selected" />
									</div>
									
									<div class="col-sm-3 col-md-4">
										<div class="form-group">
											<label class="col-xs-12 control-label">Tipo Vía (*)</label>
											<div class="col-xs-12">
												<select class="form-control select" name="type_road" data-live-search="true">
													<option value="null"></option>
												</select>
												<span class="help-block">&nbsp;</span>
											</div>
										</div>
									</div>
									<div class="col-sm-3 col-md-2">
										<div class="form-group">
											<label class="col-xs-12 control-label">Num. (*)</label>
											<div class="col-xs-12">
												<input type="text" class="form-control" name="number_a" data-address-model="number_a" />
											</div>
										</div>
									</div>
									<div class="col-sm-3 col-md-2">
										<div class="form-group">
											<label class="col-xs-12 control-label">Letra</label>
											<div class="col-xs-12">
												<select class="form-control select letters-addresses" name="letter_a" data-address-model="letter_a" data-live-search="true">
													<option value="null"></option>
												</select>
												<span class="help-block">&nbsp;</span>
											</div>
										</div>
									</div>
									<div class="col-sm-3 col-md-2">
										<div class="form-group">
											<label class="col-xs-12 control-label">Cuadrante</label>
											<div class="col-xs-12">
												<select class="form-control select quadrants-addresses" name="quadrant_a" data-address-model="quadrant_a" data-live-search="true">
													<option value="null"></option>
												</select>
												<span class="help-block">&nbsp;</span>
											</div>
										</div>
									</div>
									<div class="col-sm-3 col-md-2">
										<div class="form-group">
											<label class="col-xs-12 control-label">Num. (*)</label>
											<div class="col-xs-12">
												<input type="text" class="form-control" name="number_b" data-address-model="number_b" />
												<span class="help-block">&nbsp;</span>
											</div>
										</div>
									</div>
									
									<div class="col-sm-3 col-md-2">
										<div class="form-group">
											<label class="col-xs-12 control-label">Letra</label>
											<div class="col-xs-12">
												<select class="form-control select letters-addresses" name="letter_b" data-address-model="letter_b" data-live-search="true">
													<option value="null"></option>
												</select>
												<span class="help-block">&nbsp;</span>
											</div>
										</div>
									</div>
									<div class="col-sm-3 col-md-2">
										<div class="form-group">
											<label class="col-xs-12 control-label">Cuadrante</label>
											<div class="col-xs-12">
												<select class="form-control select quadrants-addresses" name="quadrant_b" data-address-model="quadrant_b" data-live-search="true">
													<option value="null"></option>
												</select>
												<span class="help-block">&nbsp;</span>
											</div>
										</div>
									</div>
									<div class="col-sm-3 col-md-2">
										<div class="form-group">
											<label class="col-xs-12 control-label">Num. (*)</label>
											<div class="col-xs-12">
												<input type="text" class="form-control" name="number_c" data-address-model="number_c" />
												<span class="help-block">&nbsp;</span>
											</div>
										</div>
									</div>
									
									<div class="col-sm-4 col-md-6">
										<div class="form-group">
											<label class="col-xs-12 control-label">Info. Adiccional</label>
											<div class="col-xs-12">
												<input type="text" class="form-control" name="additional_information" data-address-model="additional_information" onkeyup="javascript:this.value=this.value.toUpperCase();" style="text-transform:uppercase;" />
												<span class="help-block">Ejemplo: FI, INT, TO</span>
											</div>
										</div>
									</div>
									
									<div class="col-sm-4 col-md-6">
										<div class="form-group">
											<label class="col-xs-12 control-label">Departamento (*)</label>
											<div class="col-xs-12">
												<select class="form-control select" name="department" data-address-model="department" data-live-search="true">
													<option value="null"></option>
												</select>
												<span class="help-block">&nbsp;</span>
											</div>
										</div>
									</div>
									<div class="col-sm-4 col-md-6">
										<div class="form-group">
											<label class="col-xs-12 control-label">Ciudad (*)</label>
											<div class="col-xs-12">
												<select class="form-control select" name="city" data-address-model="city" data-live-search="true">
													<option value="null"></option>
												</select>
												<span class="help-block">&nbsp;</span>
											</div>
										</div>
									</div>
									
									<div class="col-sm-4 col-md-4">
										<div class="form-group">
											<label class="col-xs-12 control-label">Cod. Postal</label>
											<div class="col-xs-12">
												<input type="text" class="form-control" name="postal_code" data-address-model="postal_code" />
												<span class="help-block">&nbsp;</span>
											</div>
										</div>
									</div>
									
									
									<div class="col-sm-4 col-md-4">
										<div class="form-group">
											<label class="col-xs-12 control-label">Direccion Normalizada</label>
											<div class="col-xs-12">
												<input readonly="" type="text" class="form-control" name="address_input" data-address-model="address_input" />
												<span class="help-block">&nbsp;</span>
											</div>
										</div>
									</div>
									
									<div class="col-sm-4 col-md-4">
										<div class="form-group">
											<label class="col-xs-12 control-label">Direccion Completa</label>
											<div class="col-xs-12">
												<input readonly="" type="text" class="form-control" name="display_name" data-address-model="display_name" />
												<span class="help-block">&nbsp;</span>
											</div>
										</div>
									</div>
									
									<div class="col-sm-12 col-md-12">
										<hr>
										<div id='myMap' style='width: 100%; height: 35vh;'></div>
									</div>
								</div>
							</div>
						</div>
						<div class="modal-footer">
							<div class="pull-left">
								<div id="messageBox-2"></div>
							</div>
							<button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
							<button class="btn btn-primary pull-right" type="submit">Aceptar</button>
						</div>
						<div class="modal-footer">
							<h3 class="panel-title"><strong>address_principal</strong> </h3>
							{{ address_principal }}
							
							<h3 class="panel-title"><strong>address_invoices</strong> </h3>
							{{ address_invoices }}
						</div>
					</form>
                </div>
            </div>
        </div>
		
	</div>
</template>