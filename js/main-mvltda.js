$(function () {
	var nua = navigator.userAgent;
	var isAndroid = (nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1 && nua.indexOf('Chrome') === -1);
	if (isAndroid){
		console.log("Esto es un dispositivo android")
	}
});

Vue.use(bootstrapVue);

var Component_Sidebar_Left = Vue.component('component-sidebar-left', {
	template: '#component-sidebar-left',
	props: [
		''
	],
	data: function () {
		return {
			Me: {
				id: this.$root.$data.authResponse.userID,
			},
			busineses: [],
			addresses: [],
			auditors: [],
			contracts: [],
			contacts: [],
			invoices: [],
			quotations: [],
			redicateds: [],
			requests: [],
			users: [],
			users_pending: [],
		};
	},
	mounted: function () {
		var self = this;
		
		
		if(self.$parent.status === 'connected'){
			self.find();
		}else{
			
		}		
	},
	methods: {
		find: function(){
			var self = this;
			/*
			FG.api('GET','/accounts_users', {
				filter: [
					'user,eq,' + self.$root.$data.authResponse.userID,
				],
				join: [
					'accounts,contracts_clients',
					'accounts,accounts_contacts',
					'accounts,accounts_invoices',
					'accounts,quotations',
					'accounts,requests',
					'accounts,services_requests',
					'accounts,accounts_users',
					'accounts,accounts_users_pending',
					'accounts,accounts_addresses',
				]
			}, function(r){
				r.forEach(function(elem){
					if(elem.client.clients_addresses.length > 0){
						elem.client.clients_addresses.forEach(function(address){
							if(self.addresses.indexOf(address.id) < 0){
								self.addresses.push(address.id);
							};
						});
					};
					
					if(self.busineses.indexOf(elem.client.id) < 0){ self.busineses.push(elem.client.id); };
					if(elem.client.contracts_clients.length > 0){ elem.client.contracts_clients.forEach(function(contract){ if(self.contracts.indexOf(contract.id) < 0){ self.contracts.push(contract.id); }; }); };
					if(elem.client.accounts_contacts.length > 0){ elem.client.accounts_contacts.forEach(function(contact){ if(self.contacts.indexOf(contact.id) < 0){ self.contacts.push(contact.id); }; }); };
					if(elem.client.accounts_invoices.length > 0){ elem.client.accounts_invoices.forEach(function(invoice){ if(self.invoices.indexOf(invoice.id) < 0){ self.invoices.push(invoice.id); }; }); };
					if(elem.client.quotations.length > 0){ elem.client.quotations.forEach(function(quotation){ if(self.quotations.indexOf(quotation.id) < 0){ self.quotations.push(quotation.id); }; }); };
					if(elem.client.requests.length > 0){ elem.client.requests.forEach(function(request){ if(self.requests.indexOf(request.id) < 0){ self.requests.push(request.id); }; }); };
					if(elem.client.accounts_users.length > 0){ elem.client.accounts_users.forEach(function(user){ if(self.users.indexOf(user.id) < 0){ self.users.push(user.id); }; }); };
					if(elem.client.accounts_users_pending.length > 0){ elem.client.accounts_users_pending.forEach(function(user_pending){ if(self.users_pending.indexOf(user_pending.id) < 0){ self.users_pending.push(user_pending.id); }; }); };
				});
			});
			*/
		}
	}
});

var Component_Navigation_Top = Vue.component('component-navigation-top', {
	template: '#component-navigation-top',
	data: function() {
		return {
			requests: [],
			tasks: [],
			events: [],
		};
	},
	mounted: function () {
		var self = this;
		self.find();
	},
	methods: {
		linkRequests(request_id, account_id){
			var self = this;
			if(request_id != undefined && account_id != undefined){
				if(self.$route.name == 'page-accounts-requests-single-view'){
					router.push({ name: 'page-accounts-requests-single-view', params: { request_id: request_id, account_id: account_id } });
					window.location.reload();
				}else{
					router.push({ name: 'page-accounts-requests-single-view', params: { request_id: request_id, account_id: account_id } });
				}				
			}
		},
		find(){
			var self = this;
			
					FG.api('GET','/requests', {
						filter: [
							'status,in,1,2,3,4,5,8',
						],
						join: [
							'accounts',
							'status_requests',
						]
					}, function(a){
						if(a[0] != undefined && a[0].id > 0){
							a.forEach(function(b){
								self.requests.push(b);
							});
						}
					});
				
				FG.api('GET','/events', {
					filter: [
						'status,eq,1',
					],
					join: [
						'requests',
						'types_events',
						'status_events',
					]
				}, function(e){
					if(e[0] != undefined && e[0].id > 0){
						e.forEach(function(f){
							self.events.push(f);
						});
					}
				});
				
		}
	}
});

/* SETTINGS */
	<?php echo $this->include_template("/settings/site.js"); ?>
/* END SETTINGS */

/* LOGIN */
var PagesLogin = Vue.extend({
	template: '#pages-login',
	data: function() {
		return {
		};
	},
	created: function() {
		var self = this;
		
	},
	mounted: function () {
		var self = this;
		 //self.$parent.LogInPop();
		 
		// localStorage.clear();
		/*
		FG.callback("POST", FG.url_api(), {
			'logout': true
		}, function(response){
		});*/
		
		 if(self.$root.status === 'connected'){
			/*router.push({
				name: 'page-dashboard'
			});*/
			
		}
	},
	computed: {
	}
});
/* END LOGIN */

/* DASHBOARD */
	<?php echo $this->include_template("/dashboard/index.js"); ?>
/* END DASHBOARD */

/* ACCOUNTS */
	<?php echo $this->include_template("/accounts/component-navigation-top.js"); ?>
	<?php echo $this->include_template("/accounts/lists.js"); ?>
	<?php echo $this->include_template("/accounts/create.js"); ?>
	<?php echo $this->include_template("/accounts/single-addresses-add.js"); ?>
	<?php echo $this->include_template("/accounts/single-addresses-lists.js"); ?>
	<?php echo $this->include_template("/accounts/single-addresses-single.js"); ?>
	<?php echo $this->include_template("/accounts/single-calendar-lists.js"); ?>
	<?php echo $this->include_template("/accounts/single-contacts-lists.js"); ?>
	<?php echo $this->include_template("/accounts/single-contacts-single.js"); ?>
	<?php echo $this->include_template("/accounts/single-edit.js"); ?>
	<?php echo $this->include_template("/accounts/single-requests-add.js"); ?>
	<?php echo $this->include_template("/accounts/single-requests-lists.js"); ?>
	<?php echo $this->include_template("/accounts/single-requests-single-calendar-add.js"); ?>
	<?php echo $this->include_template("/accounts/single-requests-single-calendar-single.js"); ?>
	<?php echo $this->include_template("/accounts/single-requests-single-quotations-add.js"); ?>
	<?php echo $this->include_template("/accounts/single-requests-single-quotations-single.js"); ?>
	<?php echo $this->include_template("/accounts/single-requests-single.js"); ?>
	<?php echo $this->include_template("/accounts/single.js"); ?>
/* END ACCOUNTS */

/* CONTACTS */
	<?php echo $this->include_template("/contacts/create-to-account.js"); ?>
	<?php echo $this->include_template("/contacts/create.js"); ?>
	<?php echo $this->include_template("/contacts/list-accounts.js"); ?>
	<?php echo $this->include_template("/contacts/lists.js"); ?>
	<?php echo $this->include_template("/contacts/single-edit.js"); ?>
	<?php echo $this->include_template("/contacts/single.js"); ?>
/* END CONTACTS */

/* USERS */
	<?php echo $this->include_template("/users/create.js"); ?>
	<?php echo $this->include_template("/users/lists.js"); ?>
	<?php echo $this->include_template("/users/single-edit.js"); ?>
	<?php echo $this->include_template("/users/single.js"); ?>
/* END USERS */

/* PROFILES */
	<?php echo $this->include_template("/profiles/single-b2b.js"); ?>
/* END PROFILES */

/* ADDRESSES */
	<?php echo $this->include_template("/addresses/lists.js"); ?>
	<?php echo $this->include_template("/addresses/single.js"); ?>
	<?php echo $this->include_template("/addresses/create.js"); ?>
	<?php echo $this->include_template("/addresses/single-edit.js"); ?>
/* END ADDRESSES */

/* MEDIA */
	<?php echo $this->include_template("/media/gallery.js"); ?>
/* END MEDIA */

/* EMPLOYEES */
	<?php echo $this->include_template("/employees/component-navigation-top.js"); ?>
	<?php echo $this->include_template("/employees/create.js"); ?>
	<?php echo $this->include_template("/employees/lists.js"); ?>
	<?php echo $this->include_template("/employees/single-calendar.js"); ?>
	<?php echo $this->include_template("/employees/single-contacts-add.js"); ?>
	<?php echo $this->include_template("/employees/single-contacts-list.js"); ?>
	<?php echo $this->include_template("/employees/single-edit.js"); ?>
	<?php echo $this->include_template("/employees/single-family-add.js"); ?>
	<?php echo $this->include_template("/employees/single-family-list.js"); ?>
	<?php echo $this->include_template("/employees/single.js"); ?>
	<?php echo $this->include_template("/employees/single-events-staff-lists.js"); ?>
/* END EMPLOYEES */

/* EVENTS */
	<?php echo $this->include_template("/events/lists.js"); ?>
/* END EVENTS */

/* DEPARTMENTS */
	<?php echo $this->include_template("/departments/lists.js"); ?>
	<?php echo $this->include_template("/departments/create.js"); ?>
	<?php echo $this->include_template("/departments/single-edit.js"); ?>
	<?php echo $this->include_template("/departments/single-managers-edit.js"); ?>
	<?php echo $this->include_template("/departments/single-managers-create.js"); ?>
/* END DEPARTMENTS */

/* SYSTEM */
	<?php echo $this->include_template("/system/types-identifications.js"); ?>
	<?php echo $this->include_template("/system/types-genders.js"); ?>
	<?php echo $this->include_template("/system/types-eps.js"); ?>
	<?php echo $this->include_template("/system/types-contacts.js"); ?>
	<?php echo $this->include_template("/system/types-bloods-rhs.js"); ?>
	<?php echo $this->include_template("/system/types-bloods.js"); ?>
	<?php echo $this->include_template("/system/types-banks.js"); ?>
	<?php echo $this->include_template("/system/types-letters-addresses.js"); ?>
	<?php echo $this->include_template("/system/types-charges.js"); ?>
/* END SYSTEM */

<?php echo $this->include_template("/website/routers.js"); ?>
<?php echo $this->include_template("/website/app.js"); ?>
<?php echo $this->include_template("/website/run.js"); ?>
<?php echo $this->include_template("/website/myplugin.js"); ?>