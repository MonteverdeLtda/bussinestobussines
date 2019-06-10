<template id="component-navigation-top-pages-employees">
	<div>
		<div class="panel panel-default tabs">
			<ul class="nav nav-tabs" role="">
				<li :class="isActiveClass('page-employees-single-view')"><a :href="'/#/employees/view/' + $route.params.employee_id">Información Básica</a></li>
				<li :class="isActiveClass('page-employees-single-view-calendar')"><a :href="'/#/employees/view/' + $route.params.employee_id + '/calendar'">Calendario</a></li>
			</ul>
		</div>
	</div>
</template>

<template id="page-employees-single-view">
	<div>
		<div class="page-content-wrap">
			<form role="form" class="form-horizontal">
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
					
					<div class="col-md-7">
						<div class="panel panel-default">
							<div class="panel-heading">
								<h3 class="panel-title">Informacion Personal</h3>
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
								
								<div class="form-group">
									<label class="col-md-4 col-xs-12 control-label">Tipo de Identificacion</label>
									<div class="col-md-8 col-xs-12">
										<div class="input-group">
											<span class="input-group-addon"><span style="color: black;" class="fas fa-signature"></span></span>
											<input type="text" class="form-control" v-model="post.identification_type.name" />
										</div>
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-4 col-xs-12 control-label"># Identificacion</label>
									<div class="col-md-8 col-xs-12">
										<div class="input-group">
											<span class="input-group-addon"><span style="color: black;" class="fas fa-signature"></span></span>
											<input type="text" class="form-control" v-model="post.identification_number" />
										</div>
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-4 col-xs-12 control-label">F. Expedicion Documento</label>
									<div class="col-md-8 col-xs-12">
										<div class="input-group">
											<span class="input-group-addon"><span style="color: black;" class="fas fa-signature"></span></span>
											<input type="text" class="form-control" v-model="post.identification_date_expedition" />
										</div>
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-4 col-xs-12 control-label">Primer Nombre</label>
									<div class="col-md-8 col-xs-12">
										<div class="input-group">
											<span class="input-group-addon"><span style="color: black;" class="fas fa-signature"></span></span>
											<input type="text" class="form-control" v-model="post.first_name" />
										</div>
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-4 col-xs-12 control-label">Segundo Nombre</label>
									<div class="col-md-8 col-xs-12">
										<div class="input-group">
											<span class="input-group-addon"><span style="color: black;" class="fas fa-signature"></span></span>
											<input type="text" class="form-control" v-model="post.second_name" />
										</div>
									</div>
								</div>
								<div class="form-group">
									<label class="col-md-4 col-xs-12 control-label">Primer Apellido</label>
									<div class="col-md-8 col-xs-12">
										<div class="input-group">
											<span class="input-group-addon"><span style="color: black;" class="fas fa-signature"></span></span>
											<input type="text" class="form-control" v-model="post.surname" />
										</div>
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-4 col-xs-12 control-label">Segundo Apellido</label>
									<div class="col-md-8 col-xs-12">
										<div class="input-group">
											<span class="input-group-addon"><span style="color: black;" class="fas fa-signature"></span></span>
											<input type="text" class="form-control" v-model="post.second_surname" />
										</div>
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-4 col-xs-12 control-label">Cumpleaños</label>
									<div class="col-md-8 col-xs-12">
										<div class="input-group">
											<span class="input-group-addon"><span style="color: black;" class="fas fa-signature"></span></span>
											<input type="text" class="form-control" v-model="post.birthdate" />
										</div>
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-4 col-xs-12 control-label">Tipo de Sangre</label>
									<div class="col-md-8 col-xs-12">
										<div class="input-group">
											<span class="input-group-addon"><span style="color: black;" class="fas fa-signature"></span></span>
											<input type="text" class="form-control" v-model="post.blood_type.name" />
										</div>
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-4 col-xs-12 control-label">RH</label>
									<div class="col-md-8 col-xs-12">
										<div class="input-group">
											<span class="input-group-addon"><span style="color: black;" class="fas fa-signature"></span></span>
											<input type="text" class="form-control" v-model="post.blood_rh.name" />
										</div>
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-4 col-xs-12 control-label">Correo Electronico</label>
									<div class="col-md-8 col-xs-12">
										<div class="input-group">
											<span class="input-group-addon"><span style="color: black;" class="fas fa-signature"></span></span>
											<input type="text" class="form-control" v-model="post.mail" />
										</div>
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-4 col-xs-12 control-label">Teléfono Fijo</label>
									<div class="col-md-8 col-xs-12">
										<div class="input-group">
											<span class="input-group-addon"><span style="color: black;" class="fas fa-signature"></span></span>
											<input type="text" class="form-control" v-model="post.number_phone" />
										</div>
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-4 col-xs-12 control-label">Teléfono Móvil</label>
									<div class="col-md-8 col-xs-12">
										<div class="input-group">
											<span class="input-group-addon"><span style="color: black;" class="fas fa-signature"></span></span>
											<input type="text" class="form-control" v-model="post.number_mobile" />
										</div>
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-4 col-xs-12 control-label">Departamento Residencia</label>
									<div class="col-md-8 col-xs-12">
										<div class="input-group">
											<span class="input-group-addon"><span style="color: black;" class="fas fa-signature"></span></span>
											<input type="text" class="form-control" v-model="post.department.name" />
										</div>
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-4 col-xs-12 control-label">Ciudad Residencia</label>
									<div class="col-md-8 col-xs-12">
										<div class="input-group">
											<span class="input-group-addon"><span style="color: black;" class="fas fa-signature"></span></span>
											<input type="text" class="form-control" v-model="post.city.name" />
										</div>
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-4 col-xs-12 control-label">Direccion Residencia</label>
									<div class="col-md-8 col-xs-12">
										<div class="input-group">
											<span class="input-group-addon"><span style="color: black;" class="fas fa-signature"></span></span>
											<input type="text" class="form-control" v-model="post.address" />
										</div>
									</div>
								</div>
								
							</div>
						</div>
					</div>
					
					<div class="col-md-5">
					
						<div class="panel panel-default">
							<div class="panel-heading">
								<h3 class="panel-title">Afiliaciones</h3>
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
								<div class="form-group">
									<label class="col-md-4 col-xs-12 control-label">Estado</label>
									<div class="col-md-8 col-xs-12">
										<div class="input-group">
											<span class="input-group-addon"><span style="color: black;" class="fas fa-signature"></span></span>
											<input type="text" class="form-control" v-model="post.status.name" />
										</div>
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-4 col-xs-12 control-label">EPS</label>
									<div class="col-md-8 col-xs-12">
										<div class="input-group">
											<span class="input-group-addon"><span style="color: black;" class="fas fa-signature"></span></span>
											<input type="text" class="form-control" v-model="post.eps.name" />
										</div>
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-4 col-xs-12 control-label">ARL</label>
									<div class="col-md-8 col-xs-12">
										<div class="input-group">
											<span class="input-group-addon"><span style="color: black;" class="fas fa-signature"></span></span>
											<input type="text" class="form-control" v-model="post.arl.name" />
										</div>
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-4 col-xs-12 control-label">Fondo de Pensiones</label>
									<div class="col-md-8 col-xs-12">
										<div class="input-group">
											<span class="input-group-addon"><span style="color: black;" class="fas fa-signature"></span></span>
											<input type="text" class="form-control" v-model="post.pension_fund.name" />
										</div>
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-4 col-xs-12 control-label">Caja de Compensacion</label>
									<div class="col-md-8 col-xs-12">
										<div class="input-group">
											<span class="input-group-addon"><span style="color: black;" class="fas fa-signature"></span></span>
											<input type="text" class="form-control" v-model="post.compensation_fund.name" />
										</div>
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-4 col-xs-12 control-label">Fondo de Cesantias</label>
									<div class="col-md-8 col-xs-12">
										<div class="input-group">
											<span class="input-group-addon"><span style="color: black;" class="fas fa-signature"></span></span>
											<input type="text" class="form-control" v-model="post.severance_fund.name" />
										</div>
									</div>
								</div>
								
							</div>
						</div>
						
						<div class="panel panel-default">
							<div class="panel-heading">
								<h3 class="panel-title">Informacion Empresarial</h3>
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
								
								<div class="form-group">
									<label class="col-md-4 col-xs-12 control-label">F. Ingreso (Empresa)</label>
									<div class="col-md-8 col-xs-12">
										<div class="input-group">
											<span class="input-group-addon"><span style="color: black;" class="fas fa-signature"></span></span>
											<input type="text" class="form-control" v-model="post.company_date_entry" />
										</div>
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-4 col-xs-12 control-label">F. Retiro (Empresa)</label>
									<div class="col-md-8 col-xs-12">
										<div class="input-group">
											<span class="input-group-addon"><span style="color: black;" class="fas fa-signature"></span></span>
											<input type="text" class="form-control" v-model="post.company_date_out" />
										</div>
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-4 col-xs-12 control-label">Correo Electronico</label>
									<div class="col-md-8 col-xs-12">
										<div class="input-group">
											<span class="input-group-addon"><span style="color: black;" class="fas fa-signature"></span></span>
											<input type="text" class="form-control" v-model="post.company_mail" />
										</div>
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-4 col-xs-12 control-label">Teléfono Fijo / Extension</label>
									<div class="col-md-8 col-xs-12">
										<div class="input-group">
											<span class="input-group-addon"><span style="color: black;" class="fas fa-signature"></span></span>
											<input type="text" class="form-control" v-model="post.company_number_phone" />
										</div>
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-4 col-xs-12 control-label">Teléfono Móvil</label>
									<div class="col-md-8 col-xs-12">
										<div class="input-group">
											<span class="input-group-addon"><span style="color: black;" class="fas fa-signature"></span></span>
											<input type="text" class="form-control" v-model="post.company_number_mobile" />
										</div>
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-4 col-xs-12 control-label">Observaciones / Notas</label>
									<div class="col-md-8 col-xs-12">
										<textarea class="form-control" v-model="post.observations"></textarea>
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

<template id="page-employees-single-view-calendar">
	<div>		
		<div class="page-content-wrap">
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
						<div class="panel-body">
							<component-navigation-top-pages-employees></component-navigation-top-pages-employees>
						</div>
					</div>
					
					<div class="panel panel-default">
						<div class="panel-heading">
							<h3 class="panel-title">Calendario</h3>
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
											<router-link class="btn btn-default btn-rounded btn-xs" tag="button" :to="{ name: 'page-accounts-requests-single-view', params: { account_id: seletedEvent.request.client, request_id: seletedEvent.request.id } }">
												Ver solicitud
											</router-link>
										</div>
									</div>
									
									<div class="panel panel-default push-up-10" v-if="seletedEvent.id > 0">
										<div class="panel-heading">
											<h3 class="panel-title">Clientes</h3>
										</div>
										<div class="panel-body padding-top-0">
											<ul class="list-group" v-for="(cal, i) in seletedEvent.calendar_clients">
												<li class="list-group-item"><b>{{ (i+1) }} - {{ cal.client.names }}</b></li>
												<li class="list-group-item">{{ cal.client.identification_number }}</li>
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

