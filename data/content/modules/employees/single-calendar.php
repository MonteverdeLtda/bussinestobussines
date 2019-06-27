<template id="page-employees-single-view-calendar">
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
							<h3 class="panel-title">Calendario</h3>
							<ul class="panel-controls">
								<li><a @click="find()" class="panel-refresh" title="Actualizar" data-toggle="tooltip" data-placement="bottom"><span class="fa fa-refresh"></span></a></li>
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
											<ul class="list-group">
												<li class="list-group-item"><b>Fecha y Hora de Inicio</b></li>
												<li class="list-group-item">{{ seletedEvent.start }}</li>
												<li class="list-group-item"><b>Fecha y Hora de Termino</b></li>
												<li class="list-group-item">{{ seletedEvent.end }}</li>
												<li class="list-group-item"><b>¿Es todo el día?</b></li>
												<li class="list-group-item" v-if="seletedEvent.all_day == 1">Si</li>
												<li class="list-group-item" v-if="seletedEvent.all_day == 0">No</li>
											</ul>
											<router-link class="btn btn-default btn-rounded btn-xs" tag="button" :to="{ name: 'page-accounts-requests-single-view', params: { account_id: seletedEvent.request.client, request_id: seletedEvent.request.id } }">
												Ver solicitud
											</router-link>
										</div>
									</div>
									
									<div class="panel panel-default push-up-10" v-if="seletedEvent.id > 0">
										<div class="panel-heading">
											<h3 class="panel-title">Clientes</h3>
										</div>
										<div class="panel-body padding-top-0">
											<ul class="list-group" v-for="(cal, i) in seletedEvent.calendar_clients">
												<li class="list-group-item"><b>{{ (i+1) }} - {{ cal.client.names }}</b></li>
												<li class="list-group-item">{{ cal.client.identification_number }}</li>
											</ul>
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