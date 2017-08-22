controllersModule.controller('reportController', ['$scope', 'userService', 'Session', 'ApplicationService', 'reportService', 'profileService', '$state', 'sectorService',

    function($scope, userService, Session, ApplicationService, reportService, profileService, $state, sectorService) {
        $scope.newsfeed = [];
        $scope.users = [];
        $scope.userProfile = {};
        $scope.newsfeedBySector = [];
        $scope.sectors = [];
        $scope.$state = $state;
        $scope.assignmentPosted = false;
        var token = window.localStorage.userToken;
        $scope.status = {
            title: "",
            description: "",
            sector: "",
            starts_at: "",
            ends_at: ""
        }

        $scope.commentObj = {
            text: ""
        }

        $scope.selectedDate = {
            starts_at: "",
            ends_at: ""
        }

        function init() {
            reportService.getNewsfeed(token).then(function(newsfeed) {
                $scope.newsfeed = newsfeed;
                console.log("test",$scope.newsfeed);
            }, function() {});
            //getSectors();
        }

        var getSectors = function() {
            ApplicationService.getSectors()
                .then(function(sectors) {
                    $scope.sectors = sectors;
                    $scope.status.sector = sectors[0]._id;
                })
        };

        $scope.getProfile = function(id) {
            if (token) {
                profileService.getUserDetails(id, token).then(function(details) {
                    $scope.userProfile = details;
                    $state.go('report.profile');
                }, function() {});
            } else {
                $state.go('login');
            }
        };
        
        $scope.getUser = function() {
            reportService.getUsers().then(function(details) {
                    $scope.users = details;
                    //$state.go('report.profile');
                }, function() {});
            } else {
                //$state.go('login');
            }
        };

        $scope.getNewsfeedBySector = function(sector) {
            if (token) {
                sectorService.getNewsfeedBySector(token, sector).then(function(newsfeed) {
                    $scope.newsfeedBySector = newsfeed;
                    $state.go('report.sector');
                }, function() {});
            } else {
                $state.go('login');
            }
        }

        $scope.likePost = function(id, index) {
            reportService.likePost(token, id).then(function() {
                init();
                $scope.$apply();
            });

        }

        $scope.postComment = function(event, id, upload) {
            var commentObj = { text: event.target.value };
            reportService.postComment(token, id, commentObj,upload).then(function() {
                init();
                $scope.$apply();
            })
        }
        
        $scope.upload = function(event, id) {
            var commentObj = { text: event.target.value };
            reportService.upload(token, id, upload).then(function() {
                init();
                $scope.$apply();
            })
        }

        $scope.postStatus = function(status) {
            $scope.status.starts_at = $scope.selectedDate.starts_at.toISOString();
            $scope.status.ends_at = $scope.selectedDate.ends_at.toISOString();
            reportService.postStatus(token, status).then(function(resp) {
                if (typeof resp == 'object') {
                    $scope.assignmentPosted = true;
                    init();
                    $scope.$apply();
                    setTimeout(function() {
                        $scope.assignmentPosted = false;
                    }, 2000)
                } else {
                    console.log(resp);
                }

            });
            $scope.status = {
                title: "",
                description: "",
                sector: "",
                starts_at: "",
                ends_at: ""
            };
            $scope.selectedDate = {
                starts_at: "",
                ends_at: ""
            }
        }

        init();
    }
]);