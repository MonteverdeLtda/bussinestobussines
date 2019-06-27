<template id="page-employees-single-view">
	<div>
		<div class="page-content-wrap">
			<form id="jvalidate" role="form" class="form-horizontal" action="javascript:alert('Form #validate2 submited');">
				<div class="row">
					<div class="col-md-12">
						<div class="panel panel-default">
							<div class="panel-heading">
								<h3 class="panel-title"><strong>Viendo</strong> Empleado</h3>
								<ul class="panel-controls">
									<li>
										<!-- //
										<router-link tag="a" :to="{ name: 'page-addresses-add' }" class="panel-plus" title="Añadir Cuenta" data-toggle="tooltip" data-placement="bottom">
											<span class="fas fa-user-plus"></span>
										</router-link>
										-->
									</li>
								</ul>
							</div>
							<div class="panel-body table-responsive">
								<component-navigation-top-pages-employees></component-navigation-top-pages-employees>
							</div>
						</div>
					</div>
					
					
					<div class="col-md-12">
						<div class="panel panel-default">
							<div class="panel-heading">
								<h3 class="panel-title">Viendo Empleado</h3>
								<ul class="panel-controls">
									<li><a @click="router.push({ name: 'page-employees-single-edit' })"><span class="fas fa-pencil-alt"></span> </a></li>
									<li><a @click="find()" class="panel-refresh" title="Actualizar" data-toggle="tooltip" data-placement="bottom"><span class="fa fa-refresh"></span></a></li>
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
																<select class="form-control select" name="status" v-model="post.status.id">
																	<option :value="post.status.id">{{ post.status.name }}</option>
																</select>
															</div>
														</div>
													</div>
													<div class="col-md-3">
														<div class="form-group">
															<label class="col-xs-12 control-label text-left">Tipo de Identificacion</label>
															<div class="col-xs-12">
																<select class="form-control select" name="identification_type" v-model="post.identification_type.id" >
																	<option :value="post.identification_type.id">{{ post.identification_type.name }}</option>
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
													<div class="col-md-2">
														<div class="form-group">
															<label class="col-xs-12 control-label text-left">Tipo de Sangre</label>
															<div class="col-xs-12">
																<select class="form-control select" name="blood_type" v-model="post.blood_type.id" >
																	<option :value="post.blood_type.id">{{ post.blood_type.name }}</option>
																</select>
															</div>
														</div>
													</div>
													<div class="col-md-3">
														<div class="form-group">
															<label class="col-xs-12 control-label text-left">RH</label>
															<div class="col-xs-12">
																<select class="form-control select" name="blood_rh" v-model="post.blood_rh.id" >
																	<option :value="post.blood_rh.id">{{ post.blood_rh.name }}</option>
																</select>
															</div>
														</div>
													</div>
													<div class="col-md-4">
														<div class="form-group">
															<label class="col-xs-12 control-label text-left">Genero</label>
															<div class="col-xs-12">
																<select class="form-control select" name="gender" v-model="post.gender.id" >
																	<option :value="post.gender.id">{{ post.gender.name }}</option>
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
													<div class="col-md-4">
														<div class="form-group">
															<label class="col-xs-12 control-label text-left">Departamento Residencia</label>
															<div class="col-xs-12">
																<select class="form-control select" name="department" v-model="post.department.id" data-live-search="true">
																	<option :value="post.department.id">{{ post.department.name }}</option>
																</select>
															</div>
														</div>
													</div>
													<div class="col-md-4">
														<div class="form-group">
															<label class="col-xs-12 control-label text-left">Ciudad Residencia</label>
															<div class="col-xs-12">
																<select class="form-control select" name="city" v-model="post.city.id" data-live-search="true">
																	<option :value="post.city.id">{{ post.city.name }}</option>
																</select>
															</div>
														</div>
													</div>
													<div class="col-md-4">
														<div class="form-group">
															<label class="col-xs-12 control-label text-left">Direccion Residencia</label>
															<div class="col-xs-12">
																<div class="input-group">
																	<span class="input-group-addon"><span style="color: black;" class="fas fa-signature"></span></span>
																	<input type="text" class="form-control" name="address" v-model="post.address" />
																</div>
															</div>
														</div>
													</div>													
													<div class="col-md-6">
														<div class="form-group">
															<label class="col-md-12 control-label text-left">Banco</label>
															<div class="col-md-12">
																<select class="form-control select" name="bank" v-model="post.bank.id" data-live-search="true">
																	<option :value="post.bank.id">{{ post.bank.name }}</option>
																</select>
															</div>
														</div>
													</div>													
													<div class="col-md-2">
														<div class="form-group">
															<label class="col-md-12 control-label text-left">Tipo de Cuenta</label>
															<div class="col-md-12">
																<select class="form-control select" name="bank_type" v-model="post.bank_type.id" data-live-search="true">
																	<option :value="post.bank_type.id">{{ post.bank_type.name }}</option>
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
																<select class="form-control select" name="eps" v-model="post.eps.id" data-live-search="true">
																	<option :value="post.eps.id">{{ post.eps.name }}</option>
																</select>
															</div>
														</div>
													</div>
													<div class="col-md-2">
														<div class="form-group">
															<label class="col-xs-12 control-label text-left">AEPS Activa</label>
															<div class="col-xs-12">
																<label class="check">
																<div class="icheckbox_minimal-grey" style="position: relative;">
																	<input disabled="" name="eps_active" v-model="post.eps_active" type="checkbox" class="icheckbox"  style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 15%;" />
																</div> Activa
																</label>
															</div>
														</div>
													</div>
													<div class="col-md-4">
														<div class="form-group">
															<label class="col-xs-12 control-label text-left">ARL</label>
															<div class="col-xs-12">
																<select class="form-control select" name="arl" v-model="post.arl.id" data-live-search="true">
																	<option :value="post.arl.id">{{ post.arl.name }}</option>
																</select>
															</div>
														</div>
													</div>
													<div class="col-md-2">
														<div class="form-group">
															<label class="col-xs-12 control-label text-left">AARL Activa</label>
															<div class="col-xs-12">
																<label class="check">
																<div class="icheckbox_minimal-grey" style="position: relative;">
																	<input disabled="" name="arl_active" v-model="post.arl_active" type="checkbox" class="icheckbox"  style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 15%;" />
																</div> Activa
																</label>
															</div>
														</div>
													</div>
													
													<div class="col-md-4">
														<div class="form-group">
															<label class="col-xs-12 control-label text-left">Fondo de Pensiones</label>
															<div class="col-xs-12">
																<select class="form-control select" name="pension_fund" v-model="post.pension_fund.id" data-live-search="true">
																	<option :value="post.pension_fund.id">{{ post.pension_fund.name }}</option>
																</select>
															</div>
														</div>
													</div>
													<div class="col-md-2">
														<div class="form-group">
															<label class="col-xs-12 control-label text-left">AFP Activa</label>
															<div class="col-xs-12">
																<label class="check">
																<div class="icheckbox_minimal-grey" style="position: relative;">
																	<input disabled="" name="pension_fund_active" v-model="post.pension_fund_active" type="checkbox" class="icheckbox"  style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 15%;" />
																</div> Activa
																</label>
															</div>
														</div>
													</div>
													<div class="col-md-4">
														<div class="form-group">
															<label class="col-xs-12 control-label text-left">Caja de Compensacion</label>
															<div class="col-xs-12">
																<select class="form-control select" name="compensation_fund" v-model="post.compensation_fund.id" data-live-search="true">
																	<option :value="post.compensation_fund.id">{{ post.compensation_fund.name }}</option>
																</select>
															</div>
														</div>
													</div>
													<div class="col-md-2">
														<div class="form-group">
															<label class="col-xs-12 control-label text-left">ACCF Activa</label>
															<div class="col-xs-12">
																<label class="check">
																<div class="icheckbox_minimal-grey" style="position: relative;">
																	<input disabled="" name="compensation_fund_active" v-model="post.compensation_fund_active" type="checkbox" class="icheckbox"  style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 15%;" />
																</div> Activa
																</label>
															</div>
														</div>
													</div>
													
													<div class="col-md-4">
														<div class="form-group">
															<label class="col-xs-12 control-label text-left">Fondo de Cesantias</label>
															<div class="col-xs-12">
																<select class="form-control select" name="severance_fund" v-model="post.severance_fund.id" data-live-search="true">
																	<option :value="post.severance_fund.id">{{ post.severance_fund.name }}</option>
																</select>
															</div>
														</div>
													</div>
													
												</div>
											</div>
											
											<div class="panel-body">
												<div class="row">
													<h4>Información Corporativa</h4>
													<div class="col-md-6">
														<div class="form-group">
															<label class="col-xs-12 control-label text-left">F. Ingreso (Empresa)</label>
															<div class="col-xs-12">
																<div class="input-group">
																	<span class="input-group-addon"><span style="color: black;" class="fas fa-signature"></span></span>
																	<input type="text" class="form-control" v-model="post.company_date_entry" />
																</div>
															</div>
														</div>
													</div>
													<div class="col-md-6">
														<div class="form-group">
															<label class="col-xs-12 control-label text-left">F. Retiro (Empresa)</label>
															<div class="col-xs-12">
																<div class="input-group">
																	<span class="input-group-addon"><span style="color: black;" class="fas fa-signature"></span></span>
																	<input type="text" class="form-control" v-model="post.company_date_out" />
																</div>
															</div>
														</div>
													</div>
													<div class="col-md-4">
														<div class="form-group">
															<label class="col-xs-12 control-label text-left">Correo Electronico</label>
															<div class="col-xs-12">
																<div class="input-group">
																	<span class="input-group-addon"><span style="color: black;" class="fas fa-signature"></span></span>
																	<input type="text" class="form-control" v-model="post.company_mail" />
																</div>
															</div>
														</div>
													</div>
													<div class="col-md-4">
														<div class="form-group">
															<label class="col-xs-12 control-label text-left">Teléfono Fijo / Extension</label>
															<div class="col-xs-12">
																<div class="input-group">
																	<span class="input-group-addon"><span style="color: black;" class="fas fa-signature"></span></span>
																	<input type="text" class="form-control" v-model="post.company_number_phone" />
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
																	<input type="text" class="form-control" v-model="post.company_number_mobile" />
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
					</div>
				</div>
			</form>
		</div>
		
	</div>
</template>