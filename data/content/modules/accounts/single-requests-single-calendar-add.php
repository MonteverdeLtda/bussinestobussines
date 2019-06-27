<template id="page-accounts-requests-single-calendar-add">
	<div>		
		<div class="page-content-wrap">
			<div class="row">
				<div class="col-md-12">
					<div class="panel panel-default">
						<div class="panel-heading">
							<h3 class="panel-title"><strong>Viendo</strong> Cuenta</h3>
							<ul class="panel-controls">
								
							</ul>
						</div>
						<div class="panel-body">
							<component-navigation-top-pages-accounts></component-navigation-top-pages-accounts>
						</div>
					</div>
					
					<div class="alert alert-danger" role="alert" v-if="options.events.pending.length == 0">
						<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
						<strong>Oye!</strong> Toda las direcciones ya estan agendadas.
					</div>
					
					<div class="panel panel-default">
						<div class="panel-heading">
							<h3 class="panel-title"><strong>Viendo</strong> Calendario (Inventario / Nuevas Propuestas)</h3>
							<ul class="panel-controls">
								<li><a @click="$router.go(-1)" class="panel-remove"><span class="fa fa-times"></span></a></li>
							</ul>
						</div>
						<div class="panel-body table-responsive">
							<!-- START CONTENT FRAME -->
							<div class="content-frame">            
								<!-- START CONTENT FRAME TOP -->
								<div class="content-frame-top"> 
									<div class="page-title">                    
										<h2><span class="fa fa-calendar"></span> Calendar</h2>
									</div>  
									<div class="pull-right">
										<button class="btn btn-default content-frame-left-toggle"><span class="fa fa-bars"></span></button>
									</div>                                                                                
								</div>
								<!-- END CONTENT FRAME TOP -->
								
								<!-- START CONTENT FRAME LEFT -->
								<div class="content-frame-left">
									<h4>Direcciones Pendientes Por Agendar</h4>
									<div class="list-group border-bottom" id="external-events"></div>
									<div class="push-up-10">
										<label class="check">
											<input type="hidden" class="icheckbox" id="drop-remove"/>
										</label>
									</div>
									<div class="panel panel-default push-up-10">
										<div class="panel-body padding-top-0">
											<h4>Agendar Visita</h4>
											<p>FullCalendar is a jQuery plugin that provides a full-sized, drag & drop event calendar like the one below. It uses AJAX to fetch events on-the-fly and is easily configured to use your own feed format. It is visually customizable with a rich API.</p>
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
												<div class="gantt" id="js-gantt"></div>
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
