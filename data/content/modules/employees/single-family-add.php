<template id="page-employees-single-family-add">
	<div>		
		<div class="page-content-wrap">
			<div class="row">
				<div class="col-md-12">
					<div class="panel panel-default">
						<div class="panel-heading">
							<h3 class="panel-title"><strong>Viendo</strong> Empleado</h3>
							<ul class="panel-controls">
							</ul>
						</div>
						<div class="panel-body">
							<component-navigation-top-pages-employees></component-navigation-top-pages-employees>
						</div>
					</div>
					
					<div class="panel panel-default">
						<div class="panel-heading">
							<h3 class="panel-title">Añadir Grupo Familiar</h3>
							<ul class="panel-controls">
								<li>
									<router-link tag="a" :to="{ name: 'page-employees-single-family-list', params: { employee_id: $route.params.employee_id } }" class="panel-remove" title="Cerrar" data-toggle="tooltip" data-placement="bottom">
										<span class="fa fa-times"></span>
									</router-link>
								</li>
							</ul>
						</div>
						<div class="panel-body">
							<form id="jvalidate" role="form" class="form-horizontal" action="javascript:alert('Form #validate2 submited');">
								<div class="panel-body">
									<!-- // Parametros -->									
									<div class="form-group">
										<label class="col-md-3 col-xs-12 control-label">Contacto</label>
										<div class="col-md-6 col-xs-12">
											<select class="form-control select" name="contact" data-v-model="post.contact" data-live-search="true">
												<option value=""></option>
											</select>
											<span class="help-block">Este campo es obligatorio.</span>
										</div>
									</div>
									
									<div class="form-group">
										<label class="col-md-3 col-xs-12 control-label">Tipo de Relación</label>
										<div class="col-md-6 col-xs-12">                                                                                            
											<select class="form-control select" data-v-model="type_contact" name="type_contact" v-model="post.type_contact" data-live-search="true">
												<option value=""></option>
											</select>
											<span class="help-block">Este campo es obligatorio.</span>
										</div>
									</div>
									
								</div>
									
								<div class="panel-body">
									<p class="list-group">
										<div class="list-group alert" id="messageBox"></div>
									</p>
								</div>
								
								<div class="panel-footer">
									<button class="btn btn-primary pull-right" type="submit">Añadir Contacto</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>