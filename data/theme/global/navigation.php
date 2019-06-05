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
					<a href="#" title="Tareas" data-toggle="tooltip" data-placement="bottom"><span class="fa fa-tasks"></span></a>
					<div class="informer informer-warning">0</div>
					<div class="panel panel-primary animated zoomIn xn-drop-left xn-panel-dragging">
						<div class="panel-heading">
							<h3 class="panel-title"><span class="fa fa-tasks"></span> Tareas</h3>                                
							<div class="pull-right">
								<span class="label label-warning">0 active</span>
							</div>
						</div>
						<div class="panel-body list-group scroll" style="height: 200px;">                                
							<a class="list-group-item" href="#">
								<strong>Phasellus augue arcu, elementum</strong>
								<div class="progress progress-small progress-striped active">
									<div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="width: 50%;">50%</div>
								</div>
								<small class="text-muted">John Doe, 25 Sep 2014 / 50%</small>
							</a>                                
						</div>     
						<div class="panel-footer text-center">
							<a href="pages-tasks.html">Mostrar todas las tareas</a>
						</div>                            
					</div>                        
				</li>
			</div>
		</ul>
	</div>
</template>
