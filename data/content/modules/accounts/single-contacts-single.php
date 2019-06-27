
<template id="page-accounts-contacts-single-view">
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
							<h3 class="panel-title"><strong>Viendo</strong> Contacto en cuenta</h3>
							<ul class="panel-controls">
								<li>
									<router-link data-toggle="tooltip" data-placement="bottom" title="Modificar Contacto" tag="a" :to="{ name: 'page-contacts-edit', params: { contact_id: post.contact.id } }" class="panel-remove">
										<span class="fas fa-user-edit"></span>
									</router-link>
								</li>
								
								<li><a @click="set_type_contact(-1)" class="panel-refresh"><span class="fas fa-pencil-alt"></span></a></li>
								<li><a @click="$router.go(-1)" class="panel-remove"><span class="fa fa-times"></span></a></li>
							</ul>
						</div>
						<form role="form" class="form-horizontal" >
							<div class="panel-body">	
								<div class="form-group">
									<label class="col-md-3 col-xs-12 control-label">Tipo de Documento de Identificación</label>
									<div class="col-md-6 col-xs-12">                                            
										<div class="input-group">
											<span class="input-group-addon"><span class="fas fa-fingerprint"></span></span>
											<input type="text" class="form-control" v-model="post.contact.identification_type.name" />
										</div>
										<!-- // <span class="help-block">This is sample of text field</span> -->
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-3 col-xs-12 control-label"># de Identificación / DNI</label>
									<div class="col-md-6 col-xs-12">                                            
										<div class="input-group">
											<span class="input-group-addon"><span class="fas fa-fingerprint"></span></span>
											<input type="text" class="form-control" v-model="post.contact.identification_number" />
										</div>
										<!-- // <span class="help-block">This is sample of text field</span> -->
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-3 col-xs-12 control-label">Primer Nombre</label>
									<div class="col-md-6 col-xs-12">                                            
										<div class="input-group">
											<span class="input-group-addon"><span class="fas fa-signature"></span></span>
											<input type="text" class="form-control" v-model="post.contact.first_name" />
										</div>                                            
										<!-- // <span class="help-block">This is sample of text field</span> -->
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-3 col-xs-12 control-label">Segundo Nombre</label>
									<div class="col-md-6 col-xs-12">                                            
										<div class="input-group">
											<span class="input-group-addon"><span class="fas fa-signature"></span></span>
											<input type="text" class="form-control" v-model="post.contact.second_name" />
										</div>                                            
										<!-- // <span class="help-block">This is sample of text field</span> -->
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-3 col-xs-12 control-label">Primer Apellido</label>
									<div class="col-md-6 col-xs-12">                                            
										<div class="input-group">
											<span class="input-group-addon"><span class="fas fa-signature"></span></span>
											<input type="text" class="form-control" v-model="post.contact.surname" />
										</div>                                            
										<!-- // <span class="help-block">This is sample of text field</span> -->
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-3 col-xs-12 control-label">Segundo Apellido</label>
									<div class="col-md-6 col-xs-12">                                            
										<div class="input-group">
											<span class="input-group-addon"><span class="fas fa-signature"></span></span>
											<input type="text" class="form-control" v-model="post.contact.second_surname" />
										</div>                                            
										<!-- // <span class="help-block">This is sample of text field</span> -->
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-3 col-xs-12 control-label">Fecha de Cumpleaños</label>
									<div class="col-md-6 col-xs-12">                                            
										<div class="input-group">
											<span class="input-group-addon"><span class="fas fa-birthday-cake"></span></span>
											<input type="text" class="mask_date form-control" v-model="post.contact.birthdaydate"  />
										</div>                                            
										<!-- // <span class="help-block">This is sample of text field</span> -->
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-3 col-xs-12 control-label">Teléfono Fijo</label>
									<div class="col-md-6 col-xs-12">                                            
										<div class="input-group">
											<span class="input-group-addon"><span class="fas fa-phone-volume"></span></span>
											<input type="text" class="form-control" v-model="post.contact.phone" />
										</div>                                            
										<!-- // <span class="help-block">This is sample of text field</span> -->
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-3 col-xs-12 control-label">Teléfono Móvil</label>
									<div class="col-md-6 col-xs-12">                                            
										<div class="input-group">
											<span class="input-group-addon"><span class="fas fa-mobile-alt"></span></span>
											<input type="text" class="form-control" v-model="post.contact.phone_mobile" />
										</div>                                            
										<!-- // <span class="help-block">This is sample of text field</span> -->
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-3 col-xs-12 control-label">Correo Electronico</label>
									<div class="col-md-6 col-xs-12">                                            
										<div class="input-group">
											<span class="input-group-addon"><span class="fa fa-envelope"></span></span>
											<input type="text" class="form-control" v-model="post.contact.mail"/>
										</div>                                            
										<!-- // <span class="help-block">This is sample of text field</span> -->
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-3 col-xs-12 control-label">Departamento</label>
									<div class="col-md-6 col-xs-12">
										<div class="input-group">
											<span class="input-group-addon"><span class="fa fa-map-marker"></span></span>
											<input type="text" class="form-control" v-model="post.contact.department.name"/>
										</div>
										<!-- // <span class="help-block">Select box example</span> -->
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-3 col-xs-12 control-label">Ciudad</label>
									<div class="col-md-6 col-xs-12">
										<div class="input-group">
											<span class="input-group-addon"><span class="fa fa-map-marker"></span></span>
											<input type="text" class="form-control" v-model="post.contact.city.name"/>
										</div>
										<!-- // <span class="help-block">Select box example</span> -->
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-3 col-xs-12 control-label">Dirección Residencia</label>
									<div class="col-md-6 col-xs-12">                                            
										<div class="input-group">
											<span class="input-group-addon"><span class="fa fa-map-marker"></span></span>
											<input type="text" class="form-control" v-model="post.contact.address"/>
										</div>                                            
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-3 col-xs-12 control-label">Relacion/Parentesco</label>
									<div class="col-md-6 col-xs-12">                                            
										<div class="input-group">
											<span class="input-group-addon"><span class="fa fa-map-marker"></span></span>
											<input type="text" class="form-control" v-model="post.type_contact.name" />
										</div>                                            
									</div>
								</div>
							</div>
							<div class="panel-footer">
								<a @click="delete_row(post.id)" class="btn btn-sm btn-danger"><span class="fas fa-trash"></span> Eliminar</a></li>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
