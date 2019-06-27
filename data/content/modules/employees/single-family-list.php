<template id="page-employees-single-family-list">
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
							<h3 class="panel-title">Grupo Familiar</h3>
							<ul class="panel-controls">
								<li><a @click="router.push({ name: 'page-employees-family-add' })"><span class="fas fa-plus-circle"></span> </a></li>
								<li><a @click="find()" class="panel-refresh" title="Actualizar" data-toggle="tooltip" data-placement="bottom"><span class="fa fa-refresh"></span></a></li>
							</ul>
						</div>
						<div class="panel-body table-responsive">
							<table class="table table-responsive table-hover table-bordered datatable">
								<thead>
									<tr>
										<th>Tipo de DNI</th>
										<th># Identificacion</th>
										<th>Nombres</th>
										<th>Apellidos</th>
										<th>T. Fijo</th>
										<th>T. Móvil</th>
										<th>E-Mail</th>
										<th>Fecha de Nacimiento</th>
										<th>Edad</th>
										<th>Relacion/Parentesco</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="crew in posts">
										<td>{{ crew.contact.identification_type.name }}</td>
										<td>{{ crew.contact.identification_number }}</td>
										<td>{{ crew.contact.first_name }} {{ crew.contact.second_name }}</td>
										<td>{{ crew.contact.surname }} {{ crew.contact.second_surname }}</td>
										<td>{{ crew.contact.phone }}</td>
										<td>{{ crew.contact.phone_mobile }}</td>
										<td>{{ crew.contact.mail }}</td>
										<td>{{ crew.contact.birthdaydate }}</td>
										<td>{{ calcular_edad(crew.contact.birthdaydate) }}</td>
										<td>{{ crew.type_contact.name }}</td>
										<td>
											<button data-toggle="tooltip" data-placement="top" title="Eliminar Contacto" class="btn btn-danger btn-rounded btn-xs" @click="delete_row(crew.id);">
												<i class="fas fa-trash"></i>
											</button>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>