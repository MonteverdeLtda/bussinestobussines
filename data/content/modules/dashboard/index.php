<template id="pages-dashboard">
   <div>
      <div class="page-content-wrap">
         <!-- START WIDGETS -->                    
         <div class="row">
		 
			<div id="dialogWellcome" title="Basic dialog">
			  <p>This is the default dialog which is useful for displaying information. The dialog window can be moved, resized and closed with the 'x' icon.</p>
			</div>
			 
            <!-- START WIDGET SLIDER 
            <div class="col-md-3">
               <div class="widget widget-default widget-carousel">
                  <div class="owl-carousel" id="owl-example">
                     <div>
                        <div class="widget-title">Total Visitors</div>
                        <div class="widget-subtitle">27/08/2014 15:23</div>
                        <div class="widget-int">3,548</div>
                     </div>
                     <div>
                        <div class="widget-title">Returned</div>
                        <div class="widget-subtitle">Visitors</div>
                        <div class="widget-int">1,695</div>
                     </div>
                     <div>
                        <div class="widget-title">New</div>
                        <div class="widget-subtitle">Visitors</div>
                        <div class="widget-int">1,977</div>
                     </div>
                  </div>
                  <div class="widget-controls">                                
                     <a style="cursor:pointer;" class="widget-control-right widget-remove" data-toggle="tooltip" data-placement="top" title="Remove Widget"><span class="fa fa-times"></span></a>
                  </div>
               </div>
            </div>
			-->
			<!-- START WIDGET MESSAGES -->
            <div class="col-md-3">
               <div class="widget widget-default widget-item-icon" onclick="location.href='pages-messages.html';">
                  <div class="widget-item-left">
                     <span class="fa fa-envelope"></span>
                  </div>
                  <div class="widget-data">
                     <div class="widget-int num-count">{{ requests }}</div>
                     <div class="widget-title">Solicitudes</div>
                     <div class="widget-subtitle">Solicitudes Totales</div>
                  </div>
                  <div class="widget-controls">                                
                     <a style="cursor:pointer;" class="widget-control-right widget-remove" data-toggle="tooltip" data-placement="top" title="Remove Widget"><span class="fa fa-times"></span></a>
                  </div>
               </div>
            </div>
			<!-- END WIDGET MESSAGES -->
			
			<!-- START WIDGET REGISTRED -->
            <div class="col-md-3">
               <div class="widget widget-default widget-item-icon" onclick="location.href='pages-address-book.html';">
                  <div class="widget-item-left">
                     <span class="fa fa-user"></span>
                  </div>
                  <div class="widget-data">
                     <div class="widget-int num-count">{{ users }}</div>
                     <div class="widget-title">Usuarios MVLTDA</div>
                     <div class="widget-subtitle">Total de usuarios B2B</div>
                  </div>
                  <div class="widget-controls">                                
                     <a style="cursor:pointer;" class="widget-control-right widget-remove" data-toggle="tooltip" data-placement="top" title="Remove Widget"><span class="fa fa-times"></span></a>
                  </div>
               </div>
            </div>
			<!-- END WIDGET REGISTRED -->
			
			<!-- START WIDGET REGISTRED -->
            <div class="col-md-3">
               <div class="widget widget-default widget-item-icon" onclick="location.href='pages-address-book.html';">
                  <div class="widget-item-left">
                     <span class="fa fa-user"></span>
                  </div>
                  <div class="widget-data">
                     <div class="widget-int num-count">{{ accounts_users }}</div>
                     <div class="widget-title">Usuarios Clientes</div>
                     <div class="widget-subtitle">Total de usuarios B2B</div>
                  </div>
                  <div class="widget-controls">                                
                     <a style="cursor:pointer;" class="widget-control-right widget-remove" data-toggle="tooltip" data-placement="top" title="Remove Widget"><span class="fa fa-times"></span></a>
                  </div>
               </div>
            </div>
			<!-- END WIDGET REGISTRED -->
            
			<!-- START WIDGET CLOCK -->
            <div class="col-md-3">
               <div class="widget widget-info widget-padding-sm">
                  <div class="widget-big-int plugin-clock">
				  {{ $root.plugins.clock.hours }}:{{ $root.plugins.clock.minutes }}
				  </div>
                  <div class="widget-subtitle plugin-date">
					{{ $root.plugins.date.day }} 
					{{ $root.plugins.date.month }} 
					{{ $root.plugins.date.date }} 
					{{ $root.plugins.date.year }}
				  </div>
                  <div class="widget-controls">                                
                     <a style="cursor:pointer;" class="widget-control-right widget-remove" data-toggle="tooltip" data-placement="left" title="Remove Widget"><span class="fa fa-times"></span></a>
                  </div>
                  <div class="widget-buttons widget-c3">
                     <div class="col">
                        <a style="cursor:pointer;"><span class="fa fa-clock-o"></span></a>
                     </div>
                     <div class="col">
                        <a style="cursor:pointer;"><span class="fa fa-bell"></span></a>
                     </div>
                     <div class="col">
                        <a style="cursor:pointer;"><span class="fa fa-calendar"></span></a>
                     </div>
                  </div>
               </div>
            </div>
			<!-- END WIDGET CLOCK -->
         </div>
         <!-- END WIDGETS -->                    
         <div class="row">
            <div class="col-md-4">
               <!-- START USERS ACTIVITY BLOCK -->
               <div class="panel panel-default">
                  <div class="panel-heading">
                     <div class="panel-title-box">
                        <h3>Users Activity</h3>
                        <span>Users vs returning</span>
                     </div>
                     <ul class="panel-controls" style="margin-top: 2px;">
                        <li><a style="cursor:pointer;" class="panel-fullscreen"><span class="fa fa-expand"></span></a></li>
                        <li><a style="cursor:pointer;" class="panel-refresh"><span class="fa fa-refresh"></span></a></li>
                        <li class="dropdown">
                           <a style="cursor:pointer;" class="dropdown-toggle" data-toggle="dropdown"><span class="fa fa-cog"></span></a>                                        
                           <ul class="dropdown-menu">
                              <li><a style="cursor:pointer;" class="panel-collapse"><span class="fa fa-angle-down"></span> Collapse</a></li>
                              <li><a style="cursor:pointer;" class="panel-remove"><span class="fa fa-times"></span> Remove</a></li>
                           </ul>
                        </li>
                     </ul>
                  </div>
                  <div class="panel-body padding-0">
                     <div class="chart-holder" id="dashboard-bar-1" style="height: 200px;"></div>
                  </div>
               </div>
               <!-- END USERS ACTIVITY BLOCK -->
            </div>
            <div class="col-md-4">
               <!-- START VISITORS BLOCK -->
               <div class="panel panel-default">
                  <div class="panel-heading">
                     <div class="panel-title-box">
                        <h3>Eventos</h3>
                        <span>Todas las Visitas</span>
                     </div>
                     <ul class="panel-controls" style="margin-top: 2px;">
                        <li><a style="cursor:pointer;" class="panel-fullscreen"><span class="fa fa-expand"></span></a></li>
                        <li><a @click="loadEvents()" style="cursor:pointer;" class="panel-refresh"><span class="fa fa-refresh"></span></a></li>
                        <li class="dropdown">
                           <a style="cursor:pointer;" class="dropdown-toggle" data-toggle="dropdown"><span class="fa fa-cog"></span></a>                                        
                           <ul class="dropdown-menu">
                              <li><a style="cursor:pointer;" class="panel-collapse"><span class="fa fa-angle-down"></span> Collapse</a></li>
                              <li><a style="cursor:pointer;" class="panel-remove"><span class="fa fa-times"></span> Remove</a></li>
                           </ul>
                        </li>
                     </ul>
                  </div>
                  <div class="panel-body padding-0">
                     <div class="chart-holder" id="dashboard-donut-1" style="height: 200px;"></div>
                  </div>
				  
				  {{ charts.donut }}
               </div>
               <!-- END VISITORS BLOCK -->
            </div>
            <div class="col-md-4">
               <!-- START PROJECTS BLOCK -->
               <div class="panel panel-default">
                  <div class="panel-heading">
                     <div class="panel-title-box">
                        <h3>Solicitudes</h3>
                        <span>Nuevas Solicitudes</span>
                     </div>
                     <ul class="panel-controls" style="margin-top: 2px;">
                        <li><a style="cursor:pointer;" class="panel-fullscreen"><span class="fa fa-expand"></span></a></li>
                        <li><a @click="loadRequestsPending()" class="panel-refresh"><span class="fa fa-refresh"></span></a></li>
                        <li class="dropdown">
                           <a style="cursor:pointer;" class="dropdown-toggle" data-toggle="dropdown"><span class="fa fa-cog"></span></a>                                        
                           <ul class="dropdown-menu">
                              <li><a style="cursor:pointer;" class="panel-collapse"><span class="fa fa-angle-down"></span> Collapse</a></li>
                              <li><a style="cursor:pointer;" class="panel-remove"><span class="fa fa-times"></span> Remove</a></li>
                           </ul>
                        </li>
                     </ul>
                  </div>
                  <div class="panel-body panel-body-table">
                     <div class="table-responsive">
                        <table class="table table-bordered table-striped">
                           <thead>
                              <tr>
                                 <th width="50%">Cuenta</th>
                                 <th width="20%">Estado</th>
                                 <th width="30%">Actividad</th>
                              </tr>
                           </thead>
                           <tbody>
                              <tr v-for="request in list.requests"> <!-- // @click="linkRequests(request.id, request.account.id)" style="cursor:pointer;" -->
                                 <td><strong>{{ request.account.names }}</strong></td>
                                 <td><span class="label label-danger">{{ request.status.name }}</span></td>
                                 <td>
                                    <div class="progress progress-small progress-striped active">
                                       <!-- // <div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="width: 85%;">85%</div> -->
									   
										<div v-if="request.status.id == 1" class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100" style="width: 15%;">15%</div>
										<div v-if="request.status.id == 2" class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100" style="width: 30%;">30%</div>
										<div v-if="request.status.id == 3" class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: 45%;">45%</div>
										<div v-if="request.status.id == 4" class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">60%</div>
										<div v-if="request.status.id == 5" class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style="width: 80%;">80%</div>
										<div v-if="request.status.id == 8" class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100" style="width: 15%;">15%</div>
                                    </div>
                                 </td>
                              </tr>
							  
							  <!-- //
                              <tr>
                                 <td><strong>Virgo</strong></td>
                                 <td><span class="label label-success">Support</span></td>
                                 <td>
                                    <div class="progress progress-small progress-striped active">
                                       <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">100%</div>
                                    </div>
                                 </td>
                              </tr>
							  -->
                           </tbody>
                        </table>
                     </div>
                  </div>
               </div>
               <!-- END PROJECTS BLOCK -->
            </div>
         </div>
         <div class="row">
            <div class="col-md-8">
               <!-- START SALES BLOCK -->
               <div class="panel panel-default">
                  <div class="panel-heading">
                     <div class="panel-title-box">
                        <h3>Direcciones</h3>
                        <span>Direcciones en el sistema</span>
                     </div>
                     <ul class="panel-controls panel-controls-title">
                        <li>
                           <div id="reportrange" class="dtrange">                                            
                              <span></span><b class="caret"></b>
                           </div>
                        </li>
                        <li><a style="cursor:pointer;" class="panel-fullscreen rounded"><span class="fa fa-expand"></span></a></li>
                     </ul>
                  </div>
                  <div class="panel-body">
                     <div class="row stacked">
                        <div class="col-md-4">
                           <div class="progress-list">
                              <div class="pull-left"><strong>In Queue</strong></div>
                              <div class="pull-right">75%</div>
                              <div class="progress progress-small progress-striped active">
                                 <div class="progress-bar progress-bar-primary" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="width: 75%;">75%</div>
                              </div>
                           </div>
                           <div class="progress-list">
                              <div class="pull-left"><strong>Shipped Products</strong></div>
                              <div class="pull-right">450/500</div>
                              <div class="progress progress-small progress-striped active">
                                 <div class="progress-bar progress-bar-primary" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="width: 90%;">90%</div>
                              </div>
                           </div>
                           <div class="progress-list">
                              <div class="pull-left"><strong class="text-danger">Returned Products</strong></div>
                              <div class="pull-right">25/500</div>
                              <div class="progress progress-small progress-striped active">
                                 <div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="width: 5%;">5%</div>
                              </div>
                           </div>
                           <div class="progress-list">
                              <div class="pull-left"><strong class="text-warning">Progress Today</strong></div>
                              <div class="pull-right">75/150</div>
                              <div class="progress progress-small progress-striped active">
                                 <div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="width: 50%;">50%</div>
                              </div>
                           </div>
                           <p><span class="fa fa-warning"></span> Data update in end of each hour. You can update it manual by pressign update button</p>
                        </div>
                        <div class="col-md-8">
                           <div id="dashboard-map-seles" style="width: 100%; height: 200px"></div>
                        </div>
                     </div>
                  </div>
               </div>
               <!-- END SALES BLOCK -->
            </div>
            <div class="common-modal modal fade" id="common-Modal1" tabindex="-1" role="dialog" aria-hidden="true">
               <div class="modal-content">
                  <ul class="list-inline item-details">
                     <li><a href="https://themifycloud.com/downloads/janux-premium-responsive-bootstrap-admin-dashboard-template/">Admin templates</a></li>
                     <li><a href="https://themescloud.org">Bootstrap themes</a></li>
                  </ul>
               </div>
            </div>
            <div class="col-md-4">
               <!-- START SALES & EVENTS BLOCK -->
               <div class="panel panel-default">
                  <div class="panel-heading">
                     <div class="panel-title-box">
                        <h3>Sales & Event</h3>
                        <span>Event "Purchase Button"</span>
                     </div>
                     <ul class="panel-controls" style="margin-top: 2px;">
                        <li><a style="cursor:pointer;" class="panel-fullscreen"><span class="fa fa-expand"></span></a></li>
                        <li><a style="cursor:pointer;" class="panel-refresh"><span class="fa fa-refresh"></span></a></li>
                        <li class="dropdown">
                           <a style="cursor:pointer;" class="dropdown-toggle" data-toggle="dropdown"><span class="fa fa-cog"></span></a>                                        
                           <ul class="dropdown-menu">
                              <li><a style="cursor:pointer;" class="panel-collapse"><span class="fa fa-angle-down"></span> Collapse</a></li>
                              <li><a style="cursor:pointer;" class="panel-remove"><span class="fa fa-times"></span> Remove</a></li>
                           </ul>
                        </li>
                     </ul>
                  </div>
                  <div class="panel-body padding-0">
                     <div class="chart-holder" id="dashboard-line-1" style="height: 200px;"></div>
                  </div>
               </div>
               <!-- END SALES & EVENTS BLOCK -->
            </div>
            <div class="col-md-12">
			{{ $root.settings }}
			</div>
         </div>
         <!-- START DASHBOARD CHART -->
         <div class="chart-holder" id="dashboard-area-1" style="height: 200px;"></div>
         <div class="block-full-width">
         </div>
         <!-- END DASHBOARD CHART -->
      </div>
   </div>
</template>
