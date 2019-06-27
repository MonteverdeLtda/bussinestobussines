<template id="page-departments-managers-edit">
	<div>
		<div class="page-content-wrap">
			<div class="row">
				<div class="col-md-12">
					<div class="panel panel-default">
						<div class="panel-heading">
							<h3 class="panel-title"><strong>Modificar</strong> Jefe de Departamento</h3>
							<ul class="panel-controls">
						</div>
							<div class="panel-body">
								<div class="form-group">
									<label class="col-md-3 col-xs-12 control-label">Nombre del departamento</label>
									<div class="col-md-9 col-xs-12">
										<div class="input-group">
											<span class="input-group-addon"><span class="fas fa-fingerprint"></span></span>
											<input type="text" class="form-control" name="name" v-model="post.name" />
										</div>
										<!-- // <span class="help-block">This is sample of text field</span> -->
									</div>
								</div>
							</div>
							<div class="panel-footer">
							</div>
					</div>
					
					<div class="panel panel-default">
						<div class="panel-heading">
							<h3 class="panel-title"><strong>Modificar</strong> Departamento</h3>
							<ul class="panel-controls">
								<li>
									<a data-toggle="tooltip" data-placement="bottom" title="Eliminar Departamento" @click="delete_row(post.id);">
										<i class="fas fa-trash"></i>
									</a>
								</li>
								<li><a @click="$router.go(-1)" class="panel-remove"><span class="fa fa-times"></span></a></li>
							</ul>
						</div>
						<form id="jvalidate" role="form" class="form-horizontal" action="javascript:alert('Form #validate2 submited');">
							<div class="panel-body">
								<div class="form-group">
									<label class="col-xs-12 control-label text-left">Jefe del Departamento</label>
									<div class="col-xs-12">
										<select class="form-control select" name="employee" v-model="post.employee" data-live-search="true">
											<option value=""></option>
										</select>
										<!-- // <span class="help-block">Este campo es obligatorio.</span> -->
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-xs-12 control-label text-left">Fecha de Inicio</label>
									<div class="col-xs-12">
										<div class="input-group">
											<span class="input-group-addon"><span class="fas fa-birthday-cake"></span></span>
											<input type="text" class="mask_date form-control datepicker" name="from_date" v-model="post.from_date" autocomplete="off" />
										</div>
										<!-- // <span class="help-block">This is sample of text field</span> departments_manager_employee -->
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-xs-12 control-label text-left">Fecha de Salida</label>
									<div class="col-xs-12">
										<div class="input-group">
											<span class="input-group-addon"><span class="fas fa-birthday-cake"></span></span>
											<input type="text" class="mask_date form-control datepicker" name="to_date" v-model="post.to_date" autocomplete="off" />
										</div>
										<!-- // <span class="help-block">This is sample of text field</span> -->
									</div>
								</div>
							</div>
							<div class="panel-footer">
								<button class="btn btn-primary pull-right" type="submit">Guardar</button>
							</div>
						</form>
					</div>
					
				</div>
			</div>
		</div>
	</div>
</template>