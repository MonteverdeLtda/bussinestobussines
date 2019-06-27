
var PagesAccountsRequestsSingleCalendarAdd = Vue.extend({
	template: '#page-accounts-requests-single-calendar-add',
	data: function() {
		return {
			options: {
				events: {
					actives: [],
					pending: [],
				},
				types_events: [],
				types_events_options: [],
			},
			post: {
				enable: false,
				request: this.$route.params.request_id,
				account: this.$route.params.account_id,
				employee: 0,
				start_d: '',
				start_h: '',
				end_d: '',
				end_h: '',
				type: null,
			},
			posts: [],
			calendar: {
				data: [],
				element: null,
			},
			gcGantt: null,
			jvalidate: null,
		};
	},
	created: function () {
		var self = this;
		self.$root._mpb("show", { value: [0, 0], speed: 1 });		
	},
	mounted: function () {
		var self = this;
		self.load_options_selects();
	},
	methods: {
		prepare_external_list(){
			var self = this;
			$('#external-events .external-event').each(function() {
				dataId = $(this).data('calendar');
				
				var eventObject = {
					id: dataId,
					title: 'Visita para solicitud: ' + $.trim($(this).text())
				};
				$(this).data('eventObject', eventObject);
				$(this).draggable({
						zIndex: 999,
						revert: true,
						revertDuration: 0
				});
			});
		},
		load_scripts(){
			var self = this;
			if($(".datepicker").length > 0){
				$(".datepicker").datepicker({format: 'yyyy-mm-dd'});
				// $(".datepicker").mask('9999-99-99');
			}
			
			// 24 hours mode timepicker
			if($(".timepicker24").length > 0){
				$(".timepicker24").timepicker({minuteStep: 5,showSeconds: true,showMeridian: false});
				// $(".timepicker24").mask('99:99:99');
			}
			
			if($("#calendar").length > 0){
                var date = new Date();
                var d = date.getDate();
                var m = date.getMonth();
                var y = date.getFullYear();

                self.prepare_external_list();

                self.calendar.element = $('#calendar').fullCalendar({
                    header: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'month,agendaWeek,agendaDay'
                    },
                    editable: true,
					events: self.options.events.actives,
                    droppable: true,
                    selectable: false,
                    selectHelper: true,
                    drop: function(date, allDay) {
						var originalEventObject = $(this).data('eventObject');
						var copiedEventObject = $.extend({}, originalEventObject);
						var element = $(this);
						var calendarId = (copiedEventObject.id);
						var dateStart = new Date(date);
						var dateStartTimestamp = dateStart.setDate(dateStart.getDate() + 1);
						var dateEnd = new Date(dateStart);
						var dateEndTimestamp = dateEnd.setDate(dateEnd.getDate() + 1);
							copiedEventObject.start = dateStart;
							copiedEventObject.allDay = true;
						
						
						bootbox.prompt({
							title: "La visita sera agendada el día [<b>" + dateStart + "</b>], Deseas continuar?",
							message: '<p>Seleccione el tipo de visita que desea agendar:</p>',
							inputType: 'radio',
							inputOptions: self.options.types_events_options,
							callback: function (a) {								
								if(a != null && a > 0){
									FG.api('GET', '/types_events/' + a, {
									}, function(b){
										if(b != undefined && b.id > 0){
											/* CREAR EVENTO */
											Date_Start = dateStart.toISOString().slice(0, 19).replace('T', ' ');
											Date_End = dateEnd.toISOString().slice(0, 19).replace('T', ' ');
											
											var tmepl = {
												title: b.name + ' - Direccion: ' + element.text(),
												all_day: true,
												start: Date_Start,
												end: Date_End,
												type: b.id,
												request: Number(self.$route.params.request_id)
											};
											
											FG.api('POST', '/events', tmepl, function(d){
												console.log(d);
												if(Number(d) > 0){
													FG.api('PUT', '/requests_addresses/' + copiedEventObject.id, {
														id: copiedEventObject.id,
														request: Number(self.$route.params.request_id),
														calendar: d
													}, function(e){
														if(Number(e) > 0){															
															$('#calendar').fullCalendar('renderEvent', copiedEventObject, true);
															// $(this).remove(); // Eliminar de manera automatica despues de soltar.
															// if ($('#drop-remove').is(':checked')) { $(this).remove(); } // Eliminar de manera automatica despues de soltar solo si el Check esta habilitado.
															element.remove();
															
															/* CREAR EVENTO EN CUENTA */
															FG.api('POST', '/accounts_calendar', {
																account: self.$route.params.account_id,
																calendar: d
															}, function(f){
																if(Number(f) > 0){
																	/* CREATE LOG UPDATE REQUEST */
																	FG.api('POST', '/requests_activity', {
																		request: Number(self.$route.params.request_id),
																		comment: 'Se agregó un elemento al calendario',
																		code: JSON.stringify(tmepl),
																	}, function (e) {
																		if(Number(e) > 0)
																		{
																			$.notify("Se agregó un elemento al calendario.", "success");
																		}
																	});
																}
															})
															
															/* END CREAR EVENTO EN CUENTA */
														}
													});
												}
											});
											/* END CREAR EVENTO */
											
											/*
											*/
										}
									});
								}
							}
						});
                    }
                });
                
            }
			
			
		},
		load_options_selects(){
			var self = this;
			FG.api('GET', '/types_events', {}, function(a){
				if(a[0] != undefined && a[0].id > 0){
					self.options.types_events = a;
					
					a.forEach(function(b){
						self.options.types_events_options.push({
							text: b.name,
							value: b.id,
						});
					});
				}
				FG.api('GET', '/requests_addresses', {
					join: [
						'addresses',
					],
					filter: [
						'request,eq,' + self.$route.params.request_id,
						'calendar,is'
					],
				}, function(b){
					if(b[0] != undefined && b[0].id > 0){
						self.options.events.pending = b;
						b.forEach(function(c){
							$("#external-events").append(`
								<a class="list-group-item external-event" data-calendar="` + c.id + `">` + c.address.address_input + `</a>
							`);
						});
						self.prepare_external_list();
					}
					
					
					FG.api('GET', '/accounts_calendar', {
						join: [
							'events'
						],
						filter: [
							'account,eq,' + self.$route.params.account_id
						],
					}, function(d){
						if(d[0] != undefined && d[0].id > 0){
							d.forEach(function(e){
								// options.events.actives.push(e.calendar);
								
								f = e.calendar;
								var d_s = new Date(f.start.replace(/-/g,"/"));
								var d_e = new Date(f.end.replace(/-/g,"/"));
								formatted_date_start =  d_s.getFullYear() + "-" + (d_s.getMonth() + 1) + "-" + d_s.getDate();
								formatted_date_end =  d_e.getFullYear() + "-" + (d_e.getMonth() + 1) + "-" + d_e.getDate();
								
								
								self.options.events.actives.push({
									id: f.id,
									allDay: Boolean(f.all_day),
									title: f.title,
									start: f.start,
									end: f.end,
									className: 'blue',
									// url: 'https://www.facebook.com/sweetsamshopco/'
								});
							});
						}
						self.find();
					});
				});
			});
		},
		find(){
			var self = this;
			self.load_scripts();
		},
	}
});
