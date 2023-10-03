$(document).on('submit', '#saveStudent', function (e) {
    e.preventDefault();

    var formData = new FormData(this);
    formData.append("save_student", true);

    $.ajax({
        type: "POST",
        url: "code.php",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            
            var res = jQuery.parseJSON(response);
            if(res.status == 422) {
                $('#errorMessage').removeClass('d-none');
                $('#errorMessage').text(res.message);

            }else if(res.status == 200){

                $('#errorMessage').addClass('d-none');
                $('#studentAddModal').modal('hide');
                $('#saveStudent')[0].reset();

                alertify.set('notifier','position', 'top-right');
                alertify.success(res.message);

                $('#myTable').load(location.href + " #myTable");

            }else if(res.status == 500) {
                alert(res.message);
            }
        }
    });

});

$(document).on('click', '.editStudentBtn', function () {

    var student_id = $(this).val();
    
    $.ajax({
        type: "GET",
        url: "code.php?student_id=" + student_id,
        success: function (response) {

            var res = jQuery.parseJSON(response);
            if(res.status == 404) {

                alert(res.message);
            }else if(res.status == 200){

                $('#student_id').val(res.data.id);
                $('#name').val(res.data.name);
                $('#email').val(res.data.email);
                $('#phone').val(res.data.phone);
                $('#course').val(res.data.course);

                $('#studentEditModal').modal('show');
            }

        }
    });

});

$(document).on('submit', '#updateStudent', function (e) {
    e.preventDefault();

    var formData = new FormData(this);
    formData.append("update_student", true);

    $.ajax({
        type: "POST",
        url: "code.php",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            
            var res = jQuery.parseJSON(response);
            if(res.status == 422) {
                $('#errorMessageUpdate').removeClass('d-none');
                $('#errorMessageUpdate').text(res.message);

            }else if(res.status == 200){

                $('#errorMessageUpdate').addClass('d-none');

                // alertify.set('notifier','position', 'top-right');
                // alertify.success(res.message);
                alert('success')
                
                $('#studentEditModal').modal('hide');
                $('#updateStudent')[0].reset();

                $('#myTable').load(location.href + " #myTable");

            }else if(res.status == 500) {
                alert(res.message);
            }
        }
    });

});

$(document).on('click', '.viewStudentBtn', function () {

    var student_id = $(this).val();
    $.ajax({
        type: "GET",
        url: "code.php?student_id=" + student_id,
        success: function (response) {

            var res = jQuery.parseJSON(response);
            if(res.status == 404) {

                alert(res.message);
            }else if(res.status == 200){

                $('#view_name').text(res.data.name);
                $('#view_email').text(res.data.email);
                $('#view_phone').text(res.data.phone);
                $('#view_course').text(res.data.course);

                $('#studentViewModal').modal('show');
            }
        }
    });
});

$(document).on('click', '.deleteStudentBtn', function (e) {
    e.preventDefault();

    if(confirm('Are you sure you want to delete this data?'))
    {
        var student_id = $(this).val();
        $.ajax({
            type: "POST",
            url: "code.php",
            data: {
                'delete_student': true,
                'student_id': student_id
            },
            success: function (response) {

                var res = jQuery.parseJSON(response);
                if(res.status == 500) {

                    alert(res.message);
                }else{
                    alertify.set('notifier','position', 'top-right');
                    alertify.success(res.message);

                    $('#myTable').load(location.href + " #myTable");
                }
            }
        });
    }
});
