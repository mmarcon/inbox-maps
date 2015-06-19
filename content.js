InboxSDK.load('1', IM.credentials.ibsdk).then(function(sdk){

	var utils = IM.Utils;

	IM.getLocation();

	// the SDK has been loaded, now do something with it!
	sdk.Compose.registerComposeViewHandler(function(composeView){
		// a compose view has come into existence, do something with it!
		composeView.addButton({
			title: "Attach a place",
			iconUrl:  chrome.extension.getURL('assets/inbox-button.png'),
			onClick: function(event) {
				var ctx = {},
					contentElement = document.createElement('div');

				contentElement.innerHTML = IM.Templates.TabView;

				var shareCurrentLocation = {
					tab: utils.createDOM(IM.Templates.Tab.replace('{NAME}', 'Current Location')),
					view: utils.createDOM(IM.Templates.View)
				};

				shareCurrentLocation.tab.dataset.feature = 'currentLocation';
				shareCurrentLocation.view.classList.add('currentLocation');
				shareCurrentLocation.tab.classList.add('selected');

				var sharePlace = {
					tab: utils.createDOM(IM.Templates.Tab.replace('{NAME}', 'Place')),
					view: utils.createDOM(IM.Templates.View)
				};

				sharePlace.tab.dataset.feature = 'place';
				sharePlace.view.classList.add('place');

				sharePlace.view.innerHTML = '<img src="https://placekitten.com/g/250/250" width="250" height="250">';

				contentElement.querySelector('.tab-view .tabs').addEventListener('click', function(e){
					if(e.target.classList.contains('tab')) {
						var feature = contentElement.querySelector('.' + e.target.dataset.feature);
						var features = [].slice.call(contentElement.querySelectorAll('.tab-view .view'));
						var tabs = [].slice.call(contentElement.querySelectorAll('.tab-view .tab'));
						tabs.forEach(function(t){
							t.classList.remove('selected');
						});
						features.forEach(function(f){
							f.style.display = 'none';
						});
						e.target.classList.add('selected');
						feature.style.display = 'block';
					}
				}, false);

				contentElement.querySelector('.tab-view .tabs').appendChild(shareCurrentLocation.tab);
				contentElement.querySelector('.tab-view .views').appendChild(shareCurrentLocation.view);
				contentElement.querySelector('.tab-view .tabs').appendChild(sharePlace.tab);
				contentElement.querySelector('.tab-view .views').appendChild(sharePlace.view);

				contentElement.querySelector('.tab-view .view').style.display = 'block';

				shareCurrentLocation.view.innerHTML = '<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" width="250" height="250">';
				sharePlace.view.innerHTML = '<input type="text" class="places-autocomplete"><ul class="place-results"></ul>';

				var input = contentElement.querySelector('.places-autocomplete');
				var results = contentElement.querySelector('.place-results');


				IM.getLocation().then(function(data){
			        var img = IM.Here.getMapImage(data.latitude, data.longitude);
			        shareCurrentLocation.view.innerHTML = '<img src="' + img + '" width="250" height="250" style="width:250px;height:250px;">';
			    });

				ctx.modal = sdk.Widgets.showModalView({
					el: contentElement,
					chrome: true,
					title: 'Insert a place',
					buttons: [
						{
					        text: 'Cancel',
					        title: 'Cancel anc close this window',
					        onClick: function(){
					            ctx.modal.close();
					        }
		    			}
					]
				});

				input.addEventListener('keyup', function(e){
					utils.log(e.target.value);
					if(e.target.value.length >= 2) {
						IM.getLocation().then(function(data){
							return IM.Here.getPlaces(data.latitude, data.longitude, e.target.value);
						}).then(function(data){
							results.innerHTML = '';
							data.items.forEach(function(item){
								utils.log(item);
								var li = utils.createDOM(IM.Templates.Place
									.replace(/{NAME}/g, item.title)
									.replace(/{ID}/, item.id)
									.replace(/{COORD}/, item.position.join(',')));

								results.appendChild(li);

								li.addEventListener('click', function(e){
									var coord = e.target.dataset.coord.split(',');
									var name = e.target.dataset.name;
									var id = e.target.dataset.id;
									var img = IM.Here.getMapImage(coord[0], coord[1], null, 15);

									event.composeView.insertHTMLIntoBodyAtCursor('<a href="https://www.here.com/p/' + id + '">' + name + '</a>');
									event.composeView.insertHTMLIntoBodyAtCursor('<br><br><a href="https://www.here.com/p/' + id + '"><img src="' + img + '" width="250" height="250" style="width:250px;height:250px;">');
									ctx.modal.close();
								});
							});
						});
					}
				});

				shareCurrentLocation.view.addEventListener('click', function(e){
					e.stopPropagation();
					IM.Actions.injectCurrentLocation(event.composeView, sdk);
					ctx.modal.close();
				}, false);
			}
		});

	});

});
