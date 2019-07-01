
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
							<h3 class="panel-title"><strong>Viendo</strong> Solicitud # {{ $route.params.request_id }} - <strong>Estado</strong> {{ post.status.name }}</h3>
							<ul class="panel-controls">
								<li>	
									<router-link data-toggle="tooltip" data-placement="bottom" title="Calendario" tag="a" :to="{ name: 'page-accounts-requests-single-calendar-add', params: { account_id: $route.params.account_id, request_id: $route.params.request_id } }" class="panel-remove"><!-- v-if="post.status.id == 1" -->
										<span class="fas fa-calendar"></span>
									</router-link>
								</li>
								<li><a @click="find()" class="panel-refresh" title="Actualizar" data-toggle="tooltip" data-placement="bottom"><span class="fa fa-refresh"></span></a></li>
								<li>
									<router-link data-toggle="tooltip" data-placement="bottom" title="Cerrar" tag="a" :to="{ name: 'page-accounts-requests-view', params: { account_id: $route.params.account_id } }" class="panel-remove">
										<span class="fa fa-times"></span>
									</router-link>
								</li>
							</ul>
						</div>
						<form id="jvalidate" role="form" class="form-horizontal-" action="javascript:alert('Form #validate2 submited');">
							<div class="panel-body">
								<div class="row">
									<div class="col-sm-9">
										<div class="panel panel-default">
											<div class="panel-heading">
												<h3 class="panel-title"><strong>Viendo</strong> Cuenta</h3>
												<ul class="panel-controls">
													<li v-for="group in options.events_groups">
														<a @click="filter_calendar(group.id)" class="panel-refresh" title="Actualizar" data-toggle="tooltip" data-placement="bottom">
															<i class="fas fa-filter"></i>
														</a>
														{{ group.name }}
													</li>
												</ul>
											</div>
											<div class="panel-body">
												<div class="row">
													<div class="col-sm-12">
														<div class="gantt"></div>
													</div>
													<div class="col-sm-12" v-if="event_enebled == true">
														<div class="panel panel-default">
															<div class="panel-heading">
																<h3 class="panel-title"><strong>Añadir</strong> Direccion</h3>
																<ul class="panel-controls">
																	<li>
																		<a class="panel-refresh" title="Cerrar" data-toggle="tooltip" data-placement="bottom" @click="event_enebled = false;">
																			<span class="fa fa-times"></span>
																		</a>
																	</li>
																</ul>
															</div>
															<div class="panel-body">
																<div class="row">
																	<div class="col-sm-12">
																		<div class="form-group">
																			<label class="col-xs-12 control-label">Titulo del Evento</label>
																			<div class="col-xs-12">
																				<input type="text" class="form-control" name="title" v-model="post_event.title" />
																				<span class="help-block">Este campo es obligatorio.</span>
																			</div>
																		</div>
																	</div>
																	<div class="col-sm-12">
																		<div class="form-group">
																			<label class="col-xs-12 control-label">Todo el dia?</label>
																			<div class="col-xs-12">
																				<input type="text" class="form-control" name="all_day" v-model="post_event.all_day" />
																				<span class="help-block">Este campo es obligatorio.</span>
																			</div>
																		</div>
																	</div>
																	<div class="col-sm-12">
																		<div class="form-group">
																			<label class="col-xs-12 control-label">Empleado</label>
																			<div class="col-xs-12">
																				<input type="text" class="form-control" name="employee" v-model="post_event.employee" />
																				<span class="help-block">Este campo es obligatorio.</span>
																			</div>
																		</div>
																	</div>
																	<div class="col-sm-12">
																		<div class="form-group">
																			<label class="col-xs-12 control-label">F. Comienzo</label>
																			<div class="col-xs-12">
																				<input type="text" class="form-control" name="start" v-model="post_event.start" />
																				<span class="help-block">Este campo es obligatorio.</span>
																			</div>
																		</div>
																	</div>
																	<div class="col-sm-12">
																		<div class="form-group">
																			<label class="col-xs-12 control-label">F. Termino</label>
																			<div class="col-xs-12">
																				<input type="text" class="form-control" name="end" v-model="post_event.end" />
																				<span class="help-block">Este campo es obligatorio.</span>
																			</div>
																		</div>
																	</div>
																	<div class="col-sm-12">
																		<div class="form-group">
																			<label class="col-xs-12 control-label">Tipo de Evento</label>
																			<div class="col-xs-12">
																				<input type="text" class="form-control" name="type" v-model="post_event.type" />
																				<span class="help-block">Este campo es obligatorio.</span>
																			</div>
																		</div>
																	</div>
																	<div class="col-sm-12">
																		<div class="form-group">
																			<label class="col-xs-12 control-label"># Solicitud</label>
																			<div class="col-xs-12">
																				<input type="text" class="form-control" name="request" v-model="post_event.request" />
																				<span class="help-block">Este campo es obligatorio.</span>
																			</div>
																		</div>
																	</div>
																	<div class="col-sm-12">
																		<div class="form-group">
																			<label class="col-xs-12 control-label">Estado Actual</label>
																			<div class="col-xs-12">
																				<input type="text" class="form-control" name="status" v-model="post_event.status" />
																				<span class="help-block">Este campo es obligatorio.</span>
																			</div>
																		</div>
																	</div>
																	<!-- //
																	<div class="col-sm-12">
																		<div class="form-group">
																			<label class="col-xs-12 control-label">Tipo de Vía (*)</label>
																			<div class="col-xs-12">
																				<select class="form-control select" name="type_road" v-model="post.type_road" data-live-search="true">
																					<option value="null"></option>
																				</select>
																				<span class="help-block">Este campo es obligatorio.</span>
																			</div>
																		</div>
																	</div>
																	-->
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div class="panel-footer">
												{{ post_event }}
											</div>
										</div>
									</div>
									<div class="col-sm-3">
										<div class="panel panel-default">
											<div class="panel-body">
												<h3 class="push-up-0">Agendar Visita Tecnica</h3>
												<hr>
												<p>Estas son las direcciones habilitadas para visitas tecnicas en esta direccion.</p>
											</div>
										</div>
										<div >
											<div id="external-events">
												<div v-for="(address, i) in post.requests_addresses" class=" external-event">
													<table class="table table-bordered">
														<thead>
															<tr><th><h5>{{ address.address.display_name }}</h5></th></tr>
														</thead>
														<tbody>
															<tr v-for="item in address.requests_addresses_services" v-if="item.service.inventary_required == 1 && item.service.services_inventories_required.length > 0">
																<td v-for="inventory in item.service.services_inventories_required" v-if="inventory.type.inventories_resources.length > 0">
																	<div v-if="inventory.type.inventories_resources.length > 0"v-for="item3 in inventory.type.inventories_resources">
																		<div>
																			<div v-for="(item4, i) in item3.addresses_inventories" v-if="(item3.addresses_inventories.length > 0 && item4.date_compare == false)">
																				{{ item3.name }}
																			</div>
																			<div  v-if="item3.addresses_inventories.length == 0">
																				{{ item3.name }} 
																			</div>
																		</div>
																	</div>
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
						</form>
									
									
						<div class="panel-body table-responsive-">
							
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
