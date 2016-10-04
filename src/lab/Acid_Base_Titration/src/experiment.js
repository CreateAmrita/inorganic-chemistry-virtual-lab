/** Event handling functions starts here */
/** Function for starting the experiment */
function startExperiment(scope) {
    /** If the selected acid is strong and base is weak then we can only use methyl orange and methyl red as indicator, then only 
	we can start the experiment otherwise display error message */
    if (selected_titrant_type == "strongacid" && selected_titrate_type == "weakbase") {
        if (selected_indicator_type == "phenolphthaline") {
            document.getElementById('errorIcon').style.display = "block";
			scope.error_display = true;
			turner_rect.mouseEnabled = false;
        } else {
			turner_rect.mouseEnabled = true;
            startExp(scope);
        }
    }
    /** If the selected acid is weak and base is strong then we can use phenolphthaline as indicator, then only we can start the 
	experiment otherwise display error message */
    else if (selected_titrant_type == "weakacid" && selected_titrate_type == "strongbase") {
        if (selected_indicator_type == "methylorange" || selected_indicator_type == "methylred") {
           document.getElementById("errorIcon").style.display = "block";
		   scope.error_display = true;
		   turner_rect.mouseEnabled = false;
        } else {
			turner_rect.mouseEnabled = true;
			startExp(scope);
        }
    }
    /** If the selected acid and base is weak we can not able to select indicator, and not able to start experiment */
    else if (selected_titrant_type == "weakacid" && selected_titrate_type == "weakbase") {
        if (selected_indicator_type == "methylorange" || selected_indicator_type == "methylred" || selected_indicator_type == "phenolphthaline") {
            document.getElementById("errorIcon").style.display = "block";
			scope.error_display = true;
			turner_rect.mouseEnabled = false;
        } else {
			turner_rect.mouseEnabled = true;
            startExp(scope);
        }
    }
    /** If both acid and base is strong selection of all indicator is possible */
    else {
		turner_rect.mouseEnabled = true;
        startExp(scope);
    }
}

/** Function for starting the experiment */
function startExp(scope) {
    if (!start_flag) {
        /** Denote experiment is started */
        start_flag = true;
        scope.start_exp = _("Stop");
        scope.dropdown_disable = true;
        scope.slider_disable = true;
		scope.error_display = false;
        /** Interval for setting turner on */
		turner_timer = setInterval(function() {
			turner_count++;
			if (turner_count == 5) {
				clearInterval(turner_timer);
			}
			turnerRotate(turner_count)
		}, 50);
        getChild(acid_base_titration_stage, "drop1").y = 448;
        dropDown();
        /** Calls calculate function with in an interval */
        startTitration(scope);
    } else {
        /** Clears the interval for calling calculateFn */
        clearInterval(start_counter);
        clearFn();
        scope.start_exp = _("Start");
        start_flag = false;
    }
}

/** Function for making turner off and on*/
turner_rect.on("click", function() {
	/** Making turner on */
	if(!turner_start_flag) {
		turner_start_flag = true;
	}
	/** Making turner off */
	else {
		turner_start_flag = false;
	}
	startExperiment(scope_temp);
	scope_temp.$apply();
});

/** Function for resetting the experiment */
function resetFn(scope) {
	turner_rect.mouseEnabled = true;
    initialisationOfImages(scope);
	initialisationOfVariables(scope);
	scope.indicator_type = scope.indicator_Array[0];
	scope.titrate_soln = titrate_Array[0];                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
	scope.titrant_soln = titrant_Array[0];
	clearInterval(start_counter);
	mask_flask_rect.y=536;
	mask_burette_rect.y=161.5;
}

/** Function for changing the volume of titrate */
function changeVolumeFn(scope) {
    var _volume = scope.volume - 10;
    var _changing_volume = (_volume / 5);
    mask_flask_rect.y = initial_rect_pos - _changing_volume;
    for (var i = 1; i <= 5; i++) {
        getChild(acid_base_titration_stage, "reflect" + i).y = initial_reflect_pos - _changing_volume;
    }
}

/** Function for denoting which titrant is selected */
function selectTitrantFn(scope) {
    selected_titrant_type = titrant_Type_Array[scope.titrant_soln];
	scope.error_display = false;
	turner_rect.mouseEnabled = true;
}

/** Function for denoting which titrate is selected */
function selectTitrateFn(scope) {
    selected_titrate_type = titrate_Type_Array[scope.titrate_soln];
	scope.error_display = false;
	turner_rect.mouseEnabled = true;
}

/** Function for changing indicator according to selection */
function selectIndicatorFn(scope) {
    selected_indicator_type = indicator_Type_Array[scope.indicator_type];
	scope.error_display = false;
	turner_rect.mouseEnabled = true;
    if (scope.indicator_type == 0 || scope.indicator_type == 2) {
        selectSolution("conical_flask_solution1")
    } else {
        selectSolution("conical_flask_solution4")
    }
}

/** Function for changing the speed of the drop */
function changeDropSpeedFn(scope) {
	var _current_speed = scope.speed;
    delay_counter = dalay_max / _current_speed;
	drop_speed_var = scope.speed;
	if (start_flag == true) {
		startTitration(scope);
	}
}
/** Event handling functions ends here */

/** Calclation function starts here */
function calculateFn(scope) {
	/** Calculate the solution level in each interval */
	burette_sol = solution_vol + burette_soln_incr;
	flask_sol = solution_vol + flask_soln_incr;
	/** Adjust drop's y position according to the movement of solution in the conical flask */
	drop_y = drop_y - flask_soln_incr;
	/** Calculate the value for titrant used */
	titrant_sol = parseFloat((titrant_sol + titrant_incr).toFixed(1));
	/** Display the value for titrant used */
	scope.titrant_used = titrant_sol;
	/** Volume of titrant is caluculated using the formula, Volume of titrant (V2) = (N1*V1)/N2 , here N1 is the normality of titrate, 
V1 is volume of titrate	and N2 is normality of titrant and volume of titrant is considered as end point */
	normality_titrate = scope.normality;
	volume_titrate = scope.volume;
	volume_titrant = (normality_titrate * volume_titrate) / normality_titrant;
	end_point_val = volume_titrant;
	scope.$apply();
	if (start_flag == true) {
		/** After starting experiment fill and unfill the flask solution and burette solution respectively */
		mask_flask_rect.y -= flask_sol;
		mask_burette_rect.y += burette_sol;
		/** When titrant used reaches the endpoint, observe for the color change*/
		if (titrant_sol >= end_point_val) {
			/** If the indicator used is methyl orange, yellow to orange red color change will obtain */
			if (selected_indicator_type == "methylorange") {
				selectSolution("conical_flask_solution2")
			}
			/** If the indicator used is phenolphthaline, purple solution will become colorless  */
			else if (selected_indicator_type == "phenolphthaline") {
				selectSolution("conical_flask_solution5")
			}
			/** If the indicator used is methyl red, yellow to red color change will obtain */
			else {
				selectSolution("conical_flask_solution3")
			}
			if (titrant_sol >= final_titration_point) {
				scope.start_disable = true;
				turner_rect.mouseEnabled = false;
				clearFn();
			}
		}
		/** Based on the water level , adjusting the water's reflecting movement */
		for (var i = 1; i <= 5; i++) {
			getChild(acid_base_titration_stage, "reflect" + i).y -= flask_sol;
			if (getChild(acid_base_titration_stage, "reflect" + i).y <= 519) {
				getChild(acid_base_titration_stage, "reflect" + i).x += flask_sol / 2;
				getChild(acid_base_titration_stage, "reflect" + i).scaleX -= flask_sol / 60.3;
				if (getChild(acid_base_titration_stage, "reflect" + i).y <= 465) {
					clearInterval(start_counter);
				}
			}
		}
	} else {
		clearInterval(start_counter);
	}
}
/** Calclation function ends here */

/** Function for clearing all the functionality when experiment ends */
function clearFn() {
    /** Deactivate start and add starch button */
    start_flag = false;
    getChild(acid_base_titration_stage, "drop1").alpha = 0;
    getChild(acid_base_titration_stage, "drop2").alpha = 0;
    getChild(acid_base_titration_stage, "drop3").alpha = 0;
    /** Timer for closing the burette lid */
    turner_timer = setInterval(function() {
        turner_count--;
        if (turner_count == 1) {
            clearInterval(turner_timer);
        }
        turnerRotate(turner_count)
    }, 50);
    /** Clear the interval */
    clearInterval(start_counter);
}

/** Function for setting the downward movement of the solution drop */
function dropDown() {
    if (start_flag == true) {
		/** After starting the experiment adjust the number of drops according to the speed of titrant slider value*/
        getChild(acid_base_titration_stage, "drop1").alpha = 1;
        if (drop_speed_var >= 0.1 && drop_speed_var <= 0.4) {
            var drop_tween = createjs.Tween.get(getChild(acid_base_titration_stage, "drop1")).to({
                y: drop_y
            }, 800).call(dropUp);
        } else if (drop_speed_var >= 0.4 && drop_speed_var <= 0.7) {
            var drop_tween = createjs.Tween.get(getChild(acid_base_titration_stage, "drop1")).to({
                y: 475
            }, 500);
            var drop_tween1 = createjs.Tween.get(getChild(acid_base_titration_stage, "drop2")).to({
                y: drop_y
            }, 500).call(dropUp);
        } else if (drop_speed_var >= 0.7 && drop_speed_var <= 1) {
            var drop_tween = createjs.Tween.get(getChild(acid_base_titration_stage, "drop1")).to({
                y: 475
            }, 500);
            var drop_tween1 = createjs.Tween.get(getChild(acid_base_titration_stage, "drop2")).to({
                y: 500
            }, 500);
            var drop_tween2 = createjs.Tween.get(getChild(acid_base_titration_stage, "drop3")).to({
                y: drop_y
            }, 500).call(dropUp);
        }
    } else {
        getChild(acid_base_titration_stage, "drop1").alpha = 0;
        getChild(acid_base_titration_stage, "drop2").alpha = 0;
        getChild(acid_base_titration_stage, "drop3").alpha = 0;
    }
}

/** Function for setting the upward movement of the solution drop */
function dropUp() {
	/** After completing tween set the initial point for each of the drop*/
    if (start_flag == true) {
        if (drop_speed_var >= 0.1 && drop_speed_var <= 0.4) {
            getChild(acid_base_titration_stage, "drop1").y = 446;
            getChild(acid_base_titration_stage, "drop2").alpha = 0;
			getChild(acid_base_titration_stage, "drop3").alpha = 0;
        } else if (drop_speed_var >= 0.4 && drop_speed_var <= 0.7) {
            getChild(acid_base_titration_stage, "drop1").y = 446;
            getChild(acid_base_titration_stage, "drop2").y = 475;
            getChild(acid_base_titration_stage, "drop2").alpha = 1;
            getChild(acid_base_titration_stage, "drop3").alpha = 0;
        } else if (drop_speed_var >= 0.7 && drop_speed_var <= 1) {
            getChild(acid_base_titration_stage, "drop1").y = 446;
            getChild(acid_base_titration_stage, "drop2").y = 475;
            getChild(acid_base_titration_stage, "drop3").y = 500;
            getChild(acid_base_titration_stage, "drop2").alpha = 1;
            if (drop_y >= 520) {
                getChild(acid_base_titration_stage, "drop3").alpha = 1;
            }
        }
    }
    dropDown();
}

/** Function for turning turner on and off */
function turnerRotate(inr) {
    for (var i = 1; i <= 5; i++) {
        getChild(acid_base_titration_stage, "turner" + i).alpha = 0;
    }
    getChild(acid_base_titration_stage, "turner" + inr).alpha = 1;
}

/** Function for beginning the titration */
function startTitration(scope) {
    clearInterval(start_counter);
    start_counter = setInterval(function() {
        calculateFn(scope);
    }, delay_counter);
}

/** Function used to make only selected solution visible */
function selectSolution(name) {
    for (var i = 1; i <= 4; i++) {
        getChild(acid_base_titration_stage, "conical_flask_solution" + i).alpha = 0;
    }
    getChild(acid_base_titration_stage, name).alpha = 1;
}

/** Function for adding child to the stage and return the result */
function getChild(stage,name) {
    return stage.getChildByName(name);
}