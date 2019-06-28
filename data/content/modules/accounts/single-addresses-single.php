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
							<h3 class="panel-title"><strong>Viendo</strong> Direccion</h3>
							<ul class="panel-controls">
								<li>
									<a class="panel-refresh" @click="delete_this()" title="Eliminar" data-toggle="tooltip" data-placement="bottom">
										<span class="fa fa-trash"></span>
									</a>
								</li>
								<li>
									<router-link tag="a" :to="{ name: 'page-accounts-addresses-view', params: { account_id: $route.params.account_id } }" class="panel-remove" title="Cerrar" data-toggle="tooltip" data-placement="bottom">
										<span class="fa fa-times"></span>
									</router-link>
								</li>
							</ul>
						</div>
						<form id="jvalidate" role="form" class="form-horizontal-" action="javascript:alert('Form #validate2 submited');">
							<div class="panel-body">
								<div class="row">
									<div class="col-sm-3 col-md-3">
										<div class="form-group">
											<label class="col-xs-12 control-label">Tipo de Vía (*)</label>
											<div class="col-xs-12">
												<input type="text" class="form-control" name="type_road" v-model="post.type_road.name" />
													<option value="null"></option>
												</select>
												<span class="help-block">Este campo es obligatorio.</span>
											</div>
										</div>
									</div>									
									<div class="col-sm-3 col-md-1">
										<div class="form-group">
											<label class="col-xs-12 control-label">Num. (*)</label>
											<div class="col-xs-12">
												<input type="text" class="form-control" name="number_a" v-model="post.number_a" />
												<span class="help-block">Este campo es obligatorio.</span>
											</div>
										</div>
									</div>
									<div class="col-sm-3 col-md-1">
										<div class="form-group">
											<label class="col-xs-12 control-label">Letra</label>
											<div class="col-xs-12">
												<input type="text" class="form-control" name="letter_a" v-model="post.letter_a.name" />
												<span class="help-block">Este campo es obligatorio.</span>
											</div>
										</div>
									</div>
									<div class="col-sm-3 col-md-2">
										<div class="form-group">
											<label class="col-xs-12 control-label">Cuadrante</label>
											<div class="col-xs-12">
												<input type="text" class="form-control" name="quadrant_a" v-model="post.quadrant_a.name" />
												<span class="help-block">Este campo es obligatorio.</span>
											</div>
										</div>
									</div>
									
									<div class="col-sm-3 col-md-1">
										<div class="form-group">
											<label class="col-xs-12 control-label">Num. (*)</label>
											<div class="col-xs-12">
												<input type="text" class="form-control" name="number_b" v-model="post.number_b" />
												<span class="help-block">Este campo es obligatorio.</span>
											</div>
										</div>
									</div>
									
									<div class="col-sm-3 col-md-1">
										<div class="form-group">
											<label class="col-xs-12 control-label">Letra</label>
											<div class="col-xs-12">
												<input type="text" class="form-control" name="letter_b" v-model="post.letter_b.name" />
												<span class="help-block">Este campo es obligatorio.</span>
											</div>
										</div>
									</div>
									<div class="col-sm-3 col-md-2">
										<div class="form-group">
											<label class="col-xs-12 control-label">Cuadrante</label>
											<div class="col-xs-12">
												<input type="text" class="form-control" name="quadrant_b" v-model="post.quadrant_b.name" />
												<span class="help-block">Este campo es obligatorio.</span>
											</div>
										</div>
									</div>
									<div class="col-sm-3 col-md-1">
										<div class="form-group">
											<label class="col-xs-12 control-label">Num. (*)</label>
											<div class="col-xs-12">
												<input type="text" class="form-control" name="number_c" v-model="post.number_c" />
												<span class="help-block">Este campo es obligatorio.</span>
											</div>
										</div>
									</div>
									
									<div class="col-sm-4 col-md-12">
										<div class="form-group">
											<label class="col-xs-12 control-label">Info. Adiccional</label>
											<div class="col-xs-12">
												<input type="text" onkeyup="javascript:this.value=this.value.toUpperCase();" style="text-transform:uppercase;" class="form-control" name="additional_information" v-model="post.additional_information" />
												<span class="help-block">Este campo es obligatorio.</span>
											</div>
										</div>
									</div>
									
									<div class="col-sm-4 col-md-6">
										<div class="form-group">
											<label class="col-xs-12 control-label">Departamento (*)</label>
											<div class="col-xs-12">
												<input type="text" class="form-control" name="department" v-model="post.department.name" />
												<span class="help-block">Este campo es obligatorio.</span>
											</div>
										</div>
									</div>
									<div class="col-sm-4 col-md-6">
										<div class="form-group">
											<label class="col-xs-12 control-label">Ciudad (*)</label>
											<div class="col-xs-12">
												<input type="text" class="form-control" name="city" v-model="post.city.name" />
												<span class="help-block">Este campo es obligatorio.</span>
											</div>
										</div>
									</div>
									
									<div class="col-sm-4 col-md-4">
										<div class="form-group">
											<label class="col-xs-12 control-label">Cod. Postal</label>
											<div class="col-xs-12">
												<input type="text" class="form-control" name="postal_code" v-model="post.postal_code" />
												<span class="help-block">Este campo es obligatorio.</span>
											</div>
										</div>
									</div>
									
									<div class="col-sm-4 col-md-4">
										<div class="form-group">
											<label class="col-xs-12 control-label">Direccion Normalizada</label>
											<div class="col-xs-12">
												<input readonly="" type="text" class="form-control" name="address_input" v-model="post.address_input" />
												<span class="help-block">Este campo es obligatorio.</span>
											</div>
										</div>
									</div>
									
									<div class="col-sm-4 col-md-4">
										<div class="form-group">
											<label class="col-xs-12 control-label">Direccion Completa</label>
											<div class="col-xs-12">
												<input readonly="" type="text" class="form-control" name="display_name" v-model="post.display_name" />
												<span class="help-block">Este campo es obligatorio.</span>
											</div>
										</div>
									</div>
									
									<div class="col-sm-12 col-md-12">
										<hr>
										<div id='myMap' style='width: 100%; height: 35vh;'></div>
										<div id="vector_world_map" style="width: 100%; height: 300px"></div>	
									</div>
								</div>
							</div>
								
							<div class="panel-body">
								<p class="list-group">
									<div class="list-group alert" id="messageBox"></div>
								</p>
							</div>
							
							<div class="panel-footer">
								<button class="btn btn-primary pull-right" type="submit">Guardar</button>
							</div>
							<div class="panel-footer">
								{{ post }}
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>