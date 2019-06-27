
var PagesAccountsCalendarView = Vue.extend({
	template: '#page-accounts-calendar-view',
	data: function() {
		return {
			calendar: null,
			seletedEvent: {
				id: 0,
				title: "",
				all_day: false,
				start: "",
				end: "",
				type: {
					id: 0,
					name: "",
					colorClass: ""
				}
			},
			posts: [],
		};
	},
	created: function () {
		var self = this;
		self.$root._mpb("show",{value: [0,0],speed: 0});
	},
	mounted: function () {
		var self = this;
		self.find();
	},
	methods: {
		prepare_external_list(){
			var self = this;
			$('#external-events .external-event').each(function() {
				var eventObject = {title: $.trim($(this).text())};

				$(this).data('eventObject', eventObject);
				$(this).draggable({
						zIndex: 999,
						revert: true,
						revertDuration: 0
				});
			});                    
			
		},
		load_calendar(){
			var self = this;
			if($("#calendar").length > 0){
                var date = new Date();
                var d = date.getDate();
                var m = date.getMonth();
                var y = date.getFullYear();

                self.prepare_external_list();

                self.calendar = $('#calendar').fullCalendar({
					eventClick: function(event, element) {
						if(event.id != undefined && event.id > 0){
							FG.api('GET', '/events/' + event.id, {
								join: [ 'types_events', ]
							}, function(a){
								if(a != undefined && a.id > 0){
									self.seletedEvent = a;
								}
							});
						}
						// self.calendar.fullCalendar('updateEvent', event);
					},
                    header: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'month,agendaWeek,agendaDay'
                    },
                    editable: false,
					//events: ,
                    // eventSources: {
					// 	url: "/assets/ajax_fullcalendar.php"
					// },
					// eventSources: self.posts,
					events: self.posts,
                    droppable: true,
                    selectable: false,
                    selectHelper: true,
					select: function(start, end, allDay) {
                        var title = prompt('Event Title:');
                        if (title) {
                            self.calendar.fullCalendar('renderEvent',
                            {
                                title: title,
                                start: start,
                                end: end,
                                allDay: allDay
                            },
                            true
                            );
                        }
                        self.calendar.fullCalendar('unselect');
                    },
                    drop: function(date, allDay) {
                        var originalEventObject = $(this).data('eventObject');
                        var copiedEventObject = $.extend({}, originalEventObject);
                        copiedEventObject.start = date;
                        copiedEventObject.allDay = allDay;
                        self.calendar.fullCalendar('renderEvent', copiedEventObject, true);
                        if ($('#drop-remove').is(':checked')) {
                            $(this).remove();
                        }

                    }
                });
                
                $("#new-event").on("click",function(){
                    var et = $("#new-event-text").val();
                    if(et != ''){
                        $("#external-events").prepend('<a class="list-group-item external-event">'+et+'</a>');
                        self.prepare_external_list();
                    }
                });
                
            }
		},
		find: function(){
			var self = this;
			self.posts = [];
			
			FG.api('GET', '/accounts_calendar', {
				join: [
					'events',
					'events,types_events'
				]
			}, function(r){
				console.log(r);
				if(r[0] != undefined && r[0].id > 0){
					r.forEach(function(x){
						c = x.calendar;
						console.log(c);
						var d_s = new Date(c.start.replace(/-/g,"/"));
						var d_e = new Date(c.end.replace(/-/g,"/"));
						
						formatted_date_start =  d_s.getFullYear() + "-" + (d_s.getMonth() + 1) + "-" + d_s.getDate();
						formatted_date_end =  d_e.getFullYear() + "-" + (d_e.getMonth() + 1) + "-" + d_e.getDate();
						
						self.posts.push({
							id: c.id,
							allDay: Boolean(c.all_day),
							title: c.title,
							start: c.start,
							end: c.end,
							className: 'blue',
							// url: 'https://www.facebook.com/sweetsamshopco/'
						});
					});
					self.$root._mpb("show",{value: [0,100],speed: 0});
					self.load_calendar();
				}
			});
		},
	}
});
