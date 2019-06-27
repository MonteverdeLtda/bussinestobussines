<template id="page-departments-add">
	<div>
		<div class="page-content-wrap">
			<div class="row">
				<div class="col-md-12">
					<div class="panel panel-default">
						<div class="panel-heading">
							<h3 class="panel-title"><strong>Añadir</strong> Departamento</h3>
							<ul class="panel-controls">
								<li><a @click="$router.go(-1)" class="panel-remove"><span class="fa fa-times"></span></a></li>
							</ul>
						</div>
					
						<div class="panel-body">
							<!-- START WIZARD WITH VALIDATION -->
							<div class="block">
								<h3 class="panel-title"><strong>Añadir</strong> Departamento</h3>
								<form action="javascript:alert('Validated!');" role="form" class="form-horizontal" id="wizard-validation">
								<div class="wizard show-submit wizard-validation">
									<ul>
										<li>
											<a href="#step-6">
												<span class="stepNumber">1</span>
												<span class="stepDesc">Crear<br /><small>Departamento</small></span>
											</a>
										</li>
										<li>
											<a href="#step-7">
												<span class="stepNumber">1</span>
												<span class="stepDesc">Asignar<br /><small>Empleado</small></span>
											</a>
										</li>
									</ul>

									<div id="step-6">
										<div class="form-group">
											<label class="col-md-2 control-label text-left">Nombre del departamento</label>
											<div class="col-md-10">
												<input type="text" class="form-control" name="department_name" v-model="post.department_name" placeholder="Nombre del departamento" autocomplete="off" />
											</div>
										</div>
									</div>

									<div id="step-7">
										<div class="form-group">
											<label class="col-xs-12 control-label text-left">Jefe del Departamento</label>
											<div class="col-xs-12">
												<select class="form-control select" name="departments_manager_employee" v-model="post.departments_manager_employee" data-live-search="true">
													<option value=""></option>
												</select>
												<span class="help-block">Este campo es obligatorio.</span>
											</div>
										</div>
										
										<div class="form-group">
											<label class="col-xs-12 control-label text-left">Fecha de Ingreso</label>
											<div class="col-xs-12">                                            
												<div class="input-group">
													<span class="input-group-addon"><span class="fas fa-birthday-cake"></span></span>
													<input type="text" class="mask_date form-control datepicker" name="departments_manager_from_date" v-model="post.departments_manager_from_date" autocomplete="off" />
												</div>                                            
												<!-- // <span class="help-block">This is sample of text field</span> departments_manager_employee -->
											</div>
										</div>
										
										<div class="form-group">
											<label class="col-xs-12 control-label text-left">Fecha de Salida</label>
											<div class="col-xs-12">                                            
												<div class="input-group">
													<span class="input-group-addon"><span class="fas fa-birthday-cake"></span></span>
													<input type="text" class="mask_date form-control datepicker" name="departments_manager_to_date" v-model="post.departments_manager_to_date" autocomplete="off" />
												</div>                                            
												<!-- // <span class="help-block">This is sample of text field</span> -->
											</div>
										</div>
										
									</div>

								</div>
								</form>
							</div>
							<!-- END WIZARD WITH VALIDATION -->
						</div>
							
						<div class="panel-body">
							{{ post }}
							<p class="list-group">
								<div class="list-group alert" id="messageBox"></div>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>