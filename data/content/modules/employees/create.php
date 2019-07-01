<template id="page-employees-add">
	<div>
		<div class="page-content-wrap">
			<form id="jvalidate" role="form" class="form-horizontal" action="javascript:alert('Form #validate2 submited');">
				<div class="row">
					<div class="col-md-12">
						<div class="panel panel-default">
							<div class="panel-heading">
								<h3 class="panel-title">Crear Empleado</h3>
								<ul class="panel-controls">
									<li>
										<router-link tag="a" :to="{ name: 'page-employees-list' }" class="panel-remove" title="Cerrar" data-toggle="tooltip" data-placement="bottom">
											<span class="fa fa-times"></span>
										</router-link>
									</li>
								</ul>
							</div>
							<div class="panel-body">
								<div class="row">
									<div class="col-md-12">
										<div class="panel panel-default">
											<div class="panel-body">
												<div class="row">
													<h4>Información Básica</h4>
													<div class="col-md-3">
														<div class="form-group">
															<label class="col-xs-12 control-label text-left">Estado</label>
															<div class="col-xs-12">
																<select class="form-control select" name="status" v-model="post.status" >
																	<option value="null"></option>
																</select>
															</div>
														</div>
													</div>
													<div class="col-md-3">
														<div class="form-group">
															<label class="col-xs-12 control-label text-left">Tipo de Identificacion</label>
															<div class="col-xs-12">
																<select class="form-control select" name="identification_type" v-model="post.identification_type" >
																	<option value="null"></option>
																</select>
															</div>
														</div>
													</div>
													<div class="col-md-3">
														<div class="form-group">
															<label class="col-xs-12 control-label text-left"># Identificacion</label>
															<div class="col-xs-12">
																<div class="input-group">
																	<span class="input-group-addon"><span style="color: black;" class="fas fa-signature"></span></span>
																	<input type="text" class="form-control" name="identification_number" v-model="post.identification_number" />
																</div>
															</div>
														</div>
													</div>
													<div class="col-md-3">
														<div class="form-group">
															<label class="col-xs-12 control-label text-left">F. Expedicion Documento</label>
															<div class="col-xs-12">
																<div class="input-group">
																	<span class="input-group-addon"><span style="color: black;" class="fas fa-signature"></span></span>
																	<input type="text" class="form-control mask_date" name="identification_date_expedition" v-model="post.identification_date_expedition" />
																</div>
															</div>
														</div>
													</div>
													<div class="col-md-3">
														<div class="form-group">
															<label class="col-xs-12 control-label text-left">Primer Nombre</label>
															<div class="col-xs-12">
																<div class="input-group">
																	<span class="input-group-addon"><span style="color: black;" class="fas fa-signature"></span></span>
																	<input type="text" class="form-control" name="first_name" v-model="post.first_name" />
																</div>
															</div>
														</div>
													</div>
													<div class="col-md-3">
														<div class="form-group">
															<label class="col-xs-12 control-label text-left">Segundo Nombre</label>
															<div class="col-xs-12">
																<div class="input-group">
																	<span class="input-group-addon"><span style="color: black;" class="fas fa-signature"></span></span>
																	<input type="text" class="form-control" name="second_name" v-model="post.second_name" />
																</div>
															</div>
														</div>
													</div>
													<div class="col-md-3">
														<div class="form-group">
															<label class="col-xs-12 control-label text-left">Primer Apellido</label>
															<div class="col-xs-12">
																<div class="input-group">
																	<span class="input-group-addon"><span style="color: black;" class="fas fa-signature"></span></span>
																	<input type="text" class="form-control" name="surname" v-model="post.surname" />
																</div>
															</div>
														</div>
													</div>
													<div class="col-md-3">
														<div class="form-group">
															<label class="col-xs-12 control-label text-left">Segundo Apellido</label>
															<div class="col-xs-12">
																<div class="input-group">
																	<span class="input-group-addon"><span style="color: black;" class="fas fa-signature"></span></span>
																	<input type="text" class="form-control" name="second_surname" v-model="post.second_surname" />
																</div>
															</div>
														</div>
													</div>
													<div class="col-md-3">
														<div class="form-group">
															<label class="col-xs-12 control-label text-left">Fecha de Nacimiento</label>
															<div class="col-xs-12">
																<div class="input-group">
																	<span class="input-group-addon"><span style="color: black;" class="fas fa-signature"></span></span>
																	<input type="text" class="form-control mask_date" name="birthdate" v-model="post.birthdate" />
																</div>
															</div>
														</div>
													</div>
													<div class="col-md-3">
														<div class="form-group">
															<label class="col-xs-12 control-label text-left">Tipo de Sangre</label>
															<div class="col-xs-12">
																<select class="form-control select" name="blood_type" v-model="post.blood_type" >
																	<option value="null"></option>
																</select>
															</div>
														</div>
													</div>
													<div class="col-md-3">
														<div class="form-group">
															<label class="col-xs-12 control-label text-left">RH</label>
															<div class="col-xs-12">
																<select class="form-control select" name="blood_rh" v-model="post.blood_rh" >
																	<option value="null"></option>
																</select>
															</div>
														</div>
													</div>
													<div class="col-md-3">
														<div class="form-group">
															<label class="col-xs-12 control-label text-left">Genero</label>
															<div class="col-xs-12">
																<select class="form-control select" name="gender" v-model="post.gender" >
																	<option value="null"></option>
																</select>
															</div>
														</div>
													</div>
													<div class="col-md-4">
														<div class="form-group">
															<label class="col-xs-12 control-label text-left">Correo Electronico</label>
															<div class="col-xs-12">
																<div class="input-group">
																	<span class="input-group-addon"><span style="color: black;" class="fas fa-signature"></span></span>
																	<input type="text" class="form-control" name="email" v-model="post.email" />
																</div>
															</div>
														</div>
													</div>
													<div class="col-md-4">
														<div class="form-group">
															<label class="col-xs-12 control-label text-left">Teléfono Fijo</label>
															<div class="col-xs-12">
																<div class="input-group">
																	<span class="input-group-addon"><span style="color: black;" class="fas fa-signature"></span></span>
																	<input type="text" class="form-control mask_phone_ext" name="number_phone" v-model="post.number_phone" />
																</div>
															</div>
														</div>
													</div>
													<div class="col-md-4">
														<div class="form-group">
															<label class="col-xs-12 control-label text-left">Teléfono Móvil</label>
															<div class="col-xs-12">
																<div class="input-group">
																	<span class="input-group-addon"><span style="color: black;" class="fas fa-signature"></span></span>
																	<input type="text" class="form-control mask_phone" name="number_mobile" v-model="post.number_mobile" />
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
														<button class="btn btn-secondary" type="button" data-toggle="modal" data-target="#modal_basic">...</button>
													</span>
												</div>
												<span class="help-block">&nbsp;</span>
											</div>
										</div>
									</div>
								</div>
								
												
													<div class="col-md-4">
														<div class="form-group">
															<label class="col-md-12 control-label text-left">Banco</label>
															<div class="col-md-12">
																<select class="form-control select" name="bank" v-model="post.bank" data-live-search="true">
																	<option value="null"></option>
																</select>
															</div>
														</div>
													</div>
													
													<div class="col-md-4">
														<div class="form-group">
															<label class="col-md-12 control-label text-left">Tipo de Cuenta</label>
															<div class="col-md-12">
																<select class="form-control select" name="bank_type" v-model="post.bank_type" data-live-search="true">
																	<option value="null"></option>
																</select>
															</div>
														</div>
													</div>
													
													<div class="col-md-4">
														<div class="form-group">
															<label class="col-md-12 control-label text-left"># Cuenta Bancaria</label>
															<div class="col-md-12">
																<input type="text" class="form-control" name="bank_number" v-model="post.bank_number" />
															</div>
														</div>
													</div>
													
													<div class="col-md-12">
														<div class="form-group">
															<label class="col-md-12 control-label text-left">Observaciones / Notas</label>
															<div class="col-md-12">
																<textarea rows="7" class="form-control" name="observations" v-model="post.observations"></textarea>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div class="panel-body">
												<div class="row">
													<h4>Afiliaciones</h4>
													<div class="col-md-4">
														<div class="form-group">
															<label class="col-xs-12 control-label text-left">EPS</label>
															<div class="col-xs-12">
																<select class="form-control select" name="eps" v-model="post.eps" data-live-search="true">
																	<option value="null"></option>
																</select>
															</div>
														</div>
													</div>
													<div class="col-md-4">
														<div class="form-group">
															<label class="col-xs-12 control-label text-left">ARL</label>
															<div class="col-xs-12">
																<select class="form-control select" name="arl" v-model="post.arl" data-live-search="true">
																	<option value="null"></option>
																</select>
															</div>
														</div>
													</div>
													<div class="col-md-4">
														<div class="form-group">
															<label class="col-xs-12 control-label text-left">Fondo de Pensiones</label>
															<div class="col-xs-12">
																<select class="form-control select" name="pension_fund" v-model="post.pension_fund" data-live-search="true">
																	<option value="null"></option>
																</select>
															</div>
														</div>
													</div>
													<div class="col-md-6">
														<div class="form-group">
															<label class="col-xs-12 control-label text-left">Caja de Compensacion</label>
															<div class="col-xs-12">
																<select class="form-control select" name="compensation_fund" v-model="post.compensation_fund" data-live-search="true">
																	<option value="null"></option>
																</select>
															</div>
														</div>
													</div>
													<div class="col-md-6">
														<div class="form-group">
															<label class="col-xs-12 control-label text-left">Fondo de Cesantias</label>
															<div class="col-xs-12">
																<select class="form-control select" name="severance_fund" v-model="post.severance_fund" data-live-search="true">
																	<option value="null"></option>
																</select>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div class="panel-footer">
												<div class="row">
													<div class="col-md-12">
														<div id="messageBox"></div>
													</div>
													<div class="col-md-12 pull-right">
														<button class="btn btn-primary pull-right" type="submit">Añadir Cuenta</button>
													</div>
												</div>
												{{ post }}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>
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
