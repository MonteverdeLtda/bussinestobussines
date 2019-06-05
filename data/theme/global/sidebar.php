<template id="component-sidebar-left">
	<div>
		<div class="page-sidebar" v-if="$root.status === 'connected'">
			<ul class="x-navigation" style="cursor:pointer;">
				<li class="xn-logo">
					<router-link tag="a" :to="{ name: 'page-dashboard' }">
						{{ $root.appName }}
					</router-link>
					<a class="x-navigation-control"></a>
				</li>
				<li class="xn-profile">
					<a href="#" class="profile-mini">
						<img src="/assets/images/users/avatar.jpg" alt="John Doe"/>
					</a>
					<div class="profile">
						<div class="profile-image">
							<img src="/assets/images/users/avatar.jpg" alt="John Doe"/>
						</div>
						<div class="profile-data">
							<div class="profile-data-name">{{ $root.authResponse.userData.names }}</div>
							<div class="profile-data-title">{{ $root.authResponse.userData.permissions.name }}</div>
						</div>
						<div class="profile-controls">
							<!-- // 
							<router-link tag="a" :to="{ name: 'page-profiles-b2b-for-id-view', params: { user_id: $root.authResponse.userID } }" class="profile-control-left">
								<span class="fa fa-info"></span>
							</router-link>
							-->
							<!-- // <a href="pages-messages.html" class="profile-control-right"><span class="fa fa-envelope"></span></a> -->
						</div>
					</div>
				</li>
				<li class="xn-title">Navegacion</li>
				
				<li v-bind:class="$root.routeNameIsActive('page-dashboard')">
					<router-link tag="a" :to="{ name: 'page-dashboard' }" >
						<span class="fa fa-desktop"></span> <span class="xn-text">Dashboard</span>
					</router-link>
				</li>
				
				<!-- // ACCOUNTS -->
				<li class="xn-openable">
					<a href="#">
						<i class="fas fa-user-circle"></i>
						<span class="xn-text"> Cuentas</span>
					</a>
					<ul>
						<li><a @click="router.push({ name: 'page-accounts-add' })"><span class="fas fa-user-plus"></span> Añadir Cuenta</a></li>
						<li><a @click="router.push({ name: 'page-accounts-list' })"><span class="fas fa-list"></span> Listar todas</a></li>
					</ul>
				</li>
				<!-- // END ACCOUNTS -->
				
				<!-- // CONTACTS -->
				<li class="xn-openable">
					<a href="#"><span class="far fa-address-book"></span> <span class="xn-text"> Contactos</span></a>
					<ul>
						<li><a @click="router.push({ name: 'page-contacts-add' })"><span class="fas fa-user-plus"></span> Añadir Contacto</a></li>
						<li><a @click="router.push({ name: 'page-contacts-list' })"><span class="fas fa-list"></span> Listar todos</a></li>
						<li class="xn-openable">
							<a href="#"><span class="fas fa-stream"></span> Mas opciones</a>
							<ul>
								<li><a @click="router.push({ name: 'page-contacts-list-accounts' })"><span class="fas fa-list"></span> Contactos X Cuentas</a></li>
							</ul>
						</li>
					</ul>
				</li>
				<!-- // END CONTACTS -->
				
				<!-- // ADDRESS -->
				<li class="xn-openable">
					<a href="#"><span class="fas fa-map-marked-alt"></span> <span class="xn-text"> Direcciones</span></a>
					<ul>
						<li><a @click="router.push({ name: 'page-addresses-list' })"><span class="fas fa-list"></span> Listar</a></li>
						<!-- //
						<li class="xn-openable">
							<a href="#"><span class="fas fa-stream"></span> Mas opciones</a>
							<ul>
								<li><a @click="router.push({ name: 'page-contacts-list' })"><span class="fas fa-list"></span> Listar X Cuentas</span></a></li>
							</ul>
						</li>
						-->
					</ul>
				</li>
				<!-- // END ADDRESS -->
				
				<!-- // USERS -->
				<li class="xn-openable">
					<a href="#"><span class="fas fa-users-cog"></span> <span class="xn-text"> Usuarios</span></a>
					<ul>
						<li><a @click="router.push({ name: 'page-users-list' })"><span class="fas fa-list"></span> Listar</a></li>
						<!-- //
						<li class="xn-openable">
							<a href="#"><span class="fas fa-stream"></span> Mas opciones</a>
							<ul>
								<li><a @click="router.push({ name: 'page-contacts-list' })"><span class="fas fa-list"></span> Listar X Cuentas</span></a></li>
							</ul>
						</li>
						-->
					</ul>
				</li>
				<!-- // END USERS -->
				
				<!--
				<li class="xn-openable">
					<a href="#"><span class="fa fa-sitemap"></span> <span class="xn-text">Navigation Levels</span></a>
					<ul>                            
						<li class="xn-openable">
							<a href="#">Second Level</a>
							<ul>
								<li class="xn-openable">
									<a href="#">Third Level</a>
									<ul>
										<li class="xn-openable">
											<a href="#">Fourth Level</a>
											<ul>
												<li><a href="#">Fifth Level</a></li>
											</ul>
										</li>
									</ul>
								</li>
							</ul>
						</li>                            
					</ul>
				</li>
				-->
			</ul>
		</div>
	</div>
</template>