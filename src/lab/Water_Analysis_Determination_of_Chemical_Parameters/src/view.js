(function() {
    angular
        .module('users')
        .directive("experiment", directiveFunction)
})();

/**variable declaration*/
var water_analysis_stage, exp_canvas;

var titration_container, cod_container;

var tick, timer, turner_timer, start_timer, stirrer_timer;

var test_Array = helpArray = reflect_Array = titrate_Array = endpoint_Array = Type_Array = water_Sample_Array = indicator_Array = [];

var water_Sample_Type = cod_Sample_Water_Array = selected_test_Array = indicator_Type_Array = alkalinity_indicator = [];

var start_flag, indicator_flag;

var turner_count, start_counter, stir_counter, delay_counter;

var solution_vol, speed_var, titrant_sol, burette_sol, flask_sol, selected_type_var;

var end_point_val, initial_titration_point, final_titration_point;

var burette_soln_incr, flask_soln_incr, titrant_incr, speed_max, dalay_max, drop_y, drop_speed_var, soln_y_initial;

var mask_flask_rect, mask_burette_rect, turner_rect;

var selected_test, sample_water_type, cod_const, volume_of_fas, volume_of_sample, selected_volume;

var volume_of_edta, hardness_const, titrate_hardness, selected_test, volume_of_hcl, alkalinity_const;

var normality_pot_dichromat, volume_pot_dichromate, volume_of_blank, cod_value, volume_of_cod_sample;

var alkalinity_value, selected_water_type, selected_normality, selected_cod_normality, selected_molarity, water_sample_index;

mask_flask_rect = new createjs.Shape();

mask_burette_rect = new createjs.Shape();

turner_rect = new createjs.Shape();

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
				id: "background",
				src: "././images/background.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "stand_and_tube",
				src: "././images/stand_and_tube.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "stirrer1",
				src: "././images/stirrer1.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "stirrer2",
				src: "././images/stirrer2.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "stirrer3",
				src: "././images/stirrer3.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "stirrer4",
				src: "././images/stirrer4.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "stirrer5",
				src: "././images/stirrer5.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "stirrer6",
				src: "././images/stirrer6.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "conical_flask",
				src: "././images/conical_flask.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "conical_flask_solution1",
				src: "././images/conical_flask_solution1.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "conical_flask_solution2",
				src: "././images/conical_flask_solution2.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "conical_flask_solution3",
				src: "././images/conical_flask_solution3.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "conical_flask_solution4",
				src: "././images/conical_flask_solution4.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "conical_flask_solution5",
				src: "././images/conical_flask_solution5.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "conical_flask_solution6",
				src: "././images/conical_flask_solution6.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "conical_flask_solution7",
				src: "././images/conical_flask_solution7.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "burette_solution",
				src: "././images/burette_solution.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "reflect1",
				src: "././images/reflect1.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "reflect2",
				src: "././images/reflect2.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "reflect3",
				src: "././images/reflect3.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "reflect4",
				src: "././images/reflect4.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "reflect5",
				src: "././images/reflect5.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "turner1",
				src: "././images/turner1.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "turner2",
				src: "././images/turner2.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "turner3",
				src: "././images/turner3.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "turner4",
				src: "././images/turner4.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "turner5",
				src: "././images/turner5.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "solution_drop",
				src: "././images/solution_drop.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "cod_background",
				src: "././images/cod_background.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "clock",
				src: "././images/clock.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "clock_needle",
				src: "././images/clock_needle.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "cod_conical_flask",
				src: "././images/cod_conical_flask.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "cod_conical_flask_solution",
				src: "././images/cod_conical_flask_solution.svg",
				type: createjs.LoadQueue.IMAGE
			}]);
			queue.installPlugin(createjs.Sound);
            loadingProgress(queue, water_analysis_stage, exp_canvas.width)
            queue.on("complete", handleComplete, this);
            water_analysis_stage.enableDOMEvents(true);
            water_analysis_stage.enableMouseOver();
            /** Stage update function in a timer */
            tick = setInterval(updateTimer, 100);
            titration_container = new createjs.Container();
            titration_container.name = "titration_container";
            cod_container = new createjs.Container();
            cod_container.name = "cod_container";

            function handleComplete() {
                /** Loading all images in the queue to the stage */
                loadImages(queue.getResult("background"), "background", 0, 0, "", 0, 1, titration_container);
                loadImages(queue.getResult("burette_solution"), "burette_solution", 335, 70, "", 0, 1, titration_container);
                loadImages(queue.getResult("stand_and_tube"), "stand_and_tube", 20, 0, "", 0, 1, titration_container);
                loadImages(queue.getResult("solution_drop"), "drop1", 348, 448, "", 0, 1, titration_container);
                loadImages(queue.getResult("solution_drop"), "drop2", 348, 475, "", 0, 1, titration_container);
                loadImages(queue.getResult("solution_drop"), "drop3", 348, 500, "", 0, 1, titration_container);
                /** Rectangles for masking solutions */
                drawRectangleSolution(mask_flask_rect, 298, 536, 110, 150, 0);
                /** Rectangle for masking burette solution */
                drawRectangleSolution(mask_burette_rect, 335, 161.5, 40, 290, 0);
                /** Rectangle for making turner on and off */
                drawRectangle(turner_rect, 324, 384, 20, 20, 0.01, "pointer");
                /** Masking solution in the burette using rectangle */
                getChild(titration_container, "burette_solution").mask = mask_burette_rect;
                for (var i = 1; i <= 7; i++) {
                    loadImages(queue.getResult("conical_flask_solution" + i), "conical_flask_solution" + i, 305, 425, "", 0, 1, titration_container);
                    getChild(titration_container, "conical_flask_solution" + i).mask = mask_flask_rect;
                }
                for (var i = 1; i <= 6; i++) {
                    loadImages(queue.getResult("stirrer" + i), "stirrer" + i, 342, 540, "", 0, 1, titration_container);
                }
                for (var i = 1; i <= 5; i++) {
                    loadImages(queue.getResult("reflect" + i), "reflect" + i, 305, 530, "", 0, 1.5, titration_container);
                    loadImages(queue.getResult("turner" + i), "turner" + i, 323, 373, "", 1, 1, titration_container);
                }
                loadImages(queue.getResult("conical_flask"), "conical_flask", 304, 404, "", 0, 1, titration_container);
                water_analysis_stage.addChild(titration_container);
                loadImages(queue.getResult("cod_background"), "cod_background", 0, 0, "", 0, 1, cod_container);
                loadImages(queue.getResult("cod_conical_flask"), "cod_conical_flask", 303, 459, "", 0, 1, cod_container);
                loadImages(queue.getResult("clock"), "clock", 510, 100, "", 0, 1, cod_container);
                loadImages(queue.getResult("clock_needle"), "clock_needle", 576, 165, "", 0, 1, cod_container);
                water_analysis_stage.addChild(cod_container);
                cod_container.alpha = 0;
                /** Label for clock */
                setText("clock_text", 540, 145, "30 minutes ", "", 0.9, cod_container, 0);
                /** Initializing the variables */
                initialisationOfVariables(scope);
                /** Initializing all the images */
                initialisationOfImages();
                /** Translation of strings using getext */
                translationLabels();
                /** Function for making water reflection and rotating magnetic stirrer */
                waterMovement();
                water_analysis_stage.update();
            }

            /** Add all the strings used for the language translation here. '_' is the short cut for calling the 
			gettext function defined in the gettext-definition.js */
            function translationLabels() {
                /** This help array shows the hints for this experiment */
                helpArray = [_("help1"), _("help2"), _("help3"), _("help4"), _("help5"), _("help6"), _("help7"), _("help8"), _("help9"), _("help10"), _("help11"), _("help12"), _("help13"), _("help14"), _("help15"), _("Next"), _("Close")];
                /** Experiment name */
                scope.heading = _("Water Analysis : Chemical Content");
                scope.variables = _("Variables");
                /** Initial value for select test dropdown */
                scope.initial_test = _("Hardness");
                /** Label for select test dropdown */
                scope.test_label = _("Select test");
                /** Label for titrant */
                scope.titrant_label = _("Titrant");
                /** Value for titrant in the test for hardness */
                scope.titrant_val = _("EDTA");
                /** Label for speed of the drop slider */
                scope.drop_speed = _("Speed of titrant");
                /** Label for molarity slider */
                scope.molarity_label = _("Molarity of titrant");
                /** Label for titrate dropdown */
                scope.titrate_label = _("Titrate");
                /** Unit for titrant */
                scope.titrant_unit = _("ml");
                /** Label for volume of titrate slider */
                scope.volume_label = _("Volume of titrate");
                /** Label for indicator */
                scope.indicator_label = _("Indicator");
                /** Initial value for titrate dropdown */
                scope.initial_titrate = _("Well water");
                /** Labels in the result */
                scope.titrant_label1 = _("Titrant used");
                scope.titrant_label_v1 = _("Titrant used, V1");
                scope.titrant_label_v2 = _("Titrant used, V2");
                /** Label for water sample in cod section */
                scope.water_sample_label = _("Select water sample");
                /** Initial value for select water sample dropdown */
                scope.initial_water_sample = _("Blank (20" + _("ml") + ")");
                /** Label for normaliy slider */
                scope.normality_label = _("Normality");
                /** Value for titrant in the test for cod */
                scope.titrant_cod_val = _("Ferrous ammonium sulphate");
                /** Value for indicator in the test for cod */
                scope.indicator_cod = _("Ferroin");
                /** Value for indicator in the test for hardness */
                scope.indicator_hardness = _("Erichrome Black T");
                /** Initial value for indicator in the indicator dropdown */
                scope.initial_indicator = _("Phenolphthaline");
                /** Value for titrant in the test for alkalinity */
                scope.alkalinity_titrant = _("HCl");
                /** Value for titrate in the test for alkalinity */
                scope.titrate_alkalinity = _("Well water (PH > 10)")
                    /** Error message */
                scope.error_message = _("Plese select phenolphthaline indicator first, followed by methyl orange indicator");
                /** Label for procedure and instruction in cod */
                scope.procedure = _("Procedure");
                scope.instruction1 = _("instruction1");
                scope.instruction2 = _("instruction2");
                scope.instruction3 = _("instruction3");
                scope.instruction4 = _("instruction4");
                scope.instruction5 = _("instruction5");
                /** Lables for buttons */
                scope.mantle_label = _("Switch on mantle");
                scope.titration_label = _("Start titration");
                scope.start_exp = _("Start");
                scope.reset_exp = _("reset");
                scope.result = _("Result");
                scope.copyright = _("copyright");
                /** The test_array, titrate_Array, water_Sample_Array and indicator_Array contains the values and 
				indexes of the dropdown */
                scope.test_Array = [{
                    solution: _('Hardness'),
                    type: 0
                }, {
                    solution: _('Alkalinity'),
                    type: 1
                }, {
                    solution: _('COD'),
                    type: 2
                }];
                scope.titrate_Array = [{
                    selected_type: _('Well water'),
                    type: 0
                }, {
                    selected_type: _('Tap water'),
                    type: 1
                }, {
                    selected_type: _('Sea water'),
                    type: 2
                }];
                scope.water_Sample_Array = [{
                    selected_water: _("Blank (20" + _("ml") + ")"),
                    type: 0
                }, {
                    selected_water: _("Tap water (20" + _("ml") + ")"),
                    type: 1
                }, {
                    selected_water: _("Well water (20" + _("ml") + ")"),
                    type: 2
                }, {
                    selected_water: _("Domestic waste water (20" + _("ml") + ")"),
                    type: 3
                }];
                scope.indicator_Array = [{
                    selected_indicator: _("Phenolphthaline"),
                    type: 0
                }, {
                    selected_indicator: _("Methyl orange"),
                    type: 1
                }]
                scope.$apply();
            }
        }
    }
}

/** Function for creating rectangle for masking burette and conical flask solution */
function drawRectangleSolution(rect_name, x, y, width, height, alpha_val) {
    water_analysis_stage.addChild(rect_name);
    rect_name.x = x;
    rect_name.y = y;
    rect_name.graphics.beginFill("red").drawRect(0, 0, width, height).command;
    rect_name.alpha = alpha_val;
}

/** Function for creating rectangle */
function drawRectangle(rect_name, x, y, width, height, alpha_val, cursor) {
    rect_name.graphics.beginFill("red").drawRect(x, y, width, height);
    rect_name.alpha = alpha_val;
    rect_name.cursor = cursor;
    water_analysis_stage.addChild(rect_name);
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
    _text.alpha = alpha
    container.addChild(_text); /** Adding text to the container */
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
    /**make images visible*/
    if (name == "clock_needle") {
        _bitmap.regX = _bitmap.image.width / 2;
        _bitmap.regY = _bitmap.image.height / 2;
    }
    /** Adding bitmap to the stage */
    container.addChild(_bitmap);
}

/** All variables initialising in this function */
function initialisationOfVariables(scope) {
    /** Storing scope to a temporary variable for using in the rectangle press event */
    scope_temp = scope;
	/** It enables and disables the titrate dropdown */
    scope.titration_display = true;
	/** It enables and disables the COD UI */
    scope.cod_titration = false;
	/** It enables and disables the mantle button */
    scope.mantle_disable = false;
	/** It enables and disables the controls for COD titration UI */
    scope.cod_titration_display = false;
	/** It enables and disables the select test dropdown */
    scope.cod_disable = false;
	/** It enables and disables controls and result for test for hardness */
    scope.hardness_display = true;
	/** It enables and disables result tab */
    scope.result_show = true;
	/** It enables and disables controls and result for test for alkalinity */
    scope.alkalinity_display = false;
	/** It enables and disables the controls for COD UI */
    scope.cod_display = false;
	/** It enables the error message while selecting methyl orange indicator*/
	scope.error_display = false;
	/** It enables and disables the all sliders */
	scope.slider_disable = false;
	/** Initial label for start button */
	scope.start_exp = _("Start");
    scope.normality = 0.01;
    scope.normality_cod = 0.1
	/** Initial value of drop speed slider */
    scope.speed = 0.1;
	/** initial value of molarity slider */	
    scope.molarity = 0.01; 
	/** It enables and disables the dropdowns */
    scope.dropdown_disable = false;
	/** Initial value in the result part */
    scope.titrant_used = 0; 
	/**initial value or volume slider*/
    scope.volume = 10; 
    /** Array for storing water sample in the test for cod */
    water_Sample_Type = ["blank", "tap_water", "well_water", "domestic_waste"]
        /** For making turner off and on in the rectangle press event */
    turner_start_flag = false;
    /** Initial value for start flag */
    start_flag = false;
    count = 0;
    /** Variable used in timers */
    stir_counter = 0;
    turner_count = 0;
    /** Set maximum value for the drop of the solution */
    speed_max = 6000;
    /** Variable used to show the volume of solution with in the flask and burette */
    solution_vol = 0;
    /** Variable used to adjust speed of the drop */
    speed_var = 800;
    /** Variables used to adjust the timer */
    dalay_max = 500;
    delay_counter = 2500;
    /** Varible used to identify which titrate is selected, set it as blank */
    selected_type_var = "blank";
    /** If the selected titrate is blank, set its end point as 65 */
    end_point_val = 65;
    /** Used to show the level of titrant used */
    titrant_sol = 0;
    burette_sol = 0;
    flask_sol = 0;
    /** Used to calculate the level of solution in the burette */
    burette_soln_incr = 0.362;
    /** Used to calculate the level of solution in the conical flask */
    flask_soln_incr = 0.05;
    /** Used for calculating titrant used in the result area */
    titrant_incr = 0.1;
    /** The initial point that make first reaction in the conical flask solution */
    initial_titration_point = 38;
    /** Variable used to stop the whole titration process */
    final_titration_point = 50;
    /** Used to calculate y point of the drop */
    drop_y = 540;
    soln_y_initial = 448;
    drop_speed_var = 0.1;
    initial_reflect_pos = 530;
    initial_rect_pos = 536;
    /** Initial value for tirant used in the test for alkalinity */
    scope.titrant_used_v1 = 0;
    scope.alkalinity_v2 = false;
    /** Variable used for identifying the selected sample in the test for cod */
    sample_water_type = "blank";
    /** Array that stores types of samples in test for cod */
    cod_Sample_Water_Array = ["blank", "tap_water", "well_water", "domestic_waste"];
    /** Array that stores types of test */
    selected_test_Array = ["hardness", "alkalinity", "cod"];
    /** Set initial hardness value for titrate in the test for hardness */
    titrate_hardness = 250;
    /** Set initially selected test as hardness */
    selected_test = "hardness";
    volume_of_edta = 0;
    /** Constant value for hardness constant */
    hardness_const = 0.1;
    /** Constant value for alkalinity constant */
    alkalinity_const = 50000;
    volume_of_hcl = 0;
    /** constant value for normality pot dichromate */
    normality_pot_dichromate = 0.25;
    /** Constant value for volume potassium dichromate */
    volume_pot_dichromate = 10;
    volume_of_blank = 0;
    cod_value = 16;
    /** Constant value for volume of cod sample */
    volume_of_cod_sample = 20;
    /** Constant value for cod constant */
    cod_const = 8000;
    volume_of_fas = 0;
    volume_of_sample = 0;
    /** Initial value for volume slider*/
    selected_volume = 10;
    /** Initialize selected water sample as blank in the COD distillation process */
    selected_water_type = "blank";
    /** Initialize alkalinity value for phenolphthaline indicator */
    alkalinity_value = 433;
    /** Flag for checking whether the phenolphthaline indicator selected initially or not in alkalinity test */
    indicator_flag = false;
    /** Array for storing indicators used in alkalinity test */
    indicator_Type_Array = ["phenolphthaline", "methyl_orange"];
    /** Set indicator as phenolphthaline by default */
    alkalinity_indicator = "phenolphthaline";
    /** Initial value for molarity slider */
    selected_molarity = 0.01;
    /** Initial value for normality slider in test for alkalinity */
    selected_normality = 0.01;
    /** Initial value for normality slider in test for COD */
    selected_cod_normality = 0.1;
	/** Storing selected index value for the 'select sample' dropdown in COD distillation process */
	water_sample_index=0
}

/** All images are initialising in this function */
function initialisationOfImages() {
    getChild(titration_container, "background").alpha = 1;
    getChild(titration_container, "stand_and_tube").alpha = 1;
    getChild(titration_container, "burette_solution").alpha = 1;
    getChild(titration_container, "conical_flask").alpha = 1;
    getChild(titration_container, "drop1").alpha = 0;
    getChild(titration_container, "drop2").alpha = 0;
    getChild(titration_container, "drop3").alpha = 0;
    for (var i = 1; i <= 5; i++) {
        getChild(titration_container, "reflect" + i).alpha = 0;
        getChild(titration_container, "reflect" + i).x = 305;
        getChild(titration_container, "reflect" + i).y = 530;
        getChild(titration_container, "reflect" + i).scaleX = 1.5;
        getChild(titration_container, "turner" + i).alpha = 0;
    }
    for (var i = 1; i <= 7; i++) {
        getChild(titration_container, "conical_flask_solution" + i).alpha = 0;
    }
    for (var i = 1; i <= 6; i++) {
        getChild(titration_container, "stirrer" + i).alpha = 0;
    }
    getChild(titration_container, "turner1").alpha = 1;
    getChild(titration_container, "conical_flask_solution1").alpha = 1;
    getChild(cod_container, "cod_background").alpha = 1;
    getChild(cod_container, "cod_conical_flask").alpha = 1;
    getChild(cod_container, "clock").alpha = 1;
    getChild(cod_container, "clock_needle").alpha = 1;
    getChild(cod_container, "clock_needle").rotation = 0;
    getChild(cod_container, "clock_text").alpha = 0;
    cod_container.removeChild(getChild(cod_container, "cod_conical_flask_solution"));
}

/** Function for rotating stirrer and making reflecting effect in the water from the beginning **/
function waterMovement() {
    /** Creating timer for rotating magnetic_stirrer */
    setInterval(function() {
        stir_counter++;
        stirrerRotate(stir_counter);
        if (stir_counter >= 6) {
            stir_counter = 0;
        }
    }, 50);
    /** Creating timer for making reflection effect in the water */
    setInterval(function() {
        count++;
        waterReflect(count);
        if (count == 5) {
            count = 1;
        }
    }, 100);
}

/** Function for creating reflection effect in the water */
function waterReflect(count) {
    /** Initially set all image visibility as zero */
    for (var i = 1; i <= 5; i++) {
        getChild(titration_container, "reflect" + i).alpha = 0;
    }
    /** Visible images accoding to the count */
    getChild(titration_container, "reflect" + count).alpha = 1;
}

/** Function for rotating magnetic stirrer */
function stirrerRotate(count) {
    for (var i = 1; i <= 6; i++) {
        getChild(titration_container, "stirrer" + i).alpha = 0;
    }
    getChild(titration_container, "stirrer" + count).alpha = 1;
}