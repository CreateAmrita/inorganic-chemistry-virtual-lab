/** Event handling functions starts here */
/** Function for starting the experiment */
function startExperiment(scope) {
    if (!start_flag) {
        /** Denote experiment is started */
        start_flag = true;
        scope.start_exp = _("Stop");
        scope.titrate_disable = true;
        scope.dropdown_disable = true;
        scope.slider_disable = true;
		scope.cod_disable = true;
        /** Interval for setting turner on */
        turner_timer = setInterval(function() {
            turner_count++;
            if (turner_count == 5) {
                clearInterval(turner_timer);
            }
            turnerRotate(scope, turner_count)
        }, 50);
        getChild(titration_container, "drop1").y = 448;
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

/** Function for making turner off and on */
turner_rect.on("click", function() {
    /** Making turner on */
    if (!turner_start_flag) {
        turner_start_flag = true;
        startExperiment(scope_temp);
    }
    /** Making turner off */
    else {
        turner_start_flag = false;
        startExperiment(scope_temp);
    }
    scope_temp.$apply();
});

/** Function for switching on the mantle */
function switchOnMantleFn(scope) {
    scope.mantle_disable = true;
	scope.cod_disable = true;
	scope.dropdown_disable = true;
    needleTween(scope);
}

/** Function that defines needle rotation */
function needleTween(scope) {
    var needle_rotation_tween = createjs.Tween.get(getChild(cod_container, "clock_needle")).to({
        rotation: 180
    }, 3000).call(function() {
        mantleComplete(scope)
    });
}

/** Function that called after finishing roration of the needle */
function mantleComplete(scope) {
    getChild(cod_container, "clock_text").alpha = 1;
    scope.cod_titration = true;
    loadImages(queue.getResult("cod_conical_flask_solution"), "cod_conical_flask_solution", 306, 561, "", 0, 1, cod_container);
    scope.$apply();
}

/** Function for identifying whish type of test is selected and based on that UI and controls will change */
function selectTestFn(scope) {
    /** Identifies the selected test */
	selected_test = selected_test_Array[scope.titration_soln];
	scope.normality = 0.01; 
	scope.normality_cod = 0.1;
	scope.volume = 10; 
	scope.speed = 0.1;
    /** If the selected test is hardness */
    if (scope.titration_soln == 0) {
		scope.hardness_display = true;
        scope.alkalinity_display = false;
        scope.cod_display = false;
        scope.result_show = true;
        scope.cod_titration_display = false;
		cod_container.alpha = 0;
		titration_container.alpha = 1;
        selectSolution("conical_flask_solution1");
    }
    /** If the selected test is alkalinity */
    else if (scope.titration_soln == 1) {
        scope.hardness_display = false;
        scope.alkalinity_display = true;
        scope.cod_display = false;
        scope.result_show = true;
        scope.cod_titration_display = false;
		cod_container.alpha = 0;
		titration_container.alpha = 1;
        selectSolution("conical_flask_solution2");
    }
    /** If the selected test is cod */
    else {
        scope.cod_display = true;
        scope.alkalinity_display = false;
        scope.hardness_display = false;
        scope.result_show = false;
        cod_container.alpha = 1;
        titration_container.alpha = 0;
    }
}

/** If the selected test is hardness then calculate volume of edta */
function calculateHardnessFn() {
    /** Volume of edta can be calculated using the formula, Volume of EDTA = total hardness as CaCO3 * volume of sample/ 0.1 * molarity of EDTA * 10^6
, where volume of sample and molarity of EDTA can be taken from the slider values */
    volume_of_edta = ((titrate_hardness * selected_volume) / (hardness_const * selected_molarity * Math.pow(10, 6))).toFixed(1);
}

/** If the selected test is alkalinity then calculate volume of hcl */
function calculateAlkalinityFn() {
    /** Volume of hcl can be calculated using the formula, Volume of hcl = total alkalinity * volume of sample/ normality of acid * 50000
, where volume of sample and normality of acid can be taken from the slider values */
    volume_of_hcl = ((alkalinity_value * selected_volume) / (alkalinity_const * selected_normality)).toFixed(1);
}

/** If the selected test is cod then calculate volume of titrant */
function calculateCodFn() {
    /** Volume of blank can be calculated using the formula, volume of titrant(blank endpoint) = normality of pottassium di chromate * volume of potassium di chromate/ normality of the titrant
, where normality of titrant is taken from the slider */
    volume_of_blank = ((normality_pot_dichromate * volume_pot_dichromate) / selected_cod_normality).toFixed(1);
    /** Volume of blank can be calculated using the formula, volume of titrant(fas endpoint) = cod value * volume of sample/ normality of the titrant * 8000
, where normality of titrant and volume of sample is taken from the slider */
    volume_of_fas = (cod_value * volume_of_cod_sample) / (selected_cod_normality * cod_const).toFixed(1);
    /** Volume of other samples is calculated using the formula, volume of sample = volume of blank - volume of fas*/
    volume_of_sample = (volume_of_blank - volume_of_fas).toFixed(1);
}

/** Function for starting titration in the test for cod */
function codStartTitrationFn(scope) {
	/** Set the 'titrant' drop down value as selected water sample in the cod distillation process */
	scope.water_type = scope.water_Sample_Array[water_sample_index].type;
	scope.dropdown_disable = false;
    scope.cod_titration_display = true;
    scope.cod_display = false;
    titration_container.alpha = 1;
    cod_container.alpha = 0;
    scope.result_show = true;
    scope.hardness_display = false;
    scope.alkalinity_display = false;
    scope.cod_disable = true;
    selectSolution("conical_flask_solution4");
}

/** Function for resetting the experiment */
function resetFn(scope) {
    scope.start_disable = false;
    turner_rect.mouseEnabled = true;
    initialisationOfImages();
    initialisationOfVariables(scope);
    scope.titration_soln = scope;
    scope.test_type = scope;
	scope.indicator_type = scope;
    scope.water_sample = scope;
    scope.water_type = scope;
	clearInterval(start_counter);
    mask_flask_rect.y = 536;
    mask_burette_rect.y = 161.5;
}

/** Function for changing the volume of titrate */
function changeVolumeFn(scope) {
    selected_volume = scope.volume;
    var _volume = scope.volume - 10;
    var _changing_volume = (_volume / 3);
    mask_flask_rect.y = initial_rect_pos - _changing_volume;
    for (var i = 1; i <= 5; i++) {
        getChild(titration_container, "reflect" + i).y = initial_reflect_pos - _changing_volume;
    }
}

/** Function for selecting water sample in the COD distillation process */
function selectWaterSampleFn(scope) {
    /** Saving selected water sample in the COD distillation process */
    selected_water_type = water_Sample_Type[scope.water_sample];
	sample_water_type = water_Sample_Type[scope.water_sample];
	water_sample_index = scope.water_sample;
	if (scope.water_sample == 1) {
		cod_value = 16;
	} else if (scope.water_sample == 2) {
		cod_value = 50;
	} else if (scope.water_sample == 3) {
		cod_value = 500;
	}
}

/** Function for selecting water sample in the COD titration process */
function selectWaterFn(scope) {
    var _type_of_water = scope.water_type;
    /** Saving selected water sample in the COD titration process */
    sample_water_type = water_Sample_Type[_type_of_water];
	/** Checking whether the sample selected in the COD titration process and COD distillation process are same, 
otherwise load the COD distillation display again */
    if (selected_water_type != sample_water_type) {
		water_sample_index = _type_of_water;
		scope.water_sample = scope.water_Sample_Array[_type_of_water].type;
        scope.cod_display = true;
        scope.alkalinity_display = false;
        scope.hardness_display = false;
        scope.result_show = false;
		scope.dropdown_disable = false;
        cod_container.alpha = 1;
        titration_container.alpha = 0;
        scope.cod_titration_display = false;
        getChild(cod_container, "clock_needle").rotation = 0;
        getChild(cod_container, "clock_text").alpha = 0;
        cod_container.removeChild(getChild(cod_container, "cod_conical_flask_solution"));
        scope.cod_titration = false;
        scope.mantle_disable = false;
    }  
    /** If the samples selected are same, then assign constant COD value for each selected sample */
    else {
        if (_type_of_water == 1) {
            cod_value = 16;
        } else if (_type_of_water == 2) {
            cod_value = 50;
        } else if (_type_of_water == 3) {
            cod_value = 500;
        }
    }
}

/** Function for checking selected indicators */
function selectIndicatorFn(scope) {
    /** Check whether the selected indicator is phenolphthaline */
    if (scope.indicator_type == 0) {
        alkalinity_indicator = "phenolphthaline";
        /** Set alkalinity value */
        alkalinity_value = 433;
        /** Change color of the solution */
        selectSolution("conical_flask_solution2");
        scope.start_disable = false;
        /** Hide error message */
        scope.error_display = false;
		turner_rect.mouseEnabled = true;
    } else {
        /** Check methyl orange indicator is selected first */
        if (indicator_flag == false) {
            scope.start_disable = true;
            /** Display error message */
            document.getElementById('errorIcon').style.display = "block";
            scope.error_display = true;
			turner_rect.mouseEnabled = false;
        }
        /** Check methyl orange indicator is selected after selecting phenolphthaline */
        else {
			if(titrant_sol >= final_titration_point) {
				turner_rect.mouseEnabled = false;
			}
            alkalinity_indicator = "methyl_orange";
            /** Set alkalinity value */
            alkalinity_value = 771;
			turner_rect.mouseEnabled = true;
            /** Change color of the solution */
            selectSolution("conical_flask_solution6");
        }
    }
}

/** Function for changing the normality in test for alkalinity */
function changeNomalityFn(scope) {
    selected_normality = scope.normality;
}

/** Function for changing the normality in test for COD */
function changeCodNomalityFn(scope) {
    selected_cod_normality = scope.normality_cod;
}

/** Function for changing the molarity in test for COD */
function changeMolarityFn(scope) {
    selected_molarity = scope.molarity;
}

/** Function for changing the titrate in test for hardness */
function selectTitrateFn(scope) {
    /** Hardness value will change according to the dropdown selection */
    if (scope.test_type == 0) {
        titrate_hardness = 250;
    } else if (scope.test_type == 1) {
        titrate_hardness = 150;
    } else {
        titrate_hardness = 600;
    }
}

/** Function for changing the speed of the drop */
function changeDropSpeedFn(scope) {
    var _current_speed = scope.speed;
    /** Function for adjusting speed of the timer according to the selected drop speed */
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
	/** If the test selected is hardness */
	if (selected_test == "hardness") {
		/** Calls function for calculating volume of EDTA */
		calculateHardnessFn();
		if (titrant_sol >= volume_of_edta) {
			/** When titrant used reaches the volume of edta, color of the solution will change from wine red to blue */
			selectSolution("conical_flask_solution3");
		}
	}
	/** If the test selected is alkalinity */
	else if (selected_test == "alkalinity") {
		/** Calls function for calculating volume of hcl */
		calculateAlkalinityFn();
		/** Check whether the indicator selected is phenolphthaline */
		if (alkalinity_indicator == "phenolphthaline") {
			scope.titrant_used_v1 = titrant_sol;
			indicator_flag = true;
			if (titrant_sol >= volume_of_hcl) {
				scope.dropdown_disable = false;
				/** When titrant used reaches the volume of hcl, color of the solution will change from pink to colorless */
				selectSolution("conical_flask_solution5");
			}
		}
		/** Check whether the indicator selected is methyl orange */
		else {
			scope.alkalinity_v2 = true;
			scope.titrant_used_v2 = titrant_sol;
			if (titrant_sol >= volume_of_hcl) {
				/** When titrant used reaches the volume of hcl, color of the solution will change from yellow to orange */
				selectSolution("conical_flask_solution7");
			}
		}
	}
	/** If the test selected is COD and selected sample is blank*/
	else if (selected_test == "cod" && sample_water_type == "blank") {
		/** Calls function for calculating end point of blank */
		calculateCodFn();
		if (titrant_sol >= volume_of_blank) {
			/** When titrant used reaches the end point of blank, color of the solution will change from green to wine red */
			selectSolution("conical_flask_solution1");
		}
	} else if (selected_test == "cod") {
		/** Calls function for calculating volume of sample */
		calculateCodFn();
		if (titrant_sol >= volume_of_sample) {
			/** When titrant used reaches the volume of sample, color of the solution will change from green to wine red */
			selectSolution("conical_flask_solution1");
		}
	}
	if (start_flag == true) {
		/** After starting experiment fill and unfill the flask solution and burette solution respectively */
		mask_flask_rect.y -= flask_sol;
		mask_burette_rect.y += burette_sol;
		/** When titrant used reaches the final titration point(i.e, 50), experiment stops automatically */
		if (titrant_sol >= final_titration_point) {
			scope.start_disable = true;
			turner_rect.mouseEnabled = false;
			clearFn(scope);
		}
		/** Based on the water level , adjusting the water's reflecting movement */
		for (var i = 1; i <= 5; i++) {
			getChild(titration_container, "reflect" + i).y -= flask_sol;
			if (getChild(titration_container, "reflect" + i).y <= 519) {
				getChild(titration_container, "reflect" + i).x += flask_sol / 2;
				getChild(titration_container, "reflect" + i).scaleX -= flask_sol / 60.3;
			}
		}
	} else {
		clearInterval(start_counter);
	}
	scope.$apply();
}
/** Calclation function ends here */

/** Function for clearing all the functionality when experiment ends */
function clearFn(scope) {
    start_flag = false;
    getChild(titration_container, "drop1").alpha = 0;
    getChild(titration_container, "drop2").alpha = 0;
    getChild(titration_container, "drop3").alpha = 0;
    /** Timer for making the burette turner off */
    turner_timer = setInterval(function() {
        turner_count--;
        if (turner_count == 1) {
            clearInterval(turner_timer);
        }
        turnerRotate(scope, turner_count)
    }, 50);
    /** Clears the interval that started the experiment */
    clearInterval(start_counter);
}

/** Function for setting the downward movement of the solution drop */
function dropDown() {
    if (start_flag == true) {
        /** After starting the experiment adjust the number of drops according to the speed of titrant slider value */
        getChild(titration_container, "drop1").alpha = 1;
        if (drop_speed_var >= 0.1 && drop_speed_var <= 0.4) {
            var drop_tween = createjs.Tween.get(getChild(titration_container, "drop1")).to({
                y: drop_y
            }, 700).call(dropUp);
        } else if (drop_speed_var >= 0.4 && drop_speed_var <= 0.7) {
            var drop_tween = createjs.Tween.get(getChild(titration_container, "drop1")).to({
                y: 475
            }, 500);
            var drop_tween1 = createjs.Tween.get(getChild(titration_container, "drop2")).to({
                y: drop_y
            }, 500).call(dropUp);
        } else if (drop_speed_var >= 0.7 && drop_speed_var <= 1) {
            var drop_tween = createjs.Tween.get(getChild(titration_container, "drop1")).to({
                y: 475
            }, 500);
            var drop_tween1 = createjs.Tween.get(getChild(titration_container, "drop2")).to({
                y: 500
            }, 500);
            var drop_tween2 = createjs.Tween.get(getChild(titration_container, "drop3")).to({
                y: drop_y
            }, 500).call(dropUp);
        }
    } else {
        getChild(titration_container, "drop1").alpha = 0;
        getChild(titration_container, "drop2").alpha = 0;
        getChild(titration_container, "drop3").alpha = 0;
    }
}

/** Function for setting the upward movement of the solution drop */
function dropUp() {
    if (start_flag == true) {
        /** After completing tween set the initial point for each of the drop */
        if (drop_speed_var >= 0.1 && drop_speed_var <= 0.4) {
            getChild(titration_container, "drop1").y = 446;
            getChild(titration_container, "drop2").alpha = 0;
            getChild(titration_container, "drop3").alpha = 0;
        } else if (drop_speed_var >= 0.4 && drop_speed_var <= 0.7) {
            getChild(titration_container, "drop1").y = 446;
            getChild(titration_container, "drop2").y = 475;
            getChild(titration_container, "drop2").alpha = 1;
            getChild(titration_container, "drop3").alpha = 0;
        } else if (drop_speed_var >= 0.7 && drop_speed_var <= 1) {
            getChild(titration_container, "drop1").y = 446;
            getChild(titration_container, "drop2").y = 475;
            getChild(titration_container, "drop3").y = 500;
            getChild(titration_container, "drop2").alpha = 1;
            if (drop_y >= 530) {
                getChild(titration_container, "drop3").alpha = 1;
            }
        }
    }
    dropDown();
}

/** Function for turning turner on and off */
function turnerRotate(scope, inr) {
    for (var i = 1; i <= 5; i++) {
        getChild(titration_container, "turner" + i).alpha = 0;
    }
    getChild(titration_container, "turner" + inr).alpha = 1;
}

/** Function for beginning the titration */
function startTitration(scope) {
    clearInterval(start_counter);
    start_counter = setInterval(function() {
        calculateFn(scope)
    }, delay_counter);
}

/** Function used to make only selected solution visible */
function selectSolution(name) {
    for (var i = 1; i <= 7; i++) {
        getChild(titration_container, "conical_flask_solution" + i).alpha = 0;
    }
    getChild(titration_container, name).alpha = 1;
}

/** Function for adding child to the stage and return the result */
function getChild(stage, name) {
    return stage.getChildByName(name);
}