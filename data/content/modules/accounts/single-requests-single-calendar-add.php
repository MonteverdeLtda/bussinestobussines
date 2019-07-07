<style scope="page-accounts-requests-single-calendar-add">
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

.stepContainer {
    height: auto !important;
    min-height: 100%;
}
</style>
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
								<li><a @click="find()" class="panel-refresh" title="Actualizar" data-toggle="tooltip" data-placement="bottom"><span class="fa fa-refresh"></span></a></li>
								<li>
									<router-link data-toggle="tooltip" data-placement="bottom" title="Cerrar" tag="a" :to="{ name: 'page-accounts-requests-single-view', params: { account_id: $route.params.account_id } }" class="panel-remove">
										<span class="fa fa-times"></span>
									</router-link>
								</li>
							</ul>
						</div>
						
                        <!-- START WIZARD WITH VALIDATION -->
						<div class="panel-body">
							<div id="messageBox"></div>
						</div>
						<div class="panel-body">
                            <div class="block">
                                <h4>Wizard with form validation</h4>                                
                                <form action="javascript:alert('Validated!');" role="form" class="form-horizontal" id="wizard-validation">
									<div class="wizard show-submit wizard-validation">
										<ul>
											<li>
												<a href="#step-1">
													<span class="stepNumber">1</span>
													<span class="stepDesc">Seleccionar<br /><small>Direccion</small></span>
												</a>
											</li>
											<li>
												<a href="#step-2">
													<span class="stepNumber">2</span>
													<span class="stepDesc">Explorar <br /><small>Agenda</small></span>
												</a>
											</li>                                 
										</ul>

										<div id="step-1">
											<div class="panel panel-default">
												<div class="panel-body">
													<h3 class="push-up-0">Agendar Visita Tecnica</h3>
													<hr>
													<p>Estas son las direcciones habilitadas para visitas tecnicas en esta direccion.</p>
												</div>
											</div>
										
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
														<div class="items col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="(address, i) in list.pending_resources" @click="toggleAddress(address)">
															<div class="info-block block-info clearfix">
															
																<div class="square-box pull-left">
																	<i v-bind:class="seletedActive(address)"></i>
																</div>
																<div data-toggle="buttons" class="btn-group bizmoduleselect">
																	<label class="btn btn-md btn-default">
																		<div class="bizcontent">
																			<h3>{{ address.address_input }}</h3>
																			<ul class="list-tags" v-for="service in address.services">
																				<h5>{{ service.name }}</h5>
																				<li v-for="resource in service.resources"><a href="#"><span class="fa fa-tag"></span> {{ resource.name }}</a></li>
																			</ul>
																		</div>
																		<div class="bizcontent">
																			<input type="checkbox" autocomplete="off" name="address" v-model="post_event.address" />
																		</div>
																	</label>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>

											<h5>list.pending_resources</h5>
											{{ list.pending_resources }}
											<hr>
										</div>

										<div id="step-2">
											<div class="row">
												<div class="col-sm-12">
													<div class="form-group">
														<label class="col-xs-12 control-label">Tipo de Evento</label>
														<div class="col-xs-12">
															<select class="form-control select" name="type" v-model="post_event.type" data-live-search="true">
																<option value="null"></option>
															</select>
															<span class="help-block">Este campo es obligatorio.</span>
														</div>
													</div>
													<div class="col-sm-12">
														<div class="gantt"></div>
													</div>
												</div>
												
												<div class="col-sm-12">
													<div class="col-sm-12">
														<div class="col-sm-12" v-if="event_enebled == true">
															<div class="panel panel-default">
																<div class="panel-heading">
																	<h3 class="panel-title"><strong>Añadir</strong> Evento</h3>
																	<ul class="panel-controls">
																		<li>
																			<a class="panel-refresh" @click="event_enebled = false;">
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
																		<div class="col-sm-6">
																			<div class="form-group">
																				<label class="col-xs-12 control-label">F. Comienzo</label>
																				<div class="col-xs-12">
																					<input type="text" class="form-control" name="start" v-model="post_event.start" />
																					<span class="help-block">Este campo es obligatorio.</span>
																				</div>
																			</div>
																		</div>
																		<div class="col-sm-6">
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
																				<label class="col-xs-12 control-label">Estado</label>
																				<div class="col-xs-12">
																					<select class="form-control select" name="status" v-model="post_event.status" data-live-search="true">
																						<option value="null">Seleccione una opcion...</option>
																						<option v-bind:value="statusEvent.id" v-for="(statusEvent, i) in options.status_events">{{ statusEvent.name }}</option>
																					</select>
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
											</div>
										</div>
									</div>
                                </form>
                            </div>
						</div>
						<div class="panel-footer">
						{{ post_event }}
						</div>
						<!-- END WIZARD WITH VALIDATION -->
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
