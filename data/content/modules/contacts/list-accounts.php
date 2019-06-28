<template id="page-contacts-list-accounts">
	<div>		
		<div class="page-content-wrap">
			<div class="row">
				<div class="col-md-12">
					<div class="panel panel-default nav-tabs-vertical-">
						<div class="panel-heading">
							<h3 class="panel-title">Contactos X Cuentas</h3>
							<ul class="panel-controls">
								<li><a @click="find()" class="panel-refresh" title="Actualizar" data-toggle="tooltip" data-placement="bottom"><span class="fa fa-refresh"></span></a></li>
								<li>								
									<router-link tag="a" :to="{ name: 'page-contacts-list' }" class="panel-remove" title="Cerrar" data-toggle="tooltip" data-placement="bottom">
										<span class="fa fa-times"></span>
									</router-link>
								</li>
							</ul>
						</div>
						<div class="panel-body">
							<div class="row">
								<div class="col-sm-3">
									<hr>
									<ul class="nav nav-tabs-">
										<li v-for="(item, i) in posts" :class="getClassActiveIndex(i)"><a :href="'#tab'+item.id" data-toggle="tab">{{ item.names }}</a></li>
									</ul>
								</div>
								<div class="col-sm-9">
									<div class="tab-content">
										<div v-for="(item, i) in posts" v-bind:class="getClassActivePanelIndex(i)" :id="'tab'+item.id">
										
											<div class="row">
												<div class="col-md-12">
													<div class="panel-heading">
														<ul class="panel-controls pull-left">
															<li>
																<router-link tag="a" :to="{ name: 'page-contacts-list-accounts-add-to-account', params: { account_id: item.id } }" class="panel-plus" title="Añadir Contacto" data-toggle="tooltip" data-placement="bottom">
																	<span class="fas fa-user-plus"></span>
																</router-link>
															</li>
															<!-- // <li><a @click="addContactToAccount(item.id)" class="panel-refresh" title="Añadir Contacto" data-toggle="tooltip" data-placement="bottom"><span class="fas fa-user-plus"></span></a></li> -->
															<li><a @click="find()" class="panel-refresh" title="Actualizar" data-toggle="tooltip" data-placement="bottom"><span class="fa fa-refresh"></span></a></li>
														</ul>
														<h3 class="panel-title">
															{{ item.identification_number }} - {{ item.names }}
														</h3>
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
																	<th>Relacion/Parentesco</th>
																	<th></th>
																</tr>
															</thead>
															<tbody>
																<tr v-for="crew in item.accounts_contacts">
																	<td>{{ crew.contact.identification_type.name }}</td>
																	<td>{{ crew.contact.identification_number }}</td>
																	<td>{{ crew.contact.names }}</td>
																	<td>{{ crew.contact.surname }} {{ crew.contact.second_surname }}</td>
																	<td>{{ crew.contact.phone }}</td>
																	<td>{{ crew.contact.mobile }}</td>
																	<td>{{ crew.contact.email }}</td>
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
							</div>
						</div>
					</div>
				</div>
			</div>
			
		</div>
	</div>
</template>