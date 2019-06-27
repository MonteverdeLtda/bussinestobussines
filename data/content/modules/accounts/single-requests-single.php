
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
											<div v-for="(address, i) in post.requests_addresses">
												<table class="table table-bordered table-hover">
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
															<th>Servicios</th>
														</tr>
													</thead>
													<tbody>
														<tr v-for="service in address.requests_addresses_services">
															<td>{{ service.service.name }}</td>
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
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
