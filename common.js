tabris.device.on("change:orientation", function(event) {
	tabris.ui.pageAdjustFontSize(tabris.ui.get("activePage"));
});

tabris.ui.pageCreateSurrounds = function(page) {
	var top = 85;
	page.on("appear", function(widget) { tabris.ui.set("image", widget.get("image")); })
	tabris.create("ImageView", {
		image: {src: "res/images/mobillablec.png"},
		scaleMode: "fit", // "auto" "stretch",
		layoutData: {left: 0, right: 0, top: top+"%", bottom: 0},
	}).appendTo(page);
	return top;
}

tabris.ui.pageAdjustFontSize = function(page) {
	if (page.get("iconColumns")) {
		var width = tabris.device.get("screenWidth") / page.get("iconColumns");
		var fontSize = width < 180 ? 13 : 18;
		page.apply({"TextView": {font: fontSize+"px"}})
	}
}

tabris.ui.pageCreateIcons = function(args) {
	var icons = args["icons"];
	var page = args["page"];
	var pageHeight = args["pageHeight"]
	var columns = args["columns"];
	var rows = args["rows"];
	var top = args["top"];
	var left = args["left"];

	var tgap = 1;
	var dleft = (100 - left * 2) / columns;
	var dtop = (pageHeight - top * 1) / rows;
	/*
	var scrollView = tabris.create("ScrollView", {
		direction: "vertical",
		layoutData: {left: 0, top: 0, right: 0, bottom: 0}
	}).appendTo(page);
	*/
	var i = 0;
	for (x in icons) {
		var icon = icons[x];
		
		var cleft = parseInt(left+dleft*(i%columns));
		var ctop = parseInt(top+dtop*parseInt(i/columns));
		var cright = parseInt(101-left-dleft*(i%columns + 1));
		var cbottom = parseInt(101-top-dtop*parseInt(i/columns+1));
		var comp = tabris.create("Composite", {
			layoutData: {
				left: cleft + "%", 
				top: ctop + "%", 
				right: cright + "%", 
				bottom: cbottom + "%"
			}
		}).appendTo(page);
		
		var image = tabris.create("ImageView", {
			image: icon["image"],
			layoutData: {left: 0, right: 0, top: 0, bottom: 35},
			scaleMode: "fit", // "fit" "auto" "stretch"
			highlightOnTouch: true,
		}).appendTo(comp).on("tap", icon["opener"]);
		tabris.create("TextView", {
			layoutData: {left: 0, top: [image, tgap], right: 0},
			alignment: "center",
			text: icon["label"],
			maxLines: 1,
		}).appendTo(comp).on("tap", icon["opener"]);
		i++;
	}

	tabris.ui.pageAdjustFontSize(page);
}

tabris.ui.takePicture = function(imagePhoto) {
	navigator.camera.getPicture(onSuccess, onFail, {
		quality: 50,
		// targetWidth: 1024,
		// targetHeight: 1024,
		destinationType: window.Camera.DestinationType.FILE_URI,
	});
	function onSuccess(imageUrl) {
		imagePhoto.set("image", {src: imageUrl});
	}
	function onFail(message) {
		console.log("Camera failed: " + message);
	}
}

/*
tabris.ui.startLocationWatch = function(watchCallback) {
	var watchID = "";
	var onSuccess = function(location) {
		watchCallback(location);
	}
	var onError = function() {
		console.log("Error watching location");
    };
	watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, {frequency: 1000});
	return watchID;
}

tabris.ui.stopLocationWatch = function(watchID) {
	if (watchID)
		navigator.accelerometer.clearWatch(watchID);
}
*/

tabris.ui.getLocation = function(onSuccess) {
	var onError = function(error) {
		console.log("Helymeghatározási hiba: " + error);
	}
	// navigator.geolocation.getCurrentPosition(onSuccess, onError, {timeout: 10000, enableHighAccuracy: true});
	cordova.exec(onSuccess, onError, "GPS", "escrever", []);
}

tabris.ui.showMessage = function(params) {
	var title = params["title"];
	var message = params["message"];
	var button = params["button"];
	var buttons = params["buttons"];
	var callback = params["callback"];
	if (buttons)
		navigator.notification.confirm(message, callback /*returns buttonIndex*/, title, buttons /* array of labels */);
	else if (button)
		navigator.notification.alert(message, callback, title, button);
	else
		window.plugins.toast.showLongBottom(message);
}
