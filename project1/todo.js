$(document).ready(function(e) {
    $('#add-todo').button({
        icons:{primary:"ui-icon-circle-plus"}}).click(
            function(){
                $('#new-todo').dialog('open');
            }
    );
    $('#new-todo').dialog({
        modal: true, autoOpen: false,
        buttons:{
            "Add task": function(){
                var taskName = $('#task').val();
                if(taskName === ""){return false;}
                var taskHTML = '<li><span class="done">%</span>';
                taskHTML += '<span class="delete">x</span>';
                taskHTML += '<span class="task"></span></li>';
                var $newTask = $(taskHTML);
                $newTask.find('.task').text(taskName);
                $newTask.hide();
                $('#todo-list').prepend($newTask);
                $newTask.show('clip',250).effect('highlight',1000);
                $(this).dialog('close');
                $('#task').val('');
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
            $this.detach();
            $('#completed-list').prepend($this);
            $this.slideDown();
        });
    });
    
    $('.sortlist').sortable({
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