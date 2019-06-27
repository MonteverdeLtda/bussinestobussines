<template id="page-accounts-requests-view">
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
					
					<div class="panel panel-default">
						<div class="panel-heading">                                
							<h3 class="panel-title">Solicitudes</h3>
							<ul class="panel-controls">
								<li>								
									<router-link tag="a" :to="{ name: 'page-accounts-requests-add', params: { account_id: $route.params.account_id } }" class="panel-remove" title="Añadir Solicitud" data-toggle="tooltip" data-placement="bottom">
										<span class="fas fa-plus-circle"></span>
									</router-link>
								</li>
								<li><a @click="find()" class="panel-refresh" title="Actualizar" data-toggle="tooltip" data-placement="bottom"><span class="fa fa-refresh"></span></a></li>
							</ul>                                
						</div>
						<div class="panel-body table-responsive">
							<table class="table table-hover table-bordereds datatable">
								<thead>
									<tr>
										<th>ID</th>
										<th>Estado</th>
										<th>Contacto</th>
										<th>Direcciones y Servicios</th>
										<th>Notas Adicionales</th>
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
