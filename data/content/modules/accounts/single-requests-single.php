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
						<div class="panel-body table-responsive-">
							<div class="row">
								<div class="col-sm-9">
									<div class="panel panel-default">
										<div class="panel-heading">
											<h3 class="panel-title">Direcciones y Servicios Solicitados</h3>
										</div>
										<div class="panel-body table-responsive">
											<div v-for="(address, i) in post.requests_addresses">
												<table class="table table-bordered">
													<thead>
														<tr>
															<th colspan="2">
																<img v-if="address.address.completo.icon != undefined" :src="address.address.completo.icon" />
																{{ address.address.display_name }}
																<span class="label label-default">{{ address.address.completo.category }}</span>
																<span class="label label-default">{{ address.address.completo.type }}</span>
															</th>
														</tr>
														<tr>
															<th colspan="2">Servicios Solicitados</th>
														</tr>
													</thead>
													<tbody>
														<tr v-for="item in address.requests_addresses_services">
															<td>
																<h5>{{ item.service.name }}</h5>
																<p>{{ item.service.description }}</p>
															</td>
															<td>
																<table class="table table-bordered">
																	<tr>
																		<th>¿Requiere Inventario?</th>
																		<th>
																			<i class="fas fa-times" v-if="item.service.inventary_required == 0"></i>
																			<i class="fas fa-check" v-if="item.service.inventary_required == 1"></i>
																		</th>
																	</tr>
																	<tr>
																		<td colspan="2">
																			<div v-if="item.service.inventary_required === 0">
																				Este servicio no requiere inventario.
																			</div>
																			<div v-if="item.service.inventary_required === 1">
																			<div v-if="item.service.services_inventories_required.length == 0 && item.service.inventary_required === 1">
																				Servicio sin parametrizar, consulta con tu jefe inmediato o llena el siguiente formulario para informar su requerimiento y gestionar mas rápidamente la solicitud.
																				<button type="button" class="btn btn-sm btn-info">
																					Formulario Servicio
																				</button>
																			</div>
																			<div v-if="item.service.services_inventories_required.length > 0 && item.service.inventary_required === 1">
																				<table class="table table-bordered" v-for="inventory in item.service.services_inventories_required">
																					<thead>
																						<tr>
																							<th colspan="8">{{ inventory.type.name }}</th>
																						</tr>
																						<tr>
																							<th>Recurso</th>
																							<th>Medición</th>
																							<th>P.U.</th>
																							<th>INV</th>
																							<th colspan="3">Inventario en la direccion</th>
																						</tr>
																					</thead>
																					<tbody v-if="inventory.type.inventories_resources.length > 0">
																						
																						<tr class="table table-bordered" v-for="item3 in inventory.type.inventories_resources">
																							<td>{{ item3.name }}</td>
																							<td>{{ item3.medition.code }} - {{ item3.medition.name }}</td>
																							<td>{{ $root.formatMoney(item3.price) }}</td>
																							<td>
																								<i class="fas fa-times" v-if="item3.addresses_inventories.length == 0"></i>
																								<i class="fas fa-check" v-if="item3.addresses_inventories.length > 0"></i>
																							</td>
																							<td>
																								<table class="table table-bordered" v-if="item3.addresses_inventories.length > 0">
																									<thead>
																										<tr>
																											<th colspan="2">Cant.</th>
																											<th>Actualizacion</th>
																										</tr>
																									</thead>
																									<tbody v-for="(item4, i) in item3.addresses_inventories">
																										<tr>
																											<td>
																												<i class="fas fa-times" v-if="item4.date_compare == false"></i>
																												<i class="fas fa-check" v-if="item4.date_compare == true"></i>
																											</td>
																											<td>{{ item4.quantity }} {{ item3.medition.code }} - {{ item3.medition.name }}</td>
																											<td>{{ item4.updated }}</td>
																										</tr>
																										<tr v-if="item4.date_compare == false">
																											<td colspan="3">
																												El inventario esta desactualizado o fuera de fecha, Debes solicitar una visita tecnica.
																												
																												<router-link data-toggle="tooltip" data-placement="top" title="Agendar" tag="button" :to="{ name: 'page-accounts-requests-single-calendar-add', params: { account_id: $route.params.account_id, request_id: $route.params.request_id } }" class="btn btn-sm btn-warning">
																													<span class="fas fa-calendar"></span>
																												</router-link>
																											</td>
																										</tr>
																									</tbody>
																								</table>
																								<div  v-if="item3.addresses_inventories.length == 0">
																									Debes solicitar una visita tecnica.
																									<router-link data-toggle="tooltip" data-placement="top" title="Agendar" tag="button" :to="{ name: 'page-accounts-requests-single-calendar-add', params: { account_id: $route.params.account_id, request_id: $route.params.request_id } }" class="btn btn-sm btn-warning">
																										<span class="fas fa-calendar"></span>
																									</router-link>
																								</div>
																							</td>
																						</tr>
																						
																						<!--
																						<tr class="table table-bordered" v-for="item3 in inventory.type.inventories_resources">
																							<td>{{ item3.name }}</td>
																							<td>{{ item3.medition.code }} - {{ item3.medition.name }}</td>
																							<td>{{ $root.formatMoney(item3.price) }}</td>
																							<td>
																								<i class="fas fa-times" v-if="item3.addresses_inventories.length == 0"></i>
																								<i class="fas fa-check" v-if="item3.addresses_inventories.length > 0"></i>
																							</td>
																							<td>
																								<table class="table table-bordered" v-if="item3.addresses_inventories.length > 0">
																									<thead>
																										<tr>
																											<th colspan="2">Cant.</th>
																											<th>Actualizacion</th>
																										</tr>
																									</thead>
																									<tbody v-for="(item4, i) in item3.addresses_inventories">
																										<tr>
																											<td>
																												<i class="fas fa-times" v-if="item4.date_compare == false"></i>
																												<i class="fas fa-check" v-if="item4.date_compare == true"></i>
																											</td>
																											<td>{{ item4.quantity }} {{ item3.medition.code }} - {{ item3.medition.name }}</td>
																											<td>{{ item4.updated }}</td>
																										</tr>
																										<tr v-if="item4.date_compare == false">
																											<td colspan="3">
																												El inventario esta desactualizado o fuera de fecha, Debes solicitar una visita tecnica.
																												<button class="btn btn-sm btn-warning">Agendar</button>
																											</td>
																										</tr>
																									</tbody>
																								</table>
																								<div  v-if="item3.addresses_inventories.length == 0">
																									Debes solicitar una visita tecnica.
																									<button class="btn btn-sm btn-warning">Agendar</button>
																								</div>
																							</td>
																						</tr>
																						-->
																					</tbody>
																					<tbody v-if="inventory.type.inventories_resources == 0">
																						<tr>
																							<td colspan="5">
																								Recurso sin parametrizar, consulta con tu jefe inmediato o llena el siguiente formulario para informar su requerimiento y gestionar mas rápidamente la solicitud.
																								<button type="button" class="btn btn-sm btn-info">
																									Formulario Recurso
																								</button>
																							</td>
																						</tr>
																					</tbody>
																				</table>
																			</div>
																		</div>
																		</td>
																	</tr>
																</table>
															</td>
														</tr>
													</tbody>
												</table>
												
												<div class="panel-footer table-responsive" v-if="address.calendar != null">
													<h4>
														{{ address.calendar.title }}
														<div class="pull-right"><span class="label label-warning">{{ address.calendar.status.name }}</span></div>
													</h4>
													<span>{{ address.calendar.start }}</span>
												</div>
												<div class="panel-footer table-responsive" v-else="">
													<b>Recueda agendar esta visita</b>
												</div>
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
								<div class="col-sm-3">
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
												<table class="table table-bordered">
													<tbody>
														<tr><th colspan="2">Nombre completo</th></tr>
														<tr><td colspan="2">{{ post.contact.names }} {{ post.contact.surname }} {{ post.contact.second_surname }}</td></tr>
														<tr><th colspan="2">Teléfonos</th></tr>
														<tr><td>{{ post.contact.phone }}</td><td>{{ post.contact.mobile }}</td></tr>
														<tr><th colspan="2">Correo Electronico</th></tr>
														<tr><td colspan="2">{{ post.contact.email }}</td></tr>
														<tr><th colspan="2">Direccion</th></tr>
														<tr><td colspan="2" v-if="post.contact.address != null">{{ post.contact.address.address_input }}</td></tr>
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
											<h3 class="push-up-0">Presupuesto Actual</h3>
											<h3 class="push-up-0">$ {{ $root.formatMoney(calc.current_budget) }} COP</h3>
											<hr>
											<p>
												En la suma del prosupuesto solo se tendra en cuenta las direcciones y/o servicios que tengan su inventario completo y actualizado.
											</p>
										</div>
									</div>
									<div class="panel panel-default">
										<div class="panel-body">
											<h3>Actividad</h3>
											<hr>
											<div class="panel-body panel-body-table">
												<div class="table-responsive">
													<table class="table table-bordered">
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
							</div>
							<div class="content-frame">
								
								<div class="content-frame-right">
									
								</div>
								
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
