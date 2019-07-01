var router = new VueRouter({
	routes: [
		{ path: '/', component: PagesDashboard, name: 'page-dashboard' },
		{ path: '/login', component: PagesLogin, name: 'page-login' },
		
		/* EMPLOYEES */
		{ path: '/employees/list', component: PagesEmployeesList, name: 'page-employees-list' },
		{ path: '/employees/add', component: PagesEmployeesAdd, name: 'page-employees-add' },
		{ path: '/employees/edit/:employee_id', component: PagesEmployeesSingleEdit, name: 'page-employees-single-edit' },
		{ path: '/employees/view/:employee_id', component: PagesEmployeesSingleView, name: 'page-employees-single-view' },
		{ path: '/employees/view/:employee_id/calendar', component: PagesEmployeesCalendarView, name: 'page-employees-single-view-calendar' },
		{ path: '/employees/view/:employee_id/family', component: PagesEmployeesSingleFamilyList, name: 'page-employees-single-family-list' },
		{ path: '/employees/view/:employee_id/family/add', component: PagesEmployeesSingleFamilyAdd, name: 'page-employees-family-add' },
		{ path: '/employees/view/:employee_id/contacts', component: PagesEmployeesSingleContactsList, name: 'page-employees-single-contacts-list' },
		{ path: '/employees/view/:employee_id/contacts/add', component: PagesEmployeesSingleContactsAdd, name: 'page-employees-contacts-add' },
		/* END EMPLOYEES */
		
		/* ACCOUNTS */
		{ path: '/accounts/list', component: PagesAccountsList, name: 'page-accounts-list' },
		{ path: '/accounts/add', component: PagesAccountsAdd, name: 'page-accounts-add' },
		{ path: '/accounts/view/:account_id', component: PagesAccountsView, name: 'page-accounts-view' },
		{ path: '/accounts/edit/:account_id', component: PagesAccountsEdit, name: 'page-accounts-edit' },
		
			/* CONTACTS IN ACCOUNTS */
			{ path: '/accounts/view/:account_id/contacts', component: PagesAccountsContactsView, name: 'page-accounts-contacts-view' },
			{ path: '/accounts/view/:account_id/contacts/:contact_id', component: PagesAccountsContactsSingleView, name: 'page-accounts-contacts-single-view' },
			/* END CONTACTS IN ACCOUNTS */
			
			/* ADDRESSES IN ACCOUNTS */
			{ path: '/accounts/view/:account_id/addresses', component: PagesAccountsAddressesView, name: 'page-accounts-addresses-view' },
			{ path: '/accounts/view/:account_id/addresses/view/:address_id', component: PagesAccountsAddressesSingleView, name: 'page-accounts-addresses-single-view' },
			{ path: '/accounts/view/:account_id/addresses/add', component: PagesAccountsAddressesAdd, name: 'page-accounts-addresses-single-add' },
			/* END ADDRESSES IN ACCOUNTS */
			
			/* REQUESTS IN ACCOUNTS */
			{ path: '/accounts/view/:account_id/requests', component: PagesAccountsRequestsView, name: 'page-accounts-requests-view' },
			{ path: '/accounts/view/:account_id/requests/add', component: PagesAccountsRequestsAdd, name: 'page-accounts-requests-add' },
			{ path: '/accounts/view/:account_id/requests/view/:request_id', component: PagesAccountsRequestsSingleView, name: 'page-accounts-requests-single-view' },
			{ path: '/accounts/view/:account_id/requests/view/:request_id/calendar', component: PagesAccountsRequestsSingleCalendarView, name: 'page-accounts-requests-single-calendar-view' },
			{ path: '/accounts/view/:account_id/requests/view/:request_id/calendar/add', component: PagesAccountsRequestsSingleCalendarAdd, name: 'page-accounts-requests-single-calendar-add' },
			/* END REQUESTS IN ACCOUNTS */
			
			/* CALENDAR IN ACCOUNTS */
			{ path: '/accounts/view/:account_id/calendar', component: PagesAccountsCalendarView, name: 'page-accounts-calendar-view' },
			/* END CALENDAR IN ACCOUNTS */
			
			/* QUOTATIONS IN ACCOUNTS */
			{ path: '/accounts/view/:account_id/requests/:request_id/quotations/add', component: PagesAccountsRequestsQuotationsAdd, name: 'page-accounts-requests-quotations-add' },
			{ path: '/accounts/view/:account_id/requests/:request_id/quotations/:quotation_id/view', component: PagesAccountsRequestsQuotationsSingleView, name: 'page-accounts-requests-quotations-single-view' },
			/* END QUOTATIONS IN ACCOUNTS */
		/* END ACCOUNTS */
		
		/* CONTACTS */
		{ path: '/contacts/list', component: PagesContactsList, name: 'page-contacts-list' },
		{ path: '/contacts/list/accounts', component: PagesContactsListAccounts, name: 'page-contacts-list-accounts' },
		{ path: '/contacts/list/accounts/:account_id/add', component: PagesContactsListAccountsAddContactToAccount, name: 'page-contacts-list-accounts-add-to-account' },
		{ path: '/contacts/add', component: PagesContactsAdd, name: 'page-contacts-add' },
		{ path: '/contacts/view/:contact_id', component: PagesContactsView, name: 'page-contacts-view' },
		{ path: '/contacts/edit/:contact_id', component: PagesContactsEdit, name: 'page-contacts-edit' },
		/* END CONTACTS */
		
		/* PROFILES */
		{ path: '/profiles/:user_id', component: PagesProfilesB2BViewById, name: 'page-profiles-b2b-for-id-view' },
		/* END PROFILES */
		
		/* USERS */
		{ path: '/users/list', component: PagesUsersList, name: 'page-users-list' },
		{ path: '/users/view/:user_id', component: PagesUsersView, name: 'page-users-view' },
		{ path: '/users/edit/:user_id', component: PagesUsersEdit, name: 'page-users-edit' },
		{ path: '/users/add', component: PagesUsersAdd, name: 'page-users-add' },
		/* END USERS */
		
		/* ADDRESSES */
		{ path: '/addresses/list', component: PagesAddressesList, name: 'page-addresses-list' },
		{ path: '/addresses/view/:address_id', component: PagesAddressesView, name: 'page-addresses-view' },
		{ path: '/addresses/add', component: PagesAddressesAdd, name: 'page-addresses-add' },
		{ path: '/addresses/edit/:address_id', component: PagesAddressesEdit, name: 'page-addresses-edit' },
		/* END ADDRESSES */
		
		/* MEDIA */
		{ path: '/media/gallery/pictures', component: PagesMediaGalleryPictures, name: 'page-gallery-pictures' },
		/* END MEDIA */
		
		/* EVENTS */
		{ path: '/events/list', component: PagesEventsList, name: 'page-events-list' },
		/* END EVENTS */
		
		/* DEPARTMENTS */
		{ path: '/departments/list', component: PagesDepartmentsList, name: 'page-departments-list' },
		{ path: '/departments/add', component: PagesDepartmentsAdd, name: 'page-departments-add' },
		{ path: '/departments/edit/:department_id', component: PagesDepartmentsEdit, name: 'page-departments-edit' },
		{ path: '/departments/edit/:department_id/managers/edit/:manager_id', component: PagesDepartmentsManagersEdit, name: 'page-departments-managers-edit' },
		{ path: '/departments/edit/:department_id/managers/add', component: PagesDepartmentsManagersAdd, name: 'page-departments-managers-add' },
		/* END DEPARTMENTS */
		
		/* SYSTEM */
		{ path: '/system/types/identifications', component: PagesSystemTypesIdentifications, name: 'page-system-types-identifications' },		
		{ path: '/system/types/genders', component: PagesSystemTypesGenders, name: 'page-system-types-genders' },
		{ path: '/system/types/eps', component: PagesSystemTypesEPS, name: 'page-system-types-eps' },
		{ path: '/system/types/contacts', component: PagesSystemTypesContacts, name: 'page-system-types-contacts' },
		{ path: '/system/types/bloods/rhs', component: PagesSystemTypesBloodsRHs, name: 'page-system-types-bloods-rhs' },
		{ path: '/system/types/bloods', component: PagesSystemTypesBloods, name: 'page-system-types-bloods' },
		{ path: '/system/types/banks', component: PagesSystemTypesBanks, name: 'page-system-types-banks' },
		{ path: '/system/types/letters-addresses', component: PagesSystemTypesLettersAddresses, name: 'page-system-types-letters-addresses' },
		{ path: '/system/types/charges', component: PagesSystemTypesCharges, name: 'page-system-types-charges' },
		/* END SYSTEM */
	]
});