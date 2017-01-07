/**
 * @license Copyright (c) 2017 Maxwell Dreytser
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */


// If you would like IE 8 support, include the polyfill here: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Compatibility
(function(){
	function getAllElementsWithAttribute(attribute)	{
		// Prefer to use the native querySelectorAll if available.
		if (document.querySelectorAll) {
			return document.querySelectorAll('[' + attribute + ']');
		} else {
			// Otherwise, use custom code.
			
			var matches = [];
			var allElms = document.getElementsByTagName('*');
			
			// Simply check every element on the page for the requested attribute.
			for (var i = 0, n = allElms.length; i < n; i++)
			{
				if (allElms[i].getAttribute(attribute) !== null)
				{
					matches.push(allElms[i]);
				}
			}
			
			return matches;
		}
	}

	function doResize() {
		var elms = getAllElementsWithAttribute('resizeToParent');
		
		// For each element we need to resize...
		for (var i = 0, len = elms.length; i < len; i++) {
			var elm = elms[i];
			var parentElm = elm.parentNode;
			while (parentElm.tagName == 'a') {
				parentElm = parentElm.parentNode;
			}

			// Calculate the aspect ratio for the element.
			var elmAspectRatio = elm.clientWidth / elm.clientHeight;
			// Calculate the aspect ratio for the element's parent.
			var parentElmAspectRatio = parentElm.clientWidth / parentElm.clientHeight;
			
			// If the parent's aspect ratio is larger than this element's, 
			if (parentElmAspectRatio > elmAspectRatio) {
				// Lock the element's height to the parent height.
				elm.style.width = 'auto';
				elm.style.height = parentElm.clientHeight + 'px';
			} else {
				// Otherwise, lock the width.
				elm.style.width = parentElm.clientWidth + 'px';
				elm.style.height = 'auto';
			}
		}
	}

	// Resize the elements every time the window is resized.
	window.addEventListener("resize", doResize);
	// Additionally, resize every 0.5 seconds in case a new element may be added.
	setInterval(doResize, 500);
	doResize();

	// Make the Resizer public to allow manual triggering of the resize.
	window.DoEasyResizeToParent = doResize;
})();