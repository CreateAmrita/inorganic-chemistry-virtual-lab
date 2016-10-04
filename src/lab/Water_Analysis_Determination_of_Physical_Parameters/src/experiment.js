/** Event handling functions starts here */

/** Function for standardising the apparatus */
function standardFn(scope) {
    scope.standard_disable = true;
    /** Standardizing apparatus for the test pH reading of water */
    if (selected_test_value == 0) {
        phStartFn(scope);
    }
    /** Standardizing apparatus for the test turbidity */
    else if (selected_test_value == 1) {
        loadSampleFn(scope);
    }
    /** Standardizing apparatus for the test electrical conductivity */
    else {
        conductivityStartFn(scope);
    }
}

/** Function for starting both the tests electrical conductivity and ph reading of water */
function startExperiment(scope) {
    if (selected_test_value == 0) {
        phStartFn(scope);
    } else {
        conductivityStartFn(scope);
    }
}

/** Function to start the test for electrical conductivity */
function conductivityStartFn(scope) {
    if (!start_flag) {
        start_flag = true;
        scope.start_exp = _("Switch off");
        getChild(conductivity_container, "light_on").visible = true;
        getChild(conductivity_container, "light_off").visible = false;
        /** According to selected water samples change the conductivity value  */
        getChild(conductivity_container, "conductivity_reading").text = conductivity_value;
        scope.result_val = conductivity_value;
        scope.water_sample_disable = false;
    } else {
        conductivityInitial(scope);
    }
}

/** Function to start the test for pH reading of water */
function phStartFn(scope) {
    if (!start_flag) {
        start_flag = true;
        scope.start_exp = _("Switch off");
        getChild(ph_reading_container, "ph_reading").text = (ph_value).toFixed(1);
        scope.result_val = (ph_value).toFixed(1);
        getChild(ph_reading_container, "switch_off").visible = false;
        getChild(ph_reading_container, "switch_on").visible = true;
        if (ph_value == 4) {
            buffer_solution1_flag = true;
        }
        /** Switch on button will be active only after standardizing both buffer solutions */
        if (buffer_solution1_flag == true && buffer_solution2_flag == true) {
            buffer_solution2_flag = false;
            /** Select water sample button will be active only after standardizing both buffer solutions */
            scope.water_sample_disable = false;
            /** According to selected water samples take a ph value between minimum and maximum ph range 
		from ph_Value_Array  */
            ph_value = ph_Value_Array[1];
        }
    } else {
        phReadingInitial(scope);
    }
}

/** Function for resetting the experiment */
function resetFn(scope) {
    initialisationOfVariables(scope);
    initialisationOfImages();
    initialisationOfControls(scope);
	createjs.Tween.removeAllTweens();
}

/** Function for displaying apparatus name in the popups */
function popupDisplay(container, text_name, popup_name, apparatus, apparatus_name, x, y) {
    /** Displaying apparatus name in the popup, while placing mouse over to the apparatus */
    getChild(container, apparatus).on("mouseover", function() {
        getChild(container, popup_name).visible = true;
        getChild(container, text_name).visible = true;
        getChild(container, text_name).text = apparatus_name;
        getChild(container, text_name).x = x;
        getChild(container, text_name).y = y;
    });
    /** Hide apparatus name in the popup, while placing mouse away from the apparatus */
    getChild(container, apparatus).on("mouseout", function() {
        getChild(container, popup_name).visible = false;
        getChild(container, text_name).visible = false;
    });
}

/** Function to unload previous sample from the nephelometer and placing selected sample to the nephelometer
in the test for turbidity */
function unloadSample(scope) {
	/** Disable load sample button */
    scope.load_disable = true;
	/** Disable select water dropdown */
	scope.water_sample_disable = true;
    /** Interval for opening the lid */
    lid_timer = setInterval(function() {
        lid_counter++;
        /** When clicking the load sample button first place the previously loaded sample from nephelometer
	and then place the currently selected sample to the nephelometer */
        if (lid_counter == 6) {
            getChild(turbidity_container, prev_test_tube).x = 145;
            getChild(turbidity_container, prev_test_tube).y = 435;
            getChild(turbidity_container, prev_test_tube).alpha = 1;
            /** Load an image to cover the machine top */
            loadImages(queue.getResult("machine_top"), "machine_top_initial", 28.5, 448, "", 0, 1, turbidity_container);
        }
        /** After opening the lid move the test tube to its initial position  */
        if (lid_counter == 10) {
			getChild(turbidity_container, "nephelometer_reading").text = "0";
            /** When the lid opens clear the timer */
            clearInterval(lid_timer);
            /** Make a movement of testtube's y position to 200 */
            var testtube_tween = createjs.Tween.get(getChild(turbidity_container, prev_test_tube)).to({
                y: 200
            }, 700).call(function() {
                testtubeMove(scope)
            })
        }
        lidOpenClose(scope, lid_counter)
    }, 100);
}

/** Function for moving the testtube's x position */
function testtubeMove(scope) {
    /** set x position of the testtubes according to the selected sample */
    if (prev_test_tube == "test_tube_drinking") {
        unload_x = 590;
    } else if (prev_test_tube == "test_tube_sea") {
        unload_x = 546;
    } else if (prev_test_tube == "test_tube_standard") {
        unload_x = 634;
    }
    /** Tween testtube to the defined x position */
    var testtube_tween = createjs.Tween.get(getChild(turbidity_container, prev_test_tube)).to({
        x: unload_x
    }, 700).call(function() {
        testtubePlace(scope)
    })
}

/** Function for moving the testtube's y position and place to its initial position */
function testtubePlace(scope) {
    /** Tween testtube to the defined y position */
    var testtube_tween = createjs.Tween.get(getChild(turbidity_container, prev_test_tube)).to({
        y: 448
    }, 700).call(function() {
        loadSampleFn(scope)
    })
}

/** Function for loading the test tube to the nephelometer */
function loadSampleFn(scope) {
    /** Store test tube name to a variable named prev_test_tube for unloading the previous sample 
	while selecting the new sample */
    prev_test_tube = test_tube_name;
    getChild(turbidity_container, test_tube_name).alpha = 1;
    /** After opening the lid load the selected sample to the nephelometer */
    lid_timer = setInterval(function() {
        if (lid_counter < 10) {
            lid_counter++;
        }
        if (lid_counter == 10) {
            clearInterval(lid_timer);
            loadImages(queue.getResult("machine_top"), "machine_top", 28.5, 448, "", 0, 1, turbidity_container);
            /** Tween testtube to the defined y position */
            var testtube_tween = createjs.Tween.get(getChild(turbidity_container, test_tube_name)).to({
                y: 240
            }, 700).call(function() {
                testtubeMov(scope)
            })
        }
        lidOpenClose(scope, lid_counter)
    }, 100);
}

/** Function to move the test tube to the defined x position */
function testtubeMov(scope) {
    /** Tween testtube to the defined x position */
    var testtube_tween = createjs.Tween.get(getChild(turbidity_container, test_tube_name)).to({
        x: 144
    }, 700).call(function() {
        insertTesttube(scope)
    });
}

/** Function for making the animation of opening and closing the lid */
function lidOpenClose(scope, counter) {
    /** Make the selected lid image visible according to the lid counter and hide all other images */
    for (var i = 1; i <= 10; i++) {
        getChild(turbidity_container, "lid_anim" + i).visible = false;
    }
    getChild(turbidity_container, "lid_anim" + counter).visible = true;
}

/** Function for selecting pH value for each buffer solution in standardisation dropdown */
function standardisationFn(scope) {
	phReadingInitial(scope);
	scope.standard_disable = false;
	/** If the selected buffer solution is 1 assign 4 as pH value */
	if (scope.test_type == 0) {
		ph_value = 4;
		buffer_solution1_flag = true;
	} 
	/** If the selected buffer solution is 2 assign 7 as pH value */
	else {
		ph_value = 7;
		buffer_solution2_flag = true;
	}
}

/** Function to place the test tube inside nephelometer */
function insertTesttube(scope) {
    /** Tween testtube to the defined y position */
    var testtube_tween = createjs.Tween.get(getChild(turbidity_container, test_tube_name)).to({
        y: 435
    }, 700).call(function() {
        lidClose(scope)
    });
}

/** Function for closing the lid of the nephelometer apparatus */
function lidClose(scope) {
    lid_timer = setInterval(function() {
        lid_counter--;
        if (lid_counter == 1) {
            clearInterval(lid_timer);
        } else if (lid_counter == 6) {
            /** Display the turbidity value in the nephelometer diaplay */
            getChild(turbidity_container, "nephelometer_reading").text = turbidity_value;
            scope.result_val = turbidity_value;
            /** Take turbidity value from turbidity_Value_Array based on sample selection */
            turbidity_value = turbidity_Value_Array[0];
            turbidityInitial(scope);
			scope.water_sample_disable = false;
            getChild(turbidity_container, test_tube_name).alpha = 0;
            test_tube_name = "test_tube_drinking";
            scope.$apply();
        }
        lidOpenClose(scope, lid_counter)
    }, 100);
}

/** Function for making the initial setup for pH reading of water test */
function phReadingInitial(scope) {
    scope.start_exp = _("Switch on");
    start_flag = false;
    getChild(ph_reading_container, "switch_on").visible = false;
    getChild(ph_reading_container, "switch_off").visible = true;
    getChild(ph_reading_container, "ph_reading").text = "0.0";
    scope.result_val = "0.0";
}

/** Function for making the initial setup for electrical conductivity test */
function conductivityInitial(scope) {
    start_flag = false;
    scope.start_exp = _("Switch on");
    getChild(conductivity_container, "light_on").visible = false;
    getChild(conductivity_container, "light_off").visible = true;
    getChild(conductivity_container, "conductivity_reading").text = "0.0";
    scope.result_val = "0.0";
}

/** Function for making the initial setup for turbidity test */
function turbidityInitial(scope) {
    start_flag = false;
    turbidity_value = 20;
    turbidity_container.removeChild(getChild(turbidity_container, "machine_top_initial"));
    turbidity_container.removeChild(getChild(turbidity_container, "machine_top"));
    turbidity_container.removeChild(getChild(turbidity_container, "lid_top"));
    for (var i = 1; i <= 10; i++) {
        getChild(turbidity_container, "lid_anim" + i).visible = false;
    }
    getChild(turbidity_container, "lid_anim1").visible = true;
}

/** Function for arranging the test tubes like the initial setup while changing the test */
function testTubeArrange() {
    test_tube_name = "test_tube_standard";
    prev_test_tube = "test_tube_standard";
    getChild(turbidity_container, "test_tube_standard").x = 634;
    getChild(turbidity_container, "test_tube_standard").y = 448;
    getChild(turbidity_container, "test_tube_drinking").x = 590;
    getChild(turbidity_container, "test_tube_drinking").y = 448;
    getChild(turbidity_container, "test_tube_sea").x = 546;
    getChild(turbidity_container, "test_tube_sea").y = 448;
    getChild(turbidity_container, "test_tube_standard").alpha = 1;
    getChild(turbidity_container, "test_tube_drinking").alpha = 1;
    getChild(turbidity_container, "test_tube_sea").alpha = 1;
}

/** Function for selecting the tests based on 'select test' dropdown */
function selectTestFn(scope) {
    testCommon(scope);
	/** Remove all tweens */
	createjs.Tween.removeAllTweens();
    /** While selecting each test make the drop down to its initial state */
    scope.test_type = scope;
    /** To identify which test is selected */
    selected_test_value = scope.test_selected;
	clearInterval(lid_timer);
	lid_counter = 0;
    /** The selected test is turbidity */
    if (selected_test_value == 1) {
        getChild(turbidity_container, "nephelometer_reading").text = "0";
        scope.result_val = "0";
		ph_value = 4;
        testTubeArrange();
        /** Label for the result */
        scope.result_label = _("Turbidity");
        scope.result_unit = _("NTU");
        ph_reading_container.visible = false;
        turbidity_container.visible = true;
        conductivity_container.visible = false;
        turbidityInitial(scope);
        scope.std_show = true;
        scope.standard_show = false;
        /** Standard value showing in the result part */
        scope.standardisation_val = _("Formazin suspension(20 NTU)");
        /** Insert value to the 'select water sample' dropdown */
        scope.water_Sample_Array = [{
            water_sample: _('Select sample'),
            type: 0
        }, {
            water_sample: _('Drinking water'),
            type: 1
        }, {
            water_sample: _('Sea water'),
            type: 2
        }];
    }
    /** Selected test is Electrical conductivity */
    else if (selected_test_value == 2) {
		/** Calling function for making water movement */
		waterMovement(conductivity_container);
        conductivityInitial(scope);
		conductivity_value = 1412;
        /** Label for the result */
        scope.result_label = _("Electrical conductivity")
        scope.result_unit = _("μS/cm");
        scope.std_show = true;
        scope.standard_show = false;
        conductivity_container.visible = true;
        ph_reading_container.visible = false;
        turbidity_container.visible = false;
        /** Standard value showing in the result part */
        scope.standardisation_val = _("KCI(0.01 M-1412 μS/cm)");
        /** Insert value to the 'select water sample' dropdown */
        scope.water_Sample_Array = [{
            water_sample: _('Select sample'),
            type: 0
        }, {
            water_sample: _('Totally pure water'),
            type: 1
        }, {
            water_sample: _('Typical DI water'),
            type: 2
        }, {
            water_sample: _('Distilled water'),
            type: 3
        }, {
            water_sample: _('RO water'),
            type: 4
        }, {
            water_sample: _('Tap water'),
            type: 5
        }, {
            water_sample: _('Potable water (max)'),
            type: 6
        }, {
            water_sample: _('Sea water'),
            type: 7
        }, {
            water_sample: _('Brackish water'),
            type: 8
        }];
    }
    /** Selected test is pH reading of water */
    else {
        phReadingInitial(scope);
		/** Setting initial values for buffer solutions to identify the selected buffer solutions */
		buffer_solution1_flag = false;
		buffer_solution2_flag = false;
        /** Label for the result */
        scope.result_label = _("pH value")
        scope.result_unit = "";
        ph_reading_container.visible = true;
        turbidity_container.visible = false;
        conductivity_container.visible = false;
        scope.std_show = false;
        scope.standard_show = true;
        /** Insert value to the 'select water sample' dropdown */
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
    }
}

/** Function for selecting water sample based on 'select water sample' dropdown */
function selectSampleFn(scope) {
    /** If the selected test is pH reading of water */
    if (selected_test_value == 0) {
		phReadingInitial(scope);
        ph_value = ph_Value_Array[scope.sample_type];
        scope.start_show = true;
        scope.standard_btn_show = false;
    }
    /** If the selected test is turbidity */
    else if (selected_test_value == 1) {
        turbidityInitial(scope);
        turbidity_value = turbidity_Value_Array[scope.sample_type];
        test_tube_name = test_Tube_Array[scope.sample_type];
        if (scope.sample_type != 0) {
            scope.load_disable = false;
        }
        turbidity_container.removeChild(getChild(turbidity_container, "lid_top_initial"));
        scope.load_show = true;
        scope.standard_btn_show = false;
    }
    /** If the selected test is electrical conductivity */
    else {
        conductivityInitial(scope);
        conductivity_value = conductivity_Value_Array[scope.sample_type];
        scope.start_show = true;
        scope.standard_btn_show = false;
    }
}

/** Function include commonly performing functionalities for each test */
function testCommon(scope) {
	scope.standard_disable = false;
	scope.water_sample_disable = true;
	scope.standard_btn_show = true;
	scope.start_show = false;
	scope.load_show = false;
	scope.sample_type = scope;
}
/** Event handling functions ends here */


/** Function for adding child to the stage and return the result */
function getChild(stage, name) {
    return stage.getChildByName(name);
}