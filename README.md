angularjs-modal-service
=======================

#####An AngularJS service that creates a Modal Popup with a given HTML template and controller.

#####The Service createDialog can be used to create a modal using Twitter's Bootstrap on the fly.

#####How To Use:

1. Include the createDialog.js file in your index.html file.
2. Include the 'fundoo.services' as a module dependency when you define your app
3. Import the createDialog Service in your App Controller.
4. Call the createDialog() function from your controller, using the following syntax : 

```
createDialog([template_url],{
    id : [modal_id],
    title: [modal_title],
    backdrop: [backdrop_visible],
    success: [modal_success_button],
    controller: [modal_controller],
    backdropClass: [modal_backdrop_class],
    footerTemplate: [modal_footer_template],
    modalClass: [modal_class]
}, {modal_custom_data});
```
where,    
        
**template_url** *[string]* : the url of the template of the body of the template.   
**modal_id** *[string]* : the unique html id attr of the template.   
**modal_title** *[string]* : is the title of the modal to be displayed in its header section.
**backdrop_visible(optional)** *[boolean]*: whether to hide the html page behind the modal under an overlay  
**modal_success_button(optional)** *[object]*: the object add a submit button to the modal with its functionality  
*Syntax*
```
    {label: '[label_of_button]', fn: '[function_on_click]'}
```	
**modal_controller(optional)** *[string]* : is the controller attached to the modal.    
**modal_backdrop_class(optional)** *[string]* : the css class for the backdrop of the modal.   
**modal_footer_template(optional)** *[string]* : the footer template of the modal.    
**modal_class(optional)** *[string]* : the css class for the modal.  
**modal_custom_data(optional)** *[object]* : is an object where each key becomes an argument to the controller of the modal.   
