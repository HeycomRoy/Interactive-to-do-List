$(document).ready(function(e) {
    $('#add-todo').button({
        icons:{primary:"ui-icon-circle-plus"}}).click(
            function(){
                $('#new-todo').dialog('open');
            }
    );
    var taskName;
    var userName;
    $('#new-todo').dialog({
        modal: true, autoOpen: false,
        buttons:{
            "Add task": function(){
                taskName = $('#task').val();
                userName = $('#user').val();
                if(taskName === ""){return false;}
                var taskHTML = '<li><span class="done">%</span>';
                taskHTML += '<span class="delete">x</span>';
                taskHTML += '<span class="edit">+</span>'
                taskHTML += '<span class="task"></span>';
                taskHTML += '<span class="user"></span></li>';
                var $newTask = $(taskHTML);
                $newTask.find('.task').text(taskName);
                $newTask.find('.user').text(userName);
                $('#todo-list').prepend($newTask);
                $newTask.show('clip',250).effect('highlight',1000);
                $(this).dialog('close');
                $('#task').val('');
                $('#user').val('');
            },
            "Cancel": function(){
                $(this).dialog('close');
            }
        }
    });

    $('#todo-list').on('click', '.done', function() {
        var $taskItem = $(this).parent('li');
        $taskItem.slideUp(250, function() {
            var $this = $(this);
            $this.children('.edit').hide();
            $this.detach();
            $('#completed-list').prepend($this);
            $this.slideDown();
        });
    });
    
    $('.sortlist').sortable({
        //select right child span to display/hide the edit button
        update: function(event, ui){
            if($('.sortlist').is('#completed-list')){
                $('#completed-list').find('.edit').hide();
            }
            if($('.sortlist').is('#todo-list')){
                $('#todo-list').find('.edit').show();
            }
        },
        //this connectWith option allows you connect one list to another.
        connectWith:'.sortlist',
        //change cursor to pointer.
        cursor:'pointer',
        //highlight the area you can drop the item.
        placeholder:'ui-state-highlight',
        //options that cannot make drop action.
        cancel:'.delete,.done'
        
    });
    
    var delTarget;
    $('.sortlist').on('click','.delete',function() {
        //window.alert("dont delete");
        //effect() method applies one of its many effects to the element.
        //In this case,the puff effect makes an element grow in size, fade
        //away, and disappear.
        //The function inside the effect() method is a callback function that runs once
        //the effect is done.   
        //$(this).parent('li').effect('puff', function() { $(this).remove(); });
        $('#confirm-delete').dialog('open');
        delTarget = $(this).parent('li');

    });
    
    $('#todo-list').on('click', '.edit',function(){
        $('#edit-info').dialog('open');
    });
    
    $('#edit-info').dialog({
        modal: true, autoOpen: false,
        buttons:{
            "confirm": function(){
                taskName = $('#edit-task').val();
                userName = $('#edit-user').val();
                $(this).dialog('close');
            },
            "cancel": function(){
                $(this).dialog('close');
            }
        }
    });
    
    $('#confirm-delete').dialog({
        modal: true, autoOpen: false,
        buttons:{
            "confirm": function(){
                delTarget.effect('puff', function() { $(this).remove(); });
                $(this).dialog('close');
            },
            "cancel": function(){
                $(this).dialog('close');
            }
        }
    });
    
}); // end ready