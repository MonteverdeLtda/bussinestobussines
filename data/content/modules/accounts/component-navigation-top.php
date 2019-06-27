<template id="component-navigation-top-pages-accounts">
	<div>
		<div class="panel panel-default tabs">
			<ul class="nav nav-tabs" role="">
				<li :class="isActiveClass('page-accounts-list')"><a :href="'/#/accounts/view/' + $route.params.account_id">Información Básica</a></li>
				<li :class="isActiveClass('page-accounts-contacts-view')"><a :href="'/#/accounts/view/' + $route.params.account_id + '/contacts'">Contactos</a></li>
				<li :class="isActiveClass('page-accounts-addresses-view')"><a :href="'/#/accounts/view/' + $route.params.account_id + '/addresses'">Direcciones</a></li>
				<li :class="isActiveClass('page-accounts-requests-view')"><a :href="'/#/accounts/view/' + $route.params.account_id + '/requests'">Solicitudes</a></li>
				<li :class="isActiveClass('page-accounts-calendar-view')"><a :href="'/#/accounts/view/' + $route.params.account_id + '/calendar'">Calendario</a></li>
			</ul>
		</div>
	</div>
</template>
