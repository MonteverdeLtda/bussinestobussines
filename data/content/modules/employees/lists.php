<template id="page-employees-list">
	<div>		
		<div class="page-content-wrap">
			<div class="row">
				<div class="col-md-12">
					<div class="panel panel-default">
						<div class="panel-heading">                                
							<h3 class="panel-title">Empleados</h3>
							<ul class="panel-controls">
								<li>
									<router-link tag="a" :to="{ name: 'page-employees-add' }" class="panel-plus" title="Añadir Empleado" data-toggle="tooltip" data-placement="bottom">
										<span class="fas fa-user-plus"></span>
									</router-link>
								</li>
								<li><a @click="find()" class="panel-refresh" title="Actualizar" data-toggle="tooltip" data-placement="bottom"><span class="fa fa-refresh"></span></a></li>
								<li>
									<router-link tag="a" :to="{ name: 'page-dashboard' }" class="panel-remove" title="Cerrar" data-toggle="tooltip" data-placement="bottom">
										<span class="fa fa-times"></span>
									</router-link>
								</li>
							</ul>                                
						</div>
						<div class="panel-body table-responsive">
							<table class="table table-hover table-bordereds datatable">
								<thead>
									<tr>
										<th>Tipo de Identificacion</th>
										<th># Identificacion</th>
										<th>Nombre completo</th>
										<th>Cumpleaños</th>
										<th>Tipo de Sangre</th>
										<th>RH</th>
										<th>Estado</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>