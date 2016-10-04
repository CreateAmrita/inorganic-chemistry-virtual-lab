(function() {
    angular
        .module('users', ['FBAngular'])
        .controller('UserController', [
            '$mdSidenav', '$mdBottomSheet', '$log', '$q', '$scope', '$element', 'Fullscreen', '$mdToast', '$animate',
            UserController
        ])

    /**
     * Main Controller for the Angular Material Starter App
     * @param $scope
     * @param $mdSidenav
     * @param avatarsService
     * @constructor
     */
    function UserController($mdSidenav, $mdBottomSheet, $log, $q, $scope, $element, Fullscreen, $mdToast, $animate) {
        $scope.toastPosition = {
            bottom: true,
            top: false,
            left: true,
            right: false
        };
        $scope.getToastPosition = function() {
            return Object.keys($scope.toastPosition)
                .filter(function(pos) {
                    return $scope.toastPosition[pos];
                })
                .join(' ');
        };
        $scope.showActionToast = function() {
            var toast = $mdToast.simple()
                .content(helpArray[0])
                .action(helpArray[15])
                .hideDelay(15000)
                .highlightAction(false)
                .position($scope.getToastPosition());

            var toast1 = $mdToast.simple()
                .content(helpArray[1])
                .action(helpArray[15])
                .hideDelay(15000)
                .highlightAction(false)
                .position($scope.getToastPosition());

            var toast2 = $mdToast.simple()
                .content(helpArray[2])
                .action(helpArray[15])
                .hideDelay(15000)
                .highlightAction(false)
                .position($scope.getToastPosition());

            var toast3 = $mdToast.simple()
                .content(helpArray[3])
                .action(helpArray[15])
                .hideDelay(15000)
                .highlightAction(false)
                .position($scope.getToastPosition());

            var toast4 = $mdToast.simple()
                .content(helpArray[4])
                .action(helpArray[15])
                .hideDelay(15000)
                .highlightAction(false)
                .position($scope.getToastPosition());

            var toast5 = $mdToast.simple()
                .content(helpArray[5])
                .action(helpArray[15])
                .hideDelay(15000)
                .highlightAction(false)
                .position($scope.getToastPosition());

            var toast6 = $mdToast.simple()
                .content(helpArray[6])
                .action(helpArray[15])
                .hideDelay(15000)
                .highlightAction(false)
                .position($scope.getToastPosition());

            var toast7 = $mdToast.simple()
                .content(helpArray[7])
                .action(helpArray[15])
                .hideDelay(15000)
                .highlightAction(false)
                .position($scope.getToastPosition());

            var toast8 = $mdToast.simple()
                .content(helpArray[8])
                .action(helpArray[15])
                .hideDelay(15000)
                .highlightAction(false)
                .position($scope.getToastPosition());

            var toast9 = $mdToast.simple()
                .content(helpArray[9])
                .action(helpArray[15])
                .hideDelay(15000)
                .highlightAction(false)
                .position($scope.getToastPosition());

            var toast10 = $mdToast.simple()
                .content(helpArray[10])
                .action(helpArray[15])
                .hideDelay(15000)
                .highlightAction(false)
                .position($scope.getToastPosition());

            var toast11 = $mdToast.simple()
                .content(helpArray[11])
                .action(helpArray[15])
                .hideDelay(15000)
                .highlightAction(false)
                .position($scope.getToastPosition());

            var toast12 = $mdToast.simple()
                .content(helpArray[12])
                .action(helpArray[15])
                .hideDelay(15000)
                .highlightAction(false)
                .position($scope.getToastPosition());

            var toast13 = $mdToast.simple()
                .content(helpArray[13])
                .action(helpArray[15])
                .hideDelay(15000)
                .highlightAction(false)
                .position($scope.getToastPosition());

            var toast14 = $mdToast.simple()
                .content(helpArray[14])
                .action(helpArray[16])
                .hideDelay(15000)
                .highlightAction(false)
                .position($scope.getToastPosition());

            $mdToast.show(toast).then(function() {
                $mdToast.show(toast1).then(function() {
                    $mdToast.show(toast2).then(function() {
                        $mdToast.show(toast3).then(function() {
                            $mdToast.show(toast4).then(function() {
                                $mdToast.show(toast5).then(function() {
                                    $mdToast.show(toast6).then(function() {
                                        $mdToast.show(toast7).then(function() {
                                            $mdToast.show(toast8).then(function() {
                                                $mdToast.show(toast9).then(function() {
                                                    $mdToast.show(toast10).then(function() {
                                                        $mdToast.show(toast11).then(function() {
                                                            $mdToast.show(toast12).then(function() {
                                                                $mdToast.show(toast13).then(function() {
                                                                    $mdToast.show(toast14).then(function() {});
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        };

        var self = this;
        self.selected = null;
        self.users = [];
        self.toggleList = toggleUsersList;
        $scope.showValue = false; /** It hides the 'Result' tab */
        $scope.showVariables = false; /** It hides the 'Variables' tab */
        $scope.isActive = true;
        $scope.isActive1 = true;
        $scope.goFullscreen = function() {
            /** Full screen */
            if (Fullscreen.isEnabled())
                Fullscreen.cancel();
            else
                Fullscreen.all();
            /** Set Full screen to a specific element (bad practice) */
            /** Full screen.enable( document.getElementById('img') ) */
        };
        $scope.toggle = function() {
            $scope.showValue = !$scope.showValue;
            $scope.isActive = !$scope.isActive;
        };
        $scope.toggle1 = function() {
            $scope.showVariables = !$scope.showVariables;
            $scope.isActive1 = !$scope.isActive1;
        };

        /** Change event function of speed of the drop slider */
        $scope.changeDropSpeed = function() {
            changeDropSpeedFn($scope);
        }

        /** Change event function of select water sample dropdown */
        $scope.selectWater = function() {
            selectWaterFn($scope);
        }

        /** Change event function of normality slider in the cod */
        $scope.changeCodNomality = function() {
            changeCodNomalityFn($scope);
        }

        /** Change event function of select water sample dropdown */
        $scope.selectWaterSample = function() {
            selectWaterSampleFn($scope);
        }

        /** Change event function of start titration button */
        $scope.codStartTitration = function() {
            codStartTitrationFn($scope);
        }

        /** Change event function of molarity slider */
        $scope.changeMolarity = function() {
            changeMolarityFn($scope);
        }

        /** Change event function of titrate dropdown */
        $scope.selectTitrate = function() {
            selectTitrateFn($scope);
        }

        /** Change event function of change volume slider */
        $scope.changeVolume = function() {
            changeVolumeFn($scope);
        }

        /** Change event function of indicator dropdown */
        $scope.selectIndicator = function() {
            selectIndicatorFn($scope);
        }

        /** Change event function of normality slider */
        $scope.changeNomality = function() {
            changeNomalityFn($scope);
        }

        /** Change event function of select test dropdown */
        $scope.selectTest = function() {
            selectTestFn($scope);
        }

        /** Change event function of start button */
        $scope.startExp = function() {
            startExperiment($scope); /** Function defined in experiment.js file */
        }

        /** Change event function of switch on mantle button */
        $scope.switchOnMantle = function() {
            switchOnMantleFn($scope); /** Function defined in experiment.js file */
        }

        /** Change event function of reset button */
        $scope.resetExp = function() {
            resetFn($scope);
        }

        /**
         * First hide the bottom sheet IF visible, then
         * hide or Show the 'left' sideNav area
         */
        function toggleUsersList() {
            $mdSidenav('right').toggle();
        }
    }
})();