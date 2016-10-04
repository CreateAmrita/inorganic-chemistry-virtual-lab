(function() {
    angular
        .module('users')
        .directive("experiment", directiveFunction)
})();

/** Variable declaration */
var acid_base_titration_stage, exp_canvas;

var tick, timer, turner_timer, start_timer, stirrer_timer;

var titrant_Array = helpArray = reflect_Array = titrate_Array = indicator_Array = [];

var titrant_Type_Array, titrate_Type_Array = [];

var start_flag, turner_start_flag;

var turner_count, start_counter, stir_counter, delay_counter;

var solution_vol, speed_var, titrant_sol, burette_sol, flask_sol;

var end_point_val, initial_titration_point, final_titration_point, scope_temp;

var burette_soln_incr, flask_soln_incr, titrant_incr, dalay_max, drop_y, drop_speed_var;

var normality_titrate, volume_titrate, normality_titrant, volume_titrant;

var mask_flask_rect, mask_burette_rect, turner_rect;

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
            acid_base_titration_stage = new createjs.Stage("demoCanvas");
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
				src: "././images/methyl_orange_yellow_solution.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "conical_flask_solution2",
				src: "././images/methyl_orange_orange_solution.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "conical_flask_solution3",
				src: "././images/methyl_red_solution.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "conical_flask_solution4",
				src: "././images/phenolphthalein_solution.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "conical_flask_solution5",
				src: "././images/colorless_solution.svg",
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
			}]);
			queue.installPlugin(createjs.Sound);
			/** Calling preloader function */
            loadingProgress(queue, acid_base_titration_stage, exp_canvas.width)
            queue.on("complete", handleComplete, this);
            acid_base_titration_stage.enableDOMEvents(true);
            acid_base_titration_stage.enableMouseOver();
            /** Stage update function in a timer */
            tick = setInterval(updateTimer, 100);

            function handleComplete() {
				/** Loading all images in the queue to the stage */
				loadImages(queue.getResult("background"), "background", 0, 0, "", 0, 1);
				loadImages(queue.getResult("burette_solution"), "burette_solution", 335, 70, "", 0, 1);
				loadImages(queue.getResult("stand_and_tube"), "stand_and_tube", 20, 0, "", 0, 1);
				loadImages(queue.getResult("solution_drop"), "drop1", 348, 448, "", 0, 1);
				loadImages(queue.getResult("solution_drop"), "drop2", 348, 475, "", 0, 1);
				loadImages(queue.getResult("solution_drop"), "drop3", 348, 500, "", 0, 1);
				/** Rectangles for masking solutions */
                drawRectangleSolution(mask_flask_rect, 298, 536, 110, 150, 0);
				/** Rectangle for masking burette solution */
				drawRectangleSolution(mask_burette_rect, 335, 161.5, 40, 290, 0);
				/** Rectangle for making turner on and off */
				drawRectangle(turner_rect,324, 384, 20, 20, 0.01, "pointer");
				/** Masking solution in the burette using rectangle */
				getChild(acid_base_titration_stage, "burette_solution").mask = mask_burette_rect;
				for (var i = 1; i <= 5; i++) {
					loadImages(queue.getResult("conical_flask_solution" + i), "conical_flask_solution" + i, 305, 425, "", 0, 1);
					getChild(acid_base_titration_stage, "conical_flask_solution" + i).mask = mask_flask_rect;
					loadImages(queue.getResult("reflect" + i), "reflect" + i, 305, 530, "", 0, 1.5);
					loadImages(queue.getResult("turner" + i), "turner" + i, 323, 373, "", 1, 1);
				}
				for (var i = 1; i <= 6; i++) {
					loadImages(queue.getResult("stirrer" + i), "stirrer" + i, 342, 540, "", 0, 1);
				}
				loadImages(queue.getResult("conical_flask"), "conical_flask", 304, 404, "", 0, 1);
				/** Initializing images */
				initialisationOfImages(scope);
				/** Initializing the variables */
				initialisationOfVariables(scope);
				/** Translation of strings using getext */
				translationLabels();
				/** Calling function for rotating magnetic stirrer and making water reflection effect*/
				waterMovement();
				acid_base_titration_stage.update();
			}
            /** Add all the strings used for the language translation here. '_' is the short cut for 
			calling the gettext function defined in the gettext-definition.js */
            function translationLabels() {
                /** This help array shows the hints for this experiment */
                helpArray = [_("help1"), _("help2"), _("help3"), _("help4"), _("help5"), _("help6"), _("help7"), _("help8"), _("help9"), _("Next"), _("Close")];
                /** Experiment name */
                scope.heading = _("Acid Base Titration");
                /** Initial value for titrant dropdown */
                scope.initial_titrant = _("Hydrochloric acid");
                /** Label for normality of titrate slider */
                scope.normality_label = _("Normality of titrate");
                /** Label for volume of titrate slider */
                scope.volume_label = _("Volume of titrate");
                /** Label for indicators dropdown */
                scope.indicator_label = _("Indicators");
                /** Label for titrate dropdown */
                scope.titrate_label = _("Titrate");
				/** Label for titrant dropdown */
                scope.titrant = _("Titrant");
                /** Initial value for titrate dropdown */
                scope.initial_titrate = _("Sodium hydroxide ");
                /** Initial value for indicators dropdown */
                scope.initial_indicator = _("Methylorange");
                /** Label for oil/fat */
                scope.select_type = _("Select oil/fat");
                /** Label for speed of the titrant slider */
                scope.drop_speed = _("Speed of drops");
                /** Unit for titrant */
                scope.solution_unit = _("ml");
                /** Unit for normality of titrate */
                scope.normality_unit = _("N");
                /** Label in the result */
                scope.titrant_label1 = _("Titrant used");
                /** Error message */
                scope.error_message = _("Invalid indicator ! Please try again...")
                /** Labels for buttons */
                scope.start_exp = _("Start");
                scope.reset_exp = _("reset");
                scope.result = _("Result");
                scope.copyright = _("copyright");
                scope.variables = _("Variables");
                /** The titrant_Array, titrate_Array and indicator_Array contains the values and indexes of the dropdown */
                scope.titrant_Array = [{
                    solution: _('Hydrochloric acid'),
                    type: 0
                }, {
                    solution: _('Sulphuric acid'),
                    type: 1
                }, {
                    solution: _('Hydrobromic acid'),
                    type: 2
                }, {
                    solution: _('Oxalic acid'),
                    type: 3
                }, {
                    solution: _('Acetic acid'),
                    type: 4
                }];
                scope.titrate_Array = [{
                    selected_type: _('Sodium hydroxide'),
                    type: 0
                }, {
                    selected_type: _('Potassium hydroxide'),
                    type: 1
                }, {
                    selected_type: _('Ammonia'),
                    type: 2
                }, {
                    selected_type: _('Sodium carbonate'),
                    type: 3
                }];
                scope.indicator_Array = [{
                    selected_type: _('Methyl orange'),
                    type: 0
                }, {
                    selected_type: _('Phenolphthalein'),
                    type: 1
                }, {
                    selected_type: _('Methyl red'),
                    type: 2
                }];
                scope.$apply();
            }
        }
    }
}

/** Function for creating rectangle for masking burette and conical flask solution */
function drawRectangleSolution(rect_name, x, y, width, height, alpha_val) {
    acid_base_titration_stage.addChild(rect_name);
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
    acid_base_titration_stage.addChild(rect_name);
}

/** Createjs stage updation happens in every interval */
function updateTimer() {
    acid_base_titration_stage.update();
}

/** All the images loading and added to the stage */
function loadImages(image, name, xPos, yPos, cursor, rot, scale) {
    var _bitmap = new createjs.Bitmap(image).set({});
    _bitmap.x = xPos;
    _bitmap.y = yPos;
    _bitmap.name = name;
    _bitmap.scaleX = _bitmap.scaleY = scale;
    _bitmap.rotation = rot;
    _bitmap.cursor = cursor;
    /** Adding bitmap to the stage */
    acid_base_titration_stage.addChild(_bitmap);
}

/** All variables initialising in this function */
function initialisationOfVariables(scope) {
	/** Storing scope to a temporary variable for using in the rectangle press event */
	scope_temp=scope;
	/** Initial value of drop speed slider */
	scope.speed = 0.1;
	/** Initial value of normality of titrate slider */
	scope.normality = 0.1;
	/** Initial value of volume of titrate slider */
	scope.volume = 10;
	/** It disables the dropdown buttons */ 
	scope.dropdown_disable=false;  
	/** Initial value of titrant used in the result part */	
	scope.titrant_used=0;
	/** For enabling and disabling start button */
	scope.start_disable=false;
	/** For enabling and disabling error message and error icon */
	scope.error_display = false;
	/** For enabling and disabling all slider */
	scope.slider_disable = false;
	/** For making turner off and on in the rectangle press event */
	turner_start_flag=false;
	/** Initial label for start button */
	scope.start_exp = _("Start");
    /** Array for storing acid type  */
    titrant_Type_Array = ["strongacid", "strongacid", "strongacid", "weakacid", "weakacid"];
    /** Array for storing base type  */
    titrate_Type_Array = ["strongbase", "strongbase", "weakbase", "weakbase"];
    /** Array for storing indicator type*/
    indicator_Type_Array = ["methylorange", "phenolphthaline", "methylred"];
    start_flag = false;
    count = 0;
	/** Variables used to adjust the timer */
    dalay_max = 500;
    /** Variable used in timers */
    stir_counter = 0;
    turner_count = 0;
    /** Variable used to show the volume of solution with in the flask and burette */
    solution_vol = 0;
    /** Variable used to adjust speed of the drop */
    speed_var = 800;
    /** Variables used to adjust the timer */
    delay_counter = 2500;
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
    /** Variable used to stop the whole titration process */
    final_titration_point = 50;
    /** Used to calculate y point of the drop */
    drop_y = 530;
    /** Initial value for normality of titrate slider*/
    normality_titrate = 0.1;
    /** Initial value for volume of titrate slider*/
    volume_titrate = 10;
    /** Fixed value for normality of titrant */
    normality_titrant = 1;
    volume_titrant = 0;
    drop_speed_var = 0.1;
    initial_rect_pos = 536;
    initial_reflect_pos = 530;
    selected_titrant_type = "strongacid";
    selected_titrate_type = "strongbase";
    selected_indicator_type = "methylorange";
}

/** All images are initialising in this function */
function initialisationOfImages(scope){
	getChild(acid_base_titration_stage, "background").alpha = 1;
	getChild(acid_base_titration_stage, "stand_and_tube").alpha = 1;
	getChild(acid_base_titration_stage, "burette_solution").alpha = 1;
	getChild(acid_base_titration_stage, "conical_flask").alpha = 1;
	getChild(acid_base_titration_stage, "drop1").alpha = 0;
	getChild(acid_base_titration_stage, "drop2").alpha = 0;
	getChild(acid_base_titration_stage, "drop3").alpha = 0;
	for (var i = 1; i <= 5; i++) {
		getChild(acid_base_titration_stage, "conical_flask_solution"+i).alpha = 0;
		getChild(acid_base_titration_stage, "reflect"+i).alpha = 0;
		getChild(acid_base_titration_stage, "reflect"+i).x=305;
		getChild(acid_base_titration_stage, "reflect"+i).y=530;
		getChild(acid_base_titration_stage, "reflect" + i).scaleX = 1.5;
		getChild(acid_base_titration_stage, "turner"+i).alpha = 0;
	}
	for (var i = 1; i <= 6; i++) {
		getChild(acid_base_titration_stage, "stirrer"+i).alpha=0;
	}
	getChild(acid_base_titration_stage, "turner1").alpha = 1;
	getChild(acid_base_titration_stage, "conical_flask_solution1").alpha = 1;
}

/** Function for rotating stirrer and making reflecting effect in the water from the beginning */
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
        getChild(acid_base_titration_stage, "reflect" + i).alpha = 0;
    }
    /** Visible images accoding to the timer count */
    getChild(acid_base_titration_stage, "reflect" + count).alpha = 1;
}

/** Function for rotating magnetic stirrer */
function stirrerRotate(count) {
    for (var i = 1; i <= 6; i++) {
        getChild(acid_base_titration_stage, "stirrer" + i).alpha = 0;
    }
    getChild(acid_base_titration_stage, "stirrer" + count).alpha = 1;
}
