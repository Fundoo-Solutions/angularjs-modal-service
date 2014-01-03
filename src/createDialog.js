angular.module('fundoo.services', []).factory('createDialog', ["$document", "$compile", "$rootScope", "$controller", "$timeout",
  function ($document, $compile, $rootScope, $controller, $timeout) {
    var defaults = {
      id: null,
      template: null,
      templateUrl: null,
      title: 'Default Title',
      backdrop: true,
      success: {label: 'OK', fn: null},
      cancel: {label: 'Close', fn: null},
      controller: null, //just like route controller declaration
      backdropClass: "modal-backdrop",
      backdropCancel: true,
      footerTemplate: null,
      modalClass: "modal",
      css: {
        top: '100px',
        left: '30%',
        margin: '0 auto'
      }
    };
    var body = $document.find('body');

    return function Dialog(templateUrl/*optional*/, options, passedInLocals) {

      // Handle arguments if optional template isn't provided.
      if(angular.isObject(templateUrl)){
        passedInLocals = options;
        options = templateUrl;
      } else {
        options.templateUrl = templateUrl;
      }

      options = angular.extend({}, defaults, options); //options defined in constructor

      var key;
      var idAttr = options.id ? ' id="' + options.id + '" ' : '';
      var defaultFooter = '<button class="btn" ng-click="$modalCancel()">{{$modalCancelLabel}}</button>' +
        '<button class="btn btn-primary" ng-click="$modalSuccess()">{{$modalSuccessLabel}}</button>';
      var footerTemplate = '<div class="modal-footer">' +
        (options.footerTemplate || defaultFooter) +
        '</div>';
      var modalBody = (function(){
        if(options.template){
          if(angular.isString(options.template)){
            // Simple string template
            return '<div class="modal-body">' + options.template + '</div>';
          } else {
            // jQuery/JQlite wrapped object
            return '<div class="modal-body">' + options.template.html() + '</div>';
          }
        } else {
          // Template url
          return '<div class="modal-body" ng-include="\'' + options.templateUrl + '\'"></div>'
        }
      })();
      //We don't have the scope we're gonna use yet, so just get a compile function for modal
      var modalEl = angular.element(
                '<div class="' + options.modalClass + ' fade"' + idAttr + ' style="display: block;">' +
                    '  <div class="modal-dialog">' +
                    '    <div class="modal-content">' +
                    '      <div class="modal-header">' +
                    '        <button type="button" class="close" ng-click="$modalCancel()">&times;</button>' +
                    '        <h2>{{$title}}</h2>' +
                    '      </div>' +
                    modalBody +
                    footerTemplate +
                    '    </div>' +
                    '  </div>' +
                    '</div>');

      for(key in options.css) {
        modalEl.css(key, options.css[key]);
      }
      var divHTML = "<div ";
      if(options.backdropCancel){
        divHTML+='ng-click="$modalCancel()"';
      }
      divHTML+=">";
      var backdropEl = angular.element(divHTML);
      backdropEl.addClass(options.backdropClass);
      backdropEl.addClass('fade in');

      var handleEscPressed = function (event) {
        if (event.keyCode === 27) {
          scope.$modalCancel();
        }
      };

      var closeFn = function () {
        body.unbind('keydown', handleEscPressed);
        modalEl.remove();
        if (options.backdrop) {
          backdropEl.remove();
        }
      };

      body.bind('keydown', handleEscPressed);

      var ctrl, locals,
        scope = options.scope || $rootScope.$new();

      scope.$title = options.title;
      scope.$modalClose = closeFn;
      scope.$modalCancel = function () {
        var callFn = options.cancel.fn || closeFn;
        callFn.call(this);
        scope.$modalClose();
      };
      scope.$modalSuccess = function () {
        var callFn = options.success.fn || closeFn;
        callFn.call(this);
        scope.$modalClose();
      };
      scope.$modalSuccessLabel = options.success.label;
      scope.$modalCancelLabel = options.cancel.label;
      
      if (options.controller) {
        locals = angular.extend({$scope: scope}, passedInLocals);
        ctrl = $controller(options.controller, locals);
        // Yes, ngControllerController is not a typo
        modalEl.contents().data('$ngControllerController', ctrl);
      }

      $compile(modalEl)(scope);
      $compile(backdropEl)(scope);
      body.append(modalEl);
      if (options.backdrop) body.append(backdropEl);

      $timeout(function () {
        modalEl.addClass('in');
      }, 200);
    };
  }]);
