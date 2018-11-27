tabris.ui.openPageEreport = function() {

var page = tabris.create("Page", {
	title: "E-bejelentés",
	topLevel: false,
	image: "res/images/ebejelentes.png",
});
// tabris.ui.pageCreateSurrounds(page);

var watchID = "";
var pickedIndex = 0;
var hmargin = "5%";
var pos = {
	lat: "?",
	lng: "?",
	alt: "?",
}

var getPosition = function() {
	watchID = "";
	tabris.ui.getLocation(function(position) {
		pos.lat = position[0];
		pos.lng = position[1];
		textPosition.set("text", pos.lat + "," + pos.lng);
		if (pos.lat + pos.lng == 0)
			watchID = window.setTimeout(getPosition, 3000);
	});
};

page.on("appear", function(widget) {
	getPosition();
	/*
	watchID = tabris.ui.startLocationWatch(function(location) {
		pos = location;
		tabris.ui.stopLocationWatch(watchID);
		watchID = "";
		textPosition.set("text", pos.x + "," + pos.y);
	});
	*/
});

page.on("disappear", function(widget) {
	if (watchID)
		window.clearInterval(watchID);
	/*
	tabris.ui.stopLocationWatch(watchID);
	*/
});


var picker = tabris.create("Picker", {
  layoutData: {left: hmargin, top: 10, right: hmargin},
  items: ["Bejelentés típusa...",
		"Illegálisan lerakott hulladék",
        "Parlagfű",
        "Roncsautó",
        "Közúton levő kátyú",
        "Utcanév tábla",
        "Kóbor/elhullott és veszélyes állat",
        "Illegális építkezés",
        "Egyéb, lakosságot érintő közügy",
	],
  selection: "Bejelentés típusa..."
}).on("change:selectionIndex", function(picker, itemindex) {
	pickedIndex = itemindex;
}).appendTo(page);

var inputReport = tabris.create("TextInput", {
	layoutData: {left: hmargin, top: [picker, 3], right: hmargin, bottom: "60%"},
	alignment: "left",
	message: "A bejelentés szövege...",
	type: "multiline",
}).appendTo(page);

var textPhoto = tabris.create("TextView", {
	layoutData: {left: hmargin, top: [inputReport, 3], right: hmargin},
	alignment: "center",
	markupEnabled: true,
	text: "<i>Fotó mellékelése</i>",
	maxLines: 1,
}).appendTo(page);

btnSendReport = tabris.create("Button", {
    text: "Bejelentés küldés...",
    layoutData: {left: hmargin, bottom: 10, right: hmargin},
}).appendTo(page)
.on("select", function() {
	tabris.ui.showMessage({
		title: "Bejelentés küldés..",
		message: "Valóban elküldi a bejelentést?",
		buttons: ["OK", "Mégse"],
		callback: function(buttonIndex) {
			if (buttonIndex == 1) {
				tabris.ui.showMessage({message: "Köszönjük. Bejelentését továbbítottuk..."});
				console.log(picker.get("items")[pickedIndex]);
				console.log(inputReport.get("text"));
				console.log(pos.x + "," + pos.y);
			} else
				// directions.navigateTo("51.50722", "-0.12750");
				maplauncher.openMap("8900 Zalaegerszeg, Mártírok útja 53."); // ["46.8408163","16.841558"]
		},
	});
});

var textPosition = tabris.create("TextView", {
	layoutData: {left: hmargin, bottom: [btnSendReport, 3], right: hmargin},
	alignment: "center",
	text: pos.lat + "," + pos.lng,
	maxLines: 1,
}).appendTo(page);

var imagePhoto = tabris.create("ImageView", {
	image: {src: "res/images/camera.png"},
	layoutData: {left: hmargin, top: [textPhoto, 3], right: hmargin, bottom: [textPosition, 3]},
	highlightOnTouch: true,
	scaleMode: "fit", // "auto" "stretch",
}).appendTo(page)
.on("tap", function() { tabris.ui.takePicture(imagePhoto); });





page.open();

}
