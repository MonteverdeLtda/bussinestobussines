<template id="page-contacts-add">
	<div>
		<div class="page-content-wrap">
			<div class="row">
				<div class="col-md-1">
				</div>
				<div class="col-md-10">
					<div class="panel panel-default">
						<div class="panel-heading">
							<h3 class="panel-title"><strong>Añadir</strong> Contacto</h3>
							<ul class="panel-controls">
								<li>
									<router-link tag="a" :to="{ name: 'page-contacts-list' }" class="panel-remove" title="Cerrar" data-toggle="tooltip" data-placement="bottom">
										<span class="fa fa-times"></span>
									</router-link>
								</li>
							</ul>
						</div>
						<form id="jvalidate" role="form" class="form-horizontal" action="javascript:alert('Form #validate2 submited');">
							<div class="panel-body">
								<!-- // Parametros -->
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
									<label class="col-md-3 col-xs-12 control-label">Primer Nombre</label>
									<div class="col-md-6 col-xs-12">                                            
										<div class="input-group">
											<span class="input-group-addon"><span class="fas fa-signature"></span></span>
											<input type="text" class="form-control" name="first_name" v-model="post.first_name" />
										</div>                                            
										<span class="help-block">Este campo es obligatorio.</span>
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-3 col-xs-12 control-label">Segundo Nombre</label>
									<div class="col-md-6 col-xs-12">                                            
										<div class="input-group">
											<span class="input-group-addon"><span class="fas fa-signature"></span></span>
											<input type="text" class="form-control" name="second_name" v-model="post.second_name" />
										</div>                                            
										<!-- // <span class="help-block">This is sample of text field</span> -->
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-3 col-xs-12 control-label">Primer Apellido</label>
									<div class="col-md-6 col-xs-12">                                            
										<div class="input-group">
											<span class="input-group-addon"><span class="fas fa-signature"></span></span>
											<input type="text" class="form-control" name="surname" v-model="post.surname" />
										</div>                                            
										<!-- // <span class="help-block">This is sample of text field</span> -->
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-3 col-xs-12 control-label">Segundo Apellido</label>
									<div class="col-md-6 col-xs-12">                                            
										<div class="input-group">
											<span class="input-group-addon"><span class="fas fa-signature"></span></span>
											<input type="text" class="form-control" name="second_surname" v-model="post.second_surname" />
										</div>                                            
										<!-- // <span class="help-block">This is sample of text field</span> -->
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-3 col-xs-12 control-label">Fecha de Cumpleaños</label>
									<div class="col-md-6 col-xs-12">                                            
										<div class="input-group">
											<span class="input-group-addon"><span class="fas fa-birthday-cake"></span></span>
											<input type="text" class="mask_date form-control datepicker" name="birthdaydate" v-model="post.birthdaydate" autocomplete="off" />
										</div>                                            
										<!-- // <span class="help-block">This is sample of text field</span> -->
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-3 col-xs-12 control-label">Teléfono Fijo</label>
									<div class="col-md-6 col-xs-12">                                            
										<div class="input-group">
											<span class="input-group-addon"><span class="fas fa-phone-volume"></span></span>
											<input type="text" class="form-control mask_phone_ext" name="phone" v-model="post.phone" />
										</div>                                            
										<span class="help-block">Este campo es obligatorio.</span>
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-3 col-xs-12 control-label">Teléfono Móvil</label>
									<div class="col-md-6 col-xs-12">                                            
										<div class="input-group">
											<span class="input-group-addon"><span class="fas fa-mobile-alt"></span></span>
											<input type="text" class="form-control mask_phone_mobile" name="phone_mobile" v-model="post.phone_mobile" />
										</div>                                            
										<!-- // <span class="help-block">This is sample of text field</span> -->
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-3 col-xs-12 control-label">Correo Electronico</label>
									<div class="col-md-6 col-xs-12">                                            
										<div class="input-group">
											<span class="input-group-addon"><span class="fa fa-envelope"></span></span>
											<input type="text" class="form-control" name="mail" v-model="post.mail"/>
										</div>                                            
										<!-- // <span class="help-block">This is sample of text field</span> -->
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-3 col-xs-12 control-label">Departamento</label>
									<div class="col-md-6 col-xs-12">                                                                                            
										<select class="form-control select" data-v-model="department" name="department" v-model="post.department" data-live-search="true">
											<option value=""></option>
										</select>
										<span class="help-block">Este campo es obligatorio.</span>
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-3 col-xs-12 control-label">Ciudad</label>
									<div class="col-md-6 col-xs-12">                                                                                            
										<select class="form-control select" data-v-model="city" name="city" v-model="post.city" data-live-search="true">
											<option value=""></option>
										</select>
										<span class="help-block">Este campo es obligatorio.</span>
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-3 col-xs-12 control-label">Dirección Residencia</label>
									<div class="col-md-6 col-xs-12">                                            
										<div class="input-group">
											<span class="input-group-addon"><span class="fa fa-map-marker"></span></span>
											<input type="text" class="form-control" name="address" v-model="post.address" />
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
								
								<button class="btn btn-primary pull-right" type="submit">Añadir Contacto</button>
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