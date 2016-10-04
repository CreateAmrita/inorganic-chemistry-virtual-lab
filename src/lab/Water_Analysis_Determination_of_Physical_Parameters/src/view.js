(function() {
    angular
        .module('users')
        .directive("experiment", directiveFunction)
})();

/** Variable declaration */
var water_analysis_stage, exp_canvas;

var ph_reading_container, turbidity_container, conductivity_container;

var tick, lid_timer;

var lid_counter;

var helpArray = standardisation_Array = water_Sample_Array = test_Array = test_Tube_Array = [];

var ph_Value_Array = turbidity_Value_Array = conductivity_Value_Array = [];

var start_flag, buffer_solution1_flag, buffer_solution2_flag;

var ph_apparatus, turbidity_apparatus, conductivity_apparatus;

var ph_value, turbidity_value, conductivity_value;

var test_tube_name, unload_x, prev_test_tube, selected_test_value;

function directiveFunction() {
    return {
        restrict: "A",
        link: function(scope, element, attrs, dialogs) {
            /** Variable that decides if something should be drawn on mouse move */
            var experiment = true;
            if (element[0].width > element[0].height) {
                element[0].width = element[0].height;
                element[0].height = element[0].height;
            } else {
                element[0].width = element[0].width;
                element[0].height = element[0].width;
            }
            if (element[0].offsetWidth > element[0].offsetHeight) {
                element[0].offsetWidth = element[0].offsetHeight;
            } else {
                element[0].offsetWidth = element[0].offsetWidth;
                element[0].offsetHeight = element[0].offsetWidth;
            }
            exp_canvas = document.getElementById("demoCanvas");
            exp_canvas.width = element[0].width;
            exp_canvas.height = element[0].height;
            /** Stage initialization */
            water_analysis_stage = new createjs.Stage("demoCanvas");
            queue = new createjs.LoadQueue(true);
			queue.loadManifest([{
				id: "ph_background",
				src: "././images/ph_background.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "ph_meter",
				src: "././images/ph_meter.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "popup",
				src: "././images/popup.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "switch_off",
				src: "././images/switch_off.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "switch_on",
				src: "././images/switch_on.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "turbidity_background",
				src: "././images/turbidity_background.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "nephelometer",
				src: "././images/nephelometer.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "testube",
				src: "././images/testube.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "lid_anim1",
				src: "././images/lid_anim1.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "lid_anim2",
				src: "././images/lid_anim2.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "lid_anim3",
				src: "././images/lid_anim3.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "lid_anim4",
				src: "././images/lid_anim4.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "lid_anim5",
				src: "././images/lid_anim5.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "lid_anim6",
				src: "././images/lid_anim6.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "lid_anim7",
				src: "././images/lid_anim7.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "lid_anim8",
				src: "././images/lid_anim8.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "lid_anim9",
				src: "././images/lid_anim9.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "lid_anim10",
				src: "././images/lid_anim10.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "machine_top",
				src: "././images/machine_top.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "conductivity_background",
				src: "././images/conductivity_background.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "conductivity_meter",
				src: "././images/conductivity_meter.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "light_on",
				src: "././images/light_on.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "light_off",
				src: "././images/light_off.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "test_tube_rack",
				src: "././images/test_tube_rack.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "test_tube_rack_top",
				src: "././images/test_tube_rack_top.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "water_anim1",
				src: "././images/water_anim1.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "water_anim2",
				src: "././images/water_anim2.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "water_anim3",
				src: "././images/water_anim3.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "water_anim4",
				src: "././images/water_anim4.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "water_anim5",
				src: "././images/water_anim5.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "water_anim6",
				src: "././images/water_anim6.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "water_anim7",
				src: "././images/water_anim7.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "water_anim8",
				src: "././images/water_anim8.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "water_anim9",
				src: "././images/water_anim9.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "water_anim10",
				src: "././images/water_anim10.svg",
				type: createjs.LoadQueue.IMAGE
			}]);
			queue.installPlugin(createjs.Sound);
            loadingProgress(queue, water_analysis_stage, exp_canvas.width)
            queue.on("complete", handleComplete, this);
            water_analysis_stage.enableDOMEvents(true);
            water_analysis_stage.enableMouseOver();
            /** Stage update function in a timer */
            tick = setInterval(updateTimer, 100);
            /** Container for adding images for the test 'ph reading of water' */
            ph_reading_container = new createjs.Container();
            ph_reading_container.name = "ph_reading_container";
            /** Container for adding images for the test 'turbidity' */
            turbidity_container = new createjs.Container();
            turbidity_container.name = "turbidity_container";
            /** Container for adding images for the test 'electrical conductivity' */
            conductivity_container = new createjs.Container();
            conductivity_container.name = "conductivity_container";

            function handleComplete() {
                /** Loading all images in the queue to the stage */
                loadImages(queue.getResult("ph_background"), "ph_background", 0, 0, "", 0, 1, ph_reading_container);
                loadImages(queue.getResult("ph_meter"), "ph_meter", 390, 466, "", 0, 1, ph_reading_container);
                loadImages(queue.getResult("popup"), "ph_popup", 460, 370, "", 0, 1, ph_reading_container);
                loadImages(queue.getResult("switch_off"), "switch_off", 287, 589, "", 0, 1, ph_reading_container);
                loadImages(queue.getResult("switch_on"), "switch_on", 287, 589, "", 0, 1, ph_reading_container);
				for (var i = 1; i <= 10; i++) {
					loadImages(queue.getResult("water_anim"+i), "water_anim"+i, 178, 462, "", 0, 1, ph_reading_container);
				}
                loadImages(queue.getResult("turbidity_background"), "turbidity_background", 0, 0, "", 0, 1, turbidity_container);
                loadImages(queue.getResult("nephelometer"), "nephelometer", 30, 256, "", 0, 1, turbidity_container);
                for (var i = 1; i <= 10; i++) {
                    loadImages(queue.getResult("lid_anim" + i), "lid_anim" + i, 100, 340, "", 0, 1, turbidity_container);
                }
                loadImages(queue.getResult("test_tube_rack"), "test_tube_rack", 520, 460, "", 0, 1, turbidity_container);
                loadImages(queue.getResult("testube"), "test_tube_standard", 634, 448, "", 0, 1, turbidity_container);
                loadImages(queue.getResult("testube"), "test_tube_drinking", 590, 448, "", 0, 1, turbidity_container);
                loadImages(queue.getResult("testube"), "test_tube_sea", 546, 448, "", 0, 1, turbidity_container);
                loadImages(queue.getResult("test_tube_rack_top"), "test_tube_rack_top", 521, 470, "", 0, 1, turbidity_container);
                loadImages(queue.getResult("popup"), "turbidity_popup", 250, 160, "", 0, 1, turbidity_container);
				loadImages(queue.getResult("conductivity_background"), "conductivity_background", 0, 0, "", 0, 1, conductivity_container);
                loadImages(queue.getResult("conductivity_meter"), "conductivity_meter", 48, 448, "", 0, 1, conductivity_container);
                loadImages(queue.getResult("light_on"), "light_on", 65, 565, "", 0, 1, conductivity_container);
                loadImages(queue.getResult("light_off"), "light_off", 65, 565, "", 0, 1, conductivity_container);
                loadImages(queue.getResult("popup"), "conductivity_popup", 150, 350, "", 0, 1, conductivity_container);
				for (var i = 1; i <= 10; i++) {
					loadImages(queue.getResult("water_anim"+i), "water_anim"+i, 463, 502, "", 0, 1.17, conductivity_container);
				}
                /** Adding text to the popup for ph meter in 'ph reading of water' test */
                setText("ph_text", 0, 0, "", "", 1, ph_reading_container, 1);
                /** Adding text for ph meter result */
                setText("ph_reading", 492, 514, "0.0", "", 1, ph_reading_container, 1);
                /** Adding text to the popup for nephelometer in 'turbidity' test */
                setText("nephelometer_text", 0, 0, "", "", 1, turbidity_container, 1);
                /** Adding text for nephelometer result */
                setText("nephelometer_reading", 240, 346, "0", "white", 1, turbidity_container, 1);
                /** Adding text to the popup for conductivity meter in 'electrical conductivity' test */
                setText("conductivity_text", 0, 0, "", "", 1, conductivity_container, 1);
                /** Adding text for conductivity meter result */
                setText("conductivity_reading", 120, 549, "0.0", "white", 1, conductivity_container, 1);
                /** Adding containers to the stage */
                water_analysis_stage.addChild(ph_reading_container);
                water_analysis_stage.addChild(turbidity_container);
                water_analysis_stage.addChild(conductivity_container);
				/** Calling function for making water movement */
				waterMovement(ph_reading_container);
                /** Initializing the variables */
                initialisationOfVariables(scope);
                /** Initializing the controls */
                initialisationOfControls(scope);
                /** Initializing all the images */
                initialisationOfImages();
                /** Translation of strings using getext */
                translationLabels();
                /** Calling function for displaying text in the popup for each apparatus */
                popupDisplay(ph_reading_container, "ph_text", "ph_popup", "ph_meter", ph_apparatus, 510, 400);
                popupDisplay(turbidity_container, "nephelometer_text", "turbidity_popup", "nephelometer", turbidity_apparatus, 286, 190);
                popupDisplay(conductivity_container, "conductivity_text", "conductivity_popup", "conductivity_meter", conductivity_apparatus, 165, 380);
                water_analysis_stage.update();
            }

            /** Add all the strings used for the language translation here. '_' is the short cut for calling the 
			gettext function defined in the gettext-definition.js */
            function translationLabels() {
                /** This help array shows the hints for this experiment */
                helpArray = [_("help1"), _("help2"), _("help3"), _("help4"), _("help5"), _("help6"), _("help7"), _("help8"), _("help9"), _("help10"), _("help11"), _("help12"), _("Next"), _("Close")];
                /** Experiment name */
                scope.heading = _("Water Analysis : Physical Content");
                /** Label for select test dropdown */
                scope.test_label = _("Select test");
                /** Label for standardisation dropdown, standardisation label in the result part, and label 
				for stansardisation button */
                scope.standardisation_label = _("Standardisation");
                /** Label for select water sample dropdown */
                scope.sample_label = _("Select water sample");
                /** Label for switch on button in the test for ph reading of water */
                scope.start_exp = _("Switch On");
                /** Label for load sample button in the test for turbidity */
                scope.sample_load = _("Load Sample");
                /** Label for ph meter apparatus showing in the popup*/
                ph_apparatus = _("pH meter");
                /** Label for nephelometer apparatus showing in the popup*/
                turbidity_apparatus = _("Nephelometer");
                /** Label for conductivity meter apparatus showing in the popup*/
                conductivity_apparatus = _(" Conductivity meter")
                    /** Label for reset button */
                scope.reset_exp = _("reset");
                /** Label for the result */
                scope.result_label = _("pH value");
                scope.variables = _("Variables");
                scope.result = _("Result");
                scope.copyright = _("copyright");

                /** The test_array, standardisation_Array and water_Sample_Array contains the values and indexes of
				the dropdown */
                scope.test_Array = [{
                    test: _('pH reading of water'),
                    type: 0
                }, {
                    test: _('Turbidity'),
                    type: 1
                }, {
                    test: _('Electrical conductivity'),
                    type: 2
                }];

                scope.standardisation_Array = [{
                    standard: _('Buffer solution1 (4.0 pH)'),
                    type: 0
                }, {
                    standard: _('Buffer solution2 (7.0 pH)'),
                    type: 1
                }];

                scope.water_Sample_Array = [{
                    water_sample: _('Select sample'),
                    type: 0
                }, {
                    water_sample: _('Tap water'),
                    type: 1
                }, {
                    water_sample: _('Well water'),
                    type: 2
                }, {
                    water_sample: _('Distilled water'),
                    type: 3
                }, {
                    water_sample: _('Sea water'),
                    type: 4
                }];
                scope.$apply();
            }
        }
    }
}

/** Createjs stage updation happens in every interval */
function updateTimer() {
    water_analysis_stage.update();
}

/** All the texts loading and added to the natural_convection_stage */
function setText(name, textX, textY, value, color, fontSize, container, alpha) {
    var _text = new createjs.Text(value, "bold " + fontSize + "em Tahoma, Geneva, sans-serif", color);
    _text.x = textX;
    _text.y = textY;
    _text.textBaseline = "alphabetic";
    _text.name = name;
    _text.text = value;
    _text.color = color;
    _text.alpha = alpha;
    /** Result in the apparatus will shown in digital format */
    if (name == "ph_reading" || name == "nephelometer_reading") {
        _text.font = "2.3em digiface";
    } else if (name == "conductivity_reading") {
        _text.font = "1.7em digiface";
    }
    /** Adding text to the container */
    container.addChild(_text);
}

/** All the images loading and added to the stage */
function loadImages(image, name, xPos, yPos, cursor, rot, scale, container) {
    var _bitmap = new createjs.Bitmap(image).set({});
    _bitmap.x = xPos;
    _bitmap.y = yPos;
    _bitmap.name = name;
    _bitmap.scaleX = _bitmap.scaleY = scale;
    _bitmap.rotation = rot;
    _bitmap.cursor = cursor;
    /** Adding bitmap to the stage */
    container.addChild(_bitmap);
}

/** All variables initialising in this function */
function initialisationOfVariables(scope) {
	/** Minimum and maximum pH values for samples are different, tap water(7), well water(6.5 - 8.5), distilled
water(5.8), sea water(7.5 - 8.4). */
	ph_Value_Array = [0, 7, ((Math.floor(Math.random() * (85 - 65 + 1)) + 65) / 10), 5.8, ((Math.floor(Math.random() * (84 - 75 + 1)) + 75) / 10)];
	/** Minimum and maximum turbidity values for samples are different, drinking water(1-5), sea water(6-12) */
	turbidity_Value_Array = [0, ((Math.floor(Math.random() * (5 - 1 + 1)) + 1)), ((Math.floor(Math.random() * (12 - 6 + 1)) + 6))];
	/** Minimum and maximum turbidity values for samples are different, totally pure water(0.055), 
typical DI water(0.1), distilled water(0.5), RO water(50-100), tap water(500-800),potable water(1055),
sea water(56000), brackish water(100000) */
	conductivity_Value_Array = [0.0, 0.055, 0.1, 0.5, ((Math.floor(Math.random() * (100 - 50 + 1)) + 50)), ((Math.floor(Math.random() * (800 - 500 + 1)) + 500)), 1055, 56000, 100000]
	start_flag = false;
	/** Initially assign buffer solution1's value as ph value */
	ph_value = 4;
	/** Initially assign Formazin suspension(20 NTU)'s value as turbidity value */
	turbidity_value = 20;
	/** Initially assign KCl(0.01 M-1412 µS/cm)'s value as conductivity value*/
	conductivity_value = 1412;
	/** Initial value for lid counter */
	lid_counter = 0;
	/** To identify which test tube is selected */
	test_tube_name = "test_tube_standard";
	/** Array for storing indexes and names of test tubes */
	test_Tube_Array = ["", "test_tube_drinking", "test_tube_sea"]
		/** Initial x position for test tube while unloading */
	unload_x = 634;
	/** To identify which test tube is previously selected */
	prev_test_tube = "test_tube_standard";
	/** Index for the selected test */
	selected_test_value = 0;
	/** Counter used for water movement */
	count = 0;
}

/** All control functionalities are initialising in this function */
function initialisationOfControls(scope) {
    /** Hide and show standardization value shown in the result part */
    scope.std_show = false;
    /** Hide and show load sample button */
    scope.load_show = false;
    /** Hide and show switch on button */
    scope.start_show = false;
    /** Hide and show standard dropdown */
    scope.standard_show = true;
    /** Initial label for switch on button */
    scope.start_exp = _("Switch on");
    /** Enable and disable select water sample drop down */
    scope.water_sample_disable = true;
    /** Setting initial values for buffer solutions to identify the selected buffer solutions */
    buffer_solution1_flag = false;
    buffer_solution2_flag = false;
    /** Hide and show standard button */
    scope.standard_btn_show = true;
    /** Enable and disable standard button */
    scope.standard_disable = false;
    /** Set the dropdown boxes to initial state while resetting */
    scope.test_type = scope;
    scope.test_selected = scope;
    scope.sample_type = scope;
    /** Initial value for result */
    scope.result_val = "0.0";
	/** Initial label for result */
	scope.result_label = _("pH value");
	/** Initial label result unit */
	scope.result_unit = "";
}

/** All images are initialising in this function */
function initialisationOfImages() {
	getChild(ph_reading_container, "ph_popup").visible = false;
	getChild(ph_reading_container, "ph_text").visible = false;
	getChild(ph_reading_container, "ph_reading").text = "0.0";
	getChild(ph_reading_container, "switch_off").visible = true;
	getChild(ph_reading_container, "switch_on").visible = false;
	ph_reading_container.visible = true;
	turbidity_container.visible = false;
	conductivity_container.visible = false;
	for (var i = 1; i <= 10; i++) {
		getChild(turbidity_container, "lid_anim" + i).visible = false;
	}
	getChild(turbidity_container, "lid_anim1").visible = true;
	getChild(turbidity_container, "turbidity_popup").visible = false;
	getChild(conductivity_container, "light_on").visible = false;
	getChild(conductivity_container, "light_off").visible = true;
	getChild(conductivity_container, "conductivity_popup").visible = false;
	getChild(turbidity_container, "nephelometer_reading").text = "0";
	getChild(conductivity_container, "conductivity_reading").text = "0.0";
}

/** Function for making water movement */
function waterMovement(container) {
	/** Creating interval for making reflection effect in the water */
	setInterval(function() {
		count++;
		waterMove(container, count);
		if (count == 10) {
			count = 0;
		}
	}, 150);
}

/** Function for creating reflection effect in the water */
function waterMove(container, count) {
    /** Initially set all image visibility as zero */
    for (var i = 1; i <= 10; i++) {
        getChild(container, "water_anim" + i).alpha = 0;
    }
    /** Visible images accoding to the counter */
    getChild(container, "water_anim" + count).alpha = 1;
}
