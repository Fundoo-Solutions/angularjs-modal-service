angularjs-modal-service
=======================

An AngularJS service that creates a Modal Popup with a given HTML template and controller.

The Service createDialog can be used to create a modal using Twitter Bootstrap on the fly.

How To Use:

1. Include the createDialog.js file in your index.html file.
2. Import the createDialog Service in your App Controller.
3. Call the createDialog() function from your controller, using the following syntax : 
	
	<pre><code>createDialog([template_url],{
		id : [modal_id],
		title: [modal_title],
		controller: [modal_controller],
		footerTemplate: [modal_footer_template_url]
	}, {modal_custom_data});</code></pre>

	where, 
		template_url, is the url of the template of the body of the template.
		modal_id, is the unique html id attr of the temnplate.
		modal_title, is the title of the modal to be displayed in its header section.
		modal_controller(optional), is the controller attached to the controller. 
		modal_footer_template_url(optional), is the url for the footer template of the modal.
		modal_custom_data(optional), is an object where each ley becomes an used to the controller of the modal.
