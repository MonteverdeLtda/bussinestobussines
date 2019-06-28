<template id="page-contacts-view">
	<div>
		<div class="page-content-wrap">
			<div class="row">
			
				<div class="col-md-12">
					<div class="panel panel-default">
						<div class="panel-heading">
							<h3 class="panel-title"><strong>Viendo</strong> Contacto</h3>
							<ul class="panel-controls">
								<li>
									<router-link data-toggle="tooltip" data-placement="bottom" title="Modificar" tag="a" :to="{ name: 'page-contacts-edit', params: { contact_id: post.id } }" class="panel-remove">
										<span class="fas fa-pencil-alt"></span>
									</router-link>
								</li>
								<li><a @click="$router.go(-1)" class="panel-remove" data-toggle="tooltip" data-placement="bottom" title="Cerrar"><span class="fa fa-times"></span></a></li>
							</ul>
						</div>
						<form id="jvalidate" role="form" class="form-horizontal-" action="javascript:alert('Form #validate2 submited');">
							<div class="panel-body">
								<div class="row">
									<div class="col-sm-4 col-md-4">
										<div class="form-group">
											<label class="col-xs-12 control-label">Tipo de Documento</label>
											<div class="col-xs-12">
												<select class="form-control select" name="identification_type" v-model="post.identification_type" data-live-search="true">
													<option value=""></option>
												</select>
												<span class="help-block">&nbsp;</span>
											</div>
										</div>
									</div>									
									<div class="col-sm-4 col-md-4">
										<div class="form-group">
											<label class="col-xs-12 control-label"># de Identificación</label>
											<div class="col-xs-12">                                            
												<div class="input-group">
													<span class="input-group-addon"><span class="fas fa-fingerprint"></span></span>
													<input type="text" class="form-control" name="identification_number" v-model="post.identification_number" />
												</div>
												<span class="help-block">&nbsp;</span>
											</div>
										</div>
									</div>
									<div class="col-sm-4 col-md-4">
										<div class="form-group">
											<label class="col-xs-12 control-label">Genero</label>
											<div class="col-xs-12">
												<select class="form-control select" name="gender" v-model="post.gender" data-live-search="true">
													<option value=""></option>
												</select>
												<span class="help-block">&nbsp;</span>
											</div>
										</div>
									</div>
								</div>
								<div class="row">									
									<div class="col-sm-4 col-md-4">
										<div class="form-group">
											<label class="col-xs-12 control-label">Nombres</label>
											<div class="col-xs-12">                                            
												<div class="input-group">
													<span class="input-group-addon"><span class="fas fa-signature"></span></span>
													<input type="text" class="form-control" name="names" v-model="post.names" />
												</div>                                            
												<span class="help-block">&nbsp;</span>
											</div>
										</div>
									</div>
									<div class="col-sm-4 col-md-4">
										<div class="form-group">
											<label class="col-xs-12 control-label">Primer Apellido</label>
											<div class="col-xs-12">                                            
												<div class="input-group">
													<span class="input-group-addon"><span class="fas fa-signature"></span></span>
													<input type="text" class="form-control" name="surname" v-model="post.surname" />
												</div>                                            
												<span class="help-block">&nbsp;</span>
											</div>
										</div>
									</div>
									<div class="col-sm-4 col-md-4">
										<div class="form-group">
											<label class="col-xs-12 control-label">Segundo Apellido</label>
											<div class="col-xs-12">                                            
												<div class="input-group">
													<span class="input-group-addon"><span class="fas fa-signature"></span></span>
													<input type="text" class="form-control" name="second_surname" v-model="post.second_surname" />
												</div>                                            
												<span class="help-block">&nbsp;</span>
											</div>
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-3 col-md-3">
										<div class="form-group">
											<label class="col-xs-12 control-label">Fecha de Nacimiento</label>
											<div class="col-xs-12">                                            
												<div class="input-group">
													<span class="input-group-addon"><span class="fas fa-birthday-cake"></span></span>
													<input type="text" class="mask_date form-control datepicker" name="birthday" v-model="post.birthday" autocomplete="off" />
												</div>                                            
												<span class="help-block">&nbsp;</span>
											</div>
										</div>
									</div>
									<div class="col-sm-3 col-md-3">
										<div class="form-group">
											<label class="col-xs-12 control-label">Teléfono Fijo</label>
											<div class="col-xs-12">                                            
												<div class="input-group">
													<span class="input-group-addon"><span class="fas fa-phone-volume"></span></span>
													<input type="text" class="form-control mask_phone_ext" name="phone" v-model="post.phone" />
												</div>                                            
												<span class="help-block">&nbsp;</span>
											</div>
										</div>
									</div>
									<div class="col-sm-3 col-md-3">
										<div class="form-group">
											<label class="col-xs-12 control-label">Teléfono Móvil</label>
											<div class="col-xs-12">                                            
												<div class="input-group">
													<span class="input-group-addon"><span class="fas fa-mobile-alt"></span></span>
													<input type="text" class="form-control mask_phone_mobile" name="mobile" v-model="post.mobile" />
												</div>
												<span class="help-block">&nbsp;</span>
											</div>
										</div>
									</div>
									<div class="col-sm-3 col-md-3">
										<div class="form-group">
											<label class="col-xs-12 control-label">Correo Electronico</label>
											<div class="col-xs-12">                                            
												<div class="input-group">
													<span class="input-group-addon"><span class="fa fa-envelope"></span></span>
													<input type="email" class="form-control" name="email" v-model="post.email" />
												</div>
												<span class="help-block">&nbsp;</span>
											</div>
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-12 col-md-12">
										<div class="form-group">
											<label class="col-xs-12 control-label">Direccion</label>
											<div class="col-md-12">
												<div class="input-group">
													<input type="hidden" class="form-control" name="address" v-model="post.address" readonly="" />
													<input type="text" class="form-control" readonly="" v-model="address.address_input" />
													<span class="input-group-btn">
														<button class="btn btn-secondary" type="button" data-toggle="modal" data-target="#modal_basic" disabled="">...</button>
													</span>
												</div>
												<span class="help-block">&nbsp;</span>
											</div>
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
								<!-- // <button type="reset" class="btn btn-default">Clear Form</button> -->
								
								<button class="btn btn-primary pull-right" type="submit">Modificar Contacto</button>
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
							<h4 class="modal-title" id="largeModalHead">Normalizar Direccion</h4>
						</div>
						<div class="modal-body">
							<div class="row">
								<div class="col-sm-12">
									<div class="col-sm-3 col-md-4">
										<div class="form-group">
											<label class="col-xs-12 control-label">Tipo Vía (*)</label>
											<div class="col-xs-12">
												<select class="form-control select" name="type_road" data-address-model="type_road" v-model="address.type_road" data-live-search="true">
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
												<input type="text" class="form-control" name="number_a" data-address-model="number_a" v-model="address.number_a" />
											</div>
										</div>
									</div>
									<div class="col-sm-3 col-md-2">
										<div class="form-group">
											<label class="col-xs-12 control-label">Letra</label>
											<div class="col-xs-12">
												<select class="form-control select letters-addresses" name="letter_a" data-address-model="letter_a" v-model="address.letter_a" data-live-search="true">
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
												<select class="form-control select quadrants-addresses" name="quadrant_a" data-address-model="quadrant_a" v-model="address.quadrant_a" data-live-search="true">
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
												<input type="text" class="form-control" name="number_b" data-address-model="number_b" v-model="address.number_b" />
												<span class="help-block">&nbsp;</span>
											</div>
										</div>
									</div>
									
									<div class="col-sm-3 col-md-2">
										<div class="form-group">
											<label class="col-xs-12 control-label">Letra</label>
											<div class="col-xs-12">
												<select class="form-control select letters-addresses" name="letter_b" data-address-model="letter_b" v-model="address.letter_b" data-live-search="true">
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
												<select class="form-control select quadrants-addresses" name="quadrant_b" data-address-model="quadrant_b" v-model="address.quadrant_b" data-live-search="true">
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
												<input type="text" class="form-control" name="number_c" data-address-model="number_c" v-model="address.number_c" />
												<span class="help-block">&nbsp;</span>
											</div>
										</div>
									</div>
									
									<div class="col-sm-4 col-md-6">
										<div class="form-group">
											<label class="col-xs-12 control-label">Info. Adiccional</label>
											<div class="col-xs-12">
												<input type="text" class="form-control" name="additional_information" data-address-model="additional_information" v-model="address.additional_information" onkeyup="javascript:this.value=this.value.toUpperCase();" style="text-transform:uppercase;" />
												<span class="help-block">Ejemplo: FI, INT, TO</span>
											</div>
										</div>
									</div>
									
									<div class="col-sm-4 col-md-6">
										<div class="form-group">
											<label class="col-xs-12 control-label">Departamento (*)</label>
											<div class="col-xs-12">
												<select class="form-control select" name="department" data-address-model="department" v-model="address.department" data-live-search="true">
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
												<select class="form-control select" name="city" data-address-model="city" v-model="address.city" data-live-search="true">
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
												<input type="text" class="form-control" name="postal_code" data-address-model="postal_code" v-model="address.postal_code" />
												<span class="help-block">&nbsp;</span>
											</div>
										</div>
									</div>
									
									
									<div class="col-sm-4 col-md-4">
										<div class="form-group">
											<label class="col-xs-12 control-label">Direccion Normalizada</label>
											<div class="col-xs-12">
												<input readonly="" type="text" class="form-control" name="address_input" data-address-model="address_input" v-model="address.address_input" />
												<span class="help-block">&nbsp;</span>
											</div>
										</div>
									</div>
									
									<div class="col-sm-4 col-md-4">
										<div class="form-group">
											<label class="col-xs-12 control-label">Direccion Completa</label>
											<div class="col-xs-12">
												<input readonly="" type="text" class="form-control" name="display_name" data-address-model="display_name" v-model="address.display_name" />
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
							{{ address }}
						</div>
					</form>
                </div>
            </div>
        </div>
		
		
	</div>
</template>