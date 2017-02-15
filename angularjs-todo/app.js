var app = angular.module('simple-todo', ['ngCookies']);

app.controller('todoList', function($scope, $cookies, $cookieStore) {
    var todoTasks = $cookieStore.get('todo'),
        doneTasks = $cookieStore.get('done');

    $scope.tasks = {
        todo: todoTasks ? todoTasks.split('|') : [],
        done: doneTasks ? doneTasks.split('|') : []
    };

    $scope.addTask = function(key = null) {
        if($scope.taskText && (!key || key.which === 13)) {
            $scope.tasks.todo.push($scope.taskText);
            $scope.taskText = '';

            $cookieStore.put('todo', $scope.tasks.todo.join('|'));
        }
    }

    $scope.updateStatus = function(key) {
        if(this.todo) {
            $scope.tasks.done.unshift(
                $scope.tasks.todo.splice(key, 1)[0]
            );
        }

        else if(this.done) {
            $scope.tasks.todo.unshift(
                $scope.tasks.done.splice(key, 1)[0]
            );
        }

        $cookieStore.put(
            'todo', $scope.tasks.todo.join('|')
        );

        $cookieStore.put(
            'done', $scope.tasks.done.join('|')
        );
    }

    $scope.archiveTask = function(event, key) {
        event.stopPropagation();

        if(this.todo) {
            $scope.tasks.todo.splice(key, 1);

            $cookieStore.put(
                'todo', $scope.tasks.todo.join('|')
            );
        }

        else if(this.done) {
            $scope.tasks.done.splice(key, 1);
            
            $cookieStore.put(
                'done', $scope.tasks.done.join('|')
            );
        }
    }
});
