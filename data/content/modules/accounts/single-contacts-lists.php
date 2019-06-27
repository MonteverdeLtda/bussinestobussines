
<template id="page-accounts-contacts-view">
	<div>
		<div class="page-content-wrap">
			<div class="row">
				<div class="col-md-12">
					<div class="panel panel-default">
						<div class="panel-heading">
							<h3 class="panel-title"><strong>Viendo</strong> Cuenta</h3>
							<ul class="panel-controls">
								<li>
									<router-link tag="a" :to="{ name: 'page-accounts-list' }" class="panel-remove">
										<span class="fa fa-times"></span>
									</router-link>
								</li>
							</ul>
						</div>
						<div class="panel-body">
							<component-navigation-top-pages-accounts></component-navigation-top-pages-accounts>
						</div>
					</div>
					
					<div class="panel panel-default">
						<div class="panel-heading">
							<h3 class="panel-title">Contactos</h3>
							<ul class="panel-controls">
								<li>
									<router-link tag="a" :to="{ name: 'page-contacts-list-accounts-add-to-account', params: { account_id: post.id } }" class="panel-plus" title="Añadir Contacto" data-toggle="tooltip" data-placement="bottom">
										<span class="fas fa-user-plus"></span>
									</router-link>
								</li>
								<li><a @click="find()" class="panel-refresh" title="Actualizar" data-toggle="tooltip" data-placement="bottom"><span class="fa fa-refresh"></span></a></li>
							</ul>                                
						</div>
						<div class="panel-body table-responsive">
							<table class="table table-hover table-bordereds datatable-contacts">
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
								</tbody>
							</table>
						</div>
						<!-- //
						<div class="panel-footer">
							<button class="btn btn-primary pull-right">Save Changes <span class="fa fa-floppy-o fa-right"></span></button>
						</div>
						-->
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
