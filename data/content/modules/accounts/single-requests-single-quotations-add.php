
<template id="page-accounts-requests-quotations-add">
	<div>		
		<div class="page-content-wrap">
			<div class="row">
				<div class="col-md-12">
					<div class="panel panel-default">
						<div class="panel-heading">
							<h3 class="panel-title"><strong>Viendo</strong> Cuenta</h3>
							<ul class="panel-controls">
								
							</ul>
						</div>
						<div class="panel-body">
							<component-navigation-top-pages-accounts></component-navigation-top-pages-accounts>
						</div>
					</div>
					
					<div class="panel panel-default">
						<div class="panel-heading">
							<h3 class="panel-title"><strong>Añadir</strong> Propuesta </h3>
							<ul class="panel-controls">
								<li><a @click="find()" class="panel-refresh" title="Actualizar" data-toggle="tooltip" data-placement="bottom"><span class="fa fa-refresh"></span></a></li>
								<li><a @click="$router.go(-1)" class="panel-remove"><span class="fa fa-times"></span></a></li>
							</ul>
						</div>
						<div class="panel-body">
							
							<!-- START CONTENT FRAME -->
							<div class="content-frame">
								<!-- START CONTENT FRAME TOP -->
								<div class="content-frame-top">
									<!-- //
									<div class="page-title">
										<h2><span class="fa fa-arrow-circle-o-left"></span> Frame Title</h2>
									</div>
									<div class="pull-right">
										<button class="btn btn-default content-frame-right-toggle"><span class="fa fa-bars"></span></button>
									</div>
									-->
								</div>
								<!-- END CONTENT FRAME TOP -->
								
								<!-- START CONTENT FRAME LEFT -->
								<div class="content-frame-right">
									<div class="panel panel-default">
										<div class="panel-heading">
											<h3 class="panel-title">Inventario</h3>
										</div>
										<div class="panel-body">
											
										</div>
									</div>
								</div>
								<!-- END CONTENT FRAME LEFT -->
								
								<!-- START CONTENT FRAME BODY -->
								<div class="content-frame-body content-frame-body-left">
									<div class="panel panel-default">
										<div class="panel-heading">
											<h3 class="panel-title">Detalles</h3>
										</div>
										<div class="panel-body">
											<div class="row clearfix">
												<div class="col-md-12">
												  <table class="table table-bordered table-hover" id="tab_logic">
													<thead>
													  <tr>
														<th class="text-center"> # </th>
														<th class="text-center"> Product </th>
														<th class="text-center"> Qty </th>
														<th class="text-center"> Price </th>
														<th class="text-center"> Total </th>
													  </tr>
													</thead>
													<tbody>
													  <tr id='addr0'>
														<td>1</td>
														<td><input type="text" name='product[]'  placeholder='Enter Product Name' class="form-control"/></td>
														<td><input type="number" name='qty[]' placeholder='Enter Qty' class="form-control qty" step="0" min="0"/></td>
														<td><input type="number" name='price[]' placeholder='Enter Unit Price' class="form-control price" step="0.00" min="0"/></td>
														<td><input type="number" name='total[]' placeholder='0.00' class="form-control total" readonly/></td>
													  </tr>
													  <tr id='addr1'></tr>
													</tbody>
												  </table>
												</div>
											  </div>
											  <div class="row clearfix">
												<div class="col-md-12">
												  <button id="add_row" class="btn btn-default pull-left">Add Row</button>
												  <button id='delete_row' class="pull-right btn btn-default">Delete Row</button>
												</div>
											  </div>
											  <div class="row clearfix" style="margin-top:20px">
												<div class="pull-right col-md-4">
												  <table class="table table-bordered table-hover" id="tab_logic_total">
													<tbody>
													  <tr>
														<th class="text-center">Sub Total</th>
														<td class="text-center"><input type="number" name='sub_total' placeholder='0.00' class="form-control" id="sub_total" readonly/></td>
													  </tr>
													  <tr>
														<th class="text-center">Tax</th>
														<td class="text-center"><div class="input-group mb-2 mb-sm-0">
															<input type="number" class="form-control" id="tax" placeholder="0">
															<div class="input-group-addon">%</div>
														  </div></td>
													  </tr>
													  <tr>
														<th class="text-center">Tax Amount</th>
														<td class="text-center"><input type="number" name='tax_amount' id="tax_amount" placeholder='0.00' class="form-control" readonly/></td>
													  </tr>
													  <tr>
														<th class="text-center">Grand Total</th>
														<td class="text-center"><input type="number" name='total_amount' id="total_amount" placeholder='0.00' class="form-control" readonly/></td>
													  </tr>
													</tbody>
												  </table>
												</div>
											  </div>
										</div>
									</div>
								</div>
								<!-- END CONTENT FRAME BODY -->
							</div>
						
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
