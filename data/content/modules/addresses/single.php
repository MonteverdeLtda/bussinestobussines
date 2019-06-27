<template id="page-addresses-view">
	<div>
		<div class="page-content-wrap">
			<div class="row">
				<div class="col-md-12">
					
					<div class="panel panel-default">
						<div class="panel-heading">
							<h3 class="panel-title"><strong>Ver</strong> Direccion</h3>
							<ul class="panel-controls">
								<li>
									<router-link tag="a" :to="{ name: 'page-addresses-edit', params: { address_id: $route.params.address_id } }" class="panel-remove" title="Modificar" data-toggle="tooltip" data-placement="bottom">
										<span class="fa fa-pencil-alt"></span>
									</router-link>
								</li>
								<li>
									<router-link tag="a" :to="{ name: 'page-addresses-list', params: {} }" class="panel-remove" title="Cerrar" data-toggle="tooltip" data-placement="bottom">
										<span class="fa fa-times"></span>
									</router-link>
								</li>
							</ul>
						</div>
						<form id="jvalidate" role="form" class="form-horizontal-" action="javascript:alert('Form #validate2 submited');">
							<div class="panel-body">
								<div class="row">
									<div class="col-sm-12">
										<div class="col-sm-3 col-md-3">
											<div class="form-group">
												<label class="col-xs-12 control-label">Tipo Vía (*)</label>
												<div class="col-xs-12">
													<select class="form-control select" name="type_road" v-model="post.type_road" data-live-search="true">
														<option value="null"></option>
													</select>
													<span class="help-block">&nbsp;</span>
												</div>
											</div>
										</div>
										<div class="col-sm-3 col-md-1">
											<div class="form-group">
												<label class="col-xs-12 control-label">Num. (*)</label>
												<div class="col-xs-12">
													<input type="text" class="form-control" name="number_a" v-model="post.number_a" />
												</div>
											</div>
										</div>
										<div class="col-sm-3 col-md-1">
											<div class="form-group">
												<label class="col-xs-12 control-label">Letra</label>
												<div class="col-xs-12">
													<select class="form-control select letters-addresses" name="letter_a" v-model="post.letter_a" data-live-search="true">
														<option value="null"></option>
													</select>
													<span class="help-block">&nbsp;</span>
												</div>
											</div>
										</div>
										<div class="col-sm-3 col-md-2">
											<div class="form-group">
												<label class="col-xs-12 control-label">Cuadrante</label>
												<div class="col-xs-12">
													<select class="form-control select quadrants-addresses" name="quadrant_a" v-model="post.quadrant_a" data-live-search="true">
														<option value="null"></option>
													</select>
													<span class="help-block">&nbsp;</span>
												</div>
											</div>
										</div>
										<div class="col-sm-3 col-md-1">
											<div class="form-group">
												<label class="col-xs-12 control-label">Num. (*)</label>
												<div class="col-xs-12">
													<input type="text" class="form-control" name="number_b" v-model="post.number_b" />
													<span class="help-block">&nbsp;</span>
												</div>
											</div>
										</div>
										<div class="col-sm-3 col-md-1">
											<div class="form-group">
												<label class="col-xs-12 control-label">Letra</label>
												<div class="col-xs-12">
													<select class="form-control select letters-addresses" name="letter_b" v-model="post.letter_b" data-live-search="true">
														<option value="null"></option>
													</select>
													<span class="help-block">&nbsp;</span>
												</div>
											</div>
										</div>
										<div class="col-sm-3 col-md-2">
											<div class="form-group">
												<label class="col-xs-12 control-label">Cuadrante</label>
												<div class="col-xs-12">
													<select class="form-control select quadrants-addresses" name="quadrant_b" v-model="post.quadrant_b" data-live-search="true">
														<option value="null"></option>
													</select>
													<span class="help-block">&nbsp;</span>
												</div>
											</div>
										</div>
										<div class="col-sm-3 col-md-1">
											<div class="form-group">
												<label class="col-xs-12 control-label">Num. (*)</label>
												<div class="col-xs-12">
													<input type="text" class="form-control" name="number_c" v-model="post.number_c" />
													<span class="help-block">&nbsp;</span>
												</div>
											</div>
										</div>
										
										<div class="col-sm-4 col-md-12">
											<div class="form-group">
												<label class="col-xs-12 control-label">Info. Adiccional</label>
												<div class="col-xs-12">
													<input type="text" onkeyup="javascript:this.value=this.value.toUpperCase();" style="text-transform:uppercase;" class="form-control" name="additional_information" v-model="post.additional_information" />
													<span class="help-block">Ejemplo: Apartamento, Edificio, Finca, Interior</span>
												</div>
											</div>
										</div>
										
										<div class="col-sm-4 col-md-6">
											<div class="form-group">
												<label class="col-xs-12 control-label">Departamento (*)</label>
												<div class="col-xs-12">
													<select class="form-control select" name="department" v-model="post.department" data-live-search="true">
														<option value="null"></option>
													</select>
													<span class="help-block">&nbsp;</span>
												</div>
											</div>
										</div>
										<div class="col-sm-4 col-md-6">
											<div class="form-group">
												<label class="col-xs-12 control-label">Ciudad (*)</label>
												<div class="col-xs-12">
													<select class="form-control select" name="city" v-model="post.city" data-live-search="true">
														<option value="null"></option>
													</select>
													<span class="help-block">&nbsp;</span>
												</div>
											</div>
										</div>
										
										<div class="col-sm-4 col-md-4">
											<div class="form-group">
												<label class="col-xs-12 control-label">Cod. Postal</label>
												<div class="col-xs-12">
													<input type="text" class="form-control" name="postal_code" v-model="post.postal_code" />
													<span class="help-block">&nbsp;</span>
												</div>
											</div>
										</div>
										
										
										<div class="col-sm-4 col-md-4">
											<div class="form-group">
												<label class="col-xs-12 control-label">Direccion Normalizada</label>
												<div class="col-xs-12">
													<input readonly="" type="text" class="form-control" name="address_input" v-model="post.address_input" />
													<span class="help-block">&nbsp;</span>
												</div>
											</div>
										</div>
										
										<div class="col-sm-4 col-md-4">
											<div class="form-group">
												<label class="col-xs-12 control-label">Direccion Completa</label>
												<div class="col-xs-12">
													<input readonly="" type="text" class="form-control" name="display_name" v-model="post.display_name" />
													<span class="help-block">&nbsp;</span>
												</div>
											</div>
										</div>
										
										<div class="col-sm-12 col-md-12">
											<hr>
											<div id='myMap' style='width: 100%; height: 35vh;'></div>
										</div>
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