<template id="page-accounts-requests-add">
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
							<h3 class="panel-title"><strong>Añadir</strong> Solicitud </h3>
							<ul class="panel-controls">
								<li><a @click="saveRequest()" class="panel-refresh" title="Guardar" data-toggle="tooltip" data-placement="bottom"><span class="fas fa-save"></span></a></li>
								<li><a @click="$router.go(-1)" class="panel-remove"><span class="fa fa-times"></span></a></li>
							</ul>
						</div>
						<div class="panel-body table-responsive-">
							<div class="content-frame">
								<!-- START CONTENT FRAME TOP -->
								<div class="content-frame-top">
									<div class="page-title">                    
										<h2>
											<i class="fas fa-concierge-bell"></i> 
											Añadir Solicitud - Cuenta: 
										</h2>
									</div>
									<div class="pull-right">
										<button class="btn btn-default content-frame-right-toggle"><span class="fa fa-bars"></span></button>
									</div>
								</div>
								<!-- END CONTENT FRAME TOP -->
								
								<!-- START CONTENT FRAME LEFT -->
								<div class="content-frame-right">
									
									<div class="panel panel-default">
										<div class="panel-body">
											<h3 class="push-up-0">Contacto</h3>
											<div class="form-group">
												<div class="col-md-12">
													<select class="form-control select" v-model="post.contact" name="contact">
														<option value="0">Seleccione la persona de contacto</option>
														<option :value="item.id" v-for="item in options.contacts">{{ item.names }} {{ item.surname }} {{ item.second_surname }}</option>
													</select>
												</div>
											</div>
										</div>
									</div>
									<div class="panel panel-default">
										<div class="panel-body">
											<h3>Añadir Direcciones</h3>
											<hr>
											<div class="panel-body panel-body-table">
												<div class="table-responsive">
													<table class="table table-bordered table-hover">
														<tbody>
															<tr v-for="(address, i) in options.addresses">
																<th>
																	<img v-if="address.completo.icon != undefined" :src="address.completo.icon" />
																	{{ address.display_name }}
																	<span class="label label-default">{{ address.completo.category }}</span>
																	<span class="label label-default">{{ address.completo.type }}</span>
																</th>
																<th>
																	<a @click="addAddress(i)">
																		<i class="fas fa-plus-circle"></i>
																	</a>
																</th>
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
										<div class="panel-body">
											<h3 class="push-up-0">Notas / Observaciones</h3>
											<hr>
											<textarea class="form-control" v-model="post.request_notes" name="request_notes">
											</textarea>
										</div>
									</div>
									
									<div class="panel panel-default">
										<div class="panel-heading">
											<h3 class="panel-title">Detalles de la solicitud</h3>
										</div>
										<div class="panel-body table-responsive">
											<div class="row">
												<div class="col-sm-12">
													<div>
														<div v-for="(address, i) in post.requests_addresses">
															<table class="table table-bordered table-hover">
																<thead>
																	<tr>
																		<th colspan="3">
																			<img v-if="address.completo.icon != undefined" :src="address.completo.icon" />
																			{{ address.display_name }}
																			<span class="label label-default">{{ address.completo.category }}</span>
																			<span class="label label-default">{{ address.completo.type }}</span>
																		</th>
																		<th>
																			<a @click="removeAddress(i)">
																				<i class="fas fa-times-circle"></i>
																			</a>
																		</th>
																	</tr>
																	<tr>
																		<th>
																			<a @click="addServicesInAddress(i)">
																				<i class="fas fa-plus-circle"></i>
																			</a>
																		</th>
																		<th>Servicio</th>
																		<th>Descripcion Simple</th>
																		<th></th>
																	</tr>
																</thead>
																<tbody>
																	<tr v-for="(service, ii) in address.requests_addresses_services">
																		<td></td>
																		<td>{{ service.name }}</td>
																		<td>{{ service.description }}
																		</td>
																		<th>
																			<a @click="removeServicesInAddress(i, ii)">
																				<i class="fas fa-times-circle"></i>
																			</a>
																		</th>
																	</tr>
																</tbody>
															</table>
														</div>
													</div>
												</div>
											</div>
										</div>
										
										<div class="panel-footer">
											{{ post }}
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
