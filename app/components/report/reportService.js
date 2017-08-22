servicesModule.service('reportService', ['$http', '$state', function($http, $state) {
    var reportService = {};

    reportService.getNewsfeed = function(token) {
        if (token) {
            return $http
                .get('https://nepgo.herokuapp.com/search?type=report&token=' + token)
                .then(function(res) {
                    return res.data;
                });
        } else {
            return $http
                .get('https://nepgo.herokuapp.com/search?type=report')
                .then(function(res) {
                    return res.data;
                });
        }

    };

    reportService.likePost = function(token, id) {
        if (token) {
            return $http
                .get('https://nepgo.herokuapp.com/report/' + id + '/like?token=' + token)
                .then(function(res) {
                    return res.data;
                })
        } else {
            $state.go('login');
        }
    }

    reportService.postComment = function(token, id, commentObj,upload) {
        if (token) {
            if(upload){
                this.$http
                .post('https://nepgo.herokuapp.com/report/' + id + '/upload?token=' + token, upload)
                .then(function(res) {
                    //return res.data;
                })
            }
            return $http
                .post('https://nepgo.herokuapp.com/report/' + id + '/comment?token=' + token, commentObj)
                .then(function(res) {
                    return res.data;
                })
        } else {
            $state.go('login');
        }
        }
    // reportService.postStatus = function(token, status) {
        // if (token) {
            // return $http
                // .post('https://nepgo.herokuapp.com/vacancy?token=' + token, status)
                // .then(function(res) {
                    // return res.data;
                // }, function(err) {
                    // return err.data.err;
                // })
        // } else {
            // $state.go('login');
        // }
    // }
    
    reportService.upload = function(token, id,report) {
        if (token) {
            return $http
                .post('https://nepgo.herokuapp.com/report/' + id + '/upload?token=' + token,report)
                .then(function(res) {
                    return res.data;
                })
        } else {
            $state.go('login');
        }
    }
    
    reportService.getUsers = function() {
        return $http
            .post('https://nepgo.herokuapp.com/users/')
            .then(function(res) {
                return res.data;
            })
    }

    return reportService;
}]);