<template id="component-navigation-top">
	<div>
		<ul class="x-navigation x-navigation-horizontal x-navigation-panel" v-if="$root.status === 'connected'">
			<div>
				<li class="xn-icon-button">
					<a href="#" class="x-navigation-minimize"><span class="fa fa-dedent"></span></a>
				</li>
				<li class="xn-search">
					<form role="form">
						<input type="text" name="search" placeholder="Buscar..."/>
					</form>
				</li>
				
				<li class="xn-icon-button pull-right">
					<a href="#" class="mb-control" data-box="#mb-signout" title="Salir" data-toggle="tooltip" data-placement="bottom"><span class="fas fa-sign-out-alt"></span></a>                        
				</li>
				

				<li class="xn-icon-button pull-right">
					<a href="#"><span class="fa fa-comments" title="Mensajes" data-toggle="tooltip" data-placement="bottom"></span></a>
					<div class="informer informer-danger">0</div>
					<div class="panel panel-primary animated zoomIn xn-drop-left xn-panel-dragging">
						<div class="panel-heading">
							<h3 class="panel-title"><span class="fa fa-comments"></span> Mensajes</h3>                                
							<div class="pull-right">
								<span class="label label-danger">0 new</span>
							</div>
						</div>
						<div class="panel-body list-group list-group-contacts scroll" style="height: 200px;">
							<a href="#" class="list-group-item">
								<div class="list-group-status status-online"></div>
								<img src="/assets/images/users/user2.jpg" class="pull-left" alt="John Doe"/>
								<span class="contacts-title">John Doe</span>
								<p>Praesent placerat tellus id augue condimentum</p>
							</a>
						</div>     
						<div class="panel-footer text-center">
							<a href="pages-messages.html">Mostrar todos los mensajes</a>
						</div>                            
					</div>                        
				</li>
				
				
				<li class="xn-icon-button pull-right">
					<a href="#" title="Solicitudes" data-toggle="tooltip" data-placement="bottom"><span class="fa fa-tasks"></span></a>
					<div class="informer informer-warning">{{ requests.length }}</div>
					<div class="panel panel-primary animated zoomIn xn-drop-left xn-panel-dragging">
						<div class="panel-heading">
							<h3 class="panel-title"><span class="fa fa-tasks"></span> Solicitudes</h3>                                
							<div class="pull-right">
								<span class="label label-warning">{{ requests.length }} Posibles ventas</span>
							</div>
						</div>
						<div class="panel-body list-group scroll" style="height: 200px;">
							
							<a @click="linkRequests(request.id, request.account.id)" class="list-group-item" v-for="request in requests" style="cursor:pointer;">
								<strong>{{ request.account.names }}</strong>
								<p></p>
								<div class="progress progress-small progress-striped active">
									<div v-if="request.status.id == 1" class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100" style="width: 15%;">15%</div>
									<div v-if="request.status.id == 2" class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100" style="width: 30%;">30%</div>
									<div v-if="request.status.id == 3" class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: 45%;">45%</div>
									<div v-if="request.status.id == 4" class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">60%</div>
									<div v-if="request.status.id == 5" class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style="width: 80%;">80%</div>
									<div v-if="request.status.id == 8" class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100" style="width: 15%;">15%</div>
								</div>
								<small class="text-muted">{{ request.created }}</small>
							</a>
						</div>     
						<div class="panel-footer text-center">
							<a style="cursor:pointer;">Mostrar todas las solicitudes</a>
						</div>                            
					</div>
				</li>
				
				<!--
				<li class="xn-icon-button pull-right">
					<a href="#" title="Tareas" data-toggle="tooltip" data-placement="bottom"><span class="fa fa-tasks"></span></a>
					<div class="informer informer-warning">{{ tasks.length }}</div>
					<div class="panel panel-primary animated zoomIn xn-drop-left xn-panel-dragging">
						<div class="panel-heading">
							<h3 class="panel-title"><span class="fa fa-tasks"></span> Tareas</h3>
							<div class="pull-right">
								<span class="label label-warning">{{ tasks.length }} pendientes</span>
							</div>
						</div>
						<div class="panel-body list-group scroll" style="height: 200px;">
							<a class="list-group-item" v-for="task in tasks">
								<strong>{{ task.type.name }}</strong>
								<p>
									{{ task.title }} <br>
								</p>
								
								<div v-if="task.type.id == 2">
									Debes validar la solictud que este correctamente diligenciada y con los datos correctos.
								</div>
								<div v-if="task.type.id == 2">
									Debes agendar una visita.
								</div>
								<div v-if="task.type.id == 3">
									Debes entregar el producto/servicio al cliente.
								</div>
								<div v-if="task.type.id == 4">
									Debes visitar la direccion y crear el inventario para esta solicitud.
								</div>
								<div v-if="task.type.id == 5">
									Debes comunicarte con el cliente.
								</div>
								
								<small class="text-muted">{{ task.created }}</small>
							</a>
						</div>
						<div class="panel-footer text-center">
							<a style="cursor:pointer;">Mostrar todas las solicitudes</a>
						</div>
					</div>
				</li>
				-->
				
				
				<li class="xn-icon-button pull-right">
					<a href="#" title="Esperando Asignacion de personal" data-toggle="tooltip" data-placement="bottom"><span class="fas fa-business-time"></span></a>
					<div class="informer informer-warning">{{ events.length }}</div>
					<div class="panel panel-primary animated zoomIn xn-drop-left xn-panel-dragging">
						<div class="panel-heading">
							<h3 class="panel-title"><span class="fas fa-business-time"></span> Esperando Asignacion de personal</h3>
							<div class="pull-right">
								<span class="label label-warning">{{ events.length }} pendientes</span>
							</div>
						</div>
						<div class="panel-body list-group scroll" style="height: 200px;">
							<a class="list-group-item" v-for="event in events">
								<strong>
									{{ event.type.name }}
									<span class="label label-warning">{{ event.status.name }}</span>
								</strong>
								<p>
									{{ event.title }} <br>
									<button type="button" class="btn btn-xs btn-info">
										Agregar Personal
									</button>
								</p>
								
								<div v-if="event.type.id == 1">
									Pendiente asignar personal al evento.
								</div>
								<small class="text-muted">{{ event.created }}</small>
							</a>
						</div>
						<div class="panel-footer text-center">
							<a style="cursor:pointer;">Mostrar todos los eventos</a>
						</div>
					</div>
				</li>
			</div>
		</ul>
	</div>
</template>
