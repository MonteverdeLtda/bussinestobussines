
<template id="page-accounts-addresses-single-add">
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
							<h3 class="panel-title"><strong>Añadir</strong> Dirección</h3>
							<ul class="panel-controls">
								<li>
									<router-link tag="a" :to="{ name: 'page-accounts-addresses-view', params: { account_id: $route.params.account_id } }" class="panel-remove">
										<span class="fa fa-times"></span>
									</router-link>
								</li>
							</ul>
						</div>
						<div class="panel-body">
							<div class="row">
								<div class="col-md-12">
									<div class="block">
										<form action="javascript:alert('Validated!');" role="form" class="form-horizontal" id="wizard-validation">
											<div class="wizard show-submit wizard-validation">
												<div id="step-1">
													<div class="row">
														<div class="col-sm-5">
															<h3>1. Ingrese la dirección</h3>
															<div class="form-group">
																<label class="col-md-12 control-label text-left">Ingrese el nombre del establecimiento o lugar de referencia mas cercano.</label>
																<div class="col-md-12">
																	<input type="text" class="form-control" v-model="address_search.text" placeholder="Ingrese la direccion o el nombre del establecimiento"/>
																</div>
															</div>
															<div class="form-group">
																<div class="pull-right">
																	<button type="button" class="btn btn-info" @click="searchAddress(1)"> Buscar</button>
																</div>
															</div>
															<h3>2. Seleccione la direccion en la lista</h3>
															<div class="form-group" style="height: 320px;max-height: 320px;overflow: auto;">
																<div class="list-group list-group-contacts">
																	<a class="list-group-item" v-for="(address, i) in address_search.resultData">
																		<img v-if="address.icon != undefined" :src="address.icon" class="pull-left" alt="Nadia Ali"/>
																		<span class="contacts-title">{{ address.display_name }}</span>
																		<p>{{ address.type }} - {{ address.category }}</p>
																		<p>{{ address.geojson }}</p>
																		<div class="list-group-controls">
																			<button type="button" class="btn btn-primary btn-rounded" @click="setAddressList(i)"><span class="fas fa-check"></span></button>
																		</div>
																	</a>
																	<a class="list-group-item" v-if="address_search.resultData[0] == undefined">
																		<img src="/assets/images/users/user.jpg" class="pull-left" alt="Dmitry Ivaniuk"/>
																		<span class="contacts-title">Sin resultados</span>
																		<p>No se encontraron resultados, intente buscar nuevamente.</p>
																		<div class="list-group-controls">
																		</div>
																	</a>
																</div>
																	
																	<!-- // 
																	<a href="#" class="list-group-item">
																		<img src="/assets/images/users/user.jpg" class="pull-left" alt="Dmitry Ivaniuk"/>
																		<span class="contacts-title">Dmitry Ivaniuk</span>
																		<p>Web Developer/Designer</p>
																		<div class="list-group-controls">
																			<button class="btn btn-primary btn-rounded"><span class="fas fa-pencil-alt"></span></button>
																		</div>
																	</a>
																	-->
															</div>
														</div>
														<div class="col-sm-7">
															<h3>3. Confirme la ubicación en el mapa</h3>
															<div id="vector_world_map" style="width: 100%; height: 300px"></div>
															<hr>
																<div class="form-group">
																	<label class="col-md-2 control-label">Direccion Detectada</label>
																	<div class="col-md-10">
																		<input type="text" class="form-control" placeholder="display_name" v-model="post.display_name" />
																	</div>
																</div>
																													
																<div class="form-group">
																	<label class="col-md-2 control-label">Latitud</label>
																	<div class="col-md-10">
																		<input type="text" class="form-control" name="lat" v-model="post.lat" placeholder="Latitud"/>
																	</div>
																</div>
																
																<div class="form-group">
																	<label class="col-md-2 control-label">Longitud</label>
																	<div class="col-md-10">
																		<input type="text" class="form-control" name="lon" v-model="post.lon" placeholder="Longitud"/>
																	</div>
																</div>
															<hr>
														</div>
													</div>
													
												</div>

												<div id="step-2">
													<div class="form-group">
														<label class="col-md-12 control-label text-left">Direccion Real</label>
														<div class="col-md-12">
															<input type="text" class="form-control" name="address_input" placeholder="address_input" v-model="post.address_input" />
														</div>
													</div>
													
										
													<div class="form-group">
														<label class="col-md-3 col-xs-12 control-label">Departamento</label>
														<div class="col-md-6 col-xs-12">
															<select class="form-control select" name="department" v-model="post.department" data-live-search="true">
																<option value=""></option>
															</select>
															<span class="help-block">Este campo es obligatorio.</span>
														</div>
													</div>
													
													<div class="form-group">
														<label class="col-md-3 col-xs-12 control-label">Ciudad</label>
														<div class="col-md-6 col-xs-12">
															<select class="form-control select" name="city" v-model="post.city" data-live-search="true">
																<option value=""></option>
															</select>
															<span class="help-block">Este campo es obligatorio.</span>
														</div>
													</div>
													
												</div>
												
												
												<ul>
													<li>
														<a href="#step-1">
															<span class="stepNumber">1</span>
															<span class="stepDesc">Buscar<br /><small>Dirección</small></span>
														</a>
													</li>
													<li>
														<a href="#step-2">
															<span class="stepNumber">2</span>
															<span class="stepDesc">Añadir<br /><small>información</small></span>
														</a>
													</li>
												</ul>



											</div>
										</form>
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
