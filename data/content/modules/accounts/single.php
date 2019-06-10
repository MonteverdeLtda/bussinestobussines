<template id="component-navigation-top-pages-accounts">
	<div>
		<div class="panel panel-default tabs">
			<ul class="nav nav-tabs" role="">
				<li :class="isActiveClass('page-accounts-list')"><a :href="'/#/accounts/view/' + $route.params.account_id">Información Básica</a></li>
				<li :class="isActiveClass('page-accounts-contacts-view')"><a :href="'/#/accounts/view/' + $route.params.account_id + '/contacts'">Contactos</a></li>
				<li :class="isActiveClass('page-accounts-addresses-view')"><a :href="'/#/accounts/view/' + $route.params.account_id + '/addresses'">Direcciones</a></li>
				<li :class="isActiveClass('page-accounts-requests-view')"><a :href="'/#/accounts/view/' + $route.params.account_id + '/requests'">Solicitudes</a></li>
				<li :class="isActiveClass('page-accounts-calendar-view')"><a :href="'/#/accounts/view/' + $route.params.account_id + '/calendar'">Calendario</a></li>
			</ul>
		</div>
	</div>
</template>

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
									<form role="form" class="form-horizontal" >
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
									<!-- // -->
									</form>
								</div>
							</div>
							<div class="tab-pane" id="tab-second">
								
							</div>
							<div class="tab-pane" id="tab-third">
								<div class="panel-heading">
									<h3 class="panel-title">Solicitudes</h3>
									<ul class="panel-controls">
										<li>
											<router-link tag="a" :to="{ name: 'page-accounts-add' }" class="panel-plus" title="Añadir Contacto" data-toggle="tooltip" data-placement="bottom">
												<span class="fas fa-user-plus"></span>
											</router-link>
										</li>
										
										<li><a @click="find()" class="panel-refresh" title="Actualizar" data-toggle="tooltip" data-placement="bottom"><span class="fa fa-refresh"></span></a></li>
										
									</ul>                                
								</div>
								<div class="panel-body">
									<table class="table table-hover table-bordereds datatable-requests">
										<thead>
											<tr>
												<th></th>
												<th></th>
											</tr>
										</thead>
										<tbody>
										</tbody>
									</table>
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

<template id="page-accounts-contacts-view">
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
							<h3 class="panel-title">Contactos</h3>
							<ul class="panel-controls">
								<li>
									<router-link tag="a" :to="{ name: 'page-contacts-list-accounts-add-to-account', params: { account_id: post.id } }" class="panel-plus" title="Añadir Contacto" data-toggle="tooltip" data-placement="bottom">
										<span class="fas fa-user-plus"></span>
									</router-link>
								</li>
								<li><a @click="find()" class="panel-refresh" title="Actualizar" data-toggle="tooltip" data-placement="bottom"><span class="fa fa-refresh"></span></a></li>
							</ul>                                
						</div>
						<div class="panel-body">
							<table class="table table-hover table-bordereds datatable-contacts">
								<thead>
									<tr>
										<th>Tipo de DNI</th>
										<th># Identificacion</th>
										<th>Nombres</th>
										<th>Apellidos</th>
										<th>T. Fijo</th>
										<th>T. Móvil</th>
										<th>E-Mail</th>
										<th>Relacion/Parentesco</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
								</tbody>
							</table>
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

<template id="page-accounts-addresses-view">
	<div>		
		<div class="page-content-wrap">
			<div class="row">
				<div class="col-md-12">
					<div class="panel panel-default">
						<div class="panel-heading">
							<h3 class="panel-title"><strong>Viendo</strong> Cuenta</h3>
							<ul class="panel-controls">
								
							</ul>
						</div>
						<div class="panel-body">
							<component-navigation-top-pages-accounts></component-navigation-top-pages-accounts>
						</div>
					</div>
					
					<div class="panel panel-default">
						<div class="panel-heading">                                
							<h3 class="panel-title">Direcciones</h3>
							<ul class="panel-controls">
								<li>
									<!-- //
									<router-link tag="a" :to="{ name: 'page-addresses-add' }" class="panel-plus" title="Añadir Cuenta" data-toggle="tooltip" data-placement="bottom">
										<span class="fas fa-user-plus"></span>
									</router-link>
									-->
								</li>
								<li><a @click="find()" class="panel-refresh" title="Actualizar" data-toggle="tooltip" data-placement="bottom"><span class="fa fa-refresh"></span></a></li>
								
							</ul>                                
						</div>
						<div class="panel-body table-responsive">
							<table class="table table-hover table-bordereds datatable">
								<thead>
									<tr>
										<th>Display Name</th>
										<th>Ciudad</th>
										<th>Departamento</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<template id="page-accounts-addresses-single-view">
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
							<h3 class="panel-title"><strong>Viendo</strong> Dirección</h3>
							<ul class="panel-controls">
								<!-- //
								<li>
									<router-link data-toggle="tooltip" data-placement="bottom" title="Modificar Dirección" tag="a" :to="{ name: 'page-contacts-edit', params: { contact_id: post.id } }" class="panel-remove">
										<span class="fas fa-pencil-alt"></span>
									</router-link>
								</li>
								-->
								<li><a @click="$router.go(-1)" class="panel-remove"><span class="fa fa-times"></span></a></li>
							</ul>
						</div>
						<form role="form" class="form-horizontal" >
							<div class="panel-body">
								<div class="row">
									<div class="col-md-8">
										<div class="panel panel-default">
											<div id="vector_world_map" style="width: 100%; height: 300px"></div>	
										</div>
									</div>
									<div class="col-md-4 table-responsive">
										<table class="table table-bordered table-hover">
											<tr>
												<td>Dirección: </td>
												<td>{{ post.display_name }}</td>
											</tr>
											<tr>
												<td>Ciudad: </td>
												<td>{{ post.city.name }}</td>
											</tr>
											<tr>
												<td>Departamento: </td>
												<td>{{ post.department.name }}</td>
											</tr>
											<tr>
												<td>Latitud: </td>
												<td>{{ post.lat }}</td>
											</tr>
											<tr>
												<td>Longitud: </td>
												<td>{{ post.lon }}</td>
											</tr>
										</p>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<template id="page-accounts-requests-view">
	<div>		
		<div class="page-content-wrap">
			<div class="row">
				<div class="col-md-12">
					<div class="panel panel-default">
						<div class="panel-heading">
							<h3 class="panel-title"><strong>Viendo</strong> Cuenta</h3>
							<ul class="panel-controls">
								
							</ul>
						</div>
						<div class="panel-body">
							<component-navigation-top-pages-accounts></component-navigation-top-pages-accounts>
						</div>
					</div>
					
					<div class="panel panel-default">
						<div class="panel-heading">                                
							<h3 class="panel-title">Solicitudes</h3>
							<ul class="panel-controls">
								<li><a @click="find()" class="panel-refresh" title="Actualizar" data-toggle="tooltip" data-placement="bottom"><span class="fa fa-refresh"></span></a></li>
							</ul>                                
						</div>
						<div class="panel-body table-responsive">
							<table class="table table-hover table-bordereds datatable">
								<thead>
									<tr>
										<th>ID</th>
										<th>Estado</th>
										<th>Contacto</th>
										<th>Direcciones y Servicios</th>
										<th>Notas Adicionales</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<template id="page-accounts-requests-single-view">
	<div>		
		<div class="page-content-wrap">
			<div class="row">
				<div class="col-md-12">
					<div class="panel panel-default">
						<div class="panel-heading">
							<h3 class="panel-title"><strong>Viendo</strong> Cuenta</h3>
							<ul class="panel-controls">
								
							</ul>
						</div>
						<div class="panel-body">
							<component-navigation-top-pages-accounts></component-navigation-top-pages-accounts>
						</div>
					</div>
					
					<div class="panel panel-default">
						<div class="panel-heading">
							<h3 class="panel-title"><strong>Viendo</strong> Solicitud # {{ $route.params.request_id }} - <strong>Estado</strong> {{ post.status.name }}</h3>
							<ul class="panel-controls">
								<li>	
									<router-link v-if="post.status.id == 1" data-toggle="tooltip" data-placement="bottom" title="Agendar Visita Tecnicos" tag="a" :to="{ name: 'page-accounts-requests-single-calendar-add', params: { account_id: $route.params.account_id, request_id: $route.params.request_id } }" class="panel-remove">
										<span class="fas fa-calendar-plus"></span>
									</router-link>
								</li>
								
								<li><a @click="find()" class="panel-refresh" title="Actualizar" data-toggle="tooltip" data-placement="bottom"><span class="fa fa-refresh"></span></a></li>
								<li><a @click="$router.go(-1)" class="panel-remove"><span class="fa fa-times"></span></a></li>
							</ul>
						</div>
						<div class="panel-body table-responsive-">
							<div class="content-frame">
								<!-- START CONTENT FRAME TOP -->
								<div class="content-frame-top">
									
								</div>
								<!-- END CONTENT FRAME TOP -->
								
								<!-- START CONTENT FRAME LEFT -->
								<div class="content-frame-right">
									<div class="panel panel-default">
										<form role="form" class="form-horizontal">   
											<div class="panel-body">
												<h3 class="push-up-0">Cambiar Estado</h3>
												<div class="form-group">
													<div class="col-md-12">
														<select class="form-control select" v-model="post.status">
															<option value="">Seleccione un nuevo estado</option>
															<option :value="item" v-for="item in options.status_requests">{{ item.name }}</option>
														</select>
													</div>
												</div>
												<div class="form-group">
													<div class="col-md-12">
														<button @click="changeStatusRequest()" type="button" class="btn btn-success">Completar Cambio</button>
													</div>
												</div>
											</div>
										</form>
									</div>
									
									<div class="panel panel-default">
										<div class="panel-body">
											<h3 class="push-up-0">Contacto</h3>
											<hr>
											<div class="table-responsive">
												<table class="table table-bordered table-hover">
													<tbody>
														<tr><th colspan="2">Nombre completo</th></tr>
														<tr><td colspan="2">{{ post.contact.first_name }} {{ post.contact.second_name }} {{ post.contact.surname }} {{ post.contact.second_surname }}</td></tr>
														<tr><th colspan="2">Teléfonos</th></tr>
														<tr><td>{{ post.contact.phone }}</td><td>{{ post.contact.phone_mobile }}</td></tr>
														<tr><th colspan="2">Mas Información</th></tr>
														<tr><td colspan="2">{{ post.contact.first_name }} {{ post.contact.second_name }} {{ post.contact.surname }} {{ post.contact.second_surname }}</td></tr>
														<tr><th colspan="2">Correo Electronico</th></tr>
														<tr><td colspan="2">{{ post.contact.mail }}</td></tr>
														<tr><th colspan="2">Direccion Fisica</th></tr>
														<tr><td colspan="2">{{ post.contact.address }}</td></tr>
													</tbody>
												</table>
											</div>
										</div>
									</div>
									<div class="panel panel-default">
										<div class="panel-body">
											<h3 class="push-up-0">Notas / Observaciones</h3>
											<hr>
											{{ post.request_notes }}
										</div>
									</div>
									<div class="panel panel-default">
										<div class="panel-body">
											<h3>Actividad</h3>
											<hr>
											<div class="panel-body panel-body-table">
												<div class="table-responsive">
													<table class="table table-bordered table-hover">
														<thead>
															<tr>
																<th>Comentario</th>
																<th width="100">Fecha</th>
															</tr>
														</thead>
														<tbody>                                            
															<tr v-for="request in post.requests_activity">
																<td><strong>{{ request.comment }}</strong></td>
																<td><span class="label label-default">{{ request.created }}</span></td>
															</tr>
														</tbody>
													</table>
												</div>                                

											</div>
										</div>
									</div>
								</div>
								<!-- END CONTENT FRAME LEFT -->
								
								<!-- START CONTENT FRAME BODY -->
								<div class="content-frame-body content-frame-body-left">
									<div class="panel panel-default">
										<div class="panel-heading">
											<h3 class="panel-title">Detalles de la solicitud</h3>
										</div>
										<div class="panel-body table-responsive">
											<div v-for="address in post.addresses">
												<table class="table table-bordered table-hover">
													<thead>
														<tr>
															<th colspan="2">
																<img v-if="address.completo.icon != undefined" :src="address.completo.icon" />
																{{ address.display_name }}
																<span class="label label-default">{{ address.completo.category }}</span>
																<span class="label label-default">{{ address.completo.type }}</span>
															</th>
														</tr>
														<tr>
															<th>Servicio</th>
															<th>Repetición/ Frecuencia</th>
														</tr>
													</thead>
													<tbody>
														<tr v-for="service in address.services">
															<td>{{ service.name }}</td>
															<td>{{ service.repeat.name }}</td>
														</tr>
													</tbody>
												</table>
											</div>
										</div>
									</div>
									
									
									<div class="panel panel-default">
										<div class="panel-heading">
											<h3 class="panel-title">Propuestas</h3>
											<ul class="panel-controls">
												<li>												
													<router-link v-if="post.status.id == 3" data-toggle="tooltip" data-placement="bottom" title="Añadir Propuesta" tag="a" :to="{ name: 'page-accounts-requests-quotations-add', params: { account_id: $route.params.account_id, request_id: $route.params.request_id } }" class="panel-remove">
														<i class="fas fa-plus-circle"></i>
													</router-link>
												</li>
											</ul>
										</div>
										<div class="panel-body table-responsive">
											<table class="table table-bordered table-hover">
												<thead>
													<tr>
														<th></th>
														<th>Estado</th>
														<th>Fecha</th>
														<th>Validez</th>
														<th></th>
													</tr>
												</thead>
												
												<tbody>
													<tr v-for="quotation in post.quotations">
														<td>
															{{ $root.zfill($route.params.account_id, 5) }}-{{ $root.zfill($route.params.request_id, 5) }}-{{ $root.zfill(quotation.id, 5) }}
														</td>
														<td>{{ quotation.status.name }}</td>
														<td>{{ quotation.created }}</td>
														<td>{{ quotation.validity }}</td>
														<td>
															<router-link data-toggle="tooltip" data-placement="bottom" title="Ver Propuesta" tag="button" :to="{ name: 'page-accounts-requests-quotations-single-view', params: { account_id: $route.params.account_id, request_id: $route.params.request_id, quotation_id: quotation.id } }" class="btn btn-default btn-rounded btn-xs panel-remove">
																<i class="fas fa-eye"></i>
															</router-link>
														</td>
													</tr>
												</tbody>
											</table>
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
</template>

<style scope="page-accounts-requests-quotations-single-view">
.layout-boxed html,.layout-boxed body{height:100%}body{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-family:'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:400;overflow-x:hidden;overflow-y:auto}.wrapper{min-height:100%;position:static;overflow:hidden}.wrapper:before,.wrapper:after{content:" ";display:table}.wrapper:after{clear:both}.layout-boxed .wrapper{max-width:1250px;margin:0 auto;min-height:100%;box-shadow:0 0 8px rgba(0,0,0,0.5);position:relative}.layout-boxed{background:url('../img/boxed-bg.jpg') repeat fixed}.content-wrapper,.right-side,.main-footer{-webkit-transition:-webkit-transform .3s ease-in-out,margin .3s ease-in-out;-moz-transition:-moz-transform .3s ease-in-out,margin .3s ease-in-out;-o-transition:-o-transform .3s ease-in-out,margin .3s ease-in-out;transition:transform .3s ease-in-out,margin .3s ease-in-out;margin-left:230px;z-index:820}.layout-top-nav .content-wrapper,.layout-top-nav .right-side,.layout-top-nav .main-footer{margin-left:0}@media (max-width:767px){.content-wrapper,.right-side,.main-footer{margin-left:0}}@media (min-width:768px){.sidebar-collapse .content-wrapper,.sidebar-collapse .right-side,.sidebar-collapse .main-footer{margin-left:0}}@media (max-width:767px){.sidebar-open .content-wrapper,.sidebar-open .right-side,.sidebar-open .main-footer{-webkit-transform:translate(230px, 0);-ms-transform:translate(230px, 0);-o-transform:translate(230px, 0);transform:translate(230px, 0)}}.content-wrapper,.right-side{min-height:100%;background-color:#ecf0f5;z-index:800}.main-footer{background:#fff;padding:15px;color:#444;border-top:1px solid #d2d6de}.fixed .main-header,.fixed .main-sidebar,.fixed .left-side{position:fixed}.fixed .main-header{top:0;right:0;left:0}.fixed .content-wrapper,.fixed .right-side{padding-top:50px}@media (max-width:767px){.fixed .content-wrapper,.fixed .right-side{padding-top:100px}}.fixed.layout-boxed .wrapper{max-width:100%}.content{min-height:250px;padding:15px;margin-right:auto;margin-left:auto;padding-left:15px;padding-right:15px}h1,h2,h3,h4,h5,h6,.h1,.h2,.h3,.h4,.h5,.h6{font-family:'Source Sans Pro',sans-serif}a{color:#3c8dbc}a:hover,a:active,a:focus{outline:none;text-decoration:none;color:#72afd2}.page-header{margin:10px 0 20px 0;font-size:22px}.page-header>small{color:#666;display:block;margin-top:5px}.main-header{position:relative;max-height:100px;z-index:1030}.main-header>.navbar{-webkit-transition:margin-left .3s ease-in-out;-o-transition:margin-left .3s ease-in-out;transition:margin-left .3s ease-in-out;margin-bottom:0;margin-left:230px;border:none;min-height:50px;border-radius:0}.layout-top-nav .main-header>.navbar{margin-left:0!important}.main-header #navbar-search-input{background:rgba(255,255,255,0.2);border-color:transparent}.main-header #navbar-search-input:focus,.main-header #navbar-search-input:active{border-color:rgba(0,0,0,0.1) !important;background:rgba(255,255,255,0.9)}.main-header #navbar-search-input::-moz-placeholder{color:#ccc;opacity:1}.main-header #navbar-search-input:-ms-input-placeholder{color:#ccc}.main-header #navbar-search-input::-webkit-input-placeholder{color:#ccc}.main-header .navbar-custom-menu,.main-header .navbar-right{float:right}@media (max-width:991px){.main-header .navbar-custom-menu a,.main-header .navbar-right a{color:inherit;background:transparent}}@media (max-width:767px){.main-header .navbar-right{float:none}.navbar-collapse .main-header .navbar-right{margin:7.5px -15px}.main-header .navbar-right>li{color:inherit;border:0}}.main-header .sidebar-toggle{float:left;background-color:transparent;background-image:none;padding:15px 15px;font-family:fontAwesome}.main-header .sidebar-toggle:before{content:"\f0c9"}.main-header .sidebar-toggle:hover{color:#fff}.main-header .sidebar-toggle:focus,.main-header .sidebar-toggle:active{background:transparent}.main-header .sidebar-toggle .icon-bar{display:none}.main-header .navbar .nav>li.user>a>.fa,.main-header .navbar .nav>li.user>a>.glyphicon,.main-header .navbar .nav>li.user>a>.ion{margin-right:5px}.main-header .navbar .nav>li>a>.label{position:absolute;top:9px;right:7px;text-align:center;font-size:9px;padding:2px 3px;line-height:.9}.main-header .logo{-webkit-transition:width .3s ease-in-out;-o-transition:width .3s ease-in-out;transition:width .3s ease-in-out;display:block;float:left;height:50px;font-size:20px;line-height:50px;text-align:center;width:230px;font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;padding:0 15px;font-weight:300}.main-header .logo .logo-lg{display:block}.main-header .logo .logo-mini{display:none}.main-header .navbar-brand{color:#fff}.content-header{position:relative;padding:15px 15px 0 15px}.content-header>h1{margin:0;font-size:24px}.content-header>h1>small{font-size:15px;display:inline-block;padding-left:4px;font-weight:300}.content-header>.breadcrumb{float:right;background:transparent;margin-top:0px;margin-bottom:0;font-size:12px;padding:7px 5px;position:absolute;top:15px;right:10px;border-radius:2px}.content-header>.breadcrumb>li>a{color:#444;text-decoration:none;display:inline-block}.content-header>.breadcrumb>li>a>.fa,.content-header>.breadcrumb>li>a>.glyphicon,.content-header>.breadcrumb>li>a>.ion{margin-right:5px}.content-header>.breadcrumb>li+li:before{content:'>\00a0'}@media (max-width:991px){.content-header>.breadcrumb{position:relative;margin-top:5px;top:0;right:0;float:none;background:#d2d6de;padding-left:10px}.content-header>.breadcrumb li:before{color:#97a0b3}}.navbar-toggle{color:#fff;border:0;margin:0;padding:15px 15px}@media (max-width:991px){.navbar-custom-menu .navbar-nav>li{float:left}.navbar-custom-menu .navbar-nav{margin:0;float:left}.navbar-custom-menu .navbar-nav>li>a{padding-top:15px;padding-bottom:15px;line-height:20px}}@media (max-width:767px){.main-header{position:relative}.main-header .logo,.main-header .navbar{width:100%;float:none;position:relative!important}.main-header .navbar{margin:0}.main-header .navbar-custom-menu{float:right}.main-sidebar,.left-side{padding-top:100px!important}}@media (max-width:991px){.navbar-collapse.pull-left{float:none!important}.navbar-collapse.pull-left+.navbar-custom-menu{display:block;position:absolute;top:0;right:40px}}.main-sidebar,.left-side{position:absolute;top:0;left:0;padding-top:50px;min-height:100%;width:230px;z-index:810;-webkit-transition:-webkit-transform .3s ease-in-out,width .3s ease-in-out;-moz-transition:-moz-transform .3s ease-in-out,width .3s ease-in-out;-o-transition:-o-transform .3s ease-in-out,width .3s ease-in-out;transition:transform .3s ease-in-out,width .3s ease-in-out}@media (max-width:767px){.main-sidebar,.left-side{-webkit-transform:translate(-230px, 0);-ms-transform:translate(-230px, 0);-o-transform:translate(-230px, 0);transform:translate(-230px, 0)}}@media (min-width:768px){.sidebar-collapse .main-sidebar,.sidebar-collapse .left-side{-webkit-transform:translate(-230px, 0);-ms-transform:translate(-230px, 0);-o-transform:translate(-230px, 0);transform:translate(-230px, 0)}}@media (max-width:767px){.sidebar-open .main-sidebar,.sidebar-open .left-side{-webkit-transform:translate(0, 0);-ms-transform:translate(0, 0);-o-transform:translate(0, 0);transform:translate(0, 0)}}.sidebar{padding-bottom:10px}.sidebar-form input:focus{border-color:transparent!important}.user-panel{padding:10px}.user-panel:before,.user-panel:after{content:" ";display:table}.user-panel:after{clear:both}.user-panel>.image>img{width:100%;max-width:45px;height:auto}.user-panel>.info{font-weight:600;padding:5px 5px 5px 15px;font-size:14px;line-height:1}.user-panel>.info>p{margin-bottom:9px}.user-panel>.info>a{text-decoration:none;padding-right:5px;margin-top:3px;font-size:11px;font-weight:normal}.user-panel>.info>a>.fa,.user-panel>.info>a>.ion,.user-panel>.info>a>.glyphicon{margin-right:3px}.sidebar-menu{list-style:none;margin:0;padding:0}.sidebar-menu>li{position:relative;margin:0;padding:0}.sidebar-menu>li>a{padding:12px 5px 12px 15px;display:block}.sidebar-menu>li>a>.fa,.sidebar-menu>li>a>.glyphicon,.sidebar-menu>li>a>.ion{width:20px}.sidebar-menu>li .label,.sidebar-menu>li .badge{margin-top:3px;margin-right:5px}.sidebar-menu li.header{padding:10px 25px 10px 15px;font-size:12px}.sidebar-menu li>a>.fa-angle-left{width:auto;height:auto;padding:0;margin-right:10px;margin-top:3px}.sidebar-menu li.active>a>.fa-angle-left{-webkit-transform:rotate(-90deg);-ms-transform:rotate(-90deg);-o-transform:rotate(-90deg);transform:rotate(-90deg)}.sidebar-menu li.active>.treeview-menu{display:block}.sidebar-menu .treeview-menu{display:none;list-style:none;padding:0;margin:0;padding-left:5px}.sidebar-menu .treeview-menu .treeview-menu{padding-left:20px}.sidebar-menu .treeview-menu>li{margin:0}.sidebar-menu .treeview-menu>li>a{padding:5px 5px 5px 15px;display:block;font-size:14px}.sidebar-menu .treeview-menu>li>a>.fa,.sidebar-menu .treeview-menu>li>a>.glyphicon,.sidebar-menu .treeview-menu>li>a>.ion{width:20px}.sidebar-menu .treeview-menu>li>a>.fa-angle-left,.sidebar-menu .treeview-menu>li>a>.fa-angle-down{width:auto}@media (min-width:768px){.sidebar-mini.sidebar-collapse .content-wrapper,.sidebar-mini.sidebar-collapse .right-side,.sidebar-mini.sidebar-collapse .main-footer{margin-left:50px!important;z-index:840}.sidebar-mini.sidebar-collapse .main-sidebar{-webkit-transform:translate(0, 0);-ms-transform:translate(0, 0);-o-transform:translate(0, 0);transform:translate(0, 0);width:50px!important;z-index:850}.sidebar-mini.sidebar-collapse .main-sidebar .user-panel>.info{display:none}.sidebar-mini.sidebar-collapse .sidebar-menu>li{position:relative}.sidebar-mini.sidebar-collapse .sidebar-menu>li>a{margin-right:0}.sidebar-mini.sidebar-collapse .sidebar-menu>li>a>span,.sidebar-mini.sidebar-collapse .sidebar-menu>li>.treeview-menu,.sidebar-mini.sidebar-collapse .sidebar-menu>li>a>.pull-right,.sidebar-mini.sidebar-collapse .sidebar-menu>li.header{display:none!important}.sidebar-mini.sidebar-collapse .sidebar-menu>li>a>span{border-top-right-radius:4px}.sidebar-mini.sidebar-collapse .sidebar-menu>li:not(.treeview)>a>span{border-bottom-right-radius:4px}.sidebar-mini.sidebar-collapse .sidebar-menu>li>.treeview-menu{padding-top:5px;padding-bottom:5px;border-bottom-right-radius:4px}.sidebar-mini.sidebar-collapse .sidebar-menu>li:hover>a>span:not(.pull-right),.sidebar-mini.sidebar-collapse .sidebar-menu>li:hover>.treeview-menu{display:block!important;position:absolute;width:180px;left:50px}.sidebar-mini.sidebar-collapse .sidebar-menu>li:hover>a>span{top:0;padding:12px 5px 12px 20px;background-color:inherit}.sidebar-mini.sidebar-collapse .sidebar-menu>li:hover>.treeview-menu{top:44px;margin-left:0}.sidebar-mini.sidebar-collapse .sidebar-form{display:none}.sidebar-mini.sidebar-collapse .main-header .logo{width:50px}.sidebar-mini.sidebar-collapse .main-header .logo>.logo-mini{display:block;margin-left:-15px;margin-right:-15px;font-size:18px}.sidebar-mini.sidebar-collapse .main-header .logo>.logo-lg{display:none}.sidebar-mini.sidebar-collapse .main-header .navbar{margin-left:50px}}.control-sidebar-bg{position:fixed;z-index:900;top:0;right:0;bottom:0;width:230px;background:#222d32}.control-sidebar-bg,.control-sidebar{-webkit-transform:translate(230px, 0);-ms-transform:translate(230px, 0);-o-transform:translate(230px, 0);transform:translate(230px, 0);-webkit-transition:-webkit-transform .3s ease-in-out;-moz-transition:-moz-transform .3s ease-in-out;-o-transition:-o-transform .3s ease-in-out;transition:transform .3s ease-in-out}.control-sidebar{position:absolute;top:50px;right:0;width:230px;z-index:1010;color:#b8c7ce}@media (max-width:768px){.control-sidebar{top:100px}}.control-sidebar>.tab-content{padding:10px 15px}.control-sidebar.control-sidebar-open,.control-sidebar.control-sidebar-open+.control-sidebar-bg{-webkit-transform:translate(0, 0);-ms-transform:translate(0, 0);-o-transform:translate(0, 0);transform:translate(0, 0)}.control-sidebar-open .control-sidebar-bg,.control-sidebar-open .control-sidebar{-webkit-transform:translate(0, 0);-ms-transform:translate(0, 0);-o-transform:translate(0, 0);transform:translate(0, 0)}@media (min-width:768px){.control-sidebar-open .content-wrapper,.control-sidebar-open .right-side,.control-sidebar-open .main-footer{margin-right:230px}}.control-sidebar-tabs{border-bottom:#1c2529}.control-sidebar-tabs>li>a{border-radius:0 !important;background:#181f23;color:#b8c7ce}.control-sidebar-tabs>li>a,.control-sidebar-tabs>li>a:hover{border-top:none;border-right:none;border-left:1px solid #141a1d !important;border-bottom:1px solid #141a1d !important}.control-sidebar-tabs>li>a:hover,.control-sidebar-tabs>li>a:focus,.control-sidebar-tabs>li>a:active{background:#1c2529}.control-sidebar-tabs>li>a .icon{font-size:16px}.control-sidebar-tabs>li.active>a,.control-sidebar-tabs>li.active>a:hover,.control-sidebar-tabs>li.active>a:focus,.control-sidebar-tabs>li.active>a:active{border-top:none!important;border-right:none!important;border-bottom:none!important;background:#222d32;color:#fff}@media (max-width:768px){.control-sidebar-tabs{display:table}.control-sidebar-tabs>li{display:table-cell !important}}.control-sidebar-heading{color:#fff;font-weight:400;font-size:16px;padding:10px 0;margin-bottom:10px}.control-sidebar-subheading{display:block;color:#fff;font-weight:400;font-size:14px}.control-sidebar-menu{list-style:none;padding:0;margin:0 -15px}.control-sidebar-menu>li>a{display:block;padding:10px 15px}.control-sidebar-menu>li>a:before,.control-sidebar-menu>li>a:after{content:" ";display:table}.control-sidebar-menu>li>a:after{clear:both}.control-sidebar-menu>li>a:hover{background:#1e282c}.control-sidebar-menu>li>a>.control-sidebar-subheading{margin-top:0}.control-sidebar-menu .menu-icon{float:left;width:35px;height:35px;border-radius:50%;text-align:center;line-height:35px}.control-sidebar-menu .menu-info{margin-left:45px;margin-top:3px}.control-sidebar-menu .menu-info>.control-sidebar-subheading{margin:0}.control-sidebar-menu .menu-info>p{margin:0;color:#b8c7ce;font-size:11px}.control-sidebar-menu .progress{margin:0}.dropdown-menu{box-shadow:0 1px 1px rgba(0,0,0,0.1);border-color:#eee}.dropdown-menu>li>a{color:#777}.dropdown-menu>li>a>.glyphicon,.dropdown-menu>li>a>.fa,.dropdown-menu>li>a>.ion{margin-right:10px}.dropdown-menu>li>a:hover{background-color:#e1e3e9;color:#333}.dropdown-menu>.divider{background-color:#eee}.navbar-nav>.notifications-menu,.navbar-nav>.messages-menu,.navbar-nav>.tasks-menu{position:relative}.navbar-nav>.notifications-menu>.dropdown-menu,.navbar-nav>.messages-menu>.dropdown-menu,.navbar-nav>.tasks-menu>.dropdown-menu{width:280px;padding:0 0 0 0!important;margin:0!important;top:100%}.navbar-nav>.notifications-menu>.dropdown-menu>li,.navbar-nav>.messages-menu>.dropdown-menu>li,.navbar-nav>.tasks-menu>.dropdown-menu>li{position:relative}.navbar-nav>.notifications-menu>.dropdown-menu>li.header,.navbar-nav>.messages-menu>.dropdown-menu>li.header,.navbar-nav>.tasks-menu>.dropdown-menu>li.header{border-top-left-radius:4px;border-top-right-radius:4px;border-bottom-right-radius:0;border-bottom-left-radius:0;background-color:#ffffff;padding:7px 10px;border-bottom:1px solid #f4f4f4;color:#444444;font-size:14px}.navbar-nav>.notifications-menu>.dropdown-menu>li.footer>a,.navbar-nav>.messages-menu>.dropdown-menu>li.footer>a,.navbar-nav>.tasks-menu>.dropdown-menu>li.footer>a{border-top-left-radius:0;border-top-right-radius:0;border-bottom-right-radius:4px;border-bottom-left-radius:4px;font-size:12px;background-color:#fff;padding:7px 10px;border-bottom:1px solid #eeeeee;color:#444!important;text-align:center}@media (max-width:991px){.navbar-nav>.notifications-menu>.dropdown-menu>li.footer>a,.navbar-nav>.messages-menu>.dropdown-menu>li.footer>a,.navbar-nav>.tasks-menu>.dropdown-menu>li.footer>a{background:#fff!important;color:#444!important}}.navbar-nav>.notifications-menu>.dropdown-menu>li.footer>a:hover,.navbar-nav>.messages-menu>.dropdown-menu>li.footer>a:hover,.navbar-nav>.tasks-menu>.dropdown-menu>li.footer>a:hover{text-decoration:none;font-weight:normal}.navbar-nav>.notifications-menu>.dropdown-menu>li .menu,.navbar-nav>.messages-menu>.dropdown-menu>li .menu,.navbar-nav>.tasks-menu>.dropdown-menu>li .menu{max-height:200px;margin:0;padding:0;list-style:none;overflow-x:hidden}.navbar-nav>.notifications-menu>.dropdown-menu>li .menu>li>a,.navbar-nav>.messages-menu>.dropdown-menu>li .menu>li>a,.navbar-nav>.tasks-menu>.dropdown-menu>li .menu>li>a{display:block;white-space:nowrap;border-bottom:1px solid #f4f4f4}.navbar-nav>.notifications-menu>.dropdown-menu>li .menu>li>a:hover,.navbar-nav>.messages-menu>.dropdown-menu>li .menu>li>a:hover,.navbar-nav>.tasks-menu>.dropdown-menu>li .menu>li>a:hover{background:#f4f4f4;text-decoration:none}.navbar-nav>.notifications-menu>.dropdown-menu>li .menu>li>a{color:#444444;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:10px}.navbar-nav>.notifications-menu>.dropdown-menu>li .menu>li>a>.glyphicon,.navbar-nav>.notifications-menu>.dropdown-menu>li .menu>li>a>.fa,.navbar-nav>.notifications-menu>.dropdown-menu>li .menu>li>a>.ion{width:20px}.navbar-nav>.messages-menu>.dropdown-menu>li .menu>li>a{margin:0px;padding:10px 10px}.navbar-nav>.messages-menu>.dropdown-menu>li .menu>li>a>div>img{margin:auto 10px auto auto;width:40px;height:40px}.navbar-nav>.messages-menu>.dropdown-menu>li .menu>li>a>h4{padding:0;margin:0 0 0 45px;color:#444444;font-size:15px;position:relative}.navbar-nav>.messages-menu>.dropdown-menu>li .menu>li>a>h4>small{color:#999999;font-size:10px;position:absolute;top:0px;right:0px}.navbar-nav>.messages-menu>.dropdown-menu>li .menu>li>a>p{margin:0 0 0 45px;font-size:12px;color:#888888}.navbar-nav>.messages-menu>.dropdown-menu>li .menu>li>a:before,.navbar-nav>.messages-menu>.dropdown-menu>li .menu>li>a:after{content:" ";display:table}.navbar-nav>.messages-menu>.dropdown-menu>li .menu>li>a:after{clear:both}.navbar-nav>.tasks-menu>.dropdown-menu>li .menu>li>a{padding:10px}.navbar-nav>.tasks-menu>.dropdown-menu>li .menu>li>a>h3{font-size:14px;padding:0;margin:0 0 10px 0;color:#666666}.navbar-nav>.tasks-menu>.dropdown-menu>li .menu>li>a>.progress{padding:0;margin:0}.navbar-nav>.user-menu>.dropdown-menu{border-top-right-radius:0;border-top-left-radius:0;padding:1px 0 0 0;border-top-width:0;width:280px}.navbar-nav>.user-menu>.dropdown-menu,.navbar-nav>.user-menu>.dropdown-menu>.user-body{border-bottom-right-radius:4px;border-bottom-left-radius:4px}.navbar-nav>.user-menu>.dropdown-menu>li.user-header{height:175px;padding:10px;text-align:center}.navbar-nav>.user-menu>.dropdown-menu>li.user-header>img{z-index:5;height:90px;width:90px;border:3px solid;border-color:transparent;border-color:rgba(255,255,255,0.2)}.navbar-nav>.user-menu>.dropdown-menu>li.user-header>p{z-index:5;color:#fff;color:rgba(255,255,255,0.8);font-size:17px;margin-top:10px}.navbar-nav>.user-menu>.dropdown-menu>li.user-header>p>small{display:block;font-size:12px}.navbar-nav>.user-menu>.dropdown-menu>.user-body{padding:15px;border-bottom:1px solid #f4f4f4;border-top:1px solid #dddddd}.navbar-nav>.user-menu>.dropdown-menu>.user-body:before,.navbar-nav>.user-menu>.dropdown-menu>.user-body:after{content:" ";display:table}.navbar-nav>.user-menu>.dropdown-menu>.user-body:after{clear:both}.navbar-nav>.user-menu>.dropdown-menu>.user-body a{color:#444 !important}@media (max-width:991px){.navbar-nav>.user-menu>.dropdown-menu>.user-body a{background:#fff !important;color:#444 !important}}.navbar-nav>.user-menu>.dropdown-menu>.user-footer{background-color:#f9f9f9;padding:10px}.navbar-nav>.user-menu>.dropdown-menu>.user-footer:before,.navbar-nav>.user-menu>.dropdown-menu>.user-footer:after{content:" ";display:table}.navbar-nav>.user-menu>.dropdown-menu>.user-footer:after{clear:both}.navbar-nav>.user-menu>.dropdown-menu>.user-footer .btn-default{color:#666666}.navbar-nav>.user-menu .user-image{float:left;width:25px;height:25px;border-radius:50%;margin-right:10px;margin-top:-2px}@media (max-width:767px){.navbar-nav>.user-menu .user-image{float:none;margin-right:0;margin-top:-8px;line-height:10px}}.open:not(.dropup)>.animated-dropdown-menu{backface-visibility:visible !important;-webkit-animation:flipInX .7s both;-o-animation:flipInX .7s both;animation:flipInX .7s both}@keyframes flipInX{0%{transform:perspective(400px) rotate3d(1, 0, 0, 90deg);transition-timing-function:ease-in;opacity:0}40%{transform:perspective(400px) rotate3d(1, 0, 0, -20deg);transition-timing-function:ease-in}60%{transform:perspective(400px) rotate3d(1, 0, 0, 10deg);opacity:1}80%{transform:perspective(400px) rotate3d(1, 0, 0, -5deg)}100%{transform:perspective(400px)}}@-webkit-keyframes flipInX{0%{transform:perspective(400px) rotate3d(1, 0, 0, 90deg);transition-timing-function:ease-in;opacity:0}40%{transform:perspective(400px) rotate3d(1, 0, 0, -20deg);transition-timing-function:ease-in}60%{transform:perspective(400px) rotate3d(1, 0, 0, 10deg);opacity:1}80%{transform:perspective(400px) rotate3d(1, 0, 0, -5deg)}100%{transform:perspective(400px)}}.navbar-custom-menu>.navbar-nav>li{position:relative}.navbar-custom-menu>.navbar-nav>li>.dropdown-menu{position:absolute;right:0;left:auto}@media (max-width:991px){.navbar-custom-menu>.navbar-nav{float:right}.navbar-custom-menu>.navbar-nav>li{position:static}.navbar-custom-menu>.navbar-nav>li>.dropdown-menu{position:absolute;right:5%;left:auto;border:1px solid #ddd;background:#fff}}.form-control{border-radius:0 !important;box-shadow:none;border-color:#d2d6de}.form-control:focus{border-color:#3c8dbc !important;box-shadow:none}.form-control::-moz-placeholder{color:#bbb;opacity:1}.form-control:-ms-input-placeholder{color:#bbb}.form-control::-webkit-input-placeholder{color:#bbb}.form-control:not(select){-webkit-appearance:none;-moz-appearance:none;appearance:none}.form-group.has-success label{color:#00a65a}.form-group.has-success .form-control{border-color:#00a65a !important;box-shadow:none}.form-group.has-warning label{color:#f39c12}.form-group.has-warning .form-control{border-color:#f39c12 !important;box-shadow:none}.form-group.has-error label{color:#dd4b39}.form-group.has-error .form-control{border-color:#dd4b39 !important;box-shadow:none}.input-group .input-group-addon{border-radius:0;border-color:#d2d6de;background-color:#fff}.btn-group-vertical .btn.btn-flat:first-of-type,.btn-group-vertical .btn.btn-flat:last-of-type{border-radius:0}.icheck>label{padding-left:0}.progress,.progress>.progress-bar{-webkit-box-shadow:none;box-shadow:none}.progress,.progress>.progress-bar,.progress .progress-bar,.progress>.progress-bar .progress-bar{border-radius:1px}.progress.sm,.progress-sm{height:10px}.progress.sm,.progress-sm,.progress.sm .progress-bar,.progress-sm .progress-bar{border-radius:1px}.progress.xs,.progress-xs{height:7px}.progress.xs,.progress-xs,.progress.xs .progress-bar,.progress-xs .progress-bar{border-radius:1px}.progress.xxs,.progress-xxs{height:3px}.progress.xxs,.progress-xxs,.progress.xxs .progress-bar,.progress-xxs .progress-bar{border-radius:1px}.progress.vertical{position:relative;width:30px;height:200px;display:inline-block;margin-right:10px}.progress.vertical>.progress-bar{width:100%!important;position:absolute;bottom:0}.progress.vertical.sm,.progress.vertical.progress-sm{width:20px}.progress.vertical.xs,.progress.vertical.progress-xs{width:10px}.progress.vertical.xxs,.progress.vertical.progress-xxs{width:3px}.progress-group .progress-text{font-weight:600}.progress-group .progress-number{float:right}.table tr>td .progress{margin:0}.progress-bar-light-blue,.progress-bar-primary{background-color:#3c8dbc}.progress-striped .progress-bar-light-blue,.progress-striped .progress-bar-primary{background-image:-webkit-linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent);background-image:-o-linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent);background-image:linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)}.progress-bar-green,.progress-bar-success{background-color:#00a65a}.progress-striped .progress-bar-green,.progress-striped .progress-bar-success{background-image:-webkit-linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent);background-image:-o-linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent);background-image:linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)}.progress-bar-aqua,.progress-bar-info{background-color:#00c0ef}.progress-striped .progress-bar-aqua,.progress-striped .progress-bar-info{background-image:-webkit-linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent);background-image:-o-linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent);background-image:linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)}.progress-bar-yellow,.progress-bar-warning{background-color:#f39c12}.progress-striped .progress-bar-yellow,.progress-striped .progress-bar-warning{background-image:-webkit-linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent);background-image:-o-linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent);background-image:linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)}.progress-bar-red,.progress-bar-danger{background-color:#dd4b39}.progress-striped .progress-bar-red,.progress-striped .progress-bar-danger{background-image:-webkit-linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent);background-image:-o-linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent);background-image:linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)}.small-box{border-radius:2px;position:relative;display:block;margin-bottom:20px;box-shadow:0 1px 1px rgba(0,0,0,0.1)}.small-box>.inner{padding:10px}.small-box>.small-box-footer{position:relative;text-align:center;padding:3px 0;color:#fff;color:rgba(255,255,255,0.8);display:block;z-index:10;background:rgba(0,0,0,0.1);text-decoration:none}.small-box>.small-box-footer:hover{color:#fff;background:rgba(0,0,0,0.15)}.small-box h3{font-size:38px;font-weight:bold;margin:0 0 10px 0;white-space:nowrap;padding:0}.small-box p{font-size:15px}.small-box p>small{display:block;color:#f9f9f9;font-size:13px;margin-top:5px}.small-box h3,.small-box p{z-index:5px}.small-box .icon{-webkit-transition:all .3s linear;-o-transition:all .3s linear;transition:all .3s linear;position:absolute;top:-10px;right:10px;z-index:0;font-size:90px;color:rgba(0,0,0,0.15)}.small-box:hover{text-decoration:none;color:#f9f9f9}.small-box:hover .icon{font-size:95px}@media (max-width:767px){.small-box{text-align:center}.small-box .icon{display:none}.small-box p{font-size:12px}}.box{position:relative;border-radius:3px;background:#ffffff;border-top:3px solid #d2d6de;margin-bottom:20px;width:100%;box-shadow:0 1px 1px rgba(0,0,0,0.1)}.box.box-primary{border-top-color:#3c8dbc}.box.box-info{border-top-color:#00c0ef}.box.box-danger{border-top-color:#dd4b39}.box.box-warning{border-top-color:#f39c12}.box.box-success{border-top-color:#00a65a}.box.box-default{border-top-color:#d2d6de}.box.collapsed-box .box-body,.box.collapsed-box .box-footer{display:none}.box .nav-stacked>li{border-bottom:1px solid #f4f4f4;margin:0}.box .nav-stacked>li:last-of-type{border-bottom:none}.box.height-control .box-body{max-height:300px;overflow:auto}.box .border-right{border-right:1px solid #f4f4f4}.box .border-left{border-left:1px solid #f4f4f4}.box.box-solid{border-top:0px}.box.box-solid>.box-header .btn.btn-default{background:transparent}.box.box-solid>.box-header .btn:hover,.box.box-solid>.box-header a:hover{background:rgba(0,0,0,0.1) !important}.box.box-solid.box-default{border:1px solid #d2d6de}.box.box-solid.box-default>.box-header{color:#444;background:#d2d6de;background-color:#d2d6de}.box.box-solid.box-default>.box-header a,.box.box-solid.box-default>.box-header .btn{color:#444}.box.box-solid.box-primary{border:1px solid #3c8dbc}.box.box-solid.box-primary>.box-header{color:#fff;background:#3c8dbc;background-color:#3c8dbc}.box.box-solid.box-primary>.box-header a,.box.box-solid.box-primary>.box-header .btn{color:#fff}.box.box-solid.box-info{border:1px solid #00c0ef}.box.box-solid.box-info>.box-header{color:#fff;background:#00c0ef;background-color:#00c0ef}.box.box-solid.box-info>.box-header a,.box.box-solid.box-info>.box-header .btn{color:#fff}.box.box-solid.box-danger{border:1px solid #dd4b39}.box.box-solid.box-danger>.box-header{color:#fff;background:#dd4b39;background-color:#dd4b39}.box.box-solid.box-danger>.box-header a,.box.box-solid.box-danger>.box-header .btn{color:#fff}.box.box-solid.box-warning{border:1px solid #f39c12}.box.box-solid.box-warning>.box-header{color:#fff;background:#f39c12;background-color:#f39c12}.box.box-solid.box-warning>.box-header a,.box.box-solid.box-warning>.box-header .btn{color:#fff}.box.box-solid.box-success{border:1px solid #00a65a}.box.box-solid.box-success>.box-header{color:#fff;background:#00a65a;background-color:#00a65a}.box.box-solid.box-success>.box-header a,.box.box-solid.box-success>.box-header .btn{color:#fff}.box.box-solid>.box-header>.box-tools .btn{border:0;box-shadow:none}.box.box-solid[class*='bg']>.box-header{color:#fff}.box .box-group>.box{margin-bottom:5px}.box .knob-label{text-align:center;color:#333;font-weight:100;font-size:12px;margin-bottom:0.3em}.box>.overlay,.box>.loading-img{position:absolute;top:0;left:0;width:100%;height:100%}.box .overlay{z-index:1010;background:rgba(255,255,255,0.7);border-radius:3px}.box .overlay>.fa{position:absolute;top:50%;left:50%;margin-left:-15px;margin-top:-15px;color:#000;font-size:30px}.box .overlay.dark{background:rgba(0,0,0,0.5)}.box-header:before,.box-body:before,.box-footer:before,.box-header:after,.box-body:after,.box-footer:after{content:" ";display:table}.box-header:after,.box-body:after,.box-footer:after{clear:both}.box-header{color:#444;display:block;padding:10px;position:relative}.box-header.with-border{border-bottom:1px solid #f4f4f4}.collapsed-box .box-header.with-border{border-bottom:none}.box-header>.fa,.box-header>.glyphicon,.box-header>.ion,.box-header .box-title{display:inline-block;font-size:18px;margin:0;line-height:1}.box-header>.fa,.box-header>.glyphicon,.box-header>.ion{margin-right:5px}.box-header>.box-tools{position:absolute;right:10px;top:5px}.box-header>.box-tools [data-toggle="tooltip"]{position:relative}.box-header>.box-tools.pull-right .dropdown-menu{right:0;left:auto}.btn-box-tool{padding:5px;font-size:12px;background:transparent;box-shadow:none!important;color:#97a0b3}.open .btn-box-tool,.btn-box-tool:hover{color:#606c84}.btn-box-tool:active{outline:none!important}.box-body{border-top-left-radius:0;border-top-right-radius:0;border-bottom-right-radius:3px;border-bottom-left-radius:3px;padding:10px}.no-header .box-body{border-top-right-radius:3px;border-top-left-radius:3px}.box-body>.table{margin-bottom:0}.box-body .fc{margin-top:5px}.box-body .full-width-chart{margin:-19px}.box-body.no-padding .full-width-chart{margin:-9px}.box-body .box-pane{border-top-left-radius:0;border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:3px}.box-body .box-pane-right{border-top-left-radius:0;border-top-right-radius:0;border-bottom-right-radius:3px;border-bottom-left-radius:0}.box-footer{border-top-left-radius:0;border-top-right-radius:0;border-bottom-right-radius:3px;border-bottom-left-radius:3px;border-top:1px solid #f4f4f4;padding:10px;background-color:#fff}.chart-legend{margin:10px 0}@media (max-width:991px){.chart-legend>li{float:left;margin-right:10px}}.todo-list{margin:0;padding:0px 0px;list-style:none;overflow:auto}.todo-list>li{border-radius:2px;padding:10px;background:#f4f4f4;margin-bottom:2px;border-left:2px solid #e6e7e8;color:#444}.todo-list>li:last-of-type{margin-bottom:0}.todo-list>li.danger{border-left-color:#dd4b39}.todo-list>li.warning{border-left-color:#f39c12}.todo-list>li.info{border-left-color:#00c0ef}.todo-list>li.success{border-left-color:#00a65a}.todo-list>li.primary{border-left-color:#3c8dbc}.todo-list>li>input[type='checkbox']{margin:0 10px 0 5px}.todo-list>li .text{display:inline-block;margin-left:5px;font-weight:600}.todo-list>li .label{margin-left:10px;font-size:9px}.todo-list>li .tools{display:none;float:right;color:#dd4b39}.todo-list>li .tools>.fa,.todo-list>li .tools>.glyphicon,.todo-list>li .tools>.ion{margin-right:5px;cursor:pointer}.todo-list>li:hover .tools{display:inline-block}.todo-list>li.done{color:#999}.todo-list>li.done .text{text-decoration:line-through;font-weight:500}.todo-list>li.done .label{background:#d2d6de !important}.todo-list .handle{display:inline-block;cursor:move;margin:0 5px}.chat{padding:5px 20px 5px 10px}.chat .item{margin-bottom:10px}.chat .item:before,.chat .item:after{content:" ";display:table}.chat .item:after{clear:both}.chat .item>img{width:40px;height:40px;border:2px solid transparent;border-radius:50% !important}.chat .item>img.online{border:2px solid #00a65a}.chat .item>img.offline{border:2px solid #dd4b39}.chat .item>.message{margin-left:55px;margin-top:-40px}.chat .item>.message>.name{display:block;font-weight:600}.chat .item>.attachment{border-radius:3px;background:#f4f4f4;margin-left:65px;margin-right:15px;padding:10px}.chat .item>.attachment>h4{margin:0 0 5px 0;font-weight:600;font-size:14px}.chat .item>.attachment>p,.chat .item>.attachment>.filename{font-weight:600;font-size:13px;font-style:italic;margin:0}.chat .item>.attachment:before,.chat .item>.attachment:after{content:" ";display:table}.chat .item>.attachment:after{clear:both}.box-input{max-width:200px}.info-box{display:block;min-height:90px;background:#fff;width:100%;box-shadow:0 1px 1px rgba(0,0,0,0.1);border-radius:2px;margin-bottom:15px}.info-box small{font-size:14px}.info-box .progress{background:rgba(0,0,0,0.2);margin:5px -10px 5px -10px;height:2px}.info-box .progress,.info-box .progress .progress-bar{border-radius:0}.info-box .progress .progress-bar{background:#fff}.info-box-icon{border-top-left-radius:2px;border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:2px;display:block;float:left;height:90px;width:90px;text-align:center;font-size:45px;line-height:90px;background:rgba(0,0,0,0.2)}.info-box-content{padding:5px 10px;margin-left:90px}.info-box-number{display:block;font-weight:bold;font-size:18px}.progress-description,.info-box-text{display:block;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.info-box-text{text-transform:uppercase}.info-box-more{display:block}.progress-description{margin:0}.timeline{position:relative;margin:0 0 30px 0;padding:0;list-style:none}.timeline:before{content:'';position:absolute;top:0px;bottom:0;width:4px;background:#ddd;left:31px;margin:0;border-radius:2px}.timeline>li{position:relative;margin-right:10px;margin-bottom:15px}.timeline>li:before,.timeline>li:after{content:" ";display:table}.timeline>li:after{clear:both}.timeline>li>.timeline-item{-webkit-box-shadow:0 1px 1px rgba(0,0,0,0.1);box-shadow:0 1px 1px rgba(0,0,0,0.1);border-radius:3px;margin-top:0px;background:#fff;color:#444;margin-left:60px;margin-right:15px;padding:0;position:relative}.timeline>li>.timeline-item>.time{color:#999;float:right;padding:10px;font-size:12px}.timeline>li>.timeline-item>.timeline-header{margin:0;color:#555;border-bottom:1px solid #f4f4f4;padding:10px;font-size:16px;line-height:1.1}.timeline>li>.timeline-item>.timeline-header>a{font-weight:600}.timeline>li>.timeline-item>.timeline-body,.timeline>li>.timeline-item>.timeline-footer{padding:10px}.timeline>li.time-label>span{font-weight:600;padding:5px;display:inline-block;background-color:#fff;border-radius:4px}.timeline>li>.fa,.timeline>li>.glyphicon,.timeline>li>.ion{width:30px;height:30px;font-size:15px;line-height:30px;position:absolute;color:#666;background:#d2d6de;border-radius:50%;text-align:center;left:18px;top:0}.btn{border-radius:3px;-webkit-box-shadow:none;box-shadow:none;border:1px solid transparent}.btn.uppercase{text-transform:uppercase}.btn.btn-flat{border-radius:0;-webkit-box-shadow:none;-moz-box-shadow:none;box-shadow:none;border-width:1px}.btn:active{-webkit-box-shadow:inset 0 3px 5px rgba(0,0,0,0.125);-moz-box-shadow:inset 0 3px 5px rgba(0,0,0,0.125);box-shadow:inset 0 3px 5px rgba(0,0,0,0.125)}.btn:focus{outline:none}.btn.btn-file{position:relative;overflow:hidden}.btn.btn-file>input[type='file']{position:absolute;top:0;right:0;min-width:100%;min-height:100%;font-size:100px;text-align:right;opacity:0;filter:alpha(opacity=0);outline:none;background:white;cursor:inherit;display:block}.btn-default{background-color:#f4f4f4;color:#444;border-color:#ddd}.btn-default:hover,.btn-default:active,.btn-default.hover{background-color:#e7e7e7 !important}.btn-primary{background-color:#3c8dbc;border-color:#367fa9}.btn-primary:hover,.btn-primary:active,.btn-primary.hover{background-color:#367fa9}.btn-success{background-color:#00a65a;border-color:#008d4c}.btn-success:hover,.btn-success:active,.btn-success.hover{background-color:#008d4c}.btn-info{background-color:#00c0ef;border-color:#00acd6}.btn-info:hover,.btn-info:active,.btn-info.hover{background-color:#00acd6}.btn-danger{background-color:#dd4b39;border-color:#d73925}.btn-danger:hover,.btn-danger:active,.btn-danger.hover{background-color:#d73925}.btn-warning{background-color:#f39c12;border-color:#e08e0b}.btn-warning:hover,.btn-warning:active,.btn-warning.hover{background-color:#e08e0b}.btn-outline{border:1px solid #fff;background:transparent;color:#fff}.btn-outline:hover,.btn-outline:focus,.btn-outline:active{color:rgba(255,255,255,0.7);border-color:rgba(255,255,255,0.7)}.btn-link{-webkit-box-shadow:none;box-shadow:none}.btn[class*='bg-']:hover{-webkit-box-shadow:inset 0 0 100px rgba(0,0,0,0.2);box-shadow:inset 0 0 100px rgba(0,0,0,0.2)}.btn-app{border-radius:3px;position:relative;padding:15px 5px;margin:0 0 10px 10px;min-width:80px;height:60px;text-align:center;color:#666;border:1px solid #ddd;background-color:#f4f4f4;font-size:12px}.btn-app>.fa,.btn-app>.glyphicon,.btn-app>.ion{font-size:20px;display:block}.btn-app:hover{background:#f4f4f4;color:#444;border-color:#aaa}.btn-app:active,.btn-app:focus{-webkit-box-shadow:inset 0 3px 5px rgba(0,0,0,0.125);-moz-box-shadow:inset 0 3px 5px rgba(0,0,0,0.125);box-shadow:inset 0 3px 5px rgba(0,0,0,0.125)}.btn-app>.badge{position:absolute;top:-3px;right:-10px;font-size:10px;font-weight:400}.callout{border-radius:3px;margin:0 0 20px 0;padding:15px 30px 15px 15px;border-left:5px solid #eee}.callout a{color:#fff;text-decoration:underline}.callout a:hover{color:#eee}.callout h4{margin-top:0;font-weight:600}.callout p:last-child{margin-bottom:0}.callout code,.callout .highlight{background-color:#fff}.callout.callout-danger{border-color:#c23321}.callout.callout-warning{border-color:#c87f0a}.callout.callout-info{border-color:#0097bc}.callout.callout-success{border-color:#00733e}.alert{border-radius:3px}.alert h4{font-weight:600}.alert .icon{margin-right:10px}.alert .close{color:#000;opacity:.2;filter:alpha(opacity=20)}.alert .close:hover{opacity:.5;filter:alpha(opacity=50)}.alert a{color:#fff;text-decoration:underline}.alert-success{border-color:#008d4c}.alert-danger,.alert-error{border-color:#d73925}.alert-warning{border-color:#e08e0b}.alert-info{border-color:#00acd6}.nav-pills>li>a{border-radius:0;border-top:3px solid transparent;color:#444}.nav-pills>li>a>.fa,.nav-pills>li>a>.glyphicon,.nav-pills>li>a>.ion{margin-right:5px}.nav-pills>li.active>a,.nav-pills>li.active>a:hover,.nav-pills>li.active>a:focus{background-color:#f4f4f4;border-top-color:#3c8dbc;color:#444}.nav-pills>li.active>a{font-weight:600}.nav-pills>li>a:hover{background-color:#f6f6f6}.nav-stacked>li>a{border-radius:0;border-top:0;border-left:3px solid transparent;color:#444}.nav-stacked>li.active>a,.nav-stacked>li.active>a:hover{background-color:#f4f4f4;border-top:0;border-left-color:#3c8dbc;color:#444}.nav-stacked>li.header{border-bottom:1px solid #ddd;color:#777;margin-bottom:10px;padding:5px 10px;text-transform:uppercase}.nav-tabs-custom{margin-bottom:20px;background:#fff;box-shadow:0 1px 1px rgba(0,0,0,0.1);border-radius:3px}.nav-tabs-custom>.nav-tabs{margin:0;border-bottom-color:#f4f4f4;border-top-right-radius:3px;border-top-left-radius:3px}.nav-tabs-custom>.nav-tabs>li{border-top:3px solid transparent;margin-bottom:-2px;margin-right:5px}.nav-tabs-custom>.nav-tabs>li>a{border-radius:0 !important}.nav-tabs-custom>.nav-tabs>li>a,.nav-tabs-custom>.nav-tabs>li>a:hover{background:transparent;margin:0}.nav-tabs-custom>.nav-tabs>li:not(.active)>a:hover,.nav-tabs-custom>.nav-tabs>li:not(.active)>a:focus,.nav-tabs-custom>.nav-tabs>li:not(.active)>a:active{border-color:transparent}.nav-tabs-custom>.nav-tabs>li.active{border-top-color:#3c8dbc}.nav-tabs-custom>.nav-tabs>li.active>a,.nav-tabs-custom>.nav-tabs>li.active:hover>a{background-color:#fff}.nav-tabs-custom>.nav-tabs>li.active>a{border-top:0;border-left-color:#f4f4f4;border-right-color:#f4f4f4}.nav-tabs-custom>.nav-tabs>li:first-of-type{margin-left:0}.nav-tabs-custom>.nav-tabs>li:first-of-type.active>a{border-left-width:0}.nav-tabs-custom>.nav-tabs.pull-right{float:none!important}.nav-tabs-custom>.nav-tabs.pull-right>li{float:right}.nav-tabs-custom>.nav-tabs.pull-right>li:first-of-type{margin-right:0}.nav-tabs-custom>.nav-tabs.pull-right>li:first-of-type.active>a{border-left-width:1px;border-right-width:0}.nav-tabs-custom>.nav-tabs>li.header{line-height:35px;padding:0 10px;font-size:20px;color:#444}.nav-tabs-custom>.nav-tabs>li.header>.fa,.nav-tabs-custom>.nav-tabs>li.header>.glyphicon,.nav-tabs-custom>.nav-tabs>li.header>.ion{margin-right:5px}.nav-tabs-custom>.tab-content{background:#fff;padding:10px;border-bottom-right-radius:3px;border-bottom-left-radius:3px}.tabs-bottom.nav-3 li a{width:3333.33333333% !important}.tabs-bottom li a{border:0}.pagination>li>a{background:#fafafa;color:#666}.pagination>li:first-of-type a,.pagination>li:last-of-type a{border-radius:0}.products-list{list-style:none;margin:0;padding:0}.products-list>.item{border-radius:3px;-webkit-box-shadow:0 1px 1px rgba(0,0,0,0.1);box-shadow:0 1px 1px rgba(0,0,0,0.1);padding:10px 0;background:#fff}.products-list>.item:before,.products-list>.item:after{content:" ";display:table}.products-list>.item:after{clear:both}.products-list .product-img{float:left}.products-list .product-img img{width:50px;height:50px}.products-list .product-info{margin-left:60px}.products-list .product-title{font-weight:600}.products-list .product-description{display:block;color:#999;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.product-list-in-box>.item{-webkit-box-shadow:none;box-shadow:none;border-radius:0;border-bottom:1px solid #f4f4f4}.product-list-in-box>.item:last-of-type{border-bottom-width:0}.table>thead>tr>th,.table>tbody>tr>th,.table>tfoot>tr>th,.table>thead>tr>td,.table>tbody>tr>td,.table>tfoot>tr>td{border-top:1px solid #f4f4f4}.table>thead>tr>th{border-bottom:2px solid #f4f4f4}.table tr td .progress{margin-top:5px}.table-bordered{border:1px solid #f4f4f4}.table-bordered>thead>tr>th,.table-bordered>tbody>tr>th,.table-bordered>tfoot>tr>th,.table-bordered>thead>tr>td,.table-bordered>tbody>tr>td,.table-bordered>tfoot>tr>td{border:1px solid #f4f4f4}.table-bordered>thead>tr>th,.table-bordered>thead>tr>td{border-bottom-width:2px}.table.no-border,.table.no-border td,.table.no-border th{border:0}table.text-center,table.text-center td,table.text-center th{text-align:center}.table.align th{text-align:left}.table.align td{text-align:right}.label-default{background-color:#d2d6de;color:#444}.direct-chat .box-body{border-bottom-right-radius:0;border-bottom-left-radius:0;position:relative;overflow-x:hidden;padding:0}.direct-chat.chat-pane-open .direct-chat-contacts{-webkit-transform:translate(0, 0);-ms-transform:translate(0, 0);-o-transform:translate(0, 0);transform:translate(0, 0)}.direct-chat-messages{-webkit-transform:translate(0, 0);-ms-transform:translate(0, 0);-o-transform:translate(0, 0);transform:translate(0, 0);padding:10px;height:250px;overflow:auto}.direct-chat-msg,.direct-chat-text{display:block}.direct-chat-msg{margin-bottom:10px}.direct-chat-msg:before,.direct-chat-msg:after{content:" ";display:table}.direct-chat-msg:after{clear:both}.direct-chat-messages,.direct-chat-contacts{-webkit-transition:-webkit-transform .5s ease-in-out;-moz-transition:-moz-transform .5s ease-in-out;-o-transition:-o-transform .5s ease-in-out;transition:transform .5s ease-in-out}.direct-chat-text{border-radius:5px;position:relative;padding:5px 10px;background:#d2d6de;border:1px solid #d2d6de;margin:5px 0 0 50px;color:#444}.direct-chat-text:after,.direct-chat-text:before{position:absolute;right:100%;top:15px;border:solid transparent;border-right-color:#d2d6de;content:' ';height:0;width:0;pointer-events:none}.direct-chat-text:after{border-width:5px;margin-top:-5px}.direct-chat-text:before{border-width:6px;margin-top:-6px}.right .direct-chat-text{margin-right:50px;margin-left:0}.right .direct-chat-text:after,.right .direct-chat-text:before{right:auto;left:100%;border-right-color:transparent;border-left-color:#d2d6de}.direct-chat-img{border-radius:50%;float:left;width:40px;height:40px}.right .direct-chat-img{float:right}.direct-chat-info{display:block;margin-bottom:2px;font-size:12px}.direct-chat-name{font-weight:600}.direct-chat-timestamp{color:#999}.direct-chat-contacts-open .direct-chat-contacts{-webkit-transform:translate(0, 0);-ms-transform:translate(0, 0);-o-transform:translate(0, 0);transform:translate(0, 0)}.direct-chat-contacts{-webkit-transform:translate(100%, 0);-ms-transform:translate(100%, 0);-o-transform:translate(100%, 0);transform:translate(100%, 0);position:absolute;top:0;bottom:0;height:250px;width:100%;background:#222d32;color:#fff;overflow:auto}.contacts-list>li{border-bottom:1px solid rgba(0,0,0,0.2);padding:10px;margin:0}.contacts-list>li:before,.contacts-list>li:after{content:" ";display:table}.contacts-list>li:after{clear:both}.contacts-list>li:last-of-type{border-bottom:none}.contacts-list-img{border-radius:50%;width:40px;float:left}.contacts-list-info{margin-left:45px;color:#fff}.contacts-list-name,.contacts-list-status{display:block}.contacts-list-name{font-weight:600}.contacts-list-status{font-size:12px}.contacts-list-date{color:#aaa;font-weight:normal}.contacts-list-msg{color:#999}.direct-chat-danger .right>.direct-chat-text{background:#dd4b39;border-color:#dd4b39;color:#fff}.direct-chat-danger .right>.direct-chat-text:after,.direct-chat-danger .right>.direct-chat-text:before{border-left-color:#dd4b39}.direct-chat-primary .right>.direct-chat-text{background:#3c8dbc;border-color:#3c8dbc;color:#fff}.direct-chat-primary .right>.direct-chat-text:after,.direct-chat-primary .right>.direct-chat-text:before{border-left-color:#3c8dbc}.direct-chat-warning .right>.direct-chat-text{background:#f39c12;border-color:#f39c12;color:#fff}.direct-chat-warning .right>.direct-chat-text:after,.direct-chat-warning .right>.direct-chat-text:before{border-left-color:#f39c12}.direct-chat-info .right>.direct-chat-text{background:#00c0ef;border-color:#00c0ef;color:#fff}.direct-chat-info .right>.direct-chat-text:after,.direct-chat-info .right>.direct-chat-text:before{border-left-color:#00c0ef}.direct-chat-success .right>.direct-chat-text{background:#00a65a;border-color:#00a65a;color:#fff}.direct-chat-success .right>.direct-chat-text:after,.direct-chat-success .right>.direct-chat-text:before{border-left-color:#00a65a}.users-list>li{width:25%;float:left;padding:10px;text-align:center}.users-list>li>img{border-radius:50%;max-width:100%;height:auto}.users-list-name,.users-list-date{display:block}.users-list-name{font-weight:600;color:#444;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.users-list-name:hover{color:#999}.users-list-date{color:#999;font-size:12px}.carousel-control{background-image:none!important}.carousel-control>.fa{font-size:40px;position:absolute;top:50%;z-index:5;display:inline-block;margin-top:-20px}.modal{background:rgba(0,0,0,0.3)}.modal-content{border-radius:0;-webkit-box-shadow:0 2px 3px rgba(0,0,0,0.125) !important;box-shadow:0 2px 3px rgba(0,0,0,0.125) !important;border:0}@media (min-width:768px){.modal-content{-webkit-box-shadow:0 2px 3px rgba(0,0,0,0.125) !important;box-shadow:0 2px 3px rgba(0,0,0,0.125) !important}}.modal-header{border-bottom-color:#f4f4f4}.modal-footer{border-top-color:#f4f4f4}.modal-primary .modal-header,.modal-primary .modal-footer{border-color:#307095}.modal-warning .modal-header,.modal-warning .modal-footer{border-color:#c87f0a}.modal-info .modal-header,.modal-info .modal-footer{border-color:#0097bc}.modal-success .modal-header,.modal-success .modal-footer{border-color:#00733e}.modal-danger .modal-header,.modal-danger .modal-footer{border-color:#c23321}.mailbox-messages>.table{margin:0}.mailbox-controls{padding:5px}.mailbox-controls.with-border{border-bottom:1px solid #f4f4f4}.mailbox-read-info{border-bottom:1px solid #f4f4f4;padding:10px}.mailbox-read-info h3{font-size:20px;margin:0}.mailbox-read-info h5{margin:0;padding:5px 0 0 0}.mailbox-read-time{color:#999;font-size:13px}.mailbox-read-message{padding:10px}.mailbox-attachments li{float:left;width:200px;border:1px solid #eee;margin-bottom:10px;margin-right:10px}.mailbox-attachment-name{font-weight:bold;color:#666}.mailbox-attachment-icon,.mailbox-attachment-info,.mailbox-attachment-size{display:block}.mailbox-attachment-info{padding:10px;background:#f4f4f4}.mailbox-attachment-size{color:#999;font-size:12px}.mailbox-attachment-icon{text-align:center;font-size:65px;color:#666;padding:20px 10px}.mailbox-attachment-icon.has-img{padding:0}.mailbox-attachment-icon.has-img>img{max-width:100%;height:auto}.lockscreen{background:#d2d6de}.lockscreen-logo{font-size:35px;text-align:center;margin-bottom:25px;font-weight:300}.lockscreen-logo a{color:#444}.lockscreen-wrapper{max-width:400px;margin:0 auto;margin-top:10%}.lockscreen .lockscreen-name{text-align:center;font-weight:600}.lockscreen-item{border-radius:4px;padding:0;background:#fff;position:relative;margin:10px auto 30px auto;width:290px}.lockscreen-image{border-radius:50%;position:absolute;left:-10px;top:-25px;background:#fff;padding:5px;z-index:10}.lockscreen-image>img{border-radius:50%;width:70px;height:70px}.lockscreen-credentials{margin-left:70px}.lockscreen-credentials .form-control{border:0 !important}.lockscreen-credentials .btn{background-color:#fff;border:0;padding:0 10px}.lockscreen-footer{margin-top:10px}.login-logo,.register-logo{font-size:35px;text-align:center;margin-bottom:25px;font-weight:300}.login-logo a,.register-logo a{color:#444}.login-page,.register-page{background:#d2d6de}.login-box,.register-box{width:360px;margin:7% auto}@media (max-width:768px){.login-box,.register-box{width:90%;margin-top:20px}}.login-box-body,.register-box-body{background:#fff;padding:20px;color:#444;border-top:0;color:#666}.login-box-body .form-control-feedback,.register-box-body .form-control-feedback{color:#777}.login-box-msg,.register-box-msg{margin:0;text-align:center;padding:0 20px 20px 20px}.social-auth-links{margin:10px 0}.error-page{width:600px;margin:20px auto 0 auto}@media (max-width:991px){.error-page{width:100%}}.error-page>.headline{float:left;font-size:100px;font-weight:300}@media (max-width:991px){.error-page>.headline{float:none;text-align:center}}.error-page>.error-content{margin-left:190px;display:block}@media (max-width:991px){.error-page>.error-content{margin-left:0}}.error-page>.error-content>h3{font-weight:300;font-size:25px}@media (max-width:991px){.error-page>.error-content>h3{text-align:center}}.invoice{position:relative;background:#fff;border:1px solid #f4f4f4;padding:20px;margin:10px 25px}.invoice-title{margin-top:0}.btn-social{position:relative;padding-left:44px !important;text-align:left;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.btn-social :first-child{position:absolute;left:0;top:0;bottom:0;width:32px !important;line-height:34px !important;font-size:1.6em!important;text-align:center;border-right:1px solid rgba(0,0,0,0.2)}.btn-social.btn-lg{padding-left:61px !important}.btn-social.btn-lg :first-child{line-height:45px;width:45px;font-size:1.8em}.btn-social.btn-sm{padding-left:38px !important}.btn-social.btn-sm :first-child{line-height:28px;width:28px;font-size:1.4em}.btn-social.btn-xs{padding-left:30px !important}.btn-social.btn-xs :first-child{line-height:20px;width:20px;font-size:1.2em}.btn-social-icon{position:relative;padding-left:44px !important;text-align:left;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;height:34px;width:34px;padding:0}.btn-social-icon :first-child{position:absolute;left:0;top:0;bottom:0;width:32px !important;line-height:34px !important;font-size:1.6em!important;text-align:center;border-right:1px solid rgba(0,0,0,0.2)}.btn-social-icon.btn-lg{padding-left:61px !important}.btn-social-icon.btn-lg :first-child{line-height:45px;width:45px;font-size:1.8em}.btn-social-icon.btn-sm{padding-left:38px !important}.btn-social-icon.btn-sm :first-child{line-height:28px;width:28px;font-size:1.4em}.btn-social-icon.btn-xs{padding-left:30px !important}.btn-social-icon.btn-xs :first-child{line-height:20px;width:20px;font-size:1.2em}.btn-social-icon :first-child{border:none;text-align:center;width:100%!important}.btn-social-icon.btn-lg{height:45px;width:45px;padding-left:0;padding-right:0}.btn-social-icon.btn-sm{height:30px;width:30px;padding-left:0;padding-right:0}.btn-social-icon.btn-xs{height:22px;width:22px;padding-left:0;padding-right:0}.btn-bitbucket{color:#fff;background-color:#205081;border-color:rgba(0,0,0,0.2)}.btn-bitbucket:hover,.btn-bitbucket:focus,.btn-bitbucket.focus,.btn-bitbucket:active,.btn-bitbucket.active,.open>.dropdown-toggle.btn-bitbucket{color:#fff;background-color:#163758;border-color:rgba(0,0,0,0.2)}.btn-bitbucket:active,.btn-bitbucket.active,.open>.dropdown-toggle.btn-bitbucket{background-image:none}.btn-bitbucket.disabled,.btn-bitbucket[disabled],fieldset[disabled] .btn-bitbucket,.btn-bitbucket.disabled:hover,.btn-bitbucket[disabled]:hover,fieldset[disabled] .btn-bitbucket:hover,.btn-bitbucket.disabled:focus,.btn-bitbucket[disabled]:focus,fieldset[disabled] .btn-bitbucket:focus,.btn-bitbucket.disabled.focus,.btn-bitbucket[disabled].focus,fieldset[disabled] .btn-bitbucket.focus,.btn-bitbucket.disabled:active,.btn-bitbucket[disabled]:active,fieldset[disabled] .btn-bitbucket:active,.btn-bitbucket.disabled.active,.btn-bitbucket[disabled].active,fieldset[disabled] .btn-bitbucket.active{background-color:#205081;border-color:rgba(0,0,0,0.2)}.btn-bitbucket .badge{color:#205081;background-color:#fff}.btn-dropbox{color:#fff;background-color:#1087dd;border-color:rgba(0,0,0,0.2)}.btn-dropbox:hover,.btn-dropbox:focus,.btn-dropbox.focus,.btn-dropbox:active,.btn-dropbox.active,.open>.dropdown-toggle.btn-dropbox{color:#fff;background-color:#0d6aad;border-color:rgba(0,0,0,0.2)}.btn-dropbox:active,.btn-dropbox.active,.open>.dropdown-toggle.btn-dropbox{background-image:none}.btn-dropbox.disabled,.btn-dropbox[disabled],fieldset[disabled] .btn-dropbox,.btn-dropbox.disabled:hover,.btn-dropbox[disabled]:hover,fieldset[disabled] .btn-dropbox:hover,.btn-dropbox.disabled:focus,.btn-dropbox[disabled]:focus,fieldset[disabled] .btn-dropbox:focus,.btn-dropbox.disabled.focus,.btn-dropbox[disabled].focus,fieldset[disabled] .btn-dropbox.focus,.btn-dropbox.disabled:active,.btn-dropbox[disabled]:active,fieldset[disabled] .btn-dropbox:active,.btn-dropbox.disabled.active,.btn-dropbox[disabled].active,fieldset[disabled] .btn-dropbox.active{background-color:#1087dd;border-color:rgba(0,0,0,0.2)}.btn-dropbox .badge{color:#1087dd;background-color:#fff}.btn-facebook{color:#fff;background-color:#3b5998;border-color:rgba(0,0,0,0.2)}.btn-facebook:hover,.btn-facebook:focus,.btn-facebook.focus,.btn-facebook:active,.btn-facebook.active,.open>.dropdown-toggle.btn-facebook{color:#fff;background-color:#2d4373;border-color:rgba(0,0,0,0.2)}.btn-facebook:active,.btn-facebook.active,.open>.dropdown-toggle.btn-facebook{background-image:none}.btn-facebook.disabled,.btn-facebook[disabled],fieldset[disabled] .btn-facebook,.btn-facebook.disabled:hover,.btn-facebook[disabled]:hover,fieldset[disabled] .btn-facebook:hover,.btn-facebook.disabled:focus,.btn-facebook[disabled]:focus,fieldset[disabled] .btn-facebook:focus,.btn-facebook.disabled.focus,.btn-facebook[disabled].focus,fieldset[disabled] .btn-facebook.focus,.btn-facebook.disabled:active,.btn-facebook[disabled]:active,fieldset[disabled] .btn-facebook:active,.btn-facebook.disabled.active,.btn-facebook[disabled].active,fieldset[disabled] .btn-facebook.active{background-color:#3b5998;border-color:rgba(0,0,0,0.2)}.btn-facebook .badge{color:#3b5998;background-color:#fff}.btn-flickr{color:#fff;background-color:#ff0084;border-color:rgba(0,0,0,0.2)}.btn-flickr:hover,.btn-flickr:focus,.btn-flickr.focus,.btn-flickr:active,.btn-flickr.active,.open>.dropdown-toggle.btn-flickr{color:#fff;background-color:#cc006a;border-color:rgba(0,0,0,0.2)}.btn-flickr:active,.btn-flickr.active,.open>.dropdown-toggle.btn-flickr{background-image:none}.btn-flickr.disabled,.btn-flickr[disabled],fieldset[disabled] .btn-flickr,.btn-flickr.disabled:hover,.btn-flickr[disabled]:hover,fieldset[disabled] .btn-flickr:hover,.btn-flickr.disabled:focus,.btn-flickr[disabled]:focus,fieldset[disabled] .btn-flickr:focus,.btn-flickr.disabled.focus,.btn-flickr[disabled].focus,fieldset[disabled] .btn-flickr.focus,.btn-flickr.disabled:active,.btn-flickr[disabled]:active,fieldset[disabled] .btn-flickr:active,.btn-flickr.disabled.active,.btn-flickr[disabled].active,fieldset[disabled] .btn-flickr.active{background-color:#ff0084;border-color:rgba(0,0,0,0.2)}.btn-flickr .badge{color:#ff0084;background-color:#fff}.btn-foursquare{color:#fff;background-color:#0072b1;border-color:rgba(0,0,0,0.2)}.btn-foursquare:hover,.btn-foursquare:focus,.btn-foursquare.focus,.btn-foursquare:active,.btn-foursquare.active,.open>.dropdown-toggle.btn-foursquare{color:#fff;background-color:#00517e;border-color:rgba(0,0,0,0.2)}.btn-foursquare:active,.btn-foursquare.active,.open>.dropdown-toggle.btn-foursquare{background-image:none}.btn-foursquare.disabled,.btn-foursquare[disabled],fieldset[disabled] .btn-foursquare,.btn-foursquare.disabled:hover,.btn-foursquare[disabled]:hover,fieldset[disabled] .btn-foursquare:hover,.btn-foursquare.disabled:focus,.btn-foursquare[disabled]:focus,fieldset[disabled] .btn-foursquare:focus,.btn-foursquare.disabled.focus,.btn-foursquare[disabled].focus,fieldset[disabled] .btn-foursquare.focus,.btn-foursquare.disabled:active,.btn-foursquare[disabled]:active,fieldset[disabled] .btn-foursquare:active,.btn-foursquare.disabled.active,.btn-foursquare[disabled].active,fieldset[disabled] .btn-foursquare.active{background-color:#0072b1;border-color:rgba(0,0,0,0.2)}.btn-foursquare .badge{color:#0072b1;background-color:#fff}.btn-github{color:#fff;background-color:#444;border-color:rgba(0,0,0,0.2)}.btn-github:hover,.btn-github:focus,.btn-github.focus,.btn-github:active,.btn-github.active,.open>.dropdown-toggle.btn-github{color:#fff;background-color:#2b2b2b;border-color:rgba(0,0,0,0.2)}.btn-github:active,.btn-github.active,.open>.dropdown-toggle.btn-github{background-image:none}.btn-github.disabled,.btn-github[disabled],fieldset[disabled] .btn-github,.btn-github.disabled:hover,.btn-github[disabled]:hover,fieldset[disabled] .btn-github:hover,.btn-github.disabled:focus,.btn-github[disabled]:focus,fieldset[disabled] .btn-github:focus,.btn-github.disabled.focus,.btn-github[disabled].focus,fieldset[disabled] .btn-github.focus,.btn-github.disabled:active,.btn-github[disabled]:active,fieldset[disabled] .btn-github:active,.btn-github.disabled.active,.btn-github[disabled].active,fieldset[disabled] .btn-github.active{background-color:#444;border-color:rgba(0,0,0,0.2)}.btn-github .badge{color:#444;background-color:#fff}.btn-google-plus{color:#fff;background-color:#dd4b39;border-color:rgba(0,0,0,0.2)}.btn-google-plus:hover,.btn-google-plus:focus,.btn-google-plus.focus,.btn-google-plus:active,.btn-google-plus.active,.open>.dropdown-toggle.btn-google-plus{color:#fff;background-color:#c23321;border-color:rgba(0,0,0,0.2)}.btn-google-plus:active,.btn-google-plus.active,.open>.dropdown-toggle.btn-google-plus{background-image:none}.btn-google-plus.disabled,.btn-google-plus[disabled],fieldset[disabled] .btn-google-plus,.btn-google-plus.disabled:hover,.btn-google-plus[disabled]:hover,fieldset[disabled] .btn-google-plus:hover,.btn-google-plus.disabled:focus,.btn-google-plus[disabled]:focus,fieldset[disabled] .btn-google-plus:focus,.btn-google-plus.disabled.focus,.btn-google-plus[disabled].focus,fieldset[disabled] .btn-google-plus.focus,.btn-google-plus.disabled:active,.btn-google-plus[disabled]:active,fieldset[disabled] .btn-google-plus:active,.btn-google-plus.disabled.active,.btn-google-plus[disabled].active,fieldset[disabled] .btn-google-plus.active{background-color:#dd4b39;border-color:rgba(0,0,0,0.2)}.btn-google-plus .badge{color:#dd4b39;background-color:#fff}.btn-instagram{color:#fff;background-color:#3f729b;border-color:rgba(0,0,0,0.2)}.btn-instagram:hover,.btn-instagram:focus,.btn-instagram.focus,.btn-instagram:active,.btn-instagram.active,.open>.dropdown-toggle.btn-instagram{color:#fff;background-color:#305777;border-color:rgba(0,0,0,0.2)}.btn-instagram:active,.btn-instagram.active,.open>.dropdown-toggle.btn-instagram{background-image:none}.btn-instagram.disabled,.btn-instagram[disabled],fieldset[disabled] .btn-instagram,.btn-instagram.disabled:hover,.btn-instagram[disabled]:hover,fieldset[disabled] .btn-instagram:hover,.btn-instagram.disabled:focus,.btn-instagram[disabled]:focus,fieldset[disabled] .btn-instagram:focus,.btn-instagram.disabled.focus,.btn-instagram[disabled].focus,fieldset[disabled] .btn-instagram.focus,.btn-instagram.disabled:active,.btn-instagram[disabled]:active,fieldset[disabled] .btn-instagram:active,.btn-instagram.disabled.active,.btn-instagram[disabled].active,fieldset[disabled] .btn-instagram.active{background-color:#3f729b;border-color:rgba(0,0,0,0.2)}.btn-instagram .badge{color:#3f729b;background-color:#fff}.btn-linkedin{color:#fff;background-color:#007bb6;border-color:rgba(0,0,0,0.2)}.btn-linkedin:hover,.btn-linkedin:focus,.btn-linkedin.focus,.btn-linkedin:active,.btn-linkedin.active,.open>.dropdown-toggle.btn-linkedin{color:#fff;background-color:#005983;border-color:rgba(0,0,0,0.2)}.btn-linkedin:active,.btn-linkedin.active,.open>.dropdown-toggle.btn-linkedin{background-image:none}.btn-linkedin.disabled,.btn-linkedin[disabled],fieldset[disabled] .btn-linkedin,.btn-linkedin.disabled:hover,.btn-linkedin[disabled]:hover,fieldset[disabled] .btn-linkedin:hover,.btn-linkedin.disabled:focus,.btn-linkedin[disabled]:focus,fieldset[disabled] .btn-linkedin:focus,.btn-linkedin.disabled.focus,.btn-linkedin[disabled].focus,fieldset[disabled] .btn-linkedin.focus,.btn-linkedin.disabled:active,.btn-linkedin[disabled]:active,fieldset[disabled] .btn-linkedin:active,.btn-linkedin.disabled.active,.btn-linkedin[disabled].active,fieldset[disabled] .btn-linkedin.active{background-color:#007bb6;border-color:rgba(0,0,0,0.2)}.btn-linkedin .badge{color:#007bb6;background-color:#fff}.btn-tumblr{color:#fff;background-color:#2c4762;border-color:rgba(0,0,0,0.2)}.btn-tumblr:hover,.btn-tumblr:focus,.btn-tumblr.focus,.btn-tumblr:active,.btn-tumblr.active,.open>.dropdown-toggle.btn-tumblr{color:#fff;background-color:#1c2d3f;border-color:rgba(0,0,0,0.2)}.btn-tumblr:active,.btn-tumblr.active,.open>.dropdown-toggle.btn-tumblr{background-image:none}.btn-tumblr.disabled,.btn-tumblr[disabled],fieldset[disabled] .btn-tumblr,.btn-tumblr.disabled:hover,.btn-tumblr[disabled]:hover,fieldset[disabled] .btn-tumblr:hover,.btn-tumblr.disabled:focus,.btn-tumblr[disabled]:focus,fieldset[disabled] .btn-tumblr:focus,.btn-tumblr.disabled.focus,.btn-tumblr[disabled].focus,fieldset[disabled] .btn-tumblr.focus,.btn-tumblr.disabled:active,.btn-tumblr[disabled]:active,fieldset[disabled] .btn-tumblr:active,.btn-tumblr.disabled.active,.btn-tumblr[disabled].active,fieldset[disabled] .btn-tumblr.active{background-color:#2c4762;border-color:rgba(0,0,0,0.2)}.btn-tumblr .badge{color:#2c4762;background-color:#fff}.btn-twitter{color:#fff;background-color:#55acee;border-color:rgba(0,0,0,0.2)}.btn-twitter:hover,.btn-twitter:focus,.btn-twitter.focus,.btn-twitter:active,.btn-twitter.active,.open>.dropdown-toggle.btn-twitter{color:#fff;background-color:#2795e9;border-color:rgba(0,0,0,0.2)}.btn-twitter:active,.btn-twitter.active,.open>.dropdown-toggle.btn-twitter{background-image:none}.btn-twitter.disabled,.btn-twitter[disabled],fieldset[disabled] .btn-twitter,.btn-twitter.disabled:hover,.btn-twitter[disabled]:hover,fieldset[disabled] .btn-twitter:hover,.btn-twitter.disabled:focus,.btn-twitter[disabled]:focus,fieldset[disabled] .btn-twitter:focus,.btn-twitter.disabled.focus,.btn-twitter[disabled].focus,fieldset[disabled] .btn-twitter.focus,.btn-twitter.disabled:active,.btn-twitter[disabled]:active,fieldset[disabled] .btn-twitter:active,.btn-twitter.disabled.active,.btn-twitter[disabled].active,fieldset[disabled] .btn-twitter.active{background-color:#55acee;border-color:rgba(0,0,0,0.2)}.btn-twitter .badge{color:#55acee;background-color:#fff}.btn-vk{color:#fff;background-color:#587ea3;border-color:rgba(0,0,0,0.2)}.btn-vk:hover,.btn-vk:focus,.btn-vk.focus,.btn-vk:active,.btn-vk.active,.open>.dropdown-toggle.btn-vk{color:#fff;background-color:#466482;border-color:rgba(0,0,0,0.2)}.btn-vk:active,.btn-vk.active,.open>.dropdown-toggle.btn-vk{background-image:none}.btn-vk.disabled,.btn-vk[disabled],fieldset[disabled] .btn-vk,.btn-vk.disabled:hover,.btn-vk[disabled]:hover,fieldset[disabled] .btn-vk:hover,.btn-vk.disabled:focus,.btn-vk[disabled]:focus,fieldset[disabled] .btn-vk:focus,.btn-vk.disabled.focus,.btn-vk[disabled].focus,fieldset[disabled] .btn-vk.focus,.btn-vk.disabled:active,.btn-vk[disabled]:active,fieldset[disabled] .btn-vk:active,.btn-vk.disabled.active,.btn-vk[disabled].active,fieldset[disabled] .btn-vk.active{background-color:#587ea3;border-color:rgba(0,0,0,0.2)}.btn-vk .badge{color:#587ea3;background-color:#fff}.fc-button{background:#f4f4f4;background-image:none;color:#444;border-color:#ddd;border-bottom-color:#ddd}.fc-button:hover,.fc-button:active,.fc-button.hover{background-color:#e9e9e9}.fc-header-title h2{font-size:15px;line-height:1.6em;color:#666;margin-left:10px}.fc-header-right{padding-right:10px}.fc-header-left{padding-left:10px}.fc-widget-header{background:#fafafa}.fc-grid{width:100%;border:0}.fc-widget-header:first-of-type,.fc-widget-content:first-of-type{border-left:0;border-right:0}.fc-widget-header:last-of-type,.fc-widget-content:last-of-type{border-right:0}.fc-toolbar{padding:10px;margin:0}.fc-day-number{font-size:20px;font-weight:300;padding-right:10px}.fc-color-picker{list-style:none;margin:0;padding:0}.fc-color-picker>li{float:left;font-size:30px;margin-right:5px;line-height:30px}.fc-color-picker>li .fa{-webkit-transition:-webkit-transform linear .3s;-moz-transition:-moz-transform linear .3s;-o-transition:-o-transform linear .3s;transition:transform linear .3s}.fc-color-picker>li .fa:hover{-webkit-transform:rotate(30deg);-ms-transform:rotate(30deg);-o-transform:rotate(30deg);transform:rotate(30deg)}#add-new-event{-webkit-transition:all linear .3s;-o-transition:all linear .3s;transition:all linear .3s}.external-event{padding:5px 10px;font-weight:bold;margin-bottom:4px;box-shadow:0 1px 1px rgba(0,0,0,0.1);text-shadow:0 1px 1px rgba(0,0,0,0.1);border-radius:3px;cursor:move}.external-event:hover{box-shadow:inset 0 0 90px rgba(0,0,0,0.2)}.pad{padding:10px}.margin{margin:10px}.margin-bottom{margin-bottom:20px}.inline{display:inline;width:auto}.description-block{display:block;margin:10px 0;text-align:center}.description-block.margin-bottom{margin-bottom:25px}.description-block>.description-header{margin:0;padding:0;font-weight:600;font-size:16px}.description-block>.description-text{text-transform:uppercase}.bg-red,.bg-yellow,.bg-aqua,.bg-blue,.bg-light-blue,.bg-green,.bg-navy,.bg-teal,.bg-olive,.bg-lime,.bg-orange,.bg-fuchsia,.bg-purple,.bg-maroon,.bg-black,.bg-red-active,.bg-yellow-active,.bg-aqua-active,.bg-blue-active,.bg-light-blue-active,.bg-green-active,.bg-navy-active,.bg-teal-active,.bg-olive-active,.bg-lime-active,.bg-orange-active,.bg-fuchsia-active,.bg-purple-active,.bg-maroon-active,.bg-black-active,.callout.callout-danger,.callout.callout-warning,.callout.callout-info,.callout.callout-success,.alert-success,.alert-danger,.alert-error,.alert-warning,.alert-info,.label-danger,.label-info,.label-waring,.label-primary,.label-success,.modal-primary .modal-body,.modal-primary .modal-header,.modal-primary .modal-footer,.modal-warning .modal-body,.modal-warning .modal-header,.modal-warning .modal-footer,.modal-info .modal-body,.modal-info .modal-header,.modal-info .modal-footer,.modal-success .modal-body,.modal-success .modal-header,.modal-success .modal-footer,.modal-danger .modal-body,.modal-danger .modal-header,.modal-danger .modal-footer{color:#fff !important}.bg-gray{color:#000;background-color:#d2d6de !important}.bg-black{background-color:#111 !important}.bg-red,.callout.callout-danger,.alert-danger,.alert-error,.label-danger,.modal-danger .modal-body{background-color:#dd4b39 !important}.bg-yellow,.callout.callout-warning,.alert-warning,.label-waring,.modal-warning .modal-body{background-color:#f39c12 !important}.bg-aqua,.callout.callout-info,.alert-info,.label-info,.modal-info .modal-body{background-color:#00c0ef !important}.bg-blue{background-color:#0073b7 !important}.bg-light-blue,.label-primary,.modal-primary .modal-body{background-color:#3c8dbc !important}.bg-green,.callout.callout-success,.alert-success,.label-success,.modal-success .modal-body{background-color:#00a65a !important}.bg-navy{background-color:#001f3f !important}.bg-teal{background-color:#39cccc !important}.bg-olive{background-color:#3d9970 !important}.bg-lime{background-color:#01ff70 !important}.bg-orange{background-color:#ff851b !important}.bg-fuchsia{background-color:#f012be !important}.bg-purple{background-color:#605ca8 !important}.bg-maroon{background-color:#d81b60 !important}.bg-gray-active{color:#000;background-color:#b5bbc8 !important}.bg-black-active{background-color:#000 !important}.bg-red-active,.modal-danger .modal-header,.modal-danger .modal-footer{background-color:#d33724 !important}.bg-yellow-active,.modal-warning .modal-header,.modal-warning .modal-footer{background-color:#db8b0b !important}.bg-aqua-active,.modal-info .modal-header,.modal-info .modal-footer{background-color:#00a7d0 !important}.bg-blue-active{background-color:#005384 !important}.bg-light-blue-active,.modal-primary .modal-header,.modal-primary .modal-footer{background-color:#357ca5 !important}.bg-green-active,.modal-success .modal-header,.modal-success .modal-footer{background-color:#008d4c !important}.bg-navy-active{background-color:#001a35 !important}.bg-teal-active{background-color:#30bbbb !important}.bg-olive-active{background-color:#368763 !important}.bg-lime-active{background-color:#00e765 !important}.bg-orange-active{background-color:#ff7701 !important}.bg-fuchsia-active{background-color:#db0ead !important}.bg-purple-active{background-color:#555299 !important}.bg-maroon-active{background-color:#ca195a !important}[class^="bg-"].disabled{opacity:.65;filter:alpha(opacity=65)}.text-red{color:#dd4b39 !important}.text-yellow{color:#f39c12 !important}.text-aqua{color:#00c0ef !important}.text-blue{color:#0073b7 !important}.text-black{color:#111 !important}.text-light-blue{color:#3c8dbc !important}.text-green{color:#00a65a !important}.text-gray{color:#d2d6de !important}.text-navy{color:#001f3f !important}.text-teal{color:#39cccc !important}.text-olive{color:#3d9970 !important}.text-lime{color:#01ff70 !important}.text-orange{color:#ff851b !important}.text-fuchsia{color:#f012be !important}.text-purple{color:#605ca8 !important}.text-maroon{color:#d81b60 !important}.hide{display:none !important}.no-border{border:0px !important}.no-padding{padding:0px !important}.no-margin{margin:0px !important}.no-shadow{box-shadow:none!important}.list-unstyled,.chart-legend,.contacts-list,.users-list,.mailbox-attachments{list-style:none;margin:0;padding:0}.flat{border-radius:0 !important}.text-bold,.text-bold.table td,.text-bold.table th{font-weight:700}.jqstooltip{padding:5px!important;width:auto!important;height:auto!important}.bg-teal-gradient{background:#39cccc !important;background:-webkit-gradient(linear, left bottom, left top, color-stop(0, #39cccc), color-stop(1, #7adddd)) !important;background:-ms-linear-gradient(bottom, #39cccc, #7adddd) !important;background:-moz-linear-gradient(center bottom, #39cccc 0, #7adddd 100%) !important;background:-o-linear-gradient(#7adddd, #39cccc) !important;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#7adddd', endColorstr='#39cccc', GradientType=0) !important;color:#fff}.bg-light-blue-gradient{background:#3c8dbc !important;background:-webkit-gradient(linear, left bottom, left top, color-stop(0, #3c8dbc), color-stop(1, #67a8ce)) !important;background:-ms-linear-gradient(bottom, #3c8dbc, #67a8ce) !important;background:-moz-linear-gradient(center bottom, #3c8dbc 0, #67a8ce 100%) !important;background:-o-linear-gradient(#67a8ce, #3c8dbc) !important;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#67a8ce', endColorstr='#3c8dbc', GradientType=0) !important;color:#fff}.bg-blue-gradient{background:#0073b7 !important;background:-webkit-gradient(linear, left bottom, left top, color-stop(0, #0073b7), color-stop(1, #0089db)) !important;background:-ms-linear-gradient(bottom, #0073b7, #0089db) !important;background:-moz-linear-gradient(center bottom, #0073b7 0, #0089db 100%) !important;background:-o-linear-gradient(#0089db, #0073b7) !important;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#0089db', endColorstr='#0073b7', GradientType=0) !important;color:#fff}.bg-aqua-gradient{background:#00c0ef !important;background:-webkit-gradient(linear, left bottom, left top, color-stop(0, #00c0ef), color-stop(1, #14d1ff)) !important;background:-ms-linear-gradient(bottom, #00c0ef, #14d1ff) !important;background:-moz-linear-gradient(center bottom, #00c0ef 0, #14d1ff 100%) !important;background:-o-linear-gradient(#14d1ff, #00c0ef) !important;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#14d1ff', endColorstr='#00c0ef', GradientType=0) !important;color:#fff}.bg-yellow-gradient{background:#f39c12 !important;background:-webkit-gradient(linear, left bottom, left top, color-stop(0, #f39c12), color-stop(1, #f7bc60)) !important;background:-ms-linear-gradient(bottom, #f39c12, #f7bc60) !important;background:-moz-linear-gradient(center bottom, #f39c12 0, #f7bc60 100%) !important;background:-o-linear-gradient(#f7bc60, #f39c12) !important;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#f7bc60', endColorstr='#f39c12', GradientType=0) !important;color:#fff}.bg-purple-gradient{background:#605ca8 !important;background:-webkit-gradient(linear, left bottom, left top, color-stop(0, #605ca8), color-stop(1, #9491c4)) !important;background:-ms-linear-gradient(bottom, #605ca8, #9491c4) !important;background:-moz-linear-gradient(center bottom, #605ca8 0, #9491c4 100%) !important;background:-o-linear-gradient(#9491c4, #605ca8) !important;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#9491c4', endColorstr='#605ca8', GradientType=0) !important;color:#fff}.bg-green-gradient{background:#00a65a !important;background:-webkit-gradient(linear, left bottom, left top, color-stop(0, #00a65a), color-stop(1, #00ca6d)) !important;background:-ms-linear-gradient(bottom, #00a65a, #00ca6d) !important;background:-moz-linear-gradient(center bottom, #00a65a 0, #00ca6d 100%) !important;background:-o-linear-gradient(#00ca6d, #00a65a) !important;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#00ca6d', endColorstr='#00a65a', GradientType=0) !important;color:#fff}.bg-red-gradient{background:#dd4b39 !important;background:-webkit-gradient(linear, left bottom, left top, color-stop(0, #dd4b39), color-stop(1, #e47365)) !important;background:-ms-linear-gradient(bottom, #dd4b39, #e47365) !important;background:-moz-linear-gradient(center bottom, #dd4b39 0, #e47365 100%) !important;background:-o-linear-gradient(#e47365, #dd4b39) !important;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#e47365', endColorstr='#dd4b39', GradientType=0) !important;color:#fff}.bg-black-gradient{background:#111 !important;background:-webkit-gradient(linear, left bottom, left top, color-stop(0, #111), color-stop(1, #2b2b2b)) !important;background:-ms-linear-gradient(bottom, #111, #2b2b2b) !important;background:-moz-linear-gradient(center bottom, #111 0, #2b2b2b 100%) !important;background:-o-linear-gradient(#2b2b2b, #111) !important;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#2b2b2b', endColorstr='#111111', GradientType=0) !important;color:#fff}.bg-maroon-gradient{background:#d81b60 !important;background:-webkit-gradient(linear, left bottom, left top, color-stop(0, #d81b60), color-stop(1, #e73f7c)) !important;background:-ms-linear-gradient(bottom, #d81b60, #e73f7c) !important;background:-moz-linear-gradient(center bottom, #d81b60 0, #e73f7c 100%) !important;background:-o-linear-gradient(#e73f7c, #d81b60) !important;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#e73f7c', endColorstr='#d81b60', GradientType=0) !important;color:#fff}.connectedSortable{min-height:100px}.ui-helper-hidden-accessible{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}.sort-highlight{background:#f4f4f4;border:1px dashed #ddd;margin-bottom:10px}.full-opacity-hover{opacity:.65;filter:alpha(opacity=65)}.full-opacity-hover:hover{opacity:1;filter:alpha(opacity=100)}.chart{position:relative;overflow:hidden;width:100%}.chart svg,.chart canvas{width:100%!important}@media print{.no-print,.main-sidebar,.left-side,.main-header,.content-header{display:none!important}.content-wrapper,.right-side,.main-footer{margin-left:0!important;min-height:0!important;-webkit-transform:translate(0, 0) !important;-ms-transform:translate(0, 0) !important;-o-transform:translate(0, 0) !important;transform:translate(0, 0) !important}.fixed .content-wrapper,.fixed .right-side{padding-top:0!important}.invoice{width:100%;border:0;margin:0;padding:0}.invoice-col{float:left;width:33.3333333%}.table-responsive{overflow:auto}.table-responsive>.table tr th,.table-responsive>.table tr td{white-space:normal!important}}
</style>
<template id="page-accounts-requests-quotations-single-view">
	<div>		
		<div class="page-content-wrap">
			<div class="row">
				<div class="col-md-12">
					<div class="panel panel-default">
						<div class="panel-heading">
							<h3 class="panel-title"><strong>Viendo</strong> Cuenta</h3>
							<ul class="panel-controls">
								
							</ul>
						</div>
						<div class="panel-body">
							<component-navigation-top-pages-accounts></component-navigation-top-pages-accounts>
						</div>
					</div>
					
					<!-- //
					<div class="panel panel-default">
						<div class="pad margin no-print">
						  <div class="callout callout-info" style="margin-bottom: 0!important;">												
							<h4><i class="fa fa-info"></i> Note:</h4>
							This page has been enhanced for printing. Click the print button at the bottom of the invoice to test.
						  </div>
						</div>
					</div>
					-->
					
					<div class="panel panel-default">
						<div class="panel-heading">
							<h3 class="panel-title"><strong>Viendo</strong> Propuesta # {{ $root.zfill($route.params.account_id, 5) }}-{{ $root.zfill($route.params.request_id, 5) }}-{{ $root.zfill($route.params.quotation_id, 5) }} - <strong>Estado</strong> {{ post.status.name }}</h3>
							<ul class="panel-controls">
								<li><a @click="find()" class="panel-refresh" title="Actualizar" data-toggle="tooltip" data-placement="bottom"><span class="fa fa-refresh"></span></a></li>
								<li><a @click="$router.go(-1)" class="panel-remove"><span class="fa fa-times"></span></a></li>
							</ul>
						</div>
						<div class="panel-body">
							<div class="">
								<section class="invoice">
								  <div class="row">
									<div class="col-xs-12">
									  <h2 class="page-header">
										<i class="fa fa-globe"></i> Servicios Ambientales y Forestales Monteverde LTDA
										<small class="pull-right">Fecha: {{ post.created }}</small>
									  </h2>
									</div>
								  </div>
								  <div class="row invoice-info">
									<div class="col-sm-4 invoice-col">
									  <address>
										De
									   <strong>Servicios Ambientales y Forestales Monteverde LTDA</strong><br>
										Cl. 33AA #80B - 34<br>
										Medellín, Antioquia<br>
										Teléfono: +57 (4) 322 94 05
										Móvil: +57 301 720 65 60<br/>
										Correo Electronico: atencionalcliente@monteverdeltda.com
									  </address>
									</div>
									<div class="col-sm-4 invoice-col">
									  Para
									  <address>
										{{ post.request.contact.first_name }} {{ post.request.contact.second_name }} {{ post.request.contact.surname }} {{ post.request.contact.second_surname }}<br>
										{{ post.request.contact.address }}<br/>
										{{ post.request.contact.city.name }}<br/>
										{{ post.request.contact.department.name }}<br>
										Teléfono: {{ post.request.contact.phone }}<br/>
										Móvil: {{ post.request.contact.phone_mobile }}<br/>
										Correo Electronico: {{ post.request.contact.mail }}<br/>
									  </address>
									</div>
									<div class="col-sm-4 invoice-col">
										<b>Propuesta # {{ $root.zfill($route.params.account_id, 5) }}-{{ $root.zfill($route.params.request_id, 5) }}-{{ $root.zfill($route.params.quotation_id, 5) }}</b><br/>
										<br/>
										<b>ID Solicitud:</b> {{ $root.zfill($route.params.account_id, 5) }}-{{ $root.zfill($route.params.request_id, 5) }}<br/>
										<b>Fecha Limite:</b> 2/22/2014<br/>
										<b>Cuenta:</b> {{ $root.zfill($route.params.account_id, 5) }}<br>
										<address>
											<strong>{{ post.client.names }}</strong><br>										
											{{ post.client.address_invoices }}<br>
											{{ post.client.address_invoices_city.name }}<br>
											{{ post.client.address_invoices_department.name }}<br>
										</address>									 
									</div>
								  </div>
								  
								  <div class="row">
									<div class="col-xs-12 table-responsive">
									  <table class="table table-striped" v-for="address in post.values">
										<thead>
										  <tr>
											<th colspan="5">{{ address.address }}</th>
										  </tr>
										  <tr>
											<th>Cantidad</th>
											<th>Servicio</th>
											<th>Precio</th>
											<th>Repetición/Frecuencia</th>
											<th>Subtotal</th>
										  </tr>
										</thead>
										<tbody>
										  <tr v-for="service in address.services">
											<td>1</td>
											<td>{{ service.name }}</td>
											<td>{{ service.price }}</td>
											<td>{{ service.repeat.name }}</td>
											<td>$ {{ $root.formatMoney(service.price) }}</td>
										  </tr>
										</tbody>
									  </table>
									</div><!-- /.col -->
								  </div><!-- /.row -->

								  <div class="row">
									<!-- accepted payments column -->
									<div class="col-xs-6">
									  <p class="lead">Metodos de Aprobacion:</p>
									  <i class="fas fa-phone fa-2x" alt="Teléfono"></i>
									  <i class="fas fa-mobile-alt fa-2x" alt="Móvil"></i>
									  <i class="fab fa-whatsapp fa-2x" alt="WhatsApp"></i>
									  <i class="far fa-envelope fa-2x" alt="E-Mail"></i>
									  
									  <p class="text-muted well well-sm no-shadow" style="margin-top: 10px;">
										Etsy doostang zoodles disqus groupon greplin oooj voxy zoodles, weebly ning heekya handango imeem plugg dopplr jibjab, movity jajah plickers sifteo edmodo ifttt zimbra.
									  </p>
									</div><!-- /.col -->
									<div class="col-xs-6">
									  <p class="lead">Totales</p>
									  <div class="table-responsive">
										<table class="table">
										  <tr>
											<th style="width:50%">Subtotal:</th>
											<td>$250.30</td>
										  </tr>
										  <tr>
											<th>Tax (9.3%)</th>
											<td>$10.34</td>
										  </tr>
										  <tr>
											<th>Shipping:</th>
											<td>$5.80</td>
										  </tr>
										  <tr>
											<th>Total:</th>
											<td>$265.24</td>
										  </tr>
										</table>
									  </div>
									</div><!-- /.col -->
								  </div><!-- /.row -->

								  <!-- this row will not appear when printing -->
								  <div class="row no-print">
									<div class="col-xs-12">
									  <a href="javascript:window.print();" class="btn btn-default"><i class="fa fa-print"></i> Imprimir</a>
									  <button class="btn btn-success pull-right"><i class="fa fa-credit-card"></i> Submit Payment</button>
									  <button class="btn btn-primary pull-right" style="margin-right: 5px;"><i class="fa fa-download"></i> Generate PDF</button>
									</div>
								  </div>
								</section><!-- /.content -->
								<div class="clearfix"></div>
							  </div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<template id="page-accounts-requests-quotations-add">
	<div>		
		<div class="page-content-wrap">
			<div class="row">
				<div class="col-md-12">
					<div class="panel panel-default">
						<div class="panel-heading">
							<h3 class="panel-title"><strong>Viendo</strong> Cuenta</h3>
							<ul class="panel-controls">
								
							</ul>
						</div>
						<div class="panel-body">
							<component-navigation-top-pages-accounts></component-navigation-top-pages-accounts>
						</div>
					</div>
					
					<div class="panel panel-default">
						<div class="panel-heading">
							<h3 class="panel-title"><strong>Añadir</strong> Propuesta </h3>
							<ul class="panel-controls">
								<li><a @click="find()" class="panel-refresh" title="Actualizar" data-toggle="tooltip" data-placement="bottom"><span class="fa fa-refresh"></span></a></li>
								<li><a @click="$router.go(-1)" class="panel-remove"><span class="fa fa-times"></span></a></li>
							</ul>
						</div>
						<div class="panel-body">
							
							<!-- START CONTENT FRAME -->
							<div class="content-frame">
								<!-- START CONTENT FRAME TOP -->
								<div class="content-frame-top">
									<!-- //
									<div class="page-title">
										<h2><span class="fa fa-arrow-circle-o-left"></span> Frame Title</h2>
									</div>
									<div class="pull-right">
										<button class="btn btn-default content-frame-right-toggle"><span class="fa fa-bars"></span></button>
									</div>
									-->
								</div>
								<!-- END CONTENT FRAME TOP -->
								
								<!-- START CONTENT FRAME LEFT -->
								<div class="content-frame-right">
									<div class="panel panel-default">
										<div class="panel-heading">
											<h3 class="panel-title">Inventario</h3>
										</div>
										<div class="panel-body">
											
										</div>
									</div>
								</div>
								<!-- END CONTENT FRAME LEFT -->
								
								<!-- START CONTENT FRAME BODY -->
								<div class="content-frame-body content-frame-body-left">
									<div class="panel panel-default">
										<div class="panel-heading">
											<h3 class="panel-title">Detalles</h3>
										</div>
										<div class="panel-body">
											<div class="row clearfix">
												<div class="col-md-12">
												  <table class="table table-bordered table-hover" id="tab_logic">
													<thead>
													  <tr>
														<th class="text-center"> # </th>
														<th class="text-center"> Product </th>
														<th class="text-center"> Qty </th>
														<th class="text-center"> Price </th>
														<th class="text-center"> Total </th>
													  </tr>
													</thead>
													<tbody>
													  <tr id='addr0'>
														<td>1</td>
														<td><input type="text" name='product[]'  placeholder='Enter Product Name' class="form-control"/></td>
														<td><input type="number" name='qty[]' placeholder='Enter Qty' class="form-control qty" step="0" min="0"/></td>
														<td><input type="number" name='price[]' placeholder='Enter Unit Price' class="form-control price" step="0.00" min="0"/></td>
														<td><input type="number" name='total[]' placeholder='0.00' class="form-control total" readonly/></td>
													  </tr>
													  <tr id='addr1'></tr>
													</tbody>
												  </table>
												</div>
											  </div>
											  <div class="row clearfix">
												<div class="col-md-12">
												  <button id="add_row" class="btn btn-default pull-left">Add Row</button>
												  <button id='delete_row' class="pull-right btn btn-default">Delete Row</button>
												</div>
											  </div>
											  <div class="row clearfix" style="margin-top:20px">
												<div class="pull-right col-md-4">
												  <table class="table table-bordered table-hover" id="tab_logic_total">
													<tbody>
													  <tr>
														<th class="text-center">Sub Total</th>
														<td class="text-center"><input type="number" name='sub_total' placeholder='0.00' class="form-control" id="sub_total" readonly/></td>
													  </tr>
													  <tr>
														<th class="text-center">Tax</th>
														<td class="text-center"><div class="input-group mb-2 mb-sm-0">
															<input type="number" class="form-control" id="tax" placeholder="0">
															<div class="input-group-addon">%</div>
														  </div></td>
													  </tr>
													  <tr>
														<th class="text-center">Tax Amount</th>
														<td class="text-center"><input type="number" name='tax_amount' id="tax_amount" placeholder='0.00' class="form-control" readonly/></td>
													  </tr>
													  <tr>
														<th class="text-center">Grand Total</th>
														<td class="text-center"><input type="number" name='total_amount' id="total_amount" placeholder='0.00' class="form-control" readonly/></td>
													  </tr>
													</tbody>
												  </table>
												</div>
											  </div>
										</div>
									</div>
								</div>
								<!-- END CONTENT FRAME BODY -->
							</div>
						
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<template id="page-accounts-requests-single-calendar-add">
	<div>		
		<div class="page-content-wrap">
			<div class="row">
				<div class="col-md-12">
					<div class="panel panel-default">
						<div class="panel-heading">
							<h3 class="panel-title"><strong>Viendo</strong> Cuenta</h3>
							<ul class="panel-controls">
								
							</ul>
						</div>
						<div class="panel-body">
							<component-navigation-top-pages-accounts></component-navigation-top-pages-accounts>
						</div>
					</div>
					
					<div class="panel panel-default">
						<div class="panel-heading">
							<h3 class="panel-title"><strong>Añadir</strong> Calendario </h3>
							<ul class="panel-controls">
								<li><a @click="$router.go(-1)" class="panel-remove"><span class="fa fa-times"></span></a></li>
							</ul>
						</div>
						<div class="panel-body table-responsive">
							<div id="gc-gantt"></div>
							
							<form role="form" class="form-horizontal">
								<div class="row">
									<div class="col-md-12">
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<template id="page-accounts-requests-single-calendar-view">
	<div>		
		<div class="page-content-wrap">
			<div class="row">
				<div class="col-md-12">
					<div class="panel panel-default">
						<div class="panel-heading">
							<h3 class="panel-title"><strong>Viendo</strong> Cuenta</h3>
							<ul class="panel-controls">
								
							</ul>
						</div>
						<div class="panel-body">
							<component-navigation-top-pages-accounts></component-navigation-top-pages-accounts>
						</div>
					</div>
					
					<div class="panel panel-default">
						<div class="panel-heading">
							<h3 class="panel-title"><strong>Viendo</strong> Visita Tecnica </h3>
							<ul class="panel-controls">
								
								<li><a @click="$router.go(-1)" class="panel-remove"><span class="fa fa-times"></span></a></li>
							</ul>
						</div>
						<div class="panel-body">
							
						
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<template id="page-accounts-calendar-view">
	<div>		
		<div class="page-content-wrap">
			<div class="row">
				<div class="col-md-12">
					<div class="panel panel-default">
						<div class="panel-heading">
							<h3 class="panel-title"><strong>Viendo</strong> Cuenta</h3>
							<ul class="panel-controls">
								
							</ul>
						</div>
						<div class="panel-body">
							<component-navigation-top-pages-accounts></component-navigation-top-pages-accounts>
						</div>
					</div>
					
					<div class="panel panel-default">
						<div class="panel-heading">                                
							<h3 class="panel-title">Solicitudes</h3>
							<ul class="panel-controls">
								<li><a @click="find()" class="panel-refresh" title="Actualizar" data-toggle="tooltip" data-placement="bottom"><span class="fa fa-refresh"></span></a></li>
							</ul>                                
						</div>
						<div class="panel-body">
							<!-- START CONTENT FRAME -->
							<div class="content-frame">
								<div class="content-frame-top">
								</div>
								<!-- START CONTENT FRAME LEFT -->
								<div class="content-frame-left">
									<!-- //
									<h4>Nuevo Evento</h4>
									<div class="form-group">
										<div class="input-group">
											<input type="text" class="form-control" id="new-event-text" placeholder="Event text..."/>
											<div class="input-group-btn">
												<button class="btn btn-primary" id="new-event">Añadir</button>
											</div>
										</div>
									</div>
									
									<h4>External Events</h4>
									<div class="list-group border-bottom" id="external-events">
										<a class="list-group-item external-event">Visita Tecnica de inventario para propuesta</a>
									</div>
									
									<div class="push-up-10">
										<label class="check">
											<input type="checkbox" class="icheckbox" id="drop-remove"/> Remove after drop
										</label>
									</div>
									-->
									<div class="panel panel-default push-up-10" v-if="seletedEvent.id > 0">
										<div class="panel-heading">
											<h3 class="panel-title">{{ seletedEvent.title }}</h3>
										</div>
										<div class="panel-body padding-top-0">
											<ul class="list-group">
												<li class="list-group-item"><b>Fecha y Hora de Inicio</b></li>
												<li class="list-group-item">{{ seletedEvent.start }}</li>
												<li class="list-group-item"><b>Fecha y Hora de Termino</b></li>
												<li class="list-group-item">{{ seletedEvent.end }}</li>
												<li class="list-group-item"><b>¿Es todo el día?</b></li>
												<li class="list-group-item" v-if="seletedEvent.all_day == 1">Si</li>
												<li class="list-group-item" v-if="seletedEvent.all_day == 0">No</li>
											</ul>
										</div>
									</div>
								</div>
								<!-- END CONTENT FRAME LEFT -->
								
								<!-- START CONTENT FRAME BODY -->
								<div class="content-frame-body padding-bottom-0">
									<div class="row">
										<div class="col-md-12">
											<div id="alert_holder"></div>
											<div class="calendar">
												<div id="calendar"></div>
											</div>
										</div>
									</div>
								</div>
								<!-- END CONTENT FRAME BODY -->
							</div>
							<!-- END CONTENT FRAME -->
							
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

