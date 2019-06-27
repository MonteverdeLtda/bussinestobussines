<template id="pages-login">
	<div>
        <div class="login-container">
            <div class="login-box">
                <div class="login-logo"></div>
                <div class="login-body">
                    <div class="login-title"><strong>Bienvenid@</strong>, Por favor ingrese.</div>
					
		<!--
                    <form action="index.html" class="form-horizontal" method="post">
                    <div class="form-group">
                        <div class="col-md-12">
                            <input type="text" class="form-control" placeholder="Username"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-md-12">
                            <input type="password" class="form-control" placeholder="Password"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-md-6">
                            <a href="#" class="btn btn-link btn-block">Forgot your password?</a>
                        </div>
                        <div class="col-md-6">
                            <button class="btn btn-info btn-block">Log In</button>
                        </div>
                    </div>
                    </form>
		-->
                    <div class="form-group">
                        <div class="col-md-6">
                            
                        </div>
                        <div class="col-md-6">
                            <button @click="$root.LogInPop()" class="btn btn-info btn-block">Ingresar</button>
                        </div>
                    </div>
                </div>
                <div class="login-footer">
                    <div class="pull-left">
                        &copy; 2019 B2B SERVICIOS AMBIENTALES Y FORESTALES MONTEVERDE LTDA.
                    </div>
                    <div class="pull-right">
                        <!-- // <a href="#">About</a> | -->
                        <!-- // <a href="#">Privacy</a> | -->
                        <!-- // <a href="#">Contact Us</a> -->
                    </div>
                </div>
            </div>
        </div>
	</div>
</template>

<style scope="pages-login">
.login-container {
	float: left;
	width: 100%;
	/* min-height: calc(100vh); */
	text-align: -webkit-center;
		border-radius: 15px;
	background: url(../img/bg.png) left top repeat #1b1e244d;
}
.login-container .login-box {
	/* width: 400px; */
	margin: 0px auto;
	padding-top: 20px;
}
.login-container .login-box .login-logo {
	background: #FFF url("https://monteverdeltda.com/wp-content/uploads/2019/03/logo-monteverde.png") center center no-repeat;
	width: 100%;
	height: 250px;
	float: left;
	margin-bottom: 10px;
	background-size: 100% auto;
}
</style>
