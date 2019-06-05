<template id="page-users-edit">
	<div>
		<div class="page-content-wrap">
			<div class="row">
				<div class="col-md-1">
				</div>
				<div class="col-md-10">
					<div class="panel panel-default">
						<div class="panel-heading">
							<h3 class="panel-title"><strong>Modificar</strong> Usuario</h3>
							<ul class="panel-controls">
								<li>
									<router-link data-toggle="tooltip" data-placement="bottom" title="Ver Usuario" tag="a" :to="{ name: 'page-users-view', params: { user_id: post.id } }" class="panel-remove">
										<span class="fas fa-eye"></span>
									</router-link>
								</li>
								<li>
									<a data-toggle="tooltip" data-placement="bottom" title="Eliminar Usuario" @click="delete_row(post.id);">
										<i class="fas fa-trash"></i>
									</a>
								</li>
								
								<li>
									<router-link data-toggle="tooltip" data-placement="bottom" title="Cerrar" tag="a" :to="{ name: 'page-users-list' }" class="panel-remove">
										<span class="fa fa-times"></span>
									</router-link>
								</li>
							</ul>
						</div>
						
						<form id="jvalidate" role="form" class="form-horizontal" action="javascript:alert('Form #validate2 submited');">
							<div class="panel-body">
								<!-- // Parametros -->
								<input type="hidden" class="form-control" name="id" v-model="post.id" />
								
								<div class="form-group">
									<label class="col-md-3 col-xs-12 control-label">Perfil de Permisos</label>
									<div class="col-md-6 col-xs-12">
										<select class="form-control select" name="permissions" data-v-model="permissions" v-model="post.permissions" >
											<option value=""></option>
										</select>
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-3 col-xs-12 control-label">Usuario</label>
									<div class="col-md-6 col-xs-12">
										<div class="input-group">
											<span class="input-group-addon"><i class="fas fa-user"></i></span>
											<input type="text" class="form-control" name="username" v-model="post.username" />
										</div>
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-3 col-xs-12 control-label">Nombre(s)</label>
									<div class="col-md-6 col-xs-12">
										<div class="input-group">
											<span class="input-group-addon"><span class="fas fa-signature"></span></span>
											<input type="text" class="form-control" name="names" v-model="post.names" />
										</div>
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-3 col-xs-12 control-label">Primer Apellido</label>
									<div class="col-md-6 col-xs-12">
										<div class="input-group">
											<span class="input-group-addon"><span class="fas fa-signature"></span></span>
											<input type="text" class="form-control" name="surname" v-model="post.surname" />
										</div>
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-3 col-xs-12 control-label">Segundo Apellido</label>
									<div class="col-md-6 col-xs-12">
										<div class="input-group">
											<span class="input-group-addon"><span class="fas fa-signature"></span></span>
											<input type="text" class="form-control" name="second_surname" v-model="post.second_surname" />
										</div>
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-3 col-xs-12 control-label">Teléfono Fijo</label>
									<div class="col-md-6 col-xs-12">
										<div class="input-group">
											<span class="input-group-addon"><span class="fas fa-phone-volume"></span></span>
											<input type="text" class="form-control mask_phone_ext" name="phone" v-model="post.phone" />
										</div>
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-3 col-xs-12 control-label">Teléfono Móvil</label>
									<div class="col-md-6 col-xs-12">
										<div class="input-group">
											<span class="input-group-addon"><span class="fas fa-mobile-alt"></span></span>
											<input type="text" class="form-control mask_phone_mobile" name="mobile" v-model="post.mobile" />
										</div>
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-3 col-xs-12 control-label">Correo Electronico</label>
									<div class="col-md-6 col-xs-12">
										<div class="input-group">
											<span class="input-group-addon"><span class="fa fa-envelope"></span></span>
											<input type="text" class="form-control" name="mail" v-model="post.mail"/>
										</div>
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-3 col-xs-12 control-label">Contraseña</label>
									<div class="col-md-6 col-xs-12">
										<div class="input-group">
											<span class="input-group-addon"><i class="fas fa-key"></i></span>
											<input type="text" class="form-control" name="password" v-model="post.password"/>
										</div>
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-3 col-xs-12 control-label">Avatar</label>
									<div class="col-md-6 col-xs-12">
										<select class="form-control select" data-v-model="avatar" name="avatar" v-model="post.avatar">
											<option value=""></option>
										</select>
									</div>
								</div>
							</div>
								
							<div class="panel-body">
								<p class="list-group">
									<div class="list-group alert" id="messageBox"></div>
								</p>
							</div>
							<div class="panel-footer">
								<button class="btn btn-primary pull-right" type="submit">Guardar</button>
							</div>
						</form>
					</div>
				</div>
				<div class="col-md-1">
				</div>
			</div>
		</div>
	</div>
</template>