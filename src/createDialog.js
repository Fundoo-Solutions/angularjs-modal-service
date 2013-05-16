angular.module('fundoo.services', []).factory('createDialog', ["$document", "$compile", "$rootScope", "$controller", "$timeout",
      function ($document, $compile, $rootScope, $controller, $timeout) {
        var defaults = {
          id: null,
          title: 'Default Title',
          backdrop: true,
          success: {label: 'OK', fn: null},
          controller: null, //just like route controller declaration
          backdropClass: "modal-backdrop",
          footerTemplate: null,
          modalClass: "modal"
        };
        var body = $document.find('body');

        return function Dialog(template, options, passedInLocals) {

          options = angular.extend({}, defaults, options); //options defined in constructor

          var idAttr = options.id ? ' id="' + options.id + '" ' : '';
          var defaultFooter = '<button class="btn" ng-click="$modalCancel()">Close</button>' +
            '<button class="btn btn-primary" ng-click="$modalSuccess()">{{$modalSuccessLabel}}</button>';
          var footerTemplate = '<div class="modal-footer">' +
            (options.footerTemplate || defaultFooter) +
            '</div>';
          //We don't have the scope we're gonna use yet, so just get a compile function for modal
          var modalEl = angular.element(
            '<div class="' + options.modalClass + ' fade"' + idAttr + '>' +
              '  <div class="modal-header">' +
              '    <a class="close-button" ng-click="$modalCancel()"></a>' +
              '    <h2>{{$title}}</h2>' +
              '  </div>' +
              '  <div class="modal-body" ng-include="\'' + template + '\'"></div>' +
              footerTemplate +
              '</div>');

          modalEl.css('top', $document.scrollTop() + 45);
          modalEl.css('left', '30%');
          modalEl.css('margin', '0 auto');

          var backdropEl = angular.element('<div ng-click="$modalCancel()">');
          backdropEl.addClass(options.backdropClass);
          backdropEl.addClass('fade in');

          var handleEscPressed = function(event) {
            if (event.keyCode === 27) {
              scope.$modalCancel();
            }
          };

          var closeFn = function() {
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
          scope.$modalCancel = closeFn;
          scope.$modalSuccess = function() {
            var callFn = options.success || closeFn;
            callFn.call(this);
          };
          scope.$modalSuccessLabel = options.success.label;

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

          $timeout(function() {
            modalEl.addClass('in');
          }, 200);
        };
      }]);