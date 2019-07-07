<template id="component-navigation-top-pages-employees">
	<div>
		<div class="panel panel-default tabs">
			<ul class="nav nav-tabs" role="">
				<li :class="isActiveClass('page-employees-single-view')"><a :href="'/#/employees/view/' + $route.params.employee_id">Información Básica</a></li>
				<li :class="isActiveClass('page-employees-single-family-list')"><a :href="'/#/employees/view/' + $route.params.employee_id + '/family'">Grupo Familiar</a></li>
				<li :class="isActiveClass('page-employees-single-contacts-list')"><a :href="'/#/employees/view/' + $route.params.employee_id + '/contacts'">Contactos</a></li>
				<li :class="isActiveClass('page-employees-single-view-calendar')"><a :href="'/#/employees/view/' + $route.params.employee_id + '/calendar'">Calendario</a></li>
				<li :class="isActiveClass('page-events-staff-lists')"><a :href="'/#/employees/view/' + $route.params.employee_id + '/events/staff/list'">Grupos de Eventos</a></li>
			</ul>
		</div>
	</div>
</template>
