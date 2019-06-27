var PagesMediaGalleryPictures = Vue.extend({
	template: '#page-media-gallery-pictures',
	data: function() {
		return {
			posts: [],
		};
	},
	created: function () {
		var self = this;
	},
	mounted: function () {
		var self = this;
		
		/*
		 document.getElementById('links').onclick = function (event) {
			event = event || window.event;
			var target = event.target || event.srcElement;
			var link = target.src ? target.parentNode : target;
			var options = {index: link, event: event,onclosed: function(){
					setTimeout(function(){
						$("body").css("overflow","");
					},200);                        
				}};
			var links = this.getElementsByTagName('a');
			blueimp.Gallery(links, options);
		}
		*/
		
$(document).on('click', '#close-preview', function(){ 
    $('.image-preview').popover('hide');
    // Hover befor close the preview
    $('.image-preview').hover(
        function () {
           $('.image-preview').popover('show');
        }, 
         function () {
           $('.image-preview').popover('hide');
        }
    );    
});

$(function() {
    // Create the close button
    var closebtn = $('<button/>', {
        type:"button",
        text: 'x',
        id: 'close-preview',
        style: 'font-size: initial;',
    });
    closebtn.attr("class","close pull-right");
    // Set the popover default content
    $('.image-preview').popover({
        trigger:'manual',
        html:true,
        title: "<strong>Preview</strong>"+$(closebtn)[0].outerHTML,
        content: "There's no image",
        placement:'bottom'
    });
    // Clear event
    $('.image-preview-clear').click(function(){
        $('.image-preview').attr("data-content","").popover('hide');
        $('.image-preview-filename').val("");
        $('.image-preview-clear').hide();
        $('.image-preview-input input:file').val("");
        $(".image-preview-input-title").text("Browse"); 
    }); 
    // Create the preview image
    $(".image-preview-input input:file").change(function (){     
        var img = $('<img/>', {
            id: 'dynamic',
            width:250,
            height:200
        });      
        var file = this.files[0];
        var reader = new FileReader();
        // Set preview image into the popover data-content
        reader.onload = function (e) {
            $(".image-preview-input-title").text("Change");
            $(".image-preview-clear").show();
            $(".image-preview-filename").val(file.name);            
            img.attr('src', e.target.result);
            $(".image-preview").attr("data-content",$(img)[0].outerHTML).popover("show");
        }        
        reader.readAsDataURL(file);
    });  
});
		
		self.find();
	},
	methods: {
		find: function(){
			var self = this;
			FG.api('GET', '/pictures', {
				include: [
					'id,name,size,type,create',
				]
			}, function(r){
				if(r.length > 0 && r[0].id > 0){
					self.posts = r;
					// $("#gallery-container").html('');
					r.forEach(function(el){
						/*
						$("#gallery-container").append(`
							<a class="gallery-item" href="/assets/images/gallery/nature-1.jpg" title="Nature Image 1" data-gallery />
								<div class="image">
									<img src="/assets/images/gallery/nature-1.jpg" alt="Nature Image 1"/>
									<ul class="gallery-item-controls">
										<li><label class="check"><input type="checkbox" class="icheckbox"/></label></li>
										<li><span class="gallery-item-remove"><i class="fa fa-times"></i></span></li>
									</ul>
								</div>
								<div class="meta">
									<strong>Nature image 1</strong>
									<span>Description</span>
								</div>
							</a>`);
						*/
					});
				}
			});
		},
	}
});
