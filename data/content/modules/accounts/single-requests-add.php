<style scope="page-accounts-requests-add">
.searchable-container{
	margin:20px 0 0 0;
}
.searchable-container label.btn-default{
	width:90%;
	border:1px solid #efefef;
	margin:5px;
	box-shadow:5px 8px 8px 0 #ccc;
}
.searchable-container label .bizcontent{
	width:100%;
}
.searchable-container .btn-group{
	width:90%;
}
.searchable-container .btn span.glyphicon{
    opacity: 0;
}
.searchable-container .btn.active span.glyphicon {
    opacity: 1;
}
.block-info .bizmoduleselect label {
    overflow: hidden;
    white-space: pre-wrap;
}
.block {
	min-height: 350px;
}
</style>

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
								<!-- <li><a @click="saveRequest()" class="panel-refresh" title="Guardar" data-toggle="tooltip" data-placement="bottom"><span class="fas fa-save"></span></a></li> -->
								<li>
									<router-link data-toggle="tooltip" data-placement="bottom" title="Cerrar" tag="a" :to="{ name: 'page-accounts-requests-view', params: { account_id: $route.params.account_id } }" class="panel-remove">
										<span class="fa fa-times"></span>
									</router-link>
								</li>
							</ul>
						</div>
						<div class="panel-body table-responsive-">
							<div class="row">
								<div class="col-md-12">
									<!-- START WIZARD WITH VALIDATION -->
									<div class="block">
										<div id="messageBox"></div>
										<form action="javascript:alert('Validated!');" role="form" class="form-horizontal" id="wizard-validation">
											<div class="wizard show-submit wizard-validation">
												<ul>
													<li>
														<a href="#step-1">
															<span class="stepNumber">1</span>
															<span class="stepDesc">Seleccion<br /><small>Direcciones</small></span>
														</a>
													</li>
													<li>
														<a href="#step-2">
															<span class="stepNumber">2</span>
															<span class="stepDesc">Seleccion<br /><small>Servicios</small></span>
														</a>
													</li>
													<li>
														<a href="#step-8">
															<span class="stepNumber">3</span>
															<span class="stepDesc">+ Informacion<br /><small>Y Contacto</small></span>
														</a>
													</li>                                    
												</ul>

												<div id="step-1">
													<h3 class="push-up-0">Direcciones</h3>
													<p>Seleccione las direcciones que va incluir en la solicitud.</p>
												
													<div class="row">
														<div class="form-group">
															<div class="col-sm-12 col-md-12 col-lg-12">
																<input type="search" class="form-control" id="search" name="search" placeholder="Add your options..">
															</div>
														</div>
													</div>
													<div class="row">
														<div class="form-group">
															<div class="searchable-container">
																<div class="items col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="(address, i) in options.addresses" @click="toggleAddress(i)">
																	<div class="info-block block-info clearfix">
																		<div class="square-box pull-left">
																			<!-- // <i class="fas fa-map-marker-alt"></i> -->
																			<i v-bind:class="seletedActive(address)"></i>
																		</div>
																		<div data-toggle="buttons" class="btn-group bizmoduleselect">
																			<label class="btn btn-default">
																				<div class="bizcontent">
																					<h5>
																						{{ address.address_input }}
																					</h5>
																					<input type="checkbox" autocomplete="off" name="requests_addresses[]" />
																				</div>
																			</label>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
												
												<div id="step-2">
													<h3 class="push-up-0">Servicios</h3>
													<p>Seleccione los servicios que desea incluir en cada una de las direcciones.</p>
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
																					<a @click="toggleAddress(i)">
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

												<div id="step-8">
													<div class="form-group">
														<label class="col-md-2 control-label">Contacto</label>
														<div class="col-md-10">
															<select class="form-control select" v-model="post.contact" name="contact">
																<option value="0">Seleccione la persona de contacto</option>
																<option v-bind:value="item.id" v-for="item in options.contacts">{{ item.names }} {{ item.surname }} {{ item.second_surname }}</option>
															</select>
														</div>
													</div>
													<div class="form-group">
														<label class="col-md-2 control-label">Notas / Observaciones</label>
														<div class="col-md-10">
															<textarea name="request_notes" class="form-control" rows="5" placeholder="Something about you"></textarea>
														</div>
													</div>
												</div>                                                                                                            
											</div>
										</form>
									</div>                        
									<!-- END WIZARD WITH VALIDATION -->
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
</template>
