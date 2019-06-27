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
						<img :src="'/api/media/?picture=' + $root.authResponse.userData.avatar" />
					</a>
					<div class="profile">
						<div class="profile-image">
							<img :src="'/api/media/?picture=' + $root.authResponse.userData.avatar"/>
						</div>
						<div class="profile-data">
							<div class="profile-data-name">{{ $root.authResponse.userData.names }}</div>
							<div class="profile-data-title">{{ $root.authResponse.userData.permissions.name }}</div>
						</div>
						<div class="profile-controls">
							<router-link tag="a" :to="{ name: 'page-profiles-b2b-for-id-view', params: { user_id: $root.authResponse.userID } }" class="profile-control-left">
								<span class="fa fa-info"></span>
							</router-link>
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
				
				<!-- // EMPLOYEES -->
				<li class="xn-openable">
					<a href="#">
						<i class="fas fa-user-circle"></i>
						<span class="xn-text"> Empleados</span>
					</a>
					<ul>
						<li><a @click="router.push({ name: 'page-employees-add' })"><span class="fas fa-user-plus"></span> Añadir Empleado</a></li>
						<li><a @click="router.push({ name: 'page-employees-list' })"><span class="fas fa-list"></span> Listar todas</a></li>
					</ul>
				</li>
				<!-- // END EMPLOYEES -->
				
				<!-- // DEPARTMENTS -->
				<li class="xn-openable">
					<a href="#">
						<i class="fas fa-building"></i>
						<span class="xn-text"> Departamentos</span>
					</a>
					<ul>
						<li><a @click="router.push({ name: 'page-departments-add' })"><span class="fas fa-user-plus"></span> Añadir Departamento</a></li>
						<li><a @click="router.push({ name: 'page-departments-list' })"><span class="fas fa-list"></span> Listar todos</a></li>
					</ul>
				</li>
				<!-- // END DEPARTMENTS -->
				
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
				
				<!-- // EVENTS -->
				<li class="xn-openable">
					<a href="#"><span class="far fa-calendar-alt"></span> <span class="xn-text"> Calendario</span></a>
					<ul>
						<li><a @click="router.push({ name: 'page-events-list' })"><span class="fas fa-list"></span> Listar</a></li>
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
				<!-- // END EVENTS -->
				
				<!-- // ADDRESSES -->
				<li class="xn-openable">
					<a href="#"><span class="fas fa-map-marked-alt"></span> <span class="xn-text"> Direcciones</span></a>
					<ul>
						<li><a @click="router.push({ name: 'page-addresses-add' })"><span class="fas fa-marked-alt"></span> Añadir Dirección</a></li>
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
				<!-- // END ADDRESSES -->
				
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
				
				<!-- // MEDIA -->
				<li class="xn-openable">
					<a href="#"><span class="fas fa-users-cog"></span> <span class="xn-text"> Multimedia</span></a>
					<ul>
						<li><a @click="router.push({ name: 'page-gallery-pictures' })"><span class="fas fa-list"></span> Galería de Imagenes</a></li>
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
				<!-- // END MEDIA -->
				
				<!-- // SYSTEM -->
				<li class="xn-openable">
					<a href="#"><span class="fas fa-cogs"></span> <span class="xn-text"> Sistema</span></a>
					<ul>
						
						<li class="xn-openable">
							<a href="#"><span class="fas fa-stream"></span> Empleados</a>
							<ul>
								<li><a @click="router.push({ name: 'page-system-types-eps' })"><span class="fas fa-list"></span> Listado de EPS</a></li>
							</ul>
						</li>
						<li class="xn-openable">
							<a href="#"><span class="fas fa-stream"></span> Personas</a>
							<ul>
								<li><a @click="router.push({ name: 'page-system-types-identifications' })"><span class="fas fa-list"></span> Tipos de Identificacion</a></li>
								<li><a @click="router.push({ name: 'page-system-types-genders' })"><span class="fas fa-list"></span> Tipos de Generos</a></li>
								<li><a @click="router.push({ name: 'page-system-types-contacts' })"><span class="fas fa-list"></span> Tipo de Contactos</a></li>
								<li><a @click="router.push({ name: 'page-system-types-bloods-rhs' })"><span class="fas fa-list"></span> Tipos de RH</a></li>
								<li><a @click="router.push({ name: 'page-system-types-bloods' })"><span class="fas fa-list"></span> Tipos de Sangre</a></li>
							</ul>
						</li>
						<li class="xn-openable">
							<a href="#"><span class="fas fa-stream"></span> Bancos</a>
							<ul>
								<li><a @click="router.push({ name: 'page-system-types-banks' })"><span class="fas fa-list"></span> Tipos de Cuentas de Bancos</a></li>
							</ul>
						</li>
						<li class="xn-openable">
							<a href="#"><span class="fas fa-stream"></span> Direcciones</a>
							<ul>
								<li><a @click="router.push({ name: 'page-system-types-letters-addresses' })"><span class="fas fa-list"></span> Letras</a></li>
							</ul>
						</li>
						
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
				<!-- // END SYSTEM -->
				
			</ul>
		</div>
	</div>
</template>