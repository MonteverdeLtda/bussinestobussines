<template id="page-events-list">
	<div>		
		<div class="page-content-wrap">
			<div class="row">
				<div class="col-md-12">
					<div class="panel panel-default">
						<div class="panel-heading">
							<h3 class="panel-title"><strong>Viendo</strong> Calendario</h3>
							<ul class="panel-controls">
								<li><a @click="find()" class="panel-refresh" title="Actualizar" data-toggle="tooltip" data-placement="bottom"><span class="fa fa-refresh"></span></a></li>
								<li>
									<router-link tag="a" :to="{ name: 'page-dashboard' }" class="panel-remove" title="Cerrar" data-toggle="tooltip" data-placement="bottom">
										<span class="fa fa-times"></span>
									</router-link>
								</li>
							</ul>
						</div>
						<div class="panel-body">
							<!-- START CONTENT FRAME -->
							<div class="content-frame">
								<div class="content-frame-top">
								</div>
								<!-- START CONTENT FRAME LEFT -->
								<div class="content-frame-left">
									<!-- //
									<h4>Nuevo Evento</h4>
									<div class="form-group">
										<div class="input-group">
											<input type="text" class="form-control" id="new-event-text" placeholder="Event text..."/>
											<div class="input-group-btn">
												<button class="btn btn-primary" id="new-event">Añadir</button>
											</div>
										</div>
									</div>
									
									<h4>External Events</h4>
									<div class="list-group border-bottom" id="external-events">
										<a class="list-group-item external-event">Visita Tecnica de inventario para propuesta</a>
									</div>
									
									<div class="push-up-10">
										<label class="check">
											<input type="checkbox" class="icheckbox" id="drop-remove"/> Remove after drop
										</label>
									</div>
									-->
									
									<div class="panel panel-default push-up-10" v-if="seletedEvent.id > 0">
										<div class="panel-heading">
											<h3 class="panel-title">{{ seletedEvent.title }}</h3>
										</div>
										<div class="panel-body padding-top-0">
											<table class="table table-hover table-bordered">
												<tr>
													<td><b>Fecha y Hora de Inicio</b></td>
													<td>
														{{ seletedEvent.start }}
													</td>
												</tr>
												<tr>
													<td><b>Fecha y Hora de Termino</b></td>
													<td>
														{{ seletedEvent.end }}
													</td>
												</tr>
												<tr>
													<td><b>¿Es todo el día?</b></td>
													<td>
														<span v-if="seletedEvent.all_day == 1">Si</span>
														<span v-if="seletedEvent.all_day == 0">No</span>
													</td>
												</tr>
											</table>
										</div>
										<div class="panel-heading">
											<h3 class="panel-title">Cuentas</h3>
										</div>
										<div class="panel-body">
											<table class="table table-hover table-bordered">
												<tr v-for="event in seletedEvent.accounts_calendar">
													<td>
														<b>{{ event.account.names }}</b>
													</td>
												</tr>
											</table>
										</div>
										<div class="panel-heading">
											<h3 class="panel-title">Colaboradores</h3>
										</div>
										<div class="panel-body">
											<table class="table table-hover table-bordered">
												<tr v-for="event in seletedEvent.employees_calendar">
													<td>
														<b>{{ event }}</b>
													</td>
												</tr>
											</table>
										</div>
										
									</div>
								</div>
								<!-- END CONTENT FRAME LEFT -->
								
								<!-- START CONTENT FRAME BODY -->
								<div class="content-frame-body padding-bottom-0">
									<div class="row">
										<div class="col-md-12">
											<div id="alert_holder"></div>
											<div class="calendar">
												<div id="calendar"></div>
											</div>
										</div>
										<div class="col-md-12">
											<div class="panel-body table-responsive">
												<table class="table table-hover table-bordereds datatable">
													<thead>
														<tr>
															<th>Id</th>
															<th>Titulo</th>
															<th>Tipo</th>
															<th>Solicitud</th>
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
								<!-- END CONTENT FRAME BODY -->
							</div>
							<!-- END CONTENT FRAME -->
							
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
